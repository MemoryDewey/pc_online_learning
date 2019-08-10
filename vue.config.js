const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css'];
module.exports = {
    assetsDir: 'assets',  //静态资源目录
    devServer: {
        open: true,
        proxy: {
            //配置跨域
            [process.env.VUE_APP_BASE_API]: {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {[`^${process.env.VUE_APP_BASE_API}`]: '/api'}
            },
            '/images':{
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true
            }
        }
    },
    /* 生产环境SourceMap */
    productionSourceMap: false,
    /* webpack 配置*/
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'element-ui': 'ELEMENT',
            'axios': 'axios',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex'
        },
        plugins: [
            /* 开启Gzip压缩*/
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ],
    }
};
