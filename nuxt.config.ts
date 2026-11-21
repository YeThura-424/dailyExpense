// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiBaseUrl: process.env.NUXT_API_BASE_URL || process.env.API_URL || "http://localhost:4800/api/v1",
    sessionCookieSecure: process.env.NODE_ENV === "production",
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
    "floating-vue/nuxt",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
