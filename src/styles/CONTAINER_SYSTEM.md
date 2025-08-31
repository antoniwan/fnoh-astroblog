# Container System Documentation

## Overview

The new container system is designed to prevent horizontal scroll issues while maintaining a clean, maintainable structure. It provides consistent spacing, responsive behavior, and overflow prevention across all components.

## Container Classes

### Basic Containers

- **`.container-sm`** - Small container (max-width: var(--max-width-sm))
- **`.container-md`** - Medium container (max-width: var(--max-width))
- **`.container-lg`** - Large container (max-width: var(--max-width-wide))
- **`.container-xl`** - Extra large container (max-width: var(--max-width-xl))

### Full-Width Containers

- **`.container-full`** - Full width with padding (content contained within viewport)
- **`.container-full-edge`** - True full width extending to viewport edges with padding
- **`.container-full-no-padding`** - Full width extending to viewport edges without padding

### Content Wrappers

- **`.content-wrapper`** - Basic content wrapper
- **`.content-wrapper--narrow`** - Narrow content wrapper
- **`.content-wrapper--wide`** - Wide content wrapper

### Grid Containers

- **`.grid-container`** - Basic grid container with overflow prevention
- **`.grid-container--responsive`** - Responsive grid with auto-fit columns

## Key Features

### 1. Overflow Prevention
All containers include:
```css
overflow-x: hidden;
max-width: 100vw;
box-sizing: border-box;
```

### 2. Responsive Padding
Containers automatically adjust padding based on screen size:
- Desktop: `var(--spacing-xl)` (2rem)
- Tablet: `var(--spacing-lg)` (1.5rem)
- Mobile: `var(--spacing-md)` (1rem)
- Small Mobile: `var(--spacing-sm)` (0.5rem)

### 3. Consistent Spacing
All containers use consistent spacing variables from the design system.

## Usage Examples

### Basic Page Layout
```astro
<BaseLayout title="Page Title">
  <div class="container-lg">
    <h1>Page Content</h1>
    <p>Your content here...</p>
  </div>
</BaseLayout>
```

### Grid Layout
```astro
<div class="grid-container grid-container--responsive">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
</div>
```

### Content Wrapper
```astro
<div class="content-wrapper content-wrapper--narrow">
  <p>Narrow content that won't overflow...</p>
</div>
```

## Migration Guide

### From Old Container System
1. Replace old container classes with new ones
2. Remove manual `overflow-x: hidden` declarations
3. Remove manual `box-sizing: border-box` declarations
4. Update padding to use container classes instead of manual padding

### Before (Old System)
```astro
<div class="old-container" style="overflow-x: hidden; box-sizing: border-box;">
  <p>Content with manual overflow prevention...</p>
</div>
```

### After (New System)
```astro
<div class="container-md">
  <p>Content with automatic overflow prevention...</p>
</div>
```

## Best Practices

### 1. Choose Appropriate Container Size
- Use `.container-sm` for narrow content (forms, sidebars)
- Use `.container-md` for standard content (blog posts, articles)
- Use `.container-lg` for wide content (dashboards, galleries)
- Use `.container-full` for full-width layouts (hero sections)

### 2. Nest Containers Properly
```astro
<!-- Good: Proper nesting -->
<div class="container-lg">
  <div class="content-wrapper">
    <p>Content here...</p>
  </div>
</div>

<!-- Avoid: Unnecessary nesting -->
<div class="container-lg">
  <div class="container-md">
    <p>Content here...</p>
  </div>
</div>
```

### 3. Use Grid Containers for Layouts
```astro
<!-- Good: Use grid container for layouts -->
<div class="grid-container grid-container--responsive">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
</div>

<!-- Avoid: Manual grid setup -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
</div>
```

## Troubleshooting

### Horizontal Scroll Still Occurs
1. Check if you're using the correct container class
2. Ensure no child elements have `width: 100vw` or similar
3. Verify that long words or content are properly wrapped
4. Check for elements with `position: absolute` that might extend beyond containers

### Container Too Narrow/Wide
1. Choose the appropriate container size for your content
2. Use `.content-wrapper--narrow` or `.content-wrapper--wide` for fine-tuning
3. Consider using custom CSS for unique layout requirements

### Grid Items Overflowing
1. Ensure grid items have `min-width: 0`
2. Use `.grid-container` class for automatic overflow prevention
3. Check that grid items don't have fixed widths that exceed container bounds

## Testing

Use the `/container-test` page to verify that all container variants work correctly and don't cause horizontal scroll issues.

## Browser Support

The container system works in all modern browsers and includes fallbacks for older browsers. The `overflow-x: hidden` property is supported in all browsers that support CSS overflow properties.
