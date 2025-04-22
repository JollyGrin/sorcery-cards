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
function findMissingBaseImages(shouldCreateFiles = false) {
    const files = getAllFiles(cardsDir);
    const filesByName = {};
    
    // Group files by their full path for easy lookup
    files.forEach(file => {
        filesByName[file] = path.basename(file);
    });
    
    // Map to track suffixed files
    const suffixedFiles = {};
    
    // Find files with _b_f and _b_s suffixes
    Object.entries(filesByName).forEach(([fullPath, fileName]) => {
        if (fileName.includes('_b_f.webp') || fileName.includes('_b_s.webp')) {
            // Extract the base name (without the suffix)
            const baseName = fileName.replace('_b_f.webp', '').replace('_b_s.webp', '');
            
            if (!suffixedFiles[baseName]) {
                suffixedFiles[baseName] = [];
            }
            
            suffixedFiles[baseName].push({ 
                fileName, 
                fullPath 
            });
        }
    });
    
    // Check which base names don't have a corresponding base file
    const missingBaseFiles = [];
    
    for (const baseName in suffixedFiles) {
        const baseFileName = `${baseName}.webp`;
        const hasBaseFile = Object.values(filesByName).includes(baseFileName);
        
        if (!hasBaseFile) {
            missingBaseFiles.push({
                baseName,
                suffixedFiles: suffixedFiles[baseName]
            });
        }
    }
    
    // Print results
    console.log(`Found ${missingBaseFiles.length} base names with missing base files:`);
    
    // Create a list of fixes
    const filesToCreate = [];
    
    missingBaseFiles.forEach((item, index) => {
        console.log(`\n${index + 1}. Missing: ${item.baseName}.webp`);
        console.log(`   Existing suffixed files: ${item.suffixedFiles.map(f => f.fileName).join(', ')}`);
        
        // Find a _b_f or _b_s file to use as source for the base file
        const sourceFile = item.suffixedFiles.find(f => f.fileName.includes('_b_s.webp')) || 
                           item.suffixedFiles.find(f => f.fileName.includes('_b_f.webp'));
        
        if (sourceFile && shouldCreateFiles) {
            // Put the file in the root cards directory instead of the subdirectory
            const targetFile = path.join(cardsDir, `${item.baseName}.webp`);
            filesToCreate.push({
                source: sourceFile.fullPath,
                target: targetFile
            });
        }
    });
    
    // If requested, create the missing base files by copying from a suffixed file
    if (shouldCreateFiles && filesToCreate.length > 0) {
        console.log(`\nCreating ${filesToCreate.length} missing base files in root cards directory...`);
        
        filesToCreate.forEach(file => {
            fs.copyFileSync(file.source, file.target);
            console.log(`Created: ${file.target} (copied from ${path.basename(file.source)})`);
        });
        
        console.log(`\nDone! Created ${filesToCreate.length} base files in the root cards directory.`);
    }
    
    return {
        missingBaseFiles,
        filesToCreate
    };
}

// Parse command line arguments
const args = process.argv.slice(2);
const shouldCreateFiles = args.includes('--create');

// Show usage info
if (args.includes('--help')) {
    console.log('Usage:');
    console.log('  bun find-and-fix-missing-base-root.js        # Only show missing base files');
    console.log('  bun find-and-fix-missing-base-root.js --create  # Create missing base files in root cards directory');
    process.exit(0);
}

findMissingBaseImages(shouldCreateFiles);
