# Link Styling Guide

## Overview

This guide explains the hierarchical link styling system implemented to eliminate conflicts and provide consistent, maintainable link styles across the site.

## Philosophy

Following atomic design principles, we've created a **foundation → utility → component** hierarchy:

1. **Foundation** (`GlobalStyles.astro`): Minimal, non-conflicting base styles
2. **Utilities** (`_utilities.css`): Reusable link patterns
3. **Components**: Component-specific styling using utility classes

## Link Foundation (GlobalStyles.astro)

The global styles provide only the most basic, non-conflicting foundation:

```css
a {
  color: var(--color-link);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:visited {
  color: var(--color-link-visited);
}
```

**No border-bottom, no hover effects, no focus styles** - these are handled by utilities and components.

## Link Utility Classes

### `.link-underline`

- **Use case**: Content links, blog post links, external links
- **Behavior**: Shows underline on hover
- **Example**: `<a href="/about" class="link-underline">About</a>`

### `.link-clean`

- **Use case**: Header titles, navigation items that shouldn't have underlines
- **Behavior**: Color change on hover, no underline
- **Example**: `<a href="/" class="link-clean">Site Title</a>`

### `.link-nav`

- **Use case**: Navigation links, menu items
- **Behavior**: Background color change on hover, active state support
- **Example**: `<a href="/writings" class="link-nav">Writings</a>`

### `.link-button`

- **Use case**: Call-to-action links, primary actions
- **Behavior**: Button appearance with hover effects
- **Example**: `<a href="/contact" class="link-button">Contact Us</a>`

### `.link-card`

- **Use case**: Post cards, article previews, card-based layouts
- **Behavior**: Inherits parent color, no visual link styling
- **Example**: `<a href="/post" class="link-card">Post Title</a>`

## Component Implementation

### Header Component

```astro
<!-- Site title -->
<h1><a href="/" class="link-clean">{SITE_TITLE}</a></h1>

<!-- Navigation links use HeaderLink component with link-nav utility -->
<HeaderLink href="/about">About</HeaderLink>
```

### PostCard Component

```astro
<!-- Post links use link-card utility -->
<a href={`/writings/${post.id}`} class="link-card">
  <!-- Post content -->
</a>
```

### Footer Component

```astro
<!-- Footer links use custom styling without utilities -->
<a href="/privacy" class="footer-link">Privacy</a>
```

## Benefits of This System

1. **No More Conflicts**: Global styles don't interfere with component needs
2. **Consistent Patterns**: Utility classes provide predictable behavior
3. **Easy Maintenance**: Change link behavior in one place
4. **Component Autonomy**: Components can style links as needed
5. **Accessibility**: Focus styles are handled consistently

## Migration Guide

### Before (Conflicting)

```css
/* Global styles with border-bottom */
a {
  border-bottom: 1px solid transparent;
}

/* Components needing to override */
.component a {
  border-bottom: none; /* Override needed! */
}
```

### After (Clean)

```css
/* Global styles - minimal foundation */
a {
  color: var(--color-link);
  text-decoration: none;
}

/* Components use utilities */
.component a {
  @apply link-card; /* or other utility */
}
```

## Best Practices

1. **Always use utility classes** for common link patterns
2. **Don't override global styles** - use utilities instead
3. **Keep component-specific styling minimal** - leverage utilities
4. **Test focus states** - utilities handle this automatically
5. **Use semantic class names** that describe the link's purpose

## Adding New Link Types

To add a new link pattern:

1. **Add utility class** in `_utilities.css`
2. **Document the use case** in this guide
3. **Use in components** as needed

Example:

```css
.link-social {
  color: var(--color-text-light);
  transition: all var(--transition-fast);
}

.link-social:hover {
  color: var(--color-primary);
  transform: scale(1.1);
}
```

## Troubleshooting

### Link not styled correctly?

- Check if you're using the right utility class
- Verify the component isn't overriding utility styles
- Ensure global styles aren't conflicting

### Focus styles missing?

- Utility classes handle focus automatically
- Check if custom CSS is overriding focus styles
- Verify focus styles are defined in utilities

### Hover effects not working?

- Ensure the utility class includes hover states
- Check for CSS specificity conflicts
- Verify transitions are defined in CSS variables
