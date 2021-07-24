const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(createProxyMiddleware('/blog', {
        target: 'http://localhost:8888',
        secure: false,
        changeOrigin: true,
        ws: true,
        pathRewrite : {
            '^/blog' : ''
        },
    }))
}
