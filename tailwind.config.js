/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Semantic Design Tokens ──────────────────────────────
        'page':      'var(--color-bg-page)',
        'surface':   'var(--color-bg-surface)',
        'base':      'var(--color-bg-base)',
        'raised':    'var(--color-bg-raised)',
        
        'primary':   'var(--color-text-primary)',
        'secondary': 'var(--color-text-secondary)',
        'muted':     'var(--color-text-muted)',
        'primary0':  'var(--color-text-secondary)', // Legacy compat

        'brand-primary': 'var(--color-brand-primary)',
        'brand-gold':    'var(--color-brand-gold)',
        'brand-success': 'var(--color-brand-success)',

        'border-base':   'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',

        'error':   'var(--color-error)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'info':    'var(--color-info)',

        // Blueprint Colors
        'blueprint-bg': '#080B0A',
        'blueprint-bg2': '#0F1410',
        'blueprint-bg3': '#161C17',
        'blueprint-bg4': '#1E261F',
        'blueprint-or': '#F97316',
        'blueprint-or2': '#FB923C',
        'blueprint-gold': '#D97706',
        'blueprint-gold2': '#F59E0B',
        'blueprint-sage': '#4A7C59',
        'blueprint-sage2': '#6FAE84',
        'blueprint-off': '#E8EDF0',
        'blueprint-muted': 'rgba(255,255,255,0.38)',
        'blueprint-muted2': 'rgba(255,255,255,0.58)',
        'blueprint-border': 'rgba(255,255,255,0.07)',

        // ── Legacy / Absolute Palette ──────────────────────────────
        primary_blue: 'rgb(var(--color-primary) / <alpha-value>)', // Renamed from primary
        obsidian: {
          950: '#06090F',
          900: '#0B1020',
          800: '#111827',
          750: '#151E2F',
          700: '#1D2638',
          600: '#2D3748',
          500: '#4A5568',
          400: '#718096',
          300: '#A0AEC0',
          200: '#CBD5E1',
          100: '#E2E8F0',
          50:  '#F8FAFC',
        },
        vault: {            // brand orange (new vault)
          900: '#7C2D12',
          800: '#9A3412',
          700: '#C2410C',
          600: '#EA580C',
          500: '#F97316',
          400: '#FB923C',
          300: '#FDBA74',
          200: '#FED7AA',
          100: '#FFEDD5',
          50:  '#FFF7ED',
        },
        gold: {
          900: '#78350F',
          800: '#92400E',
          700: '#B45309',
          600: '#D97706',
          500: '#D4A72C',
          400: '#FBBF24',
          300: '#FCD34D',
          200: '#FDE68A',
          100: '#FEF3C7',
        },
        trust: {            // success green
          900: '#064E3B',
          800: '#065F46',
          700: '#047857',
          600: '#059669',
          500: '#10B981',
          400: '#34D399',
          300: '#6EE7B7',
          200: '#A7F3D0',
          100: '#D1FAE5',
        },
      },

      borderColor: {
        'base': 'var(--color-border)',
        'strong': 'var(--color-border-strong)',
      },

      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Cormorant Garamond', 'Instrument Serif', 'Georgia', 'serif'],
        script:  ['Caveat', 'cursive'],
        mono:    ['DM Mono', 'IBM Plex Mono', 'Cascadia Code', 'Courier New', 'monospace'],
        digits:  ['DM Mono', 'IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
        // backward compat
        body:    ['Inter', 'sans-serif'],
      },

      fontWeight: {
        bold: '600',
      },

      fontSize: {
        'xs':   ['clamp(0.7rem, 0.65rem + 0.2vw, 0.8rem)',      { lineHeight: '1.4' }],
        'sm':   ['clamp(0.8rem, 0.75rem + 0.25vw, 0.9rem)',     { lineHeight: '1.5' }],
        'base': ['clamp(0.9rem, 0.85rem + 0.25vw, 1rem)',       { lineHeight: '1.65' }],
        'lg':   ['clamp(1rem, 0.95rem + 0.5vw, 1.125rem)',      { lineHeight: '1.4' }],
        'xl':   ['clamp(1.125rem, 1rem + 0.75vw, 1.25rem)',     { lineHeight: '1.25' }],
        '2xl':  ['clamp(1.25rem, 1.1rem + 1vw, 1.5rem)',        { lineHeight: '1.15' }],
        '3xl':  ['clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',         { lineHeight: '1.1' }],
        '4xl':  ['clamp(1.75rem, 1.5rem + 2vw, 2.5rem)',        { lineHeight: '1.1' }],
        '5xl':  ['clamp(2rem, 1.75rem + 2.5vw, 3rem)',          { lineHeight: '1.05' }],
        'hero': ['clamp(2.5rem, 2rem + 4vw, 4.5rem)',           { lineHeight: '1.0' }],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },

      maxWidth: {
        'narrow':  '640px',
        'content': '960px',
        'wide':    '1200px',
      },

      borderRadius: {
        'sm':   '0.25rem',
        'md':   '0.5rem',
        'lg':   '0.75rem',
        'xl':   '1rem',
        '2xl':  '1.5rem',
        'full': '9999px',
      },

      boxShadow: {
        'xs':      '0 1px 2px rgba(0,0,0,0.05)',
        'sm':      '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        'md':      '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'lg':      '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        'xl':      '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        '2xl':     '0 25px 50px -12px rgba(0,0,0,0.25)',
        'brand':   '0 10px 15px -3px rgba(249,115,22,0.1), 0 4px 6px -2px rgba(249,115,22,0.05)',
        'inner':   'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
        'glow':    '0 0 15px rgba(249,115,22,0.5)',
      },

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      animation: {
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float-slow 6s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'scroll-x':    'scroll-x 40s linear infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'reveal':      'reveal 0.4s cubic-bezier(0,0,0.2,1) forwards',
        'ping-slow':   'ping-slow 2.8s ease-out infinite',
        'scan':        'scan 3s linear infinite',
        'blob-1':      'blob-drift-1 20s ease-in-out infinite',
        'blob-2':      'blob-drift-2 24s ease-in-out infinite',
        'blob-3':      'blob-drift-3 28s ease-in-out infinite',
        'fadeUp':      'fadeUp 0.8s ease both',
        'drift1':      'drift1 18s ease-in-out infinite',
        'drift2':      'drift2 22s ease-in-out infinite',
        'drift3':      'drift3 15s ease-in-out infinite',
        'bp-pulse':    'bp-pulse 2s ease-in-out infinite',
      },

      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        'scroll-x': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        reveal: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'ping-slow': {
          '0%':      { transform: 'scale(1)', opacity: '0.8' },
          '75%,100%':{ transform: 'scale(2)', opacity: '0' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100px)' },
          '100%': { transform: 'translateY(600px)' },
        },
        'blob-drift-1': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(-50px,40px) scale(1.06)' },
          '66%':     { transform: 'translate(40px,-30px) scale(0.96)' },
        },
        'blob-drift-2': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(60px,-30px) scale(1.07)' },
          '66%':     { transform: 'translate(-30px,50px) scale(0.95)' },
        },
        'blob-drift-3': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%':     { transform: 'translate(30px,-35px) scale(1.1)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        drift1: {
          '0%,100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(-40px,30px)' }
        },
        drift2: {
          '0%,100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(30px,-40px)' }
        },
        drift3: {
          '0%,100%': { transform: 'translate(-50%,-50%)' },
          '50%': { transform: 'translate(-52%,-48%)' }
        },
        'bp-pulse': {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.8)' }
        }
      },
    },
  },
  plugins: [],
}
