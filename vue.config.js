const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/settings.scss";'
      }
    }
  },
  //关闭eslint规范
  lintOnSave: false
}
