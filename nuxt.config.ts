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
    "@vueuse/nuxt",
    "@sidebase/nuxt-auth",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
