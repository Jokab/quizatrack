export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  runtimeConfig: {
    connectionString: "sqlite://localhost/qt",
  },
  modules: [
    "nuxt-primevue",
  ],
  primevue: {
  },
  css: ["primevue/resources/themes/aura-light-blue/theme.css", "primeicons/primeicons.css", "~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
