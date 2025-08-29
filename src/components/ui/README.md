# UI Components

This directory contains reusable UI components that have been extracted from the main pages and layouts to improve maintainability and reduce code duplication.

## Components

### PostCard.astro
A reusable post card component that displays blog post information including image, title, description, and metadata.

**Props:**
- `title: string` - Post title
- `description: string` - Post description/excerpt
- `href: string` - Link to the post
- `heroImage?: ImageMetadata` - Hero image for the post
- `pubDate: Date` - Publication date
- `updatedDate?: Date` - Last updated date (optional)
- `showImage?: boolean` - Whether to show the image (default: true)
- `class?: string` - Additional CSS classes

**Usage:**
```astro
<PostCard
  title="Post Title"
  description="Post description"
  href="/writings/post-slug"
  heroImage={post.data.heroImage}
  pubDate={post.data.pubDate}
  updatedDate={post.data.updatedDate}
/>
```

### PostMeta.astro
A component for displaying post metadata including dates, author, and reading time.

**Props:**
- `pubDate: Date` - Publication date (required)
- `updatedDate?: Date` - Last updated date (optional)
- `author?: string` - Author name (optional)
- `readingTime?: string` - Estimated reading time (optional)
- `class?: string` - Additional CSS classes
- `showAuthor?: boolean` - Whether to show author (default: false)
- `showReadingTime?: boolean` - Whether to show reading time (default: false)
- `showUpdatedDate?: boolean` - Whether to show updated date (default: true)

**Usage:**
```astro
<PostMeta
  pubDate={post.data.pubDate}
  updatedDate={post.data.updatedDate}
  author={post.data.author}
  readingTime={post.data.readingTime}
  showAuthor={true}
  showReadingTime={true}
/>
```

### PageHeader.astro
A standardized page header component with title, description, and optional subtitle.

**Props:**
- `title: string` - Page title
- `description?: string` - Page description (optional)
- `subtitle?: string` - Additional subtitle (optional)
- `class?: string` - Additional CSS classes
- `centered?: boolean` - Whether to center the header (default: true)

**Usage:**
```astro
<PageHeader
  title="Page Title"
  description="Page description"
  subtitle="Additional info"
  centered={true}
/>
```

### HeroImage.astro
A component for displaying hero images with consistent styling and optimization.

**Props:**
- `src: ImageMetadata` - Image source
- `alt: string` - Image alt text
- `title?: string` - Image title (optional)
- `width?: number` - Image width (default: 800)
- `height?: number` - Image height (default: 400)
- `class?: string` - Additional CSS classes
- `centered?: boolean` - Whether to center the image (default: true)
- `rounded?: boolean` - Whether to apply rounded corners (default: true)

**Usage:**
```astro
<HeroImage
  src={post.data.heroImage}
  alt="Post hero image"
  width={1020}
  height={510}
  rounded={true}
/>
```

### ScrollToTop.astro
A scroll-to-top button component with configurable positioning and threshold.

**Props:**
- `class?: string` - Additional CSS classes
- `threshold?: number` - Scroll threshold to show button (default: 300)
- `position?: 'bottom-right' | 'bottom-left' | 'bottom-center'` - Button position (default: 'bottom-right')

**Usage:**
```astro
<ScrollToTop 
  threshold={500}
  position="bottom-center"
/>
```

## Benefits of Component Extraction

1. **Reduced Duplication**: Eliminated duplicate post card markup and styling across index and writings pages
2. **Improved Consistency**: Centralized styling ensures consistent appearance across all uses
3. **Better Maintainability**: Changes to component styling only need to be made in one place
4. **Reusability**: Components can be easily reused across different pages and layouts
5. **Cleaner Code**: Main pages are now more focused on content and less cluttered with styling

## Migration Notes

The following files were updated to use the new components:
- `src/pages/index.astro` - Now uses PostCard component
- `src/pages/writings/index.astro` - Now uses PostCard and PageHeader components
- `src/pages/about.astro` - Now uses PageHeader component
- `src/layouts/ArticleLayout.astro` - Now uses PostMeta and HeroImage components
- `src/layouts/BlogPost.astro` - Now uses PostMeta and HeroImage components
- `src/components/Footer.astro` - Now uses ScrollToTop component

All duplicate CSS has been removed from the original files and is now centralized in the respective components.
