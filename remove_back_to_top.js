import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Pattern 1: With the comment { /* 11. FLOATING BACK TO TOP BUTTON */ }
            const pattern1 = /{\/\*\s*\d*\.?\s*FLOATING BACK TO TOP BUTTON\s*\*\/}\s*<button[\s\S]*?<\/button>/gi;
            if (pattern1.test(content)) {
                content = content.replace(pattern1, '');
                modified = true;
            }

            // Pattern 2: Just the button without comment, matching window.scrollTo and bottom-6 right-6
            const pattern2 = /<button[^>]*onClick={\(\)\s*=>\s*window\.scrollTo\([^)]*\)}[^>]*className="[^"]*fixed bottom-6 right-6[^"]*"[^>]*>[\s\S]*?<\/button>/g;
            if (pattern2.test(content)) {
                content = content.replace(pattern2, '');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Removed Back-to-Top from ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'src', 'pages'));
