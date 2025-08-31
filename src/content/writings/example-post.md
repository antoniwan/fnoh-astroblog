---
title: "Example Blog Post with New Image System"
description: "This is an example post demonstrating the new Astro image handling system and strict content schema."
pubDate: 2024-01-15
updatedDate: 2024-01-16
heroImage: "../../assets/images/breathing-deep.avif"
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
- **Consistent Sizing**: Standardized dimensions across all post images

### Using Astro's Native Image Component

For consistent image handling in blog posts, use Astro's native `<Image>` component:

```astro
---
import { Image } from "astro:assets";
---

<Image
  src={imageSrc}
  alt="Descriptive alt text"
  width={800}
  height={600}
  format="webp"
  quality={85}
/>
```

### Current Markdown Image

This image will be automatically styled with consistent dimensions:

![Young Link pulling the Master Sword out of its pedestal](../../assets/images/symbols/master-sword.avif)

_The Master Sword represents the power and responsibility that comes with knowledge and growth._

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
4. Use Astro's native Image component in your layouts
5. Follow the standardized image dimensions for consistency

This ensures your site follows Astro best practices and provides the best user experience.
