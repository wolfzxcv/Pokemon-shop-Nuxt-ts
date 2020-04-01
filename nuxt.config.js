export default {
  mode: 'universal',
  head: {
    title: 'Pick up your Pokemon!!!',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'index name',
        content: 'Pick up your Pokemon content!'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '~/plugins/fontawesome/scss/style.scss',
    '~/plugins/bootstrap/scss/bootstrap.scss'
  ],
  plugins: ['./plugins/index.js'],
  buildModules: ['@nuxt/typescript-build'],
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv'],
  axios: {},
  build: {
    transpile: ['vee-validate/dist/rules']
  },
  env: {
    VUE_APP_PATH: 'https://vue-course-api.hexschool.io',
    VUE_APP_CUSTOM: 'pikashop'
  },
  router: {
    base: '/Pokemon-shop-Nuxt-ts/'
  }
}
