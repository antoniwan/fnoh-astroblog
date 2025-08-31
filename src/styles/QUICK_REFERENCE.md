# CSS Quick Reference Guide

## 🚀 Where to Put Your CSS - Quick Decision Tree

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
h1,
h2,
h3 {
  /* Global heading styles */
}
code,
pre {
  /* Global code styles */
}
table {
  /* Global table styles */
}
blockquote {
  /* Global blockquote styles */
}
```

### Colors & Design

```css
/* ✅ _variables.css */
:root {
  --color-primary: #667eea;
  --spacing-4: 1rem;
  --font-size-lg: 1.125rem;
}

/* ❌ Don't put in global CSS */
.my-component {
  color: #667eea; /* Use var(--color-primary) instead */
}
```

### Utilities

```css
/* ✅ _utilities.css */
.text-center {
  text-align: center;
}
.font-bold {
  font-weight: var(--font-weight-bold);
}
.container {
  max-width: var(--container-max-width);
}
```

### Component & Page Styles

```css
/* ✅ Component/Page .astro file (scoped) */
<style>
  .my-component { /* Component-specific styles */ }
  .hero { /* Page-specific styles */ }
</style>

/* ❌ Don't put in global CSS if only used by one component/page */
```

## 🎯 Quick Examples

### Adding a New Heading Style

```css
/* ✅ GlobalStyles.astro */
h4 {
  font-size: var(--font-size-xl);
  color: var(--color-heading);
}
```

### Adding a New Component

```css
/* ✅ Component.astro file */
<style>
  .my-component {
    background: var(--color-bg);
    padding: var(--spacing-lg);
  }
</style>
```

### Adding a New Utility

```css
/* ✅ _utilities.css */
.text-muted {
  color: var(--color-text-light);
}
```

### Adding a New Color Variable

```css
/* ✅ _variables.css */
:root {
  --color-accent: #f59e0b;
}
```

## 🚫 What NOT to Do

- ❌ Don't put component styles in global CSS files
- ❌ Don't put page-specific styles in GlobalStyles.astro
- ❌ Don't hardcode colors, use CSS variables
- ❌ Don't duplicate styles across multiple files
- ❌ Don't put utility classes in component files

## ✅ What TO Do

- ✅ Use GlobalStyles.astro for shared element styles
- ✅ Use component files for component-specific styles
- ✅ Use CSS variables for consistency
- ✅ Use utility classes when possible
- ✅ Keep styles scoped to their components
- ✅ Follow the established architecture

## 🔧 Need Help?

1. **Check** this quick reference first
2. **Look** at similar patterns in existing files
3. **Ask** the team for guidance
4. **Remember**: Better to ask than to put styles in the wrong place!
