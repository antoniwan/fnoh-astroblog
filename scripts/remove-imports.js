#!/usr/bin/env node

/**
 * Remove Image Imports Script
 * 
 * This script removes all image import statements from content files since they're no longer needed
 * after fixing the heroImage references to use proper paths.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const CONTENT_DIR = path.join(projectRoot, 'src/content/writings');

/**
 * Remove image import statements from a content file
 */
async function removeImageImports(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    let updatedContent = content;
    let hasChanges = false;
    
    // Remove image import statements
    const importRegex = /import\s+\w+\s+from\s+['"][^'"]*assets\/images[^'"]*['"];?\s*\n?/g;
    if (importRegex.test(updatedContent)) {
        updatedContent = updatedContent.replace(importRegex, '');
        hasChanges = true;
        console.log(`  ✅ Removed image imports from ${path.basename(filePath)}`);
    }
    
    // Clean up any double newlines that might have been created
    updatedContent = updatedContent.replace(/\n\n\n+/g, '\n\n');
    
    if (hasChanges) {
        await fs.writeFile(filePath, updatedContent, 'utf-8');
        return true;
    }
    
    return false;
}

/**
 * Main function to remove imports from all content files
 */
async function removeAllImageImports() {
    console.log('🧹 Removing image import statements from content files...\n');
    
    try {
        const contentFiles = await fs.readdir(CONTENT_DIR);
        const markdownFiles = contentFiles.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
        
        let cleanedCount = 0;
        for (const file of markdownFiles) {
            const filePath = path.join(CONTENT_DIR, file);
            if (await removeImageImports(filePath)) {
                cleanedCount++;
            }
        }
        
        console.log(`\n✅ Cleaned up ${cleanedCount} content files`);
        console.log('🎉 All image import statements have been removed!');
        
        console.log('\n📋 Next steps:');
        console.log('  1. Test the build process');
        console.log('  2. Verify heroImages are working correctly');
        console.log('  3. Check that all images display properly');
        
    } catch (error) {
        console.error('❌ Failed to remove image imports:', error);
        process.exit(1);
    }
}

// Run if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    removeAllImageImports();
}

export { removeAllImageImports, removeImageImports };
