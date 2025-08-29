# Field Notes on Humanity - Astro Blog

A thoughtful blog exploring what it means to be human, built with Astro for optimal performance.

## 🚀 Performance Optimizations

This project has been optimized for fast development and production builds:

### Development Performance
- **Pagination**: Only 12 posts load initially (vs 59+ before)
- **Lazy Loading**: Images use `loading="lazy"` and `decoding="async"`
- **Optimized JavaScript**: Reduced DOM queries and event listeners
- **CSS Simplification**: Removed complex calculations and unnecessary variables
- **Vite Optimizations**: Dependency pre-bundling and chunk splitting

### Build Optimizations
- **Tree Shaking**: Dead code elimination enabled
- **Image Optimization**: Sharp integration with WebP/AVIF support
- **CSS Inlining**: Critical styles inlined automatically
- **Asset Optimization**: Vendor chunking for better caching

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── content/       # Blog posts (Markdown/MDX)
├── layouts/       # Page layouts
├── pages/         # Route pages
└── styles/        # Global styles and variables
```

## 🎯 Performance Tips

1. **Keep posts under 12 per page** for optimal loading
2. **Use lazy loading** for images below the fold
3. **Optimize hero images** to 400x200px max
4. **Avoid heavy JavaScript** in components
5. **Use CSS variables sparingly** to reduce calculations

## 🔧 Configuration

- **Astro 5.13.4** with latest optimizations
- **Sharp** for image processing
- **MDX** support for rich content
- **RSS & Sitemap** generation
- **Responsive design** with mobile-first approach

## 📱 Browser Support

- Modern browsers with ES2020+ support
- Progressive enhancement for older browsers
- Optimized for mobile and desktop performance
