export default defineNuxtPlugin((nuxtApp) => {
  if (process.env.NODE_ENV !== "production") return;

  // Only run on client side
  if (process.server) return;

  // 在页面载入前动态添加 Google Tag Manager 脚本
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-JHPC6MZH60";
  document.head.appendChild(script);

  // 将 gtag 函数添加到全局对象
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("js", new Date());

  // Google Analytics 配置
  gtag("config", "G-JHPC6MZH60");

  return {
    provide: {
      gtag: window.gtag,
    },
  };
});
