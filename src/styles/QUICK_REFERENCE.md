# CSS Quick Reference Guide

## 🚀 Where to Put Your CSS - Quick Decision Tree

```
Is it a design token (color, spacing, font, etc.)?
├─ YES → _variables.css
└─ NO → Continue...

Is it a base element style (body, h1, p, etc.)?
├─ YES → _reset.css or _typography.css
└─ NO → Continue...

Is it a layout style (grid, flexbox, positioning)?
├─ YES → Component/Page .astro file (scoped)
└─ NO → Continue...

Is it a component style (button, card, form)?
├─ YES → Component .astro file (scoped)
└─ NO → Continue...

Is it specific to one page only?
├─ YES → Page .astro file (scoped)
└─ NO → Continue...

Is it a utility class (helper, override)?
├─ YES → _utilities.css
└─ NO → Continue...

Is it specific to one component only?
├─ YES → Component's own CSS file
└─ NO → Ask the team!
```

## 📍 Common CSS Patterns & Where They Go

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

### Typography
```css
/* ✅ _typography.css */
h1 { font-size: var(--font-size-5xl); }
.text-center { text-align: center; }
.font-bold { font-weight: var(--font-weight-bold); }

/* ❌ Don't put in component files */
.my-component h1 { font-size: 3rem; }
```

### Layout & Spacing
```css
/* ✅ Component/Page .astro file (scoped) */
<style>
  .container { max-width: var(--container-max-width); }
  .grid { display: grid; }
  .my-layout { margin: var(--spacing-8); }
</style>

/* ❌ Don't put in global CSS if only used by one component/page */
```

### Components
```css
/* ✅ Component .astro file (scoped) */
<style>
  .btn { /* Button styles */ }
  .card { /* Card styles */ }
  .form-input { /* Form input styles */ }
</style>

/* ❌ Don't put in global CSS if only used by one component */
```

### Pages
```css
/* ✅ Page .astro file (scoped) */
<style>
  .hero { /* Home page hero styles */ }
  .about-content { /* About page styles */ }
  .blog-index { /* Blog listing styles */ }
</style>

/* ❌ Don't put in global CSS if only used by one page */
```

### Utilities
```css
/* ✅ _utilities.css */
.hidden { display: none; }
.flex { display: flex; }
.text-center { text-align: center; }

/* ❌ Don't put in component files */
```

## 🎯 Component-Level CSS Examples

### ✅ Good - Component-specific styles in component
```astro
<!-- Header.astro -->
<header class="header">
  <nav class="header-nav">
    <!-- Navigation content -->
  </nav>
</header>

<style>
  .header {
    /* Component-specific styles here */
    padding: var(--spacing-4);
    border-bottom: 1px solid var(--color-border-primary);
  }
  
  .header-nav {
    /* Component-specific navigation styles */
    display: flex;
    align-items: center;
  }
</style>
```

### ❌ Bad - Component/page styles in global CSS
```css
/* Don't do this in global CSS files */
.header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.header-nav {
  display: flex;
  align-items: center;
}

.hero {
  padding: 2rem;
  text-align: center;
}
```

## 🔧 Quick Commands

### Import the new CSS architecture
```astro
<!-- In your layout files -->
<link rel="stylesheet" href="/src/styles/main.css">
```

### Use utility classes
```html
<!-- Quick layout with utilities -->
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h1 class="text-2xl font-bold text-gray-900">Title</h1>
  <button class="btn btn-primary">Action</button>
</div>
```

### Use CSS variables
```css
/* Always use variables instead of hardcoded values */
.my-component {
  color: var(--color-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

## 🚨 Common Mistakes to Avoid

1. **Putting component/page styles in global CSS**
   - ❌ `.my-button { }` in global CSS if only used by one component
   - ✅ Put in component's .astro file using `<style>` blocks

2. **Hardcoding values instead of using variables**
   - ❌ `color: #667eea;`
   - ✅ `color: var(--color-primary-500);`

3. **Creating utilities that already exist**
   - ❌ `.my-margin { margin: 1rem; }`
   - ✅ Use existing `.m-4` utility

4. **Putting page-specific styles in global CSS**
   - ❌ `.hero` styles in global CSS
   - ✅ Put in page's .astro file using `<style>` blocks

5. **Not using the existing design system**
   - ❌ Custom spacing, colors, typography
   - ✅ Use existing variables and utilities

## 📞 Need Help?

**Quick Questions:**
- Check this guide first
- Look at similar styles in existing files
- Use the decision tree above

**Still Unsure:**
- Ask the team
- Check the main README.md
- Consider if it should be component-specific

**Remember:** Better to ask than to put styles in the wrong place!
