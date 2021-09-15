const LoadableWebpackPlugin = require('@loadable/webpack-plugin')
const path = require('path')

module.exports = {
  modifyWebpackOptions(opts) {
    const options = opts.options.webpackOptions
    options.postCssOptions.plugins.unshift(require('tailwindcss'))
    return options
  },
  modifyWebpackConfig(opts) {
    const config = opts.webpackConfig
    if (opts.env.target === 'web') {
      const filename = path.resolve(__dirname, 'build')
      config.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        })
      )
      if (process.env.ANALYZE) {
        const BundleAnalyzerPlugin =
          require('webpack-bundle-analyzer').BundleAnalyzerPlugin
        config.plugins.push(new BundleAnalyzerPlugin())
      }
    }
    return config
  },
}
