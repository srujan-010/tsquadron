import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const APPOINTMENTS_FILE = path.join(__dirname, 'data', 'appointments.json');
const SLOTS_FILE = path.join(__dirname, 'data', 'slots.json');

// Helper to read JSON
function readJSON(filePath, defaultData) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading JSON:", err);
  }
  return defaultData;
}

// Helper to write JSON
function writeJSON(filePath, data) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error("Error writing JSON:", err);
    return false;
  }
}

// --- APPOINTMENTS API ---
app.get('/api/appointments', (req, res) => {
  const appointments = readJSON(APPOINTMENTS_FILE, []);
  res.json(appointments);
});

app.post('/api/appointments', (req, res) => {
  try {
    const data = req.body;
    const appointments = readJSON(APPOINTMENTS_FILE, []);
    
    const isTaken = appointments.some(app => 
      app.date === data.date && 
      app.time === data.time && 
      app.status !== 'Cancelled' && 
      app.status !== 'Rejected'
    );

    if (isTaken) {
      return res.status(400).json({ error: "This slot is already reserved. Please choose another available time." });
    }

    const newAppointment = {
      id: Date.now().toString(),
      ...data,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    appointments.push(newAppointment);
    if (writeJSON(APPOINTMENTS_FILE, appointments)) {
      console.log("SENDING EMAIL TO CUSTOMER:", data.email);
      console.log("SENDING NOTIFICATION TO ADMIN.");
      return res.status(201).json({ success: true, appointment: newAppointment });
    } else {
      throw new Error("Failed to write to DB");
    }
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const appointments = readJSON(APPOINTMENTS_FILE, []);
  const index = appointments.findIndex(a => a.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  appointments[index] = { ...appointments[index], ...data };
  writeJSON(APPOINTMENTS_FILE, appointments);
  res.json({ success: true });
});

app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const appointments = readJSON(APPOINTMENTS_FILE, []);
  const index = appointments.findIndex(a => a.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Not found" });
  }

  appointments.splice(index, 1);
  writeJSON(APPOINTMENTS_FILE, appointments);
  res.json({ success: true });
});

// --- REVIEWS API ---
app.post('/api/reviews', async (req, res) => {
  try {
    const { placeId, apiKey } = req.body;
    
    if (!placeId || !apiKey) {
      return res.status(400).json({ error: "Missing placeId or apiKey" });
    }

    const googleUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
    const fetchResponse = await fetch(googleUrl);
    const result = await fetchResponse.json();

    res.status(fetchResponse.status).json(result);
  } catch (error) {
    console.error("Error fetching Google Reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// --- SLOTS API ---
app.get('/api/slots', (req, res) => {
  const slotsData = readJSON(SLOTS_FILE, { availableSlots: [], disabledDates: [] });
  res.json(slotsData);
});

app.post('/api/slots', (req, res) => {
  try {
    const data = req.body;
    writeJSON(SLOTS_FILE, data);
    res.json({ success: true });
  } catch(e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// --- CHAT API ---
app.post('/api/chat', async (req, res) => {
  try {
    const userMessages = req.body.messages || [];

    const SYSTEM_PROMPT = `You are the official AI assistant for TSquadron Digital Solutions.
Your role is ONLY to assist users with:
- SEO services, UI/UX design, Branding, Web development, Digital marketing
- Booking a consultation appointment

CRITICAL BOOKING INSTRUCTIONS:
To book an appointment, act professionally like a real booking assistant. Follow these steps:
1. Ask the user which service they are interested in.
2. Ask for their preferred date. Provide available options if they ask (Assume business hours Mon-Fri).
3. Ask for their preferred time slot.
4. Ask for their full name, email, and contact number.
5. Once you have ALL the information (name, email, phone, service, date, time), you MUST output exactly the following JSON block on a new line to trigger the booking system. DO NOT output anything else after the JSON block.

[BOOK_APPOINTMENT: {"name": "John Doe", "email": "john@example.com", "phone": "1234567890", "service": "Web Development", "date": "2026-05-22", "time": "3:00 PM"}]

Rules:
- Never answer unrelated general knowledge questions.
- Never claim a booking is confirmed yourself. The system will process the [BOOK_APPOINTMENT: {...}] command and confirm it.
- Keep responses concise, modern, and client-focused.`;

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...userMessages
    ];

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing API Key" });
    }

    const fetchResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://tsquadron.in',
        'X-Title': 'TSquadron Assistant'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3-8b-instruct',
        messages: messages,
        temperature: 0.2,
        max_tokens: 500,
      })
    });

    if (!fetchResponse.ok) {
      const text = await fetchResponse.text();
      console.error("OpenRouter error:", text);
      return res.status(fetchResponse.status).json({ error: "OpenRouter API error" });
    }

    const result = await fetchResponse.json();
    const reply = result.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error("Error in chat backend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// --- SERVE STATIC FILES ---
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// --- CATCH-ALL FOR REACT ROUTING ---
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
