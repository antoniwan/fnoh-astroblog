#!/usr/bin/env node

/**
 * Performance monitoring script for Astro project
 * Run with: node scripts/performance-check.js
 */

import { execSync } from 'child_process';
import { performance } from 'perf_hooks';
import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = process.cwd();
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');

console.log('🚀 Astro Performance Check\n');

// Check if dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  console.log('❌ No dist directory found. Run "npm run build" first.');
  process.exit(1);
}

// Measure build time
console.log('📊 Measuring build performance...\n');

const startTime = performance.now();
try {
  execSync('npm run build', { 
    cwd: PROJECT_ROOT, 
    stdio: 'pipe',
    encoding: 'utf8'
  });
} catch (error) {
  console.log('❌ Build failed:', error.message);
  process.exit(1);
}

const buildTime = performance.now() - startTime;

// Analyze build output
const distStats = fs.statSync(DIST_DIR);
const distSize = (distStats.size / 1024 / 1024).toFixed(2); // MB

// Count files
const countFiles = (dir) => {
  let count = 0;
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      count += countFiles(fullPath);
    } else {
      count++;
    }
  }
  
  return count;
};

const fileCount = countFiles(DIST_DIR);

// Check for large files
const findLargeFiles = (dir, threshold = 100) => {
  const largeFiles = [];
  
  const scanDir = (currentDir) => {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else {
        const sizeKB = stat.size / 1024;
        if (sizeKB > threshold) {
          largeFiles.push({
            path: path.relative(DIST_DIR, fullPath),
            size: (sizeKB / 1024).toFixed(2) + ' MB'
          });
        }
      }
    }
  };
  
  scanDir(dir);
  return largeFiles;
};

const largeFiles = findLargeFiles(DIST_DIR);

// Performance report
console.log('📈 Performance Report\n');
console.log(`⏱️  Build Time: ${buildTime.toFixed(2)}ms`);
console.log(`📁 Output Size: ${distSize} MB`);
console.log(`🔢 File Count: ${fileCount} files`);
console.log(`📊 Build Speed: ${(fileCount / (buildTime / 1000)).toFixed(2)} files/second\n`);

if (largeFiles.length > 0) {
  console.log('⚠️  Large Files (>100KB):');
  largeFiles.forEach(file => {
    console.log(`   ${file.path}: ${file.size}`);
  });
  console.log('');
}

// Performance recommendations
console.log('💡 Performance Recommendations:');
console.log('   1. Keep build time under 5000ms for optimal development');
console.log('   2. Output size should be under 10MB for most projects');
console.log('   3. Consider code splitting for large JavaScript bundles');
console.log('   4. Optimize images with Sharp integration');
console.log('   5. Use lazy loading for below-fold content\n');

// Performance score
let score = 100;

if (buildTime > 10000) score -= 20;
if (buildTime > 5000) score -= 10;
if (parseFloat(distSize) > 10) score -= 15;
if (parseFloat(distSize) > 5) score -= 5;
if (largeFiles.length > 5) score -= 10;
if (largeFiles.length > 2) score -= 5;

console.log(`🏆 Performance Score: ${score}/100`);

if (score >= 90) {
  console.log('🎉 Excellent performance!');
} else if (score >= 75) {
  console.log('👍 Good performance with room for improvement');
} else if (score >= 60) {
  console.log('⚠️  Performance needs attention');
} else {
  console.log('🚨 Performance issues detected');
}

console.log('');
