# Field Notes on Humanity - Astro Blog

A thoughtful blog exploring what it means to be human, built with Astro for optimal performance.

## 🚀 Performance Optimizations

This project has been optimized for fast development and production builds:

### Development Performance
- **Content Management**: 12 blog posts with efficient pagination
- **Lazy Loading**: Images use `loading="lazy"` and `decoding="async"`
- **Optimized JavaScript**: Reduced DOM queries and event listeners
- **CSS Simplification**: Streamlined styling with CSS variables
- **Vite Optimizations**: Dependency pre-bundling and chunk splitting

### Build Optimizations
- **Tree Shaking**: Dead code elimination enabled
- **Image Optimization**: Sharp integration with WebP/AVIF/JPEG support
- **CSS Inlining**: Critical styles inlined automatically
- **Asset Optimization**: Vendor chunking for better caching
- **Responsive Images**: Multiple densities (1x, 2x) for different devices

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Check performance metrics
pnpm perf
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components (BaseHead, Header, Footer, etc.)
├── content/       # Blog posts (Markdown/MDX) - 12 posts
├── layouts/       # Page layouts (BaseLayout, ArticleLayout, BlogPost)
├── pages/         # Route pages (index, about, writings, categories)
├── styles/        # Global styles, typography, and utilities
└── ui/            # UI components (Container, PostCard, HeroImage, etc.)
```

## 🎯 Performance Tips

1. **Keep posts under 12 per page** for optimal loading
2. **Use lazy loading** for images below the fold
3. **Optimize hero images** with responsive formats
4. **Avoid heavy JavaScript** in components
5. **Leverage CSS variables** for consistent theming

## 🔧 Configuration

- **Astro 5.13.4** with latest optimizations
- **Sharp** for image processing (WebP, AVIF, JPEG)
- **MDX** support for rich content
- **RSS & Sitemap** generation
- **Responsive design** with mobile-first approach
- **TypeScript** support with strict configuration
- **Performance monitoring** script included

## 📱 Browser Support

- Modern browsers with ES2020+ support
- Progressive enhancement for older browsers
- Optimized for mobile and desktop performance
- Responsive images with multiple formats

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Start development server with `pnpm dev`
4. Build for production with `pnpm build`

## 📊 Current Status

- **Blog Posts**: 12 published articles
- **Categories**: Multiple writing categories
- **Performance**: Optimized for fast loading
- **SEO**: RSS feeds and sitemaps generated
- **Accessibility**: Semantic HTML and ARIA support
