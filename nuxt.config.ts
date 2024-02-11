// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // app: {
  //   head: {

  //     style: [
  //       // <style type="text/css">:root { color: red }</style>
  //       { children: ':root { color: red }' }
  //     ],
  //   }

  // },
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  runtimeConfig: {
    connectionString: "sqlite://localhost/qt",
  },
  modules: [
    'nuxt-primevue'
  ],
  primevue: {
    unstyled: true
  },
  css: ['primevue/resources/themes/aura-light-blue/theme.css', 'primeicons/primeicons.css', '~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
