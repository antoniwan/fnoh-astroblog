# Image Migration Guide

This document outlines the migration from the old image system to Astro's new image handling best practices.

## Overview

We've implemented Astro's official image handling system using `astro:assets` with the following components:

- `OptimizedImage.astro` - For single optimized images
- `ResponsiveImage.astro` - For responsive images with multiple formats
- `HeroImage.astro` - For hero/banner images

## New Image Schema

The content collection schema now uses the `image()` helper for proper type safety:

```typescript
// src/content.config.ts
const writings = defineCollection({
  schema: ({ image }) =>
    z.object({
      // ... other fields
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      // ... other fields
    }),
});
```

## Image Storage

### Local Images (Recommended)
Store images in `src/assets/images/` for automatic optimization:

```markdown
---
title: "My Post"
heroImage: "./my-image.jpg"
heroImageAlt: "Description of the image"
---
```

### Public Images
For images that don't need optimization, store in `public/images/` and use regular `<img>` tags.

## Component Usage

### OptimizedImage Component
```astro
---
import OptimizedImage from '../components/ui/OptimizedImage.astro';
import myImage from '../assets/images/my-image.jpg';
---

<OptimizedImage 
  src={myImage} 
  alt="Description"
  width={800}
  height={400}
/>
```

### ResponsiveImage Component
```astro
---
import ResponsiveImage from '../components/ui/ResponsiveImage.astro';
import myImage from '../assets/images/my-image.jpg';
---

<ResponsiveImage 
  src={myImage} 
  alt="Description"
  widths={[400, 800, 1200]}
  formats={['webp', 'avif', 'jpeg']}
/>
```

## Migration Steps

### 1. Move Images to Assets
Move images from `public/` to `src/assets/images/`:

```bash
# Example
mv public/images/hero.jpg src/assets/images/hero.jpg
```

### 2. Update Content Files
Update frontmatter to use relative paths:

```markdown
# Before
heroImage: "/images/hero.jpg"

# After  
heroImage: "./hero.jpg"
```

### 3. Update Components
Replace `<img>` tags with the new components where appropriate.

### 4. Add Alt Text
Ensure all images have descriptive `heroImageAlt` text.

## Benefits

- **Automatic Optimization**: WebP, AVIF, and JPEG formats
- **Responsive Images**: Multiple sizes for different devices
- **Type Safety**: Compile-time validation of image paths
- **Performance**: Lazy loading and proper sizing
- **Accessibility**: Enforced alt text requirements

## Configuration

The Astro config includes image optimization settings:

```javascript
// astro.config.mjs
export default defineConfig({
  image: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
});
```

## Troubleshooting

### Type Errors
If you see type errors about `ImageMetadata`, ensure:
1. Images are imported from `src/assets/`
2. The `image()` helper is used in the schema
3. Content files use relative paths

### Build Errors
- Check that all image paths are correct
- Ensure images exist in the specified locations
- Verify alt text is provided for all images

## Best Practices

1. **Use Local Images**: Store images in `src/assets/` for optimization
2. **Provide Alt Text**: Always include descriptive alt text
3. **Choose Right Component**: Use `OptimizedImage` for simple cases, `ResponsiveImage` for complex layouts
4. **Optimize File Sizes**: Compress images before adding to assets
5. **Use WebP/AVIF**: Modern formats for better performance

## Examples

### Blog Post with Hero Image
```markdown
---
title: "My Blog Post"
description: "A description of my post"
pubDate: 2024-01-01
heroImage: "./hero-image.jpg"
heroImageAlt: "A beautiful sunset over mountains"
---
```

### Component with Multiple Images
```astro
---
import OptimizedImage from '../components/ui/OptimizedImage.astro';
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
---

<div class="gallery">
  <OptimizedImage src={image1} alt="First image" width={400} height={300} />
  <OptimizedImage src={image2} alt="Second image" width={400} height={300} />
</div>
```
