# CSS System Analysis for Tailwind Migration

## Overview
Analysis of the existing custom CSS system to identify patterns and map them to Tailwind CSS equivalents.

## Current CSS Architecture

### 1. CSS File Structure
- `main.css` - Entry point with imports
- `global.css` - Global styles and resets
- `_variables.css` - CSS custom properties (design tokens)
- `_utilities.css` - Custom utility classes
- `_fonts.css` - Typography system
- `_print.css` - Print styles
- `_view-transitions.css` - View transition animations

### 2. Design System Analysis

#### Color System
- **Primary Colors**: Deep blues (#1e3a8a, #1e40af)
- **Background**: Light grays (#fafafa, #f5f5f5)
- **Text**: Dark grays (#1a1a1a, #4b5563)
- **Borders**: Subtle grays (#d1d5db, #e5e7eb)

#### Typography System
- **Font Families**: Inter (sans), Merriweather (serif), JetBrains Mono (mono)
- **Font Sizes**: 0.75rem to 3.75rem scale
- **Line Heights**: 1.2 to 1.8 ratios

#### Spacing System
- **Base Unit**: 1rem
- **Scale**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl
- **Container Max Widths**: sm, md, lg, xl, full

#### Layout System
- **Container Classes**: .container-sm, .container-md, .container-lg, .container-xl
- **Grid System**: Custom grid utilities
- **Responsive Breakpoints**: 480px, 768px, 1024px

### 3. Custom Utility Classes

#### Container Utilities
- `.container-sm`, `.container-md`, `.container-lg`, `.container-xl`
- `.container-full`, `.container-full-edge`, `.container-full-no-padding`

#### Layout Utilities
- `.grid-container`, `.flex-container`
- `.content-wrapper`, `.main-content`

#### Typography Utilities
- `.text-*` classes for font sizes
- `.font-*` classes for font families
- `.leading-*` classes for line heights

### 4. Component-Specific Styles

#### Header Component
- Fixed positioning with backdrop blur
- Scroll-based show/hide behavior
- Mobile navigation with hamburger menu
- Theme toggle integration

#### Layout Components
- Main content area with calculated heights
- Responsive padding and margins
- Overflow prevention system

## Tailwind Migration Strategy

### Phase 1: Core System Migration
1. Replace CSS custom properties with Tailwind config
2. Migrate spacing and sizing scales
3. Convert color system to Tailwind palette
4. Update typography system

### Phase 2: Utility Class Migration
1. Replace custom container classes with Tailwind equivalents
2. Convert layout utilities to Tailwind classes
3. Migrate responsive design patterns

### Phase 3: Component Migration
1. Update BaseLayout.astro
2. Migrate Header.astro
3. Update Footer.astro
4. Convert PostCard and PostsGrid components

### Phase 4: Cleanup
1. Remove unused CSS files
2. Clean up custom classes
3. Update documentation
4. Test all functionality

## Tailwind Equivalents Mapping

### Colors
- `--color-primary` → `blue-800`
- `--color-bg` → `gray-50`
- `--color-text` → `gray-900`
- `--color-border` → `gray-300`

### Spacing
- `--spacing-xs` → `space-1`
- `--spacing-sm` → `space-2`
- `--spacing-base` → `space-4`
- `--spacing-lg` → `space-6`
- `--spacing-xl` → `space-8`
- `--spacing-2xl` → `space-12`

### Typography
- `--font-size-xs` → `text-xs`
- `--font-size-sm` → `text-sm`
- `--font-size-base` → `text-base`
- `--font-size-lg` → `text-lg`
- `--font-size-xl` → `text-xl`
- `--font-size-2xl` → `text-2xl`
- `--font-size-3xl` → `text-3xl`
- `--font-size-4xl` → `text-4xl`
- `--font-size-5xl` → `text-5xl`
- `--font-size-6xl` → `text-6xl`

### Layout
- `.container-*` → `max-w-*` + `mx-auto` + `px-*`
- `.grid-container` → `grid` + `gap-*`
- `.flex-container` → `flex` + `gap-*`
