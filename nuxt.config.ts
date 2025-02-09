export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '~/assets/scss/main.scss',
  ],
  components: {
    global: true,
    dirs: ['components/layout'],
  },
  modules: ['@pinia/nuxt'],
  pinia: {
    storesDirs: ['./stores'],
  },
})
