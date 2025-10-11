/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            // Inline code (`backticks`)
            color: "var(--color-zinc-800)",
            a: {
              color: "var(--color-blue-500)",
              textDecoration: "none",
              fontWeight: '500',
              '&:hover': {
                color: "var(--color-blue-700)",
                textDecoration: "underline",
              },
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'code': {
              color: "var(--color-zinc-800)",
              backgroundColor: "var(--color-zinc-200)",
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            // Code block (` ```js `)
            'pre': {
              color: '#F3F4F6',
              backgroundColor: '#1F2937',
              padding: '1em',
              borderRadius: '0.5rem'
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
              fontSize: '0.875rem',
              lineHeight: '1.5rem',
            }
          }
        },
        // Dark mode
        invert: {
          css: {
            'code': {
              color: '#F472B6', // rose-400
              backgroundColor: '#1E293B', // slate-800
            },
            'pre': {
              color: '#E5E7EB', // gray-200
              backgroundColor: '#0F172A', // slate-900
            },
          }
        }
      }),
    },
  },
}
