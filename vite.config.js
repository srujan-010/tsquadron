import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APPOINTMENTS_FILE = path.join(__dirname, 'data', 'appointments.json');
const SLOTS_FILE = path.join(__dirname, 'data', 'slots.json');
const CLIENTS_FILE = path.join(__dirname, 'data', 'clients.json');

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

// Helper to rewrite index.html on disk dynamically for SSR / View Source support
function updateIndexHtmlSeo(seoData) {
  try {
    const indexPath = path.join(__dirname, 'index.html');
    if (!fs.existsSync(indexPath)) return;
    let html = fs.readFileSync(indexPath, 'utf8');

    const title = seoData.siteTitle || 'TSquadron | Premium Digital Marketing & Growth Agency';
    const description = seoData.defaultMetaDescription || 'TSquadron is a premier, ROI-focused digital marketing agency.';
    const keywords = seoData.defaultKeywords || 'digital marketing, seo, ppc';
    const brandName = seoData.brandName || 'TSquadron';
    const websiteName = seoData.websiteName || 'TSquadron';
    const canonicalUrl = seoData.canonicalDomain || 'https://www.tsquadron.in';
    const favicon = seoData.favicon || '/favicon.ico';
    const companyLogo = seoData.companyLogo || '/logo.png';
    const defaultOgImage = seoData.defaultOgImage || '/logo.png';

    const startComment = '<!-- TS_SEO_START -->';
    const endComment = '<!-- TS_SEO_END -->';

    const seoBlock = `
    ${startComment}
    <title data-rh="true">${title}</title>
    <meta data-rh="true" name="description" content="${description}" />
    <meta data-rh="true" name="keywords" content="${keywords}" />
    <meta data-rh="true" name="author" content="${brandName}" />
    <meta data-rh="true" name="application-name" content="${brandName}" />
    <meta data-rh="true" name="theme-color" content="#ffffff" />
    <meta data-rh="true" name="robots" content="index, follow" />
    <link data-rh="true" rel="canonical" href="${canonicalUrl}" />
    <link data-rh="true" rel="icon" href="${favicon}" sizes="any">
    <link data-rh="true" rel="apple-touch-icon" href="${favicon}">
    <meta data-rh="true" property="og:title" content="${title}" />
    <meta data-rh="true" property="og:description" content="${description}" />
    <meta data-rh="true" property="og:type" content="website" />
    <meta data-rh="true" property="og:url" content="${canonicalUrl}" />
    <meta data-rh="true" property="og:image" content="${defaultOgImage}" />
    <meta data-rh="true" property="og:site_name" content="${websiteName}" />
    <meta data-rh="true" name="twitter:card" content="summary_large_image" />
    <meta data-rh="true" name="twitter:title" content="${title}" />
    <meta data-rh="true" name="twitter:description" content="${description}" />
    <meta data-rh="true" name="twitter:image" content="${defaultOgImage}" />
    <script data-rh="true" type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "${brandName}",
      "url": "${canonicalUrl}",
      "logo": "${companyLogo}"
    }
    </script>
    ${endComment}`;

    const regex = new RegExp(`${startComment}[\\s\\S]*?${endComment}`, 'g');
    if (html.includes(startComment)) {
      html = html.replace(regex, seoBlock.trim());
    } else {
      // Find where head begins or insert after charset/viewport
      if (html.includes('<head>')) {
        html = html.replace('<head>', `<head>\n    ${seoBlock.trim()}`);
      } else {
        html = html.replace('</head>', `${seoBlock.trim()}\n  </head>`);
      }
    }

    fs.writeFileSync(indexPath, html, 'utf8');
    console.log("TSquadron: Root index.html successfully rewrote with updated global settings.");
  } catch (err) {
    console.error("Error updating index.html SEO:", err);
  }
}

// Custom plugin to mock the backend
function localMockBackend(env) {
  const SEO_GLOBAL_FILE = path.join(__dirname, 'data', 'global_seo.json');
  return {
    name: 'local-mock-backend',
    configureServer(server) {
      // Initialize index.html with the saved global SEO settings on start
      try {
        const currentSeo = readJSON(SEO_GLOBAL_FILE, null);
        if (currentSeo) {
          updateIndexHtmlSeo(currentSeo);
        }
      } catch (err) {
        console.error("Failed to pre-sync index.html SEO:", err);
      }

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

        // --- GLOBAL SEO API ---
        if (req.url.startsWith('/api/seo/global')) {
          if (req.method === 'GET') {
            const seoData = readJSON(SEO_GLOBAL_FILE, {
              siteTitle: 'TSquadron | Premium Digital Marketing & Growth Agency',
              defaultMetaDescription: 'TSquadron is a premier, ROI-focused digital marketing agency.',
              defaultKeywords: 'digital marketing, seo, ppc',
              defaultOgImage: 'https://res.cloudinary.com/dixbhnqnf/image/upload/v1782826521/og-image-Photoroom_oawp5v.png',
              favicon: '/favicon.ico',
              brandName: 'TSquadron',
              websiteName: 'TSquadron Digital Solutions',
              canonicalDomain: 'https://www.tsquadron.in',
              companyLogo: 'https://res.cloudinary.com/dixbhnqnf/image/upload/v1782826521/og-image-Photoroom_oawp5v.png'
            });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            return res.end(JSON.stringify(seoData));
          }
          if (req.method === 'POST') {
             let body = '';
             req.on('data', chunk => { body += chunk.toString(); });
             return req.on('end', () => {
               try {
                 const data = JSON.parse(body);
                 writeJSON(SEO_GLOBAL_FILE, data);
                 updateIndexHtmlSeo(data);
                 res.statusCode = 200;
                 res.setHeader('Content-Type', 'application/json');
                 res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
                 res.setHeader('Pragma', 'no-cache');
                 res.setHeader('Expires', '0');
                 return res.end(JSON.stringify({ success: true }));
               } catch(e) {
                 res.statusCode = 500;
                 res.setHeader('Content-Type', 'application/json');
                 return res.end(JSON.stringify({ error: "Internal Server Error" }));
               }
             });
          }
        }

        // --- CLIENTS API ---
        if (req.url.startsWith('/api/clients')) {
          const urlObj = new URL(req.url, 'http://localhost');
          const isOnlyActive = urlObj.searchParams.get('active') === 'true';

          if (req.method === 'GET') {
            const clients = readJSON(CLIENTS_FILE, []);
            let result = clients;
            if (isOnlyActive) {
              result = clients.filter(c => c.isActive !== false);
            }
            result.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(result));
          }

          if (req.method === 'POST' && req.url === '/api/clients/reorder') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            return req.on('end', () => {
              try {
                const reordered = JSON.parse(body);
                writeJSON(CLIENTS_FILE, reordered);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: true, clients: reordered }));
              } catch(e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: "Internal Server Error" }));
              }
            });
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            return req.on('end', () => {
              try {
                const data = JSON.parse(body);
                const clients = readJSON(CLIENTS_FILE, []);
                const now = new Date().toISOString();
                const maxOrder = clients.length > 0 ? Math.max(...clients.map(c => c.displayOrder || 0)) : 0;
                const newClient = {
                  id: Date.now(),
                  name: data.name || '',
                  logoUrl: data.logoUrl || '',
                  displayOrder: data.displayOrder !== undefined ? Number(data.displayOrder) : maxOrder + 1,
                  isActive: data.isActive !== undefined ? data.isActive : true,
                  createdAt: now,
                  updatedAt: now
                };
                clients.push(newClient);
                clients.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
                writeJSON(CLIENTS_FILE, clients);
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: true, client: newClient }));
              } catch(e) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: "Internal Server Error" }));
              }
            });
          }

          if (req.method === 'PATCH' || req.method === 'DELETE') {
            const pathParts = urlObj.pathname.split('/');
            const id = Number(pathParts[pathParts.length - 1]);
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            return req.on('end', () => {
              try {
                const clients = readJSON(CLIENTS_FILE, []);
                const idx = clients.findIndex(c => c.id === id);
                if (idx === -1) {
                  res.statusCode = 404;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ error: "Client not found" }));
                }

                if (req.method === 'DELETE') {
                  clients.splice(idx, 1);
                } else {
                  const data = JSON.parse(body);
                  clients[idx] = {
                    ...clients[idx],
                    ...data,
                    id: clients[idx].id,
                    updatedAt: new Date().toISOString()
                  };
                }
                clients.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
                writeJSON(CLIENTS_FILE, clients);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: true, clients }));
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
