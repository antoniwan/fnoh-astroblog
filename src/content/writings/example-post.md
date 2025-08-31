---
title: "Example Blog Post with New Image System"
description: "This is an example post demonstrating the new Astro image handling system and strict content schema."
pubDate: 2024-01-15
updatedDate: 2024-01-16
heroImageAlt: "A beautiful example image showing the new system"
category: "curiosity-lab"
author: "Your Name"
tags: ["astro", "images", "best-practices", "example"]
draft: false
readingTime: 5
wordCount: 1200
---

# Example Blog Post

This is an example blog post that demonstrates the new Astro image handling system and strict content schema.

## Image Handling

The new system provides:

- **Automatic Optimization**: Images are automatically converted to WebP, AVIF, and JPEG formats
- **Responsive Images**: Multiple sizes for different devices
- **Type Safety**: Compile-time validation of image paths
- **Performance**: Lazy loading and proper sizing
- **Accessibility**: Enforced alt text requirements

## Content Schema

The content schema now enforces:

- Required title and description
- Proper date handling with `z.coerce.date()`
- Image validation using the `image()` helper
- Strict category enumeration
- Optional metadata fields
- Draft status for unpublished content

## Usage

To use this new system:

1. Store images in `src/assets/images/`
2. Reference them with relative paths in frontmatter
3. Always provide descriptive alt text
4. Use the new image components in your layouts

This ensures your site follows Astro best practices and provides the best user experience.
