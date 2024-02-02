// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  runtimeConfig: {
    connectionString: "sqlite://localhost/qt",
  },
  plugins: ["~/server/plugins/db.ts"],
});
