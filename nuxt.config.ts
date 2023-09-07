// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // 默认情况下是vite打包，如果需要webpack打包，需要配置build: { vite: false }
  // builder: "webpack" // 需要安装 @nuxt/webpack-builder
  // 默认情况是ssr，如果需要spa，需要配置ssr: false
  runtimeConfig: {
    // 只能用于服务端的 keys
    apiSecret: "",
    // 可用于客户端的 keys
    public: {
      apiBase: "/api",
    },
  },
  imports: {
    dirs: ["store"],
  },
  app: {
    head: {
      charset: "utf-8", // 快捷方式
      viewport: "width=device-width, initial-scale=1", // 快捷方式
      title: "My App",
      meta: [
        { name: "description", content: "My amazing site." },
        { name: "charset", content: "utf-8" },
      ],
      link: [],
      style: [],
      script: [],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@huntersofbook/naive-ui-nuxt", // 引入 Pinia
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // 自动引入 `defineStore(), storeToRefs()`
          "defineStore",
          "storeToRefs",
        ],
      },
    ],
  ],
});
