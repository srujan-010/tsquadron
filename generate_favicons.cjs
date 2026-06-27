const fs = require('fs');
const sharp = require('sharp');
const path = require('path');


const publicDir = path.join(__dirname, 'public');
const logoPath = path.join(publicDir, 'logo.png');

async function generateFavicons() {
    try {
        console.log("Reading logo from:", logoPath);
        
        // Generate different pngs
        await sharp(logoPath).resize(16, 16).toFile(path.join(publicDir, 'favicon-16x16.png'));
        await sharp(logoPath).resize(32, 32).toFile(path.join(publicDir, 'favicon-32x32.png'));
        // 48x48 is useful for the multi-resolution ICO
        await sharp(logoPath).resize(48, 48).toFile(path.join(publicDir, 'favicon-48x48.png'));
        
        await sharp(logoPath).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
        await sharp(logoPath).resize(192, 192).toFile(path.join(publicDir, 'android-chrome-192x192.png'));
        await sharp(logoPath).resize(512, 512).toFile(path.join(publicDir, 'android-chrome-512x512.png'));
        
        // Generate multi-resolution favicon.ico
        const { default: pngToIco } = await import('png-to-ico');
        const buf = await pngToIco([
            path.join(publicDir, 'favicon-16x16.png'),
            path.join(publicDir, 'favicon-32x32.png'),
            path.join(publicDir, 'favicon-48x48.png')
        ]);
        
        fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buf);
        
        // Clean up the temporary 48x48 file
        fs.unlinkSync(path.join(publicDir, 'favicon-48x48.png'));
        
        console.log("Favicons generated successfully.");
    } catch (err) {
        console.error("Error generating favicons:", err);
    }
}

generateFavicons();
