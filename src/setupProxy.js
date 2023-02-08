const proxy =require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy.createProxyMiddleware("/api1", {
      // target: "https://api.plos.org/", //http://devloan2.ibkbox.net"
      target: "http://localwww.ibkbox.net:8081",
      changeOrigin: true,
      secure: false,
      pathRewrite: {"^/api1": ""},
    })
   ,
    proxy.createProxyMiddleware("/api2", {
      target: "http://localwww.ibkbox.net:8088",
      changeOrigin: true,
      pathRewrite: {"^/api2": ""},
    })
    ,
    proxy.createProxyMiddleware("/api3", {
      target: "https://devapi.ibkplatform.net:8443/",
      changeOrigin: true,
      pathRewrite: {"^/api3": ""},
    }),
  )
}
