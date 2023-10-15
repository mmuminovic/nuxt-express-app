export default {
  ssr: true,
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  components: true,
  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios'],
  serverMiddleware: {
    '/api': '~/api'
  },
  server: {
    port: process.env.PORT || 3000, // Set a default or use the environment variable PORT
    host: '0.0.0.0'
  },
  build: {}
}
