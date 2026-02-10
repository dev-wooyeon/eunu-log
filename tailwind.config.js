/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './feeds/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Toss Blue
        'toss-blue': {
          DEFAULT: 'var(--color-toss-blue)',
          light: 'var(--color-toss-blue-light)',
          dark: 'var(--color-toss-blue-dark)',
        },
        // Hero
        hero: {
          light: 'var(--color-hero-bg)',
        },
        // Grey Scale
        grey: {
          50: 'var(--color-grey-50)',
          100: 'var(--color-grey-100)',
          200: 'var(--color-grey-200)',
          300: 'var(--color-grey-300)',
          400: 'var(--color-grey-400)',
          500: 'var(--color-grey-500)',
          600: 'var(--color-grey-600)',
          700: 'var(--color-grey-700)',
          800: 'var(--color-grey-800)',
          900: 'var(--color-grey-900)',
        },
        // Semantic Text Colors
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          disabled: 'var(--color-text-disabled)',
        },
        // Semantic Background Colors
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
        },
        // Borders & Dividers
        border: 'var(--color-border)',
        divider: 'var(--color-divider)',
        // Feedback Colors
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        12: 'var(--space-12)',
        13: '3.25rem', // 52px for button height (8pt grid)
        16: 'var(--space-16)',
      },
      fontFamily: {
        mono: 'var(--font-mono)',
      },
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
        'display-sm': ['clamp(2rem, 4vw, 2.5rem)', { lineHeight: '1.2' }],
        'display-md': ['clamp(2.5rem, 6vw, 3.5rem)', { lineHeight: '1.2' }],
        'display-lg': ['clamp(4rem, 10vw, 6rem)', { lineHeight: '1.1' }],
        'display-xl': ['clamp(6rem, 15vw, 10rem)', { lineHeight: '1.05' }],
      },
      fontWeight: {
        normal: 'var(--font-normal)',
        medium: 'var(--font-medium)',
        semibold: 'var(--font-semibold)',
        bold: 'var(--font-bold)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      maxWidth: {
        'content-sm': '640px',
        'content-md': '800px',
        'content-lg': '1000px',
        'content-xl': '1200px',
      },
      minHeight: {
        'screen-90': '90vh',
      },
      maxHeight: {
        'screen-80': '80vh',
      },
      height: {
        visualization: '500px',
      },
      zIndex: {
        base: 'var(--z-base)',
        sticky: 'var(--z-sticky)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        toast: 'var(--z-toast)',
      },
      gridTemplateColumns: {
        resume: '200px 1fr',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionDuration: {
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
      },
      transitionTimingFunction: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      animation: {
        blink: 'blink 1s infinite',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Match existing design system colors
            '--tw-prose-body': 'var(--color-text-primary)',
            '--tw-prose-headings': 'var(--color-text-primary)',
            '--tw-prose-links': 'var(--color-toss-blue)',
            '--tw-prose-bold': 'var(--color-text-primary)',
            '--tw-prose-quotes': 'var(--color-text-secondary)',
            '--tw-prose-quote-borders': 'var(--color-toss-blue)',
            '--tw-prose-code': 'var(--color-grey-800)',
            '--tw-prose-pre-code': 'var(--color-grey-100)',
            '--tw-prose-pre-bg': 'var(--color-grey-900)',

            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            lineHeight: '1.8', // Increased from 1.7 for better readability
            maxWidth: '100%',

            // Headings
            h1: {
              fontSize: 'var(--text-2xl)',
              marginTop: 'var(--space-12)',
              marginBottom: 'var(--space-6)',
              color: 'var(--color-text-primary)',
              lineHeight: '1.3',
            },
            h2: {
              fontSize: 'var(--text-xl)',
              marginTop: 'var(--space-10)',
              marginBottom: 'var(--space-4)',
              color: 'var(--color-text-primary)',
              lineHeight: '1.35',
            },
            h3: {
              fontSize: 'var(--text-lg)',
              marginTop: 'var(--space-8)',
              marginBottom: 'var(--space-3)',
              color: 'var(--color-text-primary)',
              lineHeight: '1.4',
            },

            // Lists
            'ul > li::marker': {
              color: 'var(--accent-primary)',
            },
            'ol > li::marker': {
              color: 'var(--accent-primary)',
            },
            ul: {
              paddingLeft: '1.625em',
            },
            ol: {
              paddingLeft: '1.625em',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },

            // Paragraphs
            p: {
              marginBottom: '1em',
              whiteSpace: 'pre-wrap', // Treat newlines as line breaks
            },

            // Code blocks
            pre: {
              backgroundColor: 'var(--color-grey-900)',
              color: 'var(--color-grey-100)',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-md)',
              overflow: 'auto',
              margin: 'var(--space-8) 0',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-base)',
            },
            code: {
              fontFamily: 'var(--font-mono)',
              wordBreak: 'break-word',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            'pre code': {
              wordBreak: 'normal',
            },

            // Images
            img: {
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              margin: 'var(--space-8) auto',
              borderRadius: 'var(--radius-md)',
            },

            // Blockquotes
            blockquote: {
              borderLeftWidth: '4px',
              borderLeftColor: 'var(--color-toss-blue)',
              fontStyle: 'italic',
              paddingLeft: 'var(--space-6)',
              margin: 'var(--space-8) 0',
              color: 'var(--color-text-secondary)',
            },
            'blockquote p': {
              marginBottom: 0,
            },

            // Tables
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
            },
            'th, td': {
              padding: '0.75rem 1rem',
              textAlign: 'left',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-grey-50)',
              border: '1px solid var(--color-border)',
            },
            th: {
              fontWeight: 600,
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
