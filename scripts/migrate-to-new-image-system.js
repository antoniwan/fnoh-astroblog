#!/usr/bin/env node

/**
 * Migration script to convert existing content files to use the new Astro image system
 * This script helps migrate from the old string-based heroImage to the new image() helper system
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../src/content/writings');
const ASSETS_DIR = path.join(__dirname, '../src/assets/images');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images');

/**
 * Check if a file is a markdown file
 */
function isMarkdownFile(filename) {
	return filename.endsWith('.md') || filename.endsWith('.mdx');
}

/**
 * Extract heroImage path from frontmatter
 */
function extractHeroImage(content) {
	const heroImageMatch = content.match(/heroImage:\s*["']([^"']+)["']/);
	return heroImageMatch ? heroImageMatch[1] : null;
}

/**
 * Update frontmatter to use new image system
 */
function updateFrontmatter(content, oldHeroImage) {
	if (!oldHeroImage) return content;
	
	// Remove the old heroImage line
	let updatedContent = content.replace(
		/heroImage:\s*["'][^"']+["']\s*\n/g,
		''
	);
	
	// Add new image fields
	const newImageFields = `heroImage: "./${path.basename(oldHeroImage)}"
heroImageAlt: "Hero image for this post"
`;
	
	// Find the end of frontmatter and insert new fields
	const frontmatterEnd = updatedContent.indexOf('---', 3);
	if (frontmatterEnd !== -1) {
		updatedContent = updatedContent.slice(0, frontmatterEnd) + newImageFields + updatedContent.slice(frontmatterEnd);
	}
	
	return updatedContent;
}

/**
 * Check if image exists in public directory
 */
async function checkImageExists(imagePath) {
	try {
		const fullPath = path.join(PUBLIC_IMAGES_DIR, imagePath.replace(/^\//, ''));
		await fs.access(fullPath);
		return true;
	} catch {
		return false;
	}
}

/**
 * Copy image from public to assets directory
 */
async function copyImageToAssets(imagePath) {
	try {
		const sourcePath = path.join(PUBLIC_IMAGES_DIR, imagePath.replace(/^\//, ''));
		const filename = path.basename(imagePath);
		const destPath = path.join(ASSETS_DIR, filename);
		
		await fs.copyFile(sourcePath, destPath);
		console.log(`✅ Copied ${filename} to assets directory`);
		return true;
	} catch (error) {
		console.error(`❌ Failed to copy ${imagePath}:`, error.message);
		return false;
	}
}

/**
 * Process a single content file
 */
async function processContentFile(filePath) {
	try {
		const content = await fs.readFile(filePath, 'utf-8');
		const filename = path.basename(filePath);
		
		console.log(`\n📄 Processing ${filename}...`);
		
		// Extract current heroImage
		const heroImage = extractHeroImage(content);
		
		if (!heroImage) {
			console.log(`   ℹ️  No heroImage found, skipping`);
			return;
		}
		
		console.log(`   🔍 Found heroImage: ${heroImage}`);
		
		// Check if image exists in public directory
		if (await checkImageExists(heroImage)) {
			console.log(`   ✅ Image exists in public directory`);
			
			// Copy to assets directory
			if (await copyImageToAssets(heroImage)) {
				// Update frontmatter
				const updatedContent = updateFrontmatter(content, heroImage);
				
				// Write updated content
				await fs.writeFile(filePath, updatedContent, 'utf-8');
				console.log(`   ✏️  Updated frontmatter to use new image system`);
			}
		} else {
			console.log(`   ⚠️  Image not found: ${heroImage}`);
		}
		
	} catch (error) {
		console.error(`❌ Error processing ${filePath}:`, error.message);
	}
}

/**
 * Main migration function
 */
async function migrateContent() {
	console.log('🚀 Starting migration to new Astro image system...\n');
	
	try {
		// Ensure assets directory exists
		await fs.mkdir(ASSETS_DIR, { recursive: true });
		
		// Get all content files
		const files = await fs.readdir(CONTENT_DIR);
		const markdownFiles = files.filter(isMarkdownFile);
		
		console.log(`📁 Found ${markdownFiles.length} markdown files to process`);
		
		// Process each file
		for (const filename of markdownFiles) {
			const filePath = path.join(CONTENT_DIR, filename);
			await processContentFile(filePath);
		}
		
		console.log('\n🎉 Migration completed!');
		console.log('\n📋 Next steps:');
		console.log('1. Review the updated content files');
		console.log('2. Add descriptive heroImageAlt text for each image');
		console.log('3. Test the build to ensure everything works');
		console.log('4. Remove old images from public/images/ if no longer needed');
		
	} catch (error) {
		console.error('❌ Migration failed:', error.message);
		process.exit(1);
	}
}

// Run migration if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
	migrateContent();
}
