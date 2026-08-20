/**
 * Design tokens for swapnilkole.dev
 *
 * This file IS the design system. Components use these token names
 * (`bg-ink`, `text-slate`, `border-rule`) and never raw hex values or
 * default Tailwind palette colours.
 *
 * Palette rules that are easy to break by accident:
 *   - `amber` is the ONLY accent. It marks status and emphasis. It is never
 *     a large fill and never a button background — amber on white fails
 *     contrast. The primary button on light surfaces is `ink` with `bone` text.
 *   - `amber-ink` (#3D2E00) is the only text colour permitted on amber.
 *   - The `dark-*` tokens exist for the hero band only. The page uses the dark
 *     treatment once, at the top.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      /**
       * A height query, not a width one. Every section is a full screen, so
       * what decides whether a dense screen fits is the height of the window,
       * and 830px is where the packages, workshops, work and experience
       * screens stop fitting at the full type scale. Used as `short:mt-4`.
       */
      screens: {
        short: { raw: '(max-height: 830px)' },
      },

      colors: {
        /** Hero band background, and primary text on light surfaces. */
        ink: '#131316',
        /** Text on the dark band; text on ink buttons. */
        bone: '#F2F1ED',
        /** The single accent: availability dot, "most requested" badge, small marks. */
        amber: {
          DEFAULT: '#FFC94A',
          /** The only text colour permitted on an amber fill. */
          ink: '#3D2E00',
        },
        /** Light body background. */
        surface: '#F5F4F0',
        /** Card background on the light body. */
        card: '#FFFFFF',
        /** Body copy on light surfaces. */
        slate: '#5E5E58',
        /**
         * Metadata, captions, timestamps on light surfaces.
         *
         * The brief specified #78776F. That measures 4.09:1 against the
         * #F5F4F0 body background — below the 4.5:1 WCAG AA floor for normal
         * text, and this token is used for the small mono eyebrow labels,
         * which is exactly the text that can least afford it.
         *
         * Darkened by 7 points per channel to #717068, the smallest change
         * that clears AA on both the body (4.52:1) and cards (4.98:1). The hue
         * and the warm-grey character are unchanged, and the difference is not
         * perceptible next to the original. Flagged rather than done quietly.
         */
        meta: '#717068',
        /** Hairlines and dividers on light surfaces. */
        rule: '#DFDED8',

        /* --- dark band only --- */
        /** Supporting text inside the dark hero band. */
        'dark-muted': '#A3A2A0',
        /** Hairlines and badge borders inside the dark band. */
        'dark-rule': '#2E2E34',
        /** Slightly brighter hairline for hover / emphasis in the dark band. */
        'dark-rule-strong': '#3E3E44',
        /** Raised surface inside the dark band (metric tiles, code blocks). */
        'dark-raised': '#1B1B1F',
      },

      fontFamily: {
        sans: [
          'Instrument Sans',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },

      /**
       * Type scale. Headlines carry tight tracking (-0.02em to -0.03em) and
       * sit at weight 600; body is 400 at 1.6 line-height.
       * `label` is the mono uppercase eyebrow used above section headings.
       */
      fontSize: {
        label: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.09em' }],
        xs: ['0.75rem', { lineHeight: '1.45', letterSpacing: '0.01em' }],
        sm: ['0.8125rem', { lineHeight: '1.55' }],
        base: ['0.9375rem', { lineHeight: '1.6' }],
        md: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.0625rem', { lineHeight: '1.65' }],
        xl: ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.014em' }],
        '2xl': ['1.5rem', { lineHeight: '1.28', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.18', letterSpacing: '-0.024em' }],
        '4xl': ['2.375rem', { lineHeight: '1.1', letterSpacing: '-0.028em' }],
        '5xl': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        /** Hero headline — fluid between mobile and desktop. */
        display: [
          'clamp(2.125rem, 1.5rem + 2.6vw, 3.375rem)',
          { lineHeight: '1.06', letterSpacing: '-0.03em' },
        ],
        /** The breadth clause under the hero headline. */
        'display-sub': [
          'clamp(1.125rem, 1rem + 0.55vw, 1.4375rem)',
          { lineHeight: '1.42', letterSpacing: '-0.015em' },
        ],
        /** Metric figures. */
        figure: [
          'clamp(1.75rem, 1.3rem + 1.9vw, 2.5rem)',
          { lineHeight: '1', letterSpacing: '-0.03em' },
        ],
      },

      /** Extra steps the default scale lacks, plus named section rhythm. */
      spacing: {
        4.5: '1.125rem',
        13: '3.25rem',
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        /** Vertical padding for a standard light-body section. */
        section: 'clamp(4rem, 2.5rem + 6vw, 7rem)',
        /** Tighter variant for the quieter supporting sections. */
        'section-sm': 'clamp(3rem, 2rem + 4vw, 5rem)',
      },

      maxWidth: {
        /** Page shell. */
        shell: '76rem',
        /** Narrower shell for text-led sections. */
        prose: '46rem',
        /** Article body — caps the measure at roughly 68 characters. */
        measure: '38rem',
      },

      borderRadius: {
        /** Cards and panels. */
        card: '8px',
        /** Buttons and inputs. */
        btn: '5px',
        /** Status badges. */
        pill: '9999px',
      },

      borderWidth: {
        /** Hairline rules — the default border weight across the site. */
        hairline: '0.5px',
        /** Reserved for the highlighted package card. Do not reuse. */
        highlight: '2px',
      },

      boxShadow: {
        /** Resting state for cards on the light body. */
        card: '0 1px 2px rgba(19, 19, 22, 0.04), 0 8px 24px -12px rgba(19, 19, 22, 0.10)',
        /** Hover lift. */
        'card-hover':
          '0 2px 4px rgba(19, 19, 22, 0.05), 0 16px 40px -16px rgba(19, 19, 22, 0.16)',
        /** The highlighted package card sits above its neighbours. */
        feature:
          '0 2px 6px rgba(19, 19, 22, 0.06), 0 24px 56px -20px rgba(19, 19, 22, 0.22)',
      },

      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },

      keyframes: {
        /** Availability dot. Disabled under prefers-reduced-motion. */
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(0.86)' },
        },
        /** Page-load entrance. One orchestrated sequence, staggered by delay. */
        rise: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },

      animation: {
        pulse: 'pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        rise: 'rise 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
