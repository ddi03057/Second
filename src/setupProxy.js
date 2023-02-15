const proxy =require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy.createProxyMiddleware("/api1", {
      // REACT_APP_MNB_API_URL
      //target: "http://localwww.ibkbox.net:8081",
      target: process.env.REACT_APP_MNB_API_URL,
      changeOrigin: true,
      secure: false,
      pathRewrite: {"^/api1": ""},
    })
   ,
    proxy.createProxyMiddleware("/api2", {
      // REACT_APP_LRB_API_URL
      //target: "http://localwww.ibkbox.net:8088",
      target: process.env.REACT_APP_LRB_API_URL,
      changeOrigin: true,
      pathRewrite: {"^/api2": ""},
    })
    ,
    proxy.createProxyMiddleware("/api3", {
      // REACT_APP_IBK_OAP_URL
      //target: "https://devapi.ibkplatform.net:8443/",
      target: process.env.REACT_APP_IBK_OAP_URL,
      changeOrigin: true,
      pathRewrite: {"^/api3": ""},
    }),
  )
}
