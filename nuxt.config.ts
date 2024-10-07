// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: process.env.X_API_TOKEN,

    public: {
      url: process.env.API_URL || "http://localhost:8000",
    },
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxtjs/device",
    "@nuxt/icon",
    "vue3-carousel-nuxt",
    "@pinia/nuxt",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // nitro: {
  //   routeRules: {
  //     "/api/**": {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  //         "Access-Control-Allow-Headers":
  //           "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  //       },
  //     },
  //   },
  // },
  // routeRules: {
  //   "/api/**": { proxy: { to: "http://localhost:8000/**" } },
  // },
});
