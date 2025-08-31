#!/usr/bin/env node

/**
 * Image Migration Script for Astro 5
 * 
 * This script migrates all images from public/images/ to src/assets/images/
 * and updates all content files to use the new import-based approach.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Configuration
const PUBLIC_IMAGES_DIR = path.join(projectRoot, 'public/images');
const ASSETS_IMAGES_DIR = path.join(projectRoot, 'src/assets/images');
const CONTENT_DIR = path.join(projectRoot, 'src/content/writings');

// Image usage mapping
const imageUsageMap = new Map();

/**
 * Scan content files for image references
 */
async function scanContentFiles() {
    console.log('🔍 Scanning content files for image references...');
    
    const contentFiles = await fs.readdir(CONTENT_DIR);
    const markdownFiles = contentFiles.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
    
    for (const file of markdownFiles) {
        const filePath = path.join(CONTENT_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Find heroImage references
        const heroImageMatch = content.match(/heroImage:\s*["']?([^"\s]+)["']?/);
        if (heroImageMatch) {
            const imagePath = heroImageMatch[1];
            if (!imageUsageMap.has(imagePath)) {
                imageUsageMap.set(imagePath, []);
            }
            imageUsageMap.get(imagePath).push({
                file,
                type: 'heroImage',
                line: content.split('\n').findIndex(line => line.includes(imagePath)) + 1
            });
        }
        
        // Find markdown image references ![alt](path)
        const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
        let match;
        while ((match = markdownImageRegex.exec(content)) !== null) {
            const imagePath = match[2];
            if (!imagePath.startsWith('http') && !imagePath.startsWith('data:')) {
                if (!imageUsageMap.has(imagePath)) {
                    imageUsageMap.set(imagePath, []);
                }
                imageUsageMap.get(imagePath).push({
                    file,
                    type: 'markdown',
                    line: content.substring(0, match.index).split('\n').length,
                    alt: match[1]
                });
            }
        }
    }
    
    console.log(`✅ Found ${imageUsageMap.size} unique image references`);
    return imageUsageMap;
}

/**
 * Get all image files from public directory
 */
async function getPublicImages() {
    console.log('📁 Scanning public images directory...');
    
    const images = [];
    
    async function scanDir(dirPath, relativePath = '') {
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });
            
            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);
                const relativeImagePath = path.join(relativePath, entry.name);
                
                if (entry.isDirectory()) {
                    await scanDir(fullPath, relativeImagePath);
                } else if (entry.isFile()) {
                    const ext = path.extname(entry.name).toLowerCase();
                    if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'].includes(ext)) {
                        images.push({
                            publicPath: fullPath,
                            relativePath: relativeImagePath,
                            filename: entry.name,
                            extension: ext
                        });
                    }
                }
            }
        } catch (error) {
            console.warn(`⚠️  Warning: Could not scan directory ${dirPath}:`, error.message);
        }
    }
    
    await scanDir(PUBLIC_IMAGES_DIR);
    console.log(`✅ Found ${images.length} image files in public directory`);
    return images;
}

/**
 * Copy image to assets directory
 */
async function copyImageToAssets(publicImage) {
    const targetPath = path.join(ASSETS_IMAGES_DIR, publicImage.relativePath);
    const targetDir = path.dirname(targetPath);
    
    try {
        await fs.mkdir(targetDir, { recursive: true });
        await fs.copyFile(publicImage.publicPath, targetPath);
        return true;
    } catch (error) {
        console.error(`❌ Failed to copy ${publicImage.relativePath}:`, error.message);
        return false;
    }
}

/**
 * Generate import statement for an image
 */
function generateImportStatement(imagePath) {
    const relativePath = path.relative(ASSETS_IMAGES_DIR, path.join(ASSETS_IMAGES_DIR, imagePath));
    const importName = path.basename(imagePath, path.extname(imagePath))
        .replace(/[^a-zA-Z0-9]/g, '_')
        .replace(/^(\d)/, '_$1'); // Prefix with underscore if starts with number
    
    return `import ${importName} from '../../assets/images/${relativePath}';`;
}

/**
 * Update content file to use new image imports
 */
async function updateContentFile(filePath, imageUsageMap) {
    const content = await fs.readFile(filePath, 'utf-8');
    let updatedContent = content;
    let hasChanges = false;
    
    // Add imports at the top
    const imports = [];
    const usedImages = new Set();
    
    // Collect all images used in this file
    for (const [imagePath, usages] of imageUsageMap.entries()) {
        const fileUsages = usages.filter(usage => usage.file === path.basename(filePath));
        if (fileUsages.length > 0) {
            usedImages.add(imagePath);
        }
    }
    
    // Generate imports
    for (const imagePath of usedImages) {
        const importStatement = generateImportStatement(imagePath);
        imports.push(importStatement);
    }
    
    // Add imports after frontmatter
    if (imports.length > 0) {
        const frontmatterEnd = updatedContent.indexOf('---', 3);
        if (frontmatterEnd !== -1) {
            const beforeFrontmatter = updatedContent.substring(0, frontmatterEnd + 3);
            const afterFrontmatter = updatedContent.substring(frontmatterEnd + 3);
            updatedContent = beforeFrontmatter + '\n\n' + imports.join('\n') + '\n\n' + afterFrontmatter;
            hasChanges = true;
        }
    }
    
    // Update heroImage references
    for (const [imagePath, usages] of imageUsageMap.entries()) {
        const fileUsages = usages.filter(usage => usage.file === path.basename(filePath) && usage.type === 'heroImage');
        
        for (const usage of fileUsages) {
            const oldPattern = new RegExp(`heroImage:\\s*["']?${imagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']?`, 'g');
            const importName = path.basename(imagePath, path.extname(imagePath))
                .replace(/[^a-zA-Z0-9]/g, '_')
                .replace(/^(\d)/, '_$1');
            
            updatedContent = updatedContent.replace(oldPattern, `heroImage: ${importName}`);
        }
    }
    
    // Update markdown image references
    for (const [imagePath, usages] of imageUsageMap.entries()) {
        const fileUsages = usages.filter(usage => usage.file === path.basename(filePath) && usage.type === 'markdown');
        
        for (const usage of fileUsages) {
            const oldPattern = new RegExp(`!\\[([^\\]]*)\\]\\(${imagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
            const importName = path.basename(imagePath, path.extname(imagePath))
                .replace(/[^a-zA-Z0-9]/g, '_')
                .replace(/^(\d)/, '_$1');
            
            updatedContent = updatedContent.replace(oldPattern, `![$1](${importName}.src)`);
        }
    }
    
    if (hasChanges) {
        await fs.writeFile(filePath, updatedContent, 'utf-8');
        console.log(`✅ Updated ${path.basename(filePath)}`);
    }
    
    return hasChanges;
}

/**
 * Main migration function
 */
async function migrateImages() {
    console.log('🚀 Starting image migration to Astro 5 assets...\n');
    
    try {
        // Step 1: Scan content files
        const imageUsageMap = await scanContentFiles();
        
        // Step 2: Get public images
        const publicImages = await getPublicImages();
        
        // Step 3: Copy images to assets
        console.log('\n📋 Copying images to assets directory...');
        let copiedCount = 0;
        
        for (const image of publicImages) {
            if (await copyImageToAssets(image)) {
                copiedCount++;
                console.log(`  ✅ Copied ${image.relativePath}`);
            }
        }
        
        console.log(`\n✅ Successfully copied ${copiedCount}/${publicImages.length} images`);
        
        // Step 4: Update content files
        console.log('\n📝 Updating content files...');
        const contentFiles = await fs.readdir(CONTENT_DIR);
        const markdownFiles = contentFiles.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
        
        let updatedCount = 0;
        for (const file of markdownFiles) {
            const filePath = path.join(CONTENT_DIR, file);
            if (await updateContentFile(filePath, imageUsageMap)) {
                updatedCount++;
            }
        }
        
        console.log(`\n✅ Updated ${updatedCount} content files`);
        
        // Step 5: Generate summary
        console.log('\n📊 Migration Summary:');
        console.log(`  • Images copied: ${copiedCount}`);
        console.log(`  • Content files updated: ${updatedCount}`);
        console.log(`  • Total image references: ${imageUsageMap.size}`);
        
        console.log('\n🎉 Image migration completed successfully!');
        console.log('\n📋 Next steps:');
        console.log('  1. Update content.config.ts to use image() function again');
        console.log('  2. Update components to use ImageMetadata type');
        console.log('  3. Test the build process');
        console.log('  4. Remove old images from public directory (optional)');
        
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run migration if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    migrateImages();
}

export { migrateImages, scanContentFiles, getPublicImages };
