import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCLUSIONS = [
    "Kishanpura, Hanamkonda",
    "Naimnagar Main Road, Hanamkonda",
    "Hanamkonda, Warangal, Telangana",
    "Hanamkonda Operational Hub",
    "Hanamkonda Office Card",
    "TSquadron Hanamkonda Location Map"
];

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            processFile(fullPath);
        }
    }
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let modified = false;
    
    for (let i = 0; i < lines.length; i++) {
        const originalLine = lines[i];
        
        // Check exclusions
        let isExcluded = false;
        for (const exclusion of EXCLUSIONS) {
            if (originalLine.includes(exclusion)) {
                isExcluded = true;
                break;
            }
        }
        
        if (isExcluded) continue;
        
        // Regex for Hanamkonda -> Warangal (case-sensitive)
        let newLine = originalLine.replace(/\bHanamkonda\b/g, "Warangal");
        
        // Regex for hanamkonda -> warangal (not preceded or followed by hyphen)
        newLine = newLine.replace(/(?<!-)\bhanamkonda\b(?!-)/g, "warangal");
        
        if (newLine !== originalLine) {
            lines[i] = newLine;
            modified = true;
            console.log(`[Modified] ${filePath}:${i + 1}\n- ${originalLine.trim()}\n+ ${newLine.trim()}\n`);
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    }
}

console.log("Starting replacement process...");
processDirectory(path.join(__dirname, 'src'));
console.log("Done.");
