export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  experimental: {
    externalVue: false,
  },
  runtimeConfig: {
    connectionString: "postgresql://jakob:1234@localhost/qt",
  },
  modules: [
    "nuxt-primevue",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  css: ["primevue/resources/themes/aura-light-blue/theme.css", "primeicons/primeicons.css", "~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});