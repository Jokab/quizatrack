import antfu from "@antfu/eslint-config";

// import nuxt from './.nuxt/eslint.config.mjs'

export default antfu(
  {
    formatters: true,
    stylistic: {
      indent: 2, // 4, or 'tab'
      quotes: "double", // or 'double'
      semi: true,
    },
  },
  // nuxt
);
