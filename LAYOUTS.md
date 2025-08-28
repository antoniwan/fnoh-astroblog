# Layout System Documentation

This document explains the flexible and maintainable layout system we've built for the Astro blog.

## Overview

The new layout system is built on the principle of **composition over inheritance** and provides:

- **DRY (Don't Repeat Yourself)**: No more duplicated HTML boilerplate
- **Flexibility**: Multiple layout types for different content needs
- **Maintainability**: Changes to common elements only need to be made in one place
- **Consistency**: All pages automatically get the same header, footer, and meta tags
- **Responsive**: Built-in responsive design patterns

## Layout Hierarchy

```
BaseLayout (Foundation)
├── PageLayout (General pages with optional sidebar)
├── ArticleLayout (Long-form content with enhanced typography)
└── BlogPost (Blog-specific layout with hero images)
```

## BaseLayout

The foundation layout that provides the common HTML structure for all pages.

### Props

- `title`: Page title (required)
- `description`: Page description (required)
- `image`: Hero image for meta tags (optional)
- `layout`: Layout type - 'default', 'blog', or 'minimal' (default: 'default')
- `showHeader`: Whether to show the header (default: true)
- `showFooter`: Whether to show the footer (default: true)
- `class`: Additional CSS classes (optional)

### Layout Types

- **default**: 1200px max-width, standard padding
- **blog**: 800px max-width, optimized for reading
- **minimal**: 600px max-width, focused content

### Usage

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout 
	title="My Page" 
	description="Page description"
	layout="blog"
>
	<h1>My Content</h1>
	<p>This content will be wrapped in the common layout.</p>
</BaseLayout>
```

## PageLayout

A layout for general content pages with optional sidebar support.

### Props

- Inherits all BaseLayout props
- `sidebar`: Whether to enable sidebar layout (default: false)

### Usage

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
---

<PageLayout 
	title="Page with Sidebar" 
	description="Description"
	sidebar={true}
>
	<main>
		<h1>Main Content</h1>
		<p>Your main content here...</p>
	</main>
	
	<aside slot="sidebar">
		<h3>Sidebar Content</h3>
		<ul>
			<li>Navigation</li>
			<li>Related links</li>
		</ul>
	</aside>
</PageLayout>
```

## ArticleLayout

Optimized for long-form content with enhanced typography and reading experience.

### Props

- Inherits all BaseLayout props
- `author`: Article author (optional)
- `pubDate`: Publication date (optional)
- `updatedDate`: Last updated date (optional)
- `readingTime`: Estimated reading time (optional)

### Usage

```astro
---
import ArticleLayout from '../layouts/ArticleLayout.astro';
---

<ArticleLayout 
	title="Long Article Title"
	description="Article description"
	author="John Doe"
	pubDate={new Date('2024-01-01')}
	readingTime="5 min read"
>
	<h2>Introduction</h2>
	<p>Your article content with enhanced typography...</p>
	
	<h2>Main Section</h2>
	<p>More content...</p>
</ArticleLayout>
```

## BlogPost Layout

Specialized layout for blog posts with hero images and blog-specific styling.

### Props

- `title`: Post title (from blog collection)
- `description`: Post description (from blog collection)
- `pubDate`: Publication date (from blog collection)
- `updatedDate`: Last updated date (from blog collection)
- `heroImage`: Hero image (from blog collection)

### Usage

```astro
---
import BlogPost from '../../layouts/BlogPost.astro';
---

<BlogPost {...post.data}>
	<Content />
</BlogPost>
```

## Migration Guide

### From Old Layouts

**Before (duplicated HTML):**
```astro
<!doctype html>
<html lang="en">
	<head>
		<BaseHead title={title} description={description} />
	</head>
	<body>
		<Header />
		<main>
			<!-- Content -->
		</main>
		<Footer />
	</body>
</html>
```

**After (using BaseLayout):**
```astro
<BaseLayout title={title} description={description}>
	<!-- Content -->
</BaseLayout>
```

### Benefits of Migration

1. **Eliminates duplication**: HTML structure defined once
2. **Easier maintenance**: Update header/footer in one place
3. **Consistent styling**: All pages automatically get the same layout structure
4. **Better SEO**: Consistent meta tags and structure
5. **Responsive design**: Built-in responsive patterns

## Best Practices

### 1. Choose the Right Layout

- **BaseLayout**: For simple pages that just need the common structure
- **PageLayout**: For content pages that might benefit from a sidebar
- **ArticleLayout**: For long-form content, essays, or detailed articles
- **BlogPost**: For blog posts specifically

### 2. Use Semantic HTML

The layouts provide the structure, but you should still use semantic HTML:

```astro
<BaseLayout title="About" description="About us">
	<article>
		<header>
			<h1>About Our Company</h1>
		</header>
		<section>
			<h2>Our Mission</h2>
			<p>Content...</p>
		</section>
	</article>
</BaseLayout>
```

### 3. Leverage CSS Custom Properties

The layouts provide CSS custom properties for consistent theming:

```css
:root {
	--layout-max-width: 1200px;
	--layout-padding: 1rem;
	--primary-color: #667eea;
}
```

### 4. Responsive Considerations

All layouts are mobile-first and responsive. Test your content at different screen sizes:

- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## Customization

### Adding New Layout Types

To add a new layout type to BaseLayout:

1. Add the new type to the Props interface
2. Add corresponding CSS classes
3. Update the layout logic

```astro
interface Props {
	// ... existing props
	layout?: 'default' | 'blog' | 'minimal' | 'custom';
}

// In the template
<main class={`layout-${layout}`}>
	<slot />
</main>

// In CSS
.layout-custom {
	max-width: 1400px;
	margin: 0 auto;
	padding: 0 2rem;
}
```

### Custom CSS Variables

You can override layout CSS variables in your global styles:

```css
/* In global.css */
:root {
	--layout-max-width: 1400px;
	--layout-padding: 2rem;
}
```

## Troubleshooting

### Common Issues

1. **Layout not applying**: Ensure you're importing the correct layout component
2. **Styling conflicts**: Check that your page CSS doesn't conflict with layout CSS
3. **Responsive issues**: Test with the browser dev tools at different screen sizes

### Debug Mode

Add `class="debug"` to see layout boundaries:

```astro
<BaseLayout title="Debug" description="Debug page" class="debug">
	<!-- Content -->
</BaseLayout>
```

## Future Enhancements

Potential improvements for the layout system:

1. **Theme support**: Dark/light mode variants
2. **Animation options**: Entrance animations and transitions
3. **Layout presets**: Pre-built layouts for common page types
4. **Accessibility enhancements**: ARIA labels and keyboard navigation
5. **Performance optimizations**: Lazy loading and code splitting

---

This layout system provides a solid foundation for building maintainable, consistent, and beautiful pages while keeping the code DRY and flexible.
