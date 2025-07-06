import { ElMessage, ElLoading } from "element-plus";
import axios from "axios";
import { createPinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
  // 创建 axios 实例
  const instance = axios.create({
    baseURL:
      process.env.NODE_ENV == "development"
        ? "/api"
        : "https://z.mp3drink.cc",
  });

  let loadingInstance = null;

  // Request拦截器：设置Token
  instance.interceptors.request.use(
    (config) => {
      let noLoda = config.noLoad;
      if (!noLoda) {
        loadingInstance = ElLoading.service({
          fullscreen: true,
          background: "#fff",
        });
      }
      config.headers["Authorization"] =
        "Bearer" + localStorage.getItem("token");
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Error拦截器
  instance.interceptors.response.use(
    (response) => {
      if (loadingInstance) {
        loadingInstance.close();
        loadingInstance = null;
      }
      return response.data;
    },
    (error) => {
      if (loadingInstance) {
        loadingInstance.close();
        loadingInstance = null;
      }
      const code = parseInt(error.response?.status);
      switch (code) {
        case 400:
          ElMessage.error("Request error");
          break;
        case 401:
          ElMessage.error("Token exceed the time limit");
          break;
        case 403:
          ElMessage.error("Access Denied");
          break;
        case 404:
          ElMessage.error(
            `Error requesting address: ${error.response?.config?.url}`
          );
          break;
        case 408:
          ElMessage.error("Request timeout");
          break;
        case 500:
          ElMessage.error("Internal server error");
          break;
        case 501:
          ElMessage.error("The service has not been realized");
          break;
        case 502:
          ElMessage.error("Gateway error");
          break;
        case 503:
          ElMessage.error("Services are not available");
          break;
        case 504:
          ElMessage.error("Gateway timeout");
          break;
        case 505:
          ElMessage.error("The HTTP version is not supported");
          break;
      }
      return Promise.reject(error);
    }
  );

  // 挂载到 nuxtApp
  nuxtApp.provide("axios", instance);
  nuxtApp.vueApp.use(createPinia())
});
