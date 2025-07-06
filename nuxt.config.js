// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import path from "path";
export default defineNuxtConfig({
  devServer: {
    port: 3002,
    host: "0.0.0.0",
  },
  ssr: false,
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
    head: {
      title:
        "Easy4cut| free online image cropper,Supports JPG, PNG, WEBP formats",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Professional free image cropper online - crop photos instantly without software installation. Supports JPG, PNG, WEBP formats with preset ratios (1:1, 16:9, 4:3) and custom cropping. Perfect for social media, web design, and photo editing. 100% free, no watermarks.",
        },
        { name: "format-detection", content: "telephone=no" },
        { httpEquiv: "Content-Type", content: "text/html;charset=gb2312" },
        { name: "sogou_site_verification", content: "mXan3oISGM" },
        { name: "msvalidate.01", content: "9C1DEA3D90ADA14FDB750F862CEF56E8" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://www.easy4cut.com/" },
      ],
      script: [
        // Temporarily disabled for debugging
        // {
        //   async: true,
        //   src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=2483469961",
        //   crossorigin: "anonymous",
        // },
      ],
    },
  },

  nitro: {
    preset: "vercel",
    serveStatic: true,
    compatibilityDate: "2025-06-22",
  },

  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
    apiBaseUrl: process.env.API_BASE_URL,
  },

  css: [
    "element-plus/dist/index.css",
    "@/assets/base.css",
    "@/assets/theme.css",
    "@/assets/css/tailwind.css",
  ],

  env: {
    API_BASE_URL: process.env.API_BASE_URL || "https://kieai.erweima.ai/api/v1",
    API_KEY: process.env.API_KEY,
  },

  serverMiddleware: [
    { path: "/api", handler: "~/server-middleware/api-proxy" },
  ],

  privateRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },

  plugins: [
    "~/plugins/axios",
    "~/plugins/firebase",
    "~/plugins/error",
    "~/plugins/google-analytics",
    // "~/plugins/cors",
    { src: "@/plugins/vue-cropper.js", mode: "client", ssr: false },
  ],

  components: true,
  //
  modules: ["@nuxtjs/tailwindcss", "@element-plus/nuxt", "@nuxtjs/i18n"],
  i18n: {
    langDir: "locales",
    locales: [
      { code: "en", file: "en.json", name: "English" },
      { code: "zh", file: "zh.json", name: "中文" },
    ],

    defaultLocale: "en",
    strategy: "prefix_except_default",
    // strategy: "no_prefix",//所有语言共用根路径
    lazy: false,
    // langDir: "i18n/locales",
    detectBrowserLanguage: false, // 禁用自动检测浏览器语言
    warnOnMissingTranslations: true,
    hotReload: false,
    bundle: {
      optimizeTranslationDirective: false,
      runtimeOnly: true,
    },
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
    skipSettingLocaleOnNavigate: true,
  },

  build: {
    transpile: [/^element-plus/, /^vue-cropper/],
    optimization: {
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: ".",
      },
    },
    analyze: false,
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        const ESLintPlugin = require("eslint-webpack-plugin");
        config.plugins.push(
          new ESLintPlugin({
            extensions: ["js", "vue"],
            fix: true,
            emitWarning: true,
          })
        );
      }
    },
  },

  generate: {
    fallback: true,
  },
  // postcss: {
  //   plugins: {
  //     tailwindcss: {}, // 如果你用 TailwindCSS
  //     autoprefixer: {},
  //     // 其他 PostCSS 插件...
  //   },
  // },
});
