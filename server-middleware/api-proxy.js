const { createProxyMiddleware } = require("http-proxy-middleware");

console.log("API代理中间件已加载 - 文件路径:", __filename); // 详细初始化日志
console.log("当前环境变量API_BASE_URL:", process.env.API_BASE_URL || "未设置");

module.exports = function (req, res, next) {
  console.log("请求完整信息----:", {
    url: req.url,
    method: req.method,
    headers: req.headers,
    originalUrl: req.originalUrl,
    baseUrl: req.baseUrl,
  });

  // 匹配所有/api开头的路径和/proxy-endpoint(检查url和originalUrl)
  const shouldProxy = [req.url, req.originalUrl].some(
    (url) =>
      url &&
      (url.startsWith("/api/") || url === "/api" || url === "/proxy-endpoint")
  );

  if (shouldProxy) {
    console.log("代理目标:", process.env.API_BASE_URL || "未设置API_BASE_URL");
    console.log("完整请求路径:", req.url);
    console.log("请求方法:", req.method);

    const proxy = createProxyMiddleware({
      target: process.env.API_BASE_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        if (path === "/proxy-endpoint") {
          return path; // Keep /proxy-endpoint as-is
        }
        return path.replace(/^\/api/, ""); // Remove /api prefix for other routes
      },
      onProxyReq(proxyReq, req) {
        console.log("代理请求头:", req.headers);
        proxyReq.setHeader("X-Forwarded-For", req.ip);
        if (req.headers["authorization"]) {
          proxyReq.setHeader("Authorization", req.headers["authorization"]);
        }
      },
      onError(err, req, res) {
        console.error("代理错误:", err);
        res.status(500).send("Proxy error");
      },
    });

    return proxy(req, res, next);
  }

  next();
};
