const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
    css: {
      loaderOptions: {
        postcss: {
          plugins: [
            autoprefixer(),
            pxtorem({
              rootValue: 75,
              propList: ['*'],
              selectorBlackList: ['van']
            })
          ]
        }
      }
    },
    devServer: {
        open: true, // 是否自动弹出浏览器页面
        host: '192.168.8.151',
        port: '8080',
        https: false,
        hotOnly: false

    },
    chainWebpack(config) {
        config.resolve.symlinks(true);
        config.resolve.alias
            .set('components', resolve('src/components'))
            .set('assets', resolve('src/assets'))
            .set('pages', resolve('src/pages'))
            .set('api', resolve('src/api'));
        config.plugin('context')
            .use(webpack.ContextReplacementPlugin,
                [/moment[/\\]locale$/, /zh-cn/])
    },
    // eslint-disable-next-line no-dupe-keys
    publicPath: '/goods',
    parallel: false,
    productionSourceMap:false,

};