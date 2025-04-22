const fs = require('fs');
const path = require('path');

// Directory to scan
const cardsDir = './public/cards';

// Get all files in the directory and subdirectories
function getAllFiles(dir) {
    let files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            files = files.concat(getAllFiles(fullPath));
        } else {
            files.push(fullPath);
        }
    }
    
    return files;
}

// Main function
function findMissingBaseImages() {
    const files = getAllFiles(cardsDir);
    const fileNames = files.map(file => path.basename(file));
    
    // Map to track suffixed files
    const suffixedFiles = {};
    
    // Find files with _b_f and _b_s suffixes
    fileNames.forEach(fileName => {
        if (fileName.includes('_b_f.webp') || fileName.includes('_b_s.webp')) {
            // Extract the base name (without the suffix)
            const baseName = fileName.replace('_b_f.webp', '').replace('_b_s.webp', '');
            
            if (!suffixedFiles[baseName]) {
                suffixedFiles[baseName] = [];
            }
            
            suffixedFiles[baseName].push(fileName);
        }
    });
    
    // Check which base names don't have a corresponding base file
    const missingBaseFiles = [];
    
    for (const baseName in suffixedFiles) {
        const baseFileName = `${baseName}.webp`;
        if (!fileNames.includes(baseFileName)) {
            missingBaseFiles.push({
                baseName,
                suffixedFiles: suffixedFiles[baseName]
            });
        }
    }
    
    // Print results
    console.log(`Found ${missingBaseFiles.length} base names with missing base files:`);
    missingBaseFiles.forEach((item, index) => {
        console.log(`\n${index + 1}. Base name: ${item.baseName}`);
        console.log(`   Suffixed files: ${item.suffixedFiles.join(', ')}`);
    });
}

findMissingBaseImages();
