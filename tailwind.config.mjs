/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Custom color palette matching existing CSS variables
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e3a8a', // --color-primary
          900: '#1e40af', // --color-primary-dark
        },
        // Custom background colors
        background: {
          DEFAULT: '#fafafa', // --color-bg
          secondary: '#f5f5f5', // --color-bg-secondary
          tertiary: '#eeeeee', // --color-bg-tertiary
        },
        // Custom text colors
        text: {
          DEFAULT: '#1a1a1a', // --color-text
          light: '#4b5563', // --color-text-light
          lighter: '#6b7280', // --color-text-lighter
          subtle: '#9ca3af', // --color-text-subtle
        },
        // Custom border colors
        border: {
          DEFAULT: '#d1d5db', // --color-border
          light: '#e5e7eb', // --color-border-light
          dark: '#9ca3af', // --color-border-dark
        },
        // Custom code colors
        code: {
          bg: '#f3f4f6', // --color-code-bg
          border: '#d1d5db', // --color-code-border
          text: '#111827', // --color-code-text
          'inline-bg': '#e5e7eb', // --color-inline-code-bg
        },
        // Custom blockquote colors
        blockquote: {
          bg: '#f8fafc', // --color-blockquote-bg
          border: '#1e40af', // --color-blockquote-border
          text: '#1e3a8a', // --color-blockquote-text
        },
        // Additional utility colors
        hover: 'rgba(0, 0, 0, 0.03)',
        link: '#1e3a8a',
        heading: '#0f172a',
      },
      fontFamily: {
        // Custom font families matching existing CSS
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],
        heading: ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'Courier New', 'monospace'],
      },
      fontSize: {
        // Custom font sizes matching existing CSS scale
        'xs': ['0.75rem', { lineHeight: '1.2' }], // --font-size-xs
        'sm': ['0.875rem', { lineHeight: '1.3' }], // --font-size-sm
        'base': ['1.0625rem', { lineHeight: '1.5' }], // --font-size-base
        'lg': ['1.1875rem', { lineHeight: '1.4' }], // --font-size-lg
        'xl': ['1.3125rem', { lineHeight: '1.4' }], // --font-size-xl
        '2xl': ['1.625rem', { lineHeight: '1.3' }], // --font-size-2xl
        '3xl': ['2rem', { lineHeight: '1.2' }], // --font-size-3xl
        '4xl': ['2.5rem', { lineHeight: '1.2' }], // --font-size-4xl
        '5xl': ['3.125rem', { lineHeight: '1.1' }], // --font-size-5xl
        '6xl': ['3.75rem', { lineHeight: '1.1' }], // --font-size-6xl
      },
      spacing: {
        // Custom spacing scale matching existing CSS
        'xs': '0.5rem', // --spacing-xs
        'sm': '1rem', // --spacing-sm
        'base': '1.5rem', // --spacing-base
        'lg': '2rem', // --spacing-lg
        'xl': '2.5rem', // --spacing-xl
        '2xl': '3rem', // --spacing-2xl
        '3xl': '4rem', // --spacing-3xl
        '4xl': '5rem', // --spacing-4xl
        '5xl': '6rem', // --spacing-5xl
      },
      maxWidth: {
        // Custom container max-widths matching existing CSS
        'sm': '640px', // --max-width-sm
        'md': '768px', // --max-width
        'lg': '1024px', // --max-width-wide
        'xl': '1280px', // --max-width-xl
        'full': '100%', // --max-width-full
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      transitionDuration: {
        'normal': '200ms', // --transition-normal
        'slow': '300ms', // --transition-slow
        'fast': '150ms', // --transition-fast
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // --shadow-sm
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)', // --shadow-md
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)', // --shadow-lg
      },
    },
  },
  plugins: [],
};
