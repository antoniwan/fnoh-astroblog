# CSS Architecture & Organization

This directory contains a well-structured CSS architecture that follows **2025 best practices** and provides clear guidance for developers on where to place their styles.

## 🏗️ Architecture Overview

Our CSS is organized into logical, focused files that make it easy to:
- **Find** styles quickly
- **Maintain** consistency across the site
- **Scale** as the project grows
- **Collaborate** with other developers
- **Debug** styling issues efficiently
- **Ensure** accessibility and performance

## 📁 File Structure

```
src/styles/
├── main.css              # Main entry point (imports foundation CSS)
├── _variables.css        # CSS custom properties & design tokens
├── _reset.css           # Modern CSS reset & browser normalization (2025)
├── _typography.css      # Typography system & text styles
├── _utilities.css       # Utility classes & helpers
├── _print.css           # Print-optimized styles & PDF generation
└── README.md            # This documentation
```

## 🔄 Import Order

The `main.css` file imports foundation CSS files in a specific order that **MUST NOT BE CHANGED**:

1. **Variables** - CSS custom properties must be defined first
2. **Reset** - Browser normalization before other styles
3. **Typography** - Base text styles
4. **Utilities** - Helper classes (last for override capability)
5. **Print** - Print-optimized styles

**Note**: Layout, component, and page styles use Astro's CSS scoping feature instead of global CSS files.

## 📋 File Purposes

### `_variables.css`
- **Purpose**: Design system foundation
- **Contains**: Colors, typography, spacing, shadows, transitions, z-index, border radius
- **Usage**: Reference these variables instead of hardcoded values
- **Example**: `color: var(--color-primary-500);`

### `_reset.css` (Enhanced 2025)
- **Purpose**: Modern browser normalization with accessibility features
- **Contains**: CSS reset, base element styles, accessibility features, reduced motion support
- **Usage**: Provides consistent foundation across browsers with modern best practices
- **Features**: 
  - `prefers-reduced-motion` support
  - `:focus-visible` for keyboard navigation
  - Responsive typography with `clamp()`
  - Enhanced form element styling
  - Skip links for accessibility
- **Note**: Don't modify unless you understand the implications

### `_typography.css`
- **Purpose**: Text styling system
- **Contains**: Heading scales, paragraph styles, text utilities, link styles
- **Usage**: Apply typography classes or use as base styles
- **Example**: `.text-center`, `.font-bold`, `.text-lg`

### `_print.css` (New!)
- **Purpose**: Print-optimized styles and PDF generation
- **Contains**: Print media queries, page break controls, typography optimization
- **Usage**: Automatically applied when printing or generating PDFs
- **Features**:
  - Optimized typography for print (12pt font, proper margins)
  - Page break controls for content integrity
  - Enhanced code block readability
  - Hidden navigation and non-essential elements
  - URL display for links

### Layout, Component & Page Styles
- **Purpose**: Component and page-specific styling
- **Contains**: Layout styles, component styles, page-specific styles
- **Usage**: Use Astro's CSS scoping feature in component and page .astro files
- **Example**: `<style>` blocks in .astro files with scoped CSS
- **Note**: These styles are scoped to their respective components/pages automatically

### `_utilities.css`
- **Purpose**: Helper classes and utilities
- **Contains**: Display, position, background, border, animation utilities
- **Usage**: Quick styling adjustments and overrides
- **Example**: `.hidden`, `.text-center`, `.bg-red-500`

## 🎯 Where to Put Your CSS

### ✅ **Global CSS** (put in these files)
- **Design tokens** → `_variables.css`
- **Base element styles** → `_reset.css`
- **Typography system** → `_typography.css`
- **Utility classes** → `_utilities.css`
- **Print styles** → `_print.css`

### ✅ **Component & Page CSS** (put in .astro files)
- **Component-specific styles** → Component's `.astro` file using `<style>` blocks
- **Page-specific styles** → Page's `.astro` file using `<style>` blocks
- **Layout styles** → Component or page `.astro` files
- **Unique styling needs** → Component or page `.astro` files

### ❌ **Don't Put in Global CSS**
- Styles used in only one component or page
- Component-specific overrides
- Page-specific styles
- Layout styles
- One-off styling needs
- Experimental or temporary styles

## 🚀 Best Practices (2025)

### 1. **Use CSS Variables**
```css
/* ✅ Good */
color: var(--color-primary-500);
padding: var(--spacing-4);
border-radius: var(--border-radius-md);

/* ❌ Bad */
color: #667eea;
padding: 1rem;
border-radius: 6px;
```

### 2. **Follow Naming Conventions**
```css
/* ✅ Good - BEM methodology */
.post-card { }
.post-card__title { }
.post-card__content { }
.post-card--featured { }

/* ❌ Bad - Inconsistent naming */
.postCard { }
.post_title { }
.postContent { }
```

### 3. **Use Utility Classes First**
```css
<!-- ✅ Good - Use utilities when possible -->
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

<!-- ❌ Bad - Custom CSS for everything -->
<div class="custom-post-card">
```

### 4. **Component & Page Styles with Astro CSS Scoping**
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

<!-- ❌ Bad - Component/page styles in global CSS */
```

### 5. **Responsive Design with Modern CSS**
```css
/* ✅ Good - Use CSS variables for breakpoints */
@media (max-width: var(--breakpoint-md)) {
  .component {
    /* Mobile styles */
  }
}

/* ✅ Good - Use clamp() for responsive typography */
h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
}

/* ❌ Bad - Hardcoded breakpoints */
@media (max-width: 768px) {
  .component {
    /* Mobile styles */
  }
}
```

### 6. **Accessibility First**
```css
/* ✅ Good - Support reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* ✅ Good - Use focus-visible for keyboard navigation */
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

## 🔧 Adding New Styles

### Adding a New Component
1. **Create** the component in its own `.astro` file
2. **Add** styles using `<style>` blocks in the component file
3. **Use** CSS variables from `_variables.css` for consistency
4. **Document** the component's purpose and usage

### Adding New Utilities
1. **Check** if utility already exists
2. **Add** to appropriate section in `_utilities.css`
3. **Follow** existing naming patterns
4. **Test** across different browsers

### Adding New Pages
1. **Create** the page in its own `.astro` file
2. **Add** styles using `<style>` blocks in the page file
3. **Use** CSS variables from `_variables.css` for consistency
4. **Use** utility classes from `_utilities.css` when possible

### Adding New Variables
1. **Add** to appropriate section in `_variables.css`
2. **Use** semantic naming (e.g., `--color-success`, not `--color-green`)
3. **Document** the variable's purpose
4. **Update** existing styles to use the variable

### Adding Print Styles
1. **Add** to appropriate section in `_print.css`
2. **Test** with print preview and PDF generation
3. **Ensure** content remains readable and well-formatted
4. **Consider** page breaks and typography optimization

## 🧪 Testing & Validation

### Before Committing CSS Changes
- [ ] Styles work across different browsers
- [ ] Responsive behavior is correct
- [ ] Accessibility features are maintained
- [ ] No unused CSS is added
- [ ] CSS variables are used appropriately
- [ ] Component styles are in the right place
- [ ] Print styles work correctly
- [ ] Reduced motion preferences are respected

### CSS Validation
- Use browser dev tools to check for errors
- Validate CSS syntax with online tools
- Check for unused CSS with browser extensions
- Test with different screen sizes and devices
- Test print functionality and PDF generation
- Test with accessibility tools and screen readers

## 📚 Resources & References

### CSS Architecture Principles
- [CSS Architecture for Design Systems](https://css-tricks.com/css-architecture-for-design-systems/)
- [BEM Methodology](https://en.bem.info/methodology/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

### Modern CSS Features (2025)
- [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries)
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [CSS Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid)

### Tools & Extensions
- [CSS Grid Inspector](https://developer.chrome.com/devtools/docs/css-grid)
- [CSS Validator](https://jigsaw.w3.org/css-validator/)
- [PurgeCSS](https://purgecss.com/) - Remove unused CSS
- [Accessibility Insights](https://accessibilityinsights.io/) - Test accessibility

## 🤝 Contributing

When contributing to the CSS:

1. **Follow** the existing architecture
2. **Use** CSS variables for consistency
3. **Test** across different devices and browsers
4. **Document** any new patterns or conventions
5. **Ask** questions if unsure where to place styles
6. **Consider** accessibility and performance implications
7. **Test** print functionality when adding new content

## 🆘 Need Help?

If you're unsure where to put your CSS:

1. **Check** this README first
2. **Look** at similar styles in existing files
3. **Ask** the team for guidance
4. **Consider** if the styles should be component-specific

Remember: **Better to ask than to put styles in the wrong place!**

---

**Last Updated**: December 2024
**Maintained By**: Development Team
**CSS Architecture Version**: 2.0.0 (Enhanced 2025)
**Features**: Modern CSS reset, print styles, accessibility support, performance optimization
