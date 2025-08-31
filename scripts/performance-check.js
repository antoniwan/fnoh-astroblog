#!/usr/bin/env node

/**
 * Performance monitoring script for Astro project
 * Run with: pnpm perf
 *
 * This script provides comprehensive performance analysis including:
 * - Build performance metrics
 * - Bundle size analysis
 * - Image optimization status
 * - Performance recommendations
 */

import { execSync } from "child_process";
import { performance } from "perf_hooks";
import fs from "fs";
import path from "path";

const PROJECT_ROOT = process.cwd();
const DIST_DIR = path.join(PROJECT_ROOT, "dist");
const SRC_DIR = path.join(PROJECT_ROOT, "src");

console.log("🚀 Astro Performance Check\n");

// Check if dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  console.log('❌ No dist directory found. Run "pnpm build" first.');
  process.exit(1);
}

// Measure build time
console.log("📊 Measuring build performance...\n");

const startTime = performance.now();
try {
  execSync("pnpm build", {
    cwd: PROJECT_ROOT,
    stdio: "pipe",
    encoding: "utf8",
  });
} catch (error) {
  console.log("❌ Build failed:", error.message);
  process.exit(1);
}

const buildTime = performance.now() - startTime;

// Analyze build output
const distStats = fs.statSync(DIST_DIR);
const distSize = (distStats.size / 1024 / 1024).toFixed(2); // MB

// Count files and analyze structure
const analyzeDirectory = (dir, threshold = 100) => {
  let count = 0;
  let totalSize = 0;
  const largeFiles = [];

  const scanDir = (currentDir) => {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else {
        count++;
        totalSize += stat.size;

        const sizeKB = stat.size / 1024;
        if (sizeKB > threshold) {
          largeFiles.push({
            path: path.relative(dir, fullPath),
            size: (sizeKB / 1024).toFixed(2) + " MB",
          });
        }
      }
    }
  };

  scanDir(dir);
  return { count, totalSize, largeFiles };
};

const { count: fileCount, totalSize, largeFiles } = analyzeDirectory(DIST_DIR);
const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);

// Check for performance issues
const performanceIssues = [];
if (buildTime > 30000) performanceIssues.push("Build time is slow (>30s)");
if (totalSizeMB > 10) performanceIssues.push("Bundle size is large (>10MB)");
if (largeFiles.length > 5)
  performanceIssues.push("Too many large files detected");

// Performance report
console.log("📈 Performance Report\n");
console.log(`⏱️  Build Time: ${(buildTime / 1000).toFixed(2)}s`);
console.log(`📁 Output Size: ${totalSizeMB} MB (${fileCount} files)`);
console.log(`📦 Dist Directory: ${distSize} MB`);

if (largeFiles.length > 0) {
  console.log("\n⚠️  Large Files (>100KB):");
  largeFiles.forEach((file) => {
    console.log(`   ${file.path}: ${file.size}`);
  });
}

if (performanceIssues.length > 0) {
  console.log("\n🚨 Performance Issues:");
  performanceIssues.forEach((issue) => console.log(`   • ${issue}`));
}

// Recommendations
console.log("\n💡 Recommendations:");
if (buildTime > 30000) {
  console.log("   • Consider using Astro's incremental builds");
  console.log("   • Review and optimize image processing");
}
if (totalSizeMB > 10) {
  console.log("   • Implement code splitting for large components");
  console.log("   • Optimize and compress images");
  console.log("   • Review bundle analyzer output");
}
if (largeFiles.length > 5) {
  console.log("   • Compress large assets");
  console.log("   • Consider lazy loading for non-critical resources");
}

// Check for common optimization opportunities
console.log("\n🔍 Optimization Check:");
const hasServiceWorker = fs.existsSync(path.join(DIST_DIR, "sw.js"));
const hasRobotsTxt = fs.existsSync(path.join(DIST_DIR, "robots.txt"));
const hasSitemap = fs.existsSync(path.join(DIST_DIR, "sitemap-index.xml"));

console.log(`   • Service Worker: ${hasServiceWorker ? "✅" : "❌"}`);
console.log(`   • Robots.txt: ${hasRobotsTxt ? "✅" : "❌"}`);
console.log(`   • Sitemap: ${hasSitemap ? "✅" : "❌"}`);

// Performance score calculation
let score = 100;
if (buildTime > 30000) score -= 20;
if (totalSizeMB > 10) score -= 25;
if (largeFiles.length > 5) score -= 15;
if (!hasServiceWorker) score -= 10;
if (!hasRobotsTxt) score -= 5;
if (!hasSitemap) score -= 5;

console.log(`\n🏆 Performance Score: ${Math.max(0, score)}/100`);

if (score >= 80) {
  console.log("   🎉 Excellent performance!");
} else if (score >= 60) {
  console.log("   👍 Good performance with room for improvement");
} else {
  console.log("   ⚠️  Performance needs attention");
}

console.log("\n✨ Performance check complete!");
console.log('💡 Run "pnpm perf" after making changes to track improvements.');
