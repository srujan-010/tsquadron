import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Custom plugin to mock the backend
function localMockBackend(env) {
  return {
    name: 'local-mock-backend',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Handle CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          return res.end();
        }

        // --- APPOINTMENTS API ---
        if (req.url.startsWith('/api/appointments')) {
          if (req.method === 'GET') {
            const appointments = readJSON(APPOINTMENTS_FILE, []);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(appointments));
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            return req.on('end', () => {
              try {
                const data = JSON.parse(body);
                // Validate slot
                const appointments = readJSON(APPOINTMENTS_FILE, []);
                
                // Check if slot is taken
                const isTaken = appointments.some(app => 
                  app.date === data.date && 
                  app.time === data.time && 
                  app.status !== 'Cancelled' && 
                  app.status !== 'Rejected'
                );

                if (isTaken) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ error: "This slot is already reserved. Please choose another available time." }));
                }

                // Create booking
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
                  
                  res.statusCode = 201;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: true, appointment: newAppointment }));
                } else {
                  throw new Error("Failed to write to DB");
                }
              } catch (e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: "Internal Server Error" }));
              }
            });
          }

          if (req.method === 'PATCH' || req.method === 'DELETE') {
            const id = req.url.split('/').pop();
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            return req.on('end', () => {
              const appointments = readJSON(APPOINTMENTS_FILE, []);
              const index = appointments.findIndex(a => a.id === id);
              
              if (index === -1) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: "Not found" }));
              }

              if (req.method === 'DELETE') {
                appointments.splice(index, 1);
              } else {
                const data = JSON.parse(body);
                appointments[index] = { ...appointments[index], ...data };
              }

              writeJSON(APPOINTMENTS_FILE, appointments);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true }));
            });
          }
        }

        // --- REVIEWS API ---
        if (req.url === '/api/reviews' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          return req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              const { placeId, apiKey } = data;
              
              if (!placeId || !apiKey) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: "Missing placeId or apiKey" }));
              }

              const googleUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
              const fetchResponse = await fetch(googleUrl);
              const result = await fetchResponse.json();

              res.statusCode = fetchResponse.status;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify(result));
            } catch (error) {
              console.error("Error fetching Google Reviews:", error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: "Internal server error" }));
            }
          });
        }

        // --- SLOTS API ---
        if (req.url.startsWith('/api/slots')) {
          if (req.method === 'GET') {
            const slotsData = readJSON(SLOTS_FILE, { availableSlots: [], disabledDates: [] });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(slotsData));
          }
          if (req.method === 'POST') {
             let body = '';
             req.on('data', chunk => { body += chunk.toString(); });
             return req.on('end', () => {
               try {
                 const data = JSON.parse(body);
                 writeJSON(SLOTS_FILE, data);
                 res.statusCode = 200;
                 res.setHeader('Content-Type', 'application/json');
                 return res.end(JSON.stringify({ success: true }));
               } catch(e) {
                 res.statusCode = 500;
                 res.setHeader('Content-Type', 'application/json');
                 return res.end(JSON.stringify({ error: "Internal Server Error" }));
               }
             });
          }
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), localMockBackend(env)],
    server: {
      port: 3000,
      host: true,
      allowedHosts: ['overdefensively-racemed-karole.ngrok-free.dev', 'enamel-stack-subzero.ngrok-free.dev']
    }
  };
});
