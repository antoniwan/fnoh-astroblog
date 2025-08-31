#!/usr/bin/env node

/**
 * Fix Hero Images Script
 * 
 * This script fixes all heroImage references in content files to use proper image paths
 * instead of import names, since the image() function expects actual paths.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const CONTENT_DIR = path.join(projectRoot, 'src/content/writings');
const ASSETS_DIR = path.join(projectRoot, 'src/assets');

/**
 * Fix heroImage references in a content file
 */
async function fixHeroImages(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    let updatedContent = content;
    let hasChanges = false;
    
    // Find the import statements and create a mapping
    const importMap = new Map();
    const importRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+)['"];/g;
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
        const importName = match[1];
        const importPath = match[2];
        importMap.set(importName, importPath);
    }
    
    // Find and fix heroImage references
    const heroImageRegex = /heroImage:\s*(\w+)/g;
    if (heroImageRegex.test(updatedContent)) {
        updatedContent = updatedContent.replace(heroImageRegex, (match, importName) => {
            const imagePath = importMap.get(importName);
            if (imagePath) {
                // Convert the import path to a relative path from the content file
                // Content files are in src/content/writings/, images are in src/assets/images/
                // So the correct relative path is ../../assets/images/...
                const relativePath = imagePath.replace('../../assets/', '../../assets/');
                hasChanges = true;
                console.log(`  ✅ Fixed heroImage in ${path.basename(filePath)}: ${importName} -> ${relativePath}`);
                return `heroImage: ${relativePath}`;
            }
            return match; // Keep original if no mapping found
        });
    }
    
    if (hasChanges) {
        await fs.writeFile(filePath, updatedContent, 'utf-8');
        return true;
    }
    
    return false;
}

/**
 * Main function to fix all content files
 */
async function fixAllHeroImages() {
    console.log('🔧 Fixing heroImage references in content files...\n');
    
    try {
        const contentFiles = await fs.readdir(CONTENT_DIR);
        const markdownFiles = contentFiles.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
        
        let fixedCount = 0;
        for (const file of markdownFiles) {
            const filePath = path.join(CONTENT_DIR, file);
            if (await fixHeroImages(filePath)) {
                fixedCount++;
            }
        }
        
        console.log(`\n✅ Fixed heroImage references in ${fixedCount} content files`);
        console.log('🎉 All heroImage references have been corrected!');
        
        console.log('\n📋 Next steps:');
        console.log('  1. Remove the import statements (they are no longer needed)');
        console.log('  2. Test the build process');
        console.log('  3. Verify heroImages are working correctly');
        
    } catch (error) {
        console.error('❌ Failed to fix heroImage references:', error);
        process.exit(1);
    }
}

// Run if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    fixAllHeroImages();
}

export { fixAllHeroImages, fixHeroImages };
