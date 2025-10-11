import tailwindcss from '@tailwindcss/vite'
import eslintPlugin from 'vite-plugin-eslint'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  pages: true,
  ssr: false,

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
  ],
  app: {
    head: {
      title: 'DevJ2K - Portfolio',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'description', content: 'Portfolio of DevJ2K' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    },
  },
  runtimeConfig: {
    apiKey: process.env.NUXT_API_KEY || '',
    apiBaseUrl: `${process.env.NUXT_API_BASE_URL}`,
  },
  css: [
    '@/assets/css/main.css'
  ],
  ui: {
    fonts: false,
    colorMode: false,
  },
  eslint: {
    config: {}
  },
  // routeRules: {
  //   '/api/**': { proxy: `${process.env.NUXT_API_BASE_URL}/**` },
  // },
  vite: {
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: `${process.env.NUXT_API_BASE_URL}`,
    //       changeOrigin: true,
    //       headers: {
    //         'x-api-key': 'null',
    //       },
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //     },
    //   }
    // },
    plugins: [
      tailwindcss(),
      eslintPlugin({
        emitWarning: true,
        emitError: true,
        failOnError: false,
        failOnWarning: false,
      }),
    ],
  },
  googleFonts: {
    families: {
      'Poppins': [400, 500, 600, 700],
      'Press Start 2P': [400],
      'Inter': [100, 200, 300, 400, 500, 600, 700, 800, 900]
    }
  },
})
