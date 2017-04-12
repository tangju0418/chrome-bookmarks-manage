var vue = require('vue-loader')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlwebpackPlugin = require('html-webpack-plugin')
var TransferWebpackPlugin = require('transfer-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path')
var version = require('./package.json').version
var hosting = require('./hosting')

module.exports = {
  entry: {
    index:hosting.entry
  },
  output: {
    path: 'build/' + hosting.publicPath,
    publicPath: hosting.publicPath,
    filename: hosting.isPack ? '[name].js' : '[name].[hash:8].js',
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
        name: 'image',
        test: /\.(png|jpg|gif)$/,
        loader: hosting.isPack ? 'url?limit=10240&name=img/[name].[ext]' : 'url?limit=10240&name=img/[name].[hash:8].[ext]'
      }, {
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.(js|es6)$/,
        exclude: /(node_modules)|(app_modules)/,
        loader: 'babel'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      }, {
        test: /\.hbs$/,
        loader: "handlebars"
      }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'hosting': {
        versionName: '"' + hosting.versionName + '"',
        environmentName: '"' + hosting.environmentName + '"',
        isDevelopment: '"' + hosting.isDevelopment + '"',
        publicPath: '"' + hosting.publicPath + '"',
        settingName: '"' + hosting.settingName + '"',
        isPack: '"' + hosting.isPack + '"',
      }
    }),
    new ExtractTextPlugin(hosting.isPack ? "[name].css" : '[name].[hash:8].css', {
      disable: false,
      allChunks: true
    }),
    new TransferWebpackPlugin([
      { from: 'app_modules', to: 'modules' },
    ]),
    new CopyWebpackPlugin([
      { from: 'app/index.aspx' }
    ]),
    new HtmlwebpackPlugin({
      template: './app/index.html',
      filename: 'app.html',
      minify: { removeComments: !hosting.isDevelopment, collapseWhitespace: !hosting.isDevelopment },
      publicPath: hosting.publicPath,
      isDevelopment: hosting.isDevelopment
    }),
  ],
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      stylus: ExtractTextPlugin.extract("css!stylus?paths=app/startup")
    }
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'app'),
      app_modules: path.resolve(__dirname, 'app_modules'),
      node_modules: path.resolve(__dirname, 'node_modules'),
      store: 'app/store',
      api: 'app/base/api',
      runtime: 'app/base/runtime',
      setting: 'app/settings/app.' + hosting.environmentName.toLowerCase(),
      utils: 'app/base/utils'
    },
  }
}

if (!hosting.isDevelopment) {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
    }
  }))
}
