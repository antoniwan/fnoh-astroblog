# Fnoh Astroblog

A modern, performant blog built with [Astro](https://astro.build) featuring static site generation, content collections, and optimized performance.

## 🚀 Features

- **Static Site Generation** - Pre-built HTML for optimal performance
- **Content Collections** - Type-safe content management with Markdown
- **Responsive Design** - Mobile-first approach with modern CSS
- **Performance Optimized** - Lighthouse scores optimized with lazy loading and image optimization
- **SEO Ready** - Structured data, sitemaps, and RSS feeds
- **Dark/Light Theme** - User preference-based theme switching
- **Service Worker** - Offline support and caching strategies

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) 4.x
- **Styling**: CSS with custom properties and utility classes
- **Content**: Markdown with frontmatter
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **TypeScript**: Full type safety
- **Deployment**: Static hosting ready

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   └── ...             # Layout and feature components
├── content/             # Content collections
│   └── writings/        # Blog posts (Markdown)
├── layouts/             # Page layouts and templates
├── pages/               # Route definitions
├── styles/              # Global styles and CSS modules
├── utils/               # Utility functions
└── consts.ts           # Constants and configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fnoh-astroblog

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📝 Content Management

### Adding Blog Posts

1. Create a new `.md` file in `src/content/writings/`
2. Use the following frontmatter structure:

```yaml
---
title: "Your Post Title"
description: "Brief description of the post"
pubDate: 2024-01-01
updatedDate: 2024-01-01
heroImage: "/path/to/image.jpg"
tags: ["tag1", "tag2"]
---

Your content here...
```

### Content Collections

The project uses Astro's content collections for type-safe content management. Configuration is in `src/content.config.ts`.

## 🎨 Styling

- **CSS Variables**: Theme colors and spacing defined in `src/styles/_variables.css`
- **Utility Classes**: Helper classes in `src/styles/_utilities.css`
- **Typography**: Font settings and text styles in `src/styles/_typography.css`
- **Responsive**: Mobile-first responsive design patterns

## ⚡ Performance Features

- **Image Optimization**: Automatic image optimization with `astro:assets`
- **Lazy Loading**: Images and components load on demand
- **CSS Optimization**: Critical CSS inlining and unused CSS removal
- **Service Worker**: Offline support and intelligent caching
- **Preload Hints**: Critical resource preloading

## 🔧 Configuration

### Astro Config (`astro.config.mjs`)

- Static site generation enabled
- Image optimization configured
- Service worker generation
- RSS feed generation

### TypeScript (`tsconfig.json`)

- Strict type checking enabled
- Path aliases configured
- Astro-specific types included

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint system: `sm`, `md`, `lg`, `xl`
- Flexible grid layouts
- Touch-friendly interactions

## 🌐 SEO & Accessibility

- Semantic HTML structure
- Meta tags and Open Graph support
- Structured data (JSON-LD)
- Sitemap generation
- RSS feed
- Alt text for images
- Keyboard navigation support

## 🚀 Deployment

### Build Output

```bash
pnpm build
```

Generated files are in the `dist/` directory, ready for static hosting.

### Hosting Options

- **Vercel**: Zero-config deployment
- **Netlify**: Drag-and-drop deployment
- **GitHub Pages**: Free hosting for open source
- **Any static host**: Upload `dist/` contents

## 📊 Performance Monitoring

The project includes a performance check script:

```bash
node scripts/performance-check.js
```

This analyzes build output and provides performance insights.

## 🔍 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm astro` - Run Astro CLI commands

### Code Quality

- TypeScript for type safety
- Consistent code formatting
- Component-based architecture
- Reusable utility functions

## 📚 Resources

- [Astro Documentation](https://docs.astro.build)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Performance Best Practices](https://docs.astro.build/en/guides/performance/)
- [Deployment Guide](https://docs.astro.build/en/guides/deploy/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is dual-licensed:

- **Content License**: [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/) (CC BY-NC-SA 4.0)
  - You may share and adapt the content for non-commercial purposes
  - Attribution is required
  - Derivative works must be shared under the same license

- **Code License**: [MIT License](https://opensource.org/licenses/MIT)
  - Free to use, modify, and distribute
  - Minimal restrictions on code usage
  - Compatible with most open source licenses

The content (blog posts, articles) is licensed under CC BY-NC-SA 4.0, while the codebase is licensed under MIT for maximum developer freedom.

---

Built with ❤️ using [Astro](https://astro.build)
