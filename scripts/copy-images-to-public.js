#!/usr/bin/env node

/**
 * Copy Images to Public Script
 * 
 * This script copies images from src/assets/images/ back to public/images/ since the image() function
 * expects images to be in the public directory.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const ASSETS_IMAGES_DIR = path.join(projectRoot, 'src/assets/images');
const PUBLIC_IMAGES_DIR = path.join(projectRoot, 'public/images');

/**
 * Copy images from assets to public
 */
async function copyImagesToPublic() {
    console.log('📋 Copying images from assets to public directory...\n');
    
    try {
        // Create public/images directory if it doesn't exist
        await fs.mkdir(PUBLIC_IMAGES_DIR, { recursive: true });
        
        // Copy all images recursively
        async function copyDir(srcDir, destDir) {
            const entries = await fs.readdir(srcDir, { withFileTypes: true });
            
            for (const entry of entries) {
                const srcPath = path.join(srcDir, entry.name);
                const destPath = path.join(destDir, entry.name);
                
                if (entry.isDirectory()) {
                    await fs.mkdir(destPath, { recursive: true });
                    await copyDir(srcPath, destPath);
                } else if (entry.isFile()) {
                    const ext = path.extname(entry.name).toLowerCase();
                    if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'].includes(ext)) {
                        await fs.copyFile(srcPath, destPath);
                        console.log(`  ✅ Copied ${entry.name}`);
                    }
                }
            }
        }
        
        await copyDir(ASSETS_IMAGES_DIR, PUBLIC_IMAGES_DIR);
        
        console.log('\n🎉 All images have been copied to public directory!');
        console.log('\n📋 Next steps:');
        console.log('  1. Test the build process');
        console.log('  2. Verify heroImages are working correctly');
        
    } catch (error) {
        console.error('❌ Failed to copy images:', error);
        process.exit(1);
    }
}

// Run if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    copyImagesToPublic();
}

export { copyImagesToPublic };
