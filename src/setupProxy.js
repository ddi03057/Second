const proxy =require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy.createProxyMiddleware("/api1", {
      target: "https://api.plos.org/",
      changeOrigin: true,
      pathRewrite: {"^/api1": ""},
    })
   ,
    proxy.createProxyMiddleware("/api2", {
      target: "https://tools.learningcontainer.com",
      changeOrigin: true,
      pathRewrite: {"^/api2": ""},
    })
    ,
    proxy.createProxyMiddleware("/api3", {
      target: "https://ibk.co.kr",
      changeOrigin: true,
      pathRewrite: {"^/api3": ""},
    })
  )
}