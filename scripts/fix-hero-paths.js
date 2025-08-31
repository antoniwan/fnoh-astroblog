#!/usr/bin/env node

/**
 * Fix Hero Image Paths Script
 * 
 * This script fixes all heroImage references to use absolute paths that work with the image() function.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const CONTENT_DIR = path.join(projectRoot, 'src/content/writings');

/**
 * Fix heroImage paths in a content file
 */
async function fixHeroImagePaths(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    let updatedContent = content;
    let hasChanges = false;
    
    // Fix heroImage paths to use absolute paths from project root
    const heroImageRegex = /heroImage:\s*\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/assets\/images\/([^'\s]+)/g;
    if (heroImageRegex.test(updatedContent)) {
        updatedContent = updatedContent.replace(heroImageRegex, (match, imagePath) => {
            hasChanges = true;
            const correctPath = `heroImage: /images/${imagePath}`;
            console.log(`  ✅ Fixed heroImage in ${path.basename(filePath)}: ${match} -> ${correctPath}`);
            return correctPath;
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
async function fixAllHeroImagePaths() {
    console.log('🔧 Fixing heroImage paths in content files...\n');
    
    try {
        const contentFiles = await fs.readdir(CONTENT_DIR);
        const markdownFiles = contentFiles.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
        
        let fixedCount = 0;
        for (const file of markdownFiles) {
            const filePath = path.join(CONTENT_DIR, file);
            if (await fixHeroImagePaths(filePath)) {
                fixedCount++;
            }
        }
        
        console.log(`\n✅ Fixed heroImage paths in ${fixedCount} content files`);
        console.log('🎉 All heroImage paths have been corrected!');
        
        console.log('\n📋 Next steps:');
        console.log('  1. Test the build process');
        console.log('  2. Verify heroImages are working correctly');
        
    } catch (error) {
        console.error('❌ Failed to fix heroImage paths:', error);
        process.exit(1);
    }
}

// Run if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    fixAllHeroImagePaths();
}

export { fixAllHeroImagePaths, fixHeroImagePaths };
