// import bodyParser from 'body-parser'
// import session from 'express-session'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Upwork',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'description',
        content:
          'A fully featured admin theme which can be used to build CRM, CMS, etc.',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      // Maps
      { src: 'https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js' },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  // TODO: Conditional Theme switcher
  css: [
    // '~/assets/css/theme.css',
    '~/assets/fonts/feather/feather.css',
    '~/assets/scss/theme.scss',
    '~/assets/scss/theme-dark.scss',
    '~/node_modules/flatpickr/dist/flatpickr.min.css',
    '~/node_modules/quill/dist/quill.core.css',
    '~/node_modules/highlightjs/styles/vs2015.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/modes'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics',
    '@nuxtjs/auth-next',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    // https://go.nuxtjs.dev/content
    // '@nuxt/content',
  ],

  googleAnalytics: {
    id: 'UA-156446909-1',
  },

  auth: {
    localStorage: true,
    strategies: {
      local: {
        tokenRequired: true,
        tokenType: 'Bearer',
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: '/auth/user',
            method: 'get',
            propertyName: 'user',
          },
          logout: true,
        },
      },
    },
    redirect: {
      logout: '/login',
      login: '/login',
      home: '/',
    },
    rewriteRedirects: true,
  },

  serverMiddleware: ['~/api/index.js'],

  styleResources: {
    scss: ['~/assets/scss/_user.scss', '~/assets/scss/_user-variables.scss'],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://localhost:3000/api',
  },

  // Causes 'toLowercase' error on SSR
  // Content module configuration (https://go.nuxtjs.dev/config-content)
  // content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // Don't deploy with this, this is for analyze purpose only
    // analyze: true,
  },
}
