# CSS Architecture & Organization

This directory contains a well-structured CSS architecture that follows **Astro best practices** and provides clear guidance for developers on where to place their styles.

## 🏗️ Architecture Overview

Our CSS is organized following Astro's recommended patterns:
- **Global styles** → `GlobalStyles.astro` component (using `<style is:global>`)
- **Component styles** → Component's `.astro` file using `<style>` blocks (scoped)
- **Design tokens** → `_variables.css` for CSS custom properties
- **Utility classes** → `_utilities.css` for helper classes
- **Specialized styles** → `_fonts.css`, `_print.css`, `_view-transitions.css`

## 📁 File Structure

```
src/styles/
├── main.css              # Main entry point (imports foundation CSS)
├── _variables.css        # CSS custom properties & design tokens
├── _utilities.css        # Utility classes & helpers
├── _fonts.css            # Font imports and font-face declarations
├── _print.css            # Print-optimized styles & PDF generation
├── _view-transitions.css # View transition styles
└── README.md             # This documentation

src/components/
└── GlobalStyles.astro    # Global styles for typography, code, etc.
```

## 🔄 Import Order

The `main.css` file imports foundation CSS files in a specific order that **MUST NOT BE CHANGED**:

1. **Fonts** - Font imports must be loaded first
2. **Variables** - CSS custom properties must be defined before other styles
3. **Utilities** - Helper classes
4. **Print** - Print-optimized styles
5. **View Transitions** - Animation styles

## 📋 File Purposes

### `GlobalStyles.astro`
- **Purpose**: Global styles for typography, code blocks, tables, and shared elements
- **Contains**: Base element styles, typography system, code styling, blockquotes, tables
- **Usage**: Automatically included in BaseLayout for all pages
- **Method**: Uses `<style is:global>` for Astro best practices

### `_variables.css`
- **Purpose**: Design system foundation
- **Contains**: Colors, typography, spacing, shadows, transitions, z-index, border radius
- **Usage**: Reference these variables instead of hardcoded values
- **Example**: `color: var(--color-primary);`

### `_utilities.css`
- **Purpose**: Helper classes and utilities
- **Contains**: Layout helpers, spacing utilities, text utilities, responsive helpers
- **Usage**: Apply utility classes to HTML elements for quick styling

### `_fonts.css`
- **Purpose**: Font management
- **Contains**: Font imports, font-face declarations, font loading strategies
- **Usage**: Handles all typography imports and font loading

### `_print.css`
- **Purpose**: Print-optimized styles
- **Contains**: Print-specific styling, PDF generation styles
- **Usage**: Automatically applied when printing

### `_view-transitions.css`
- **Purpose**: Page transition animations
- **Contains**: View transition styles, page animation effects
- **Usage**: Handles smooth page transitions

## 🚀 Best Practices (Astro 2025)

### 1. **Use GlobalStyles Component for Shared Elements**
```astro
<!-- ✅ Good - Global styles in GlobalStyles.astro -->
<style is:global>
  h1, h2, h3 { /* Global heading styles */ }
  code, pre { /* Global code styles */ }
  table { /* Global table styles */ }
</style>

<!-- ✅ Good - Component-specific styles in component -->
<style>
  .my-component { /* Component-specific styles */ }
</style>
```

### 2. **Use CSS Variables**
```css
/* ✅ Good */
color: var(--color-primary);
padding: var(--spacing-4);
border-radius: var(--border-radius-md);

/* ❌ Bad */
color: #667eea;
padding: 1rem;
border-radius: 6px;
```

### 3. **Component & Page Styles with Astro CSS Scoping**
```astro
<!-- ✅ Good - Component-specific styles in component -->
<style>
  .my-component {
    /* Component-specific styles here */
    /* These are automatically scoped to this component */
  }
</style>

<!-- ✅ Good - Page-specific styles in page -->
<style>
  .hero {
    /* Page-specific styles here */
    /* These are automatically scoped to this page */
  }
</style>
```

### 4. **Global Styles for Shared Elements**
```astro
<!-- ✅ Good - Use GlobalStyles.astro for typography, code, tables -->
<!-- These styles apply to all pages automatically -->

<!-- ✅ Good - Use component styles for unique layouts -->
<style>
  .blog-post-container {
    /* Blog-specific layout styles */
  }
</style>
```

## 🎯 Where to Put Your CSS - Quick Decision Tree

```
Is it a design token (color, spacing, font, etc.)?
├─ YES → _variables.css
└─ NO → Continue...

Is it a shared element style (h1, h2, code, table, etc.)?
├─ YES → GlobalStyles.astro
└─ NO → Continue...

Is it a utility class (helper, override)?
├─ YES → _utilities.css
└─ NO → Continue...

Is it specific to one component or page?
├─ YES → Component/Page .astro file (scoped)
└─ NO → Ask the team!
```

## 📍 Common CSS Patterns & Where They Go

### Typography & Shared Elements
```css
/* ✅ GlobalStyles.astro */
h1, h2, h3 { /* Global heading styles */ }
code, pre { /* Global code styles */ }
table { /* Global table styles */ }
blockquote { /* Global blockquote styles */ }
```

### Design Tokens
```css
/* ✅ _variables.css */
:root {
  --color-primary: #667eea;
  --spacing-4: 1rem;
  --font-size-lg: 1.125rem;
}
```

### Utilities
```css
/* ✅ _utilities.css */
.text-center { text-align: center; }
.font-bold { font-weight: var(--font-weight-bold); }
.container { max-width: var(--container-max-width); }
```

### Component & Page Styles
```css
/* ✅ Component/Page .astro file (scoped) */
<style>
  .my-component { /* Component-specific styles */ }
  .hero { /* Page-specific styles */ }
</style>
```

## 🔧 Migration Notes

- **Old files removed**: `_reset.css`, `_typography.css`, `_content.css`
- **New approach**: Global styles in `GlobalStyles.astro` component
- **Benefits**: Cleaner architecture, better maintainability, follows Astro best practices
- **Code blocks**: Only `pre` tags have backgrounds, inline `code` has no background
