const fs = require('fs');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const https = require('https');
const path = require('path');

const imageUrl = 'https://i.ibb.co/hR1p60jt/Chat-GPT-Image-May-21-2026-03-14-44-PM-removebg-preview.png';
const publicDir = path.join(__dirname, 'public');

https.get(imageUrl, (response) => {
    const chunks = [];
    response.on('data', chunk => chunks.push(chunk));
    response.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        
        try {
            // Resize for different pngs
            await sharp(buffer).resize(16, 16).toFile(path.join(publicDir, 'favicon-16x16.png'));
            await sharp(buffer).resize(32, 32).toFile(path.join(publicDir, 'favicon-32x32.png'));
            await sharp(buffer).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
            await sharp(buffer).resize(192, 192).toFile(path.join(publicDir, 'android-chrome-192x192.png'));
            await sharp(buffer).resize(512, 512).toFile(path.join(publicDir, 'android-chrome-512x512.png'));
            
            // Generate favicon.ico from the 32x32 png
            const buf = await pngToIco(path.join(publicDir, 'favicon-32x32.png'));
            fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buf);
            
            console.log("Favicons generated successfully.");
        } catch (err) {
            console.error("Error generating favicons:", err);
        }
    });
});
