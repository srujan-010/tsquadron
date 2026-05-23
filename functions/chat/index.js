// InsForge Edge Function for TSquadron AI Chatbot
// Deployment: `insforge functions deploy chat`

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

export default async function handler(req) {
  // CORS headers for local development and cross-origin frontend requests
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
    }

    const body = await req.json();
    const userMessages = body.messages || [];

    // Construct the payload for OpenRouter
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...userMessages
    ];

    const openRouterApiKey = process.env.OPENROUTER_API_KEY || Deno.env.get('OPENROUTER_API_KEY');

    if (!openRouterApiKey) {
      console.error("Missing OpenRouter API Key");
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500, headers });
    }

    const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://tsquadron.com', // Optional but recommended by OpenRouter
        'X-Title': 'TSquadron Assistant'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3-8b-instruct',
        messages: messages,
        temperature: 0.3, // Low temperature for consistent, professional business responses
        max_tokens: 500,
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("OpenRouter Error:", errorText);
      throw new Error(`OpenRouter API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const replyText = aiData.choices[0].message.content;

    // Optional: Lead generation/Conversation storage logic would go here
    // e.g., await storeConversation(userMessages, replyText);

    return new Response(JSON.stringify({ reply: replyText }), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
