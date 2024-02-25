export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  experimental: {
    externalVue: false,
  },
  runtimeConfig: {
    connectionString: "sqlite://localhost/qt",
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
