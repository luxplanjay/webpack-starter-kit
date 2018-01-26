const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  context: SRC_DIR,
  entry: {
    app: ['babel-polyfill', './index.js']
  },
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: SRC_DIR,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        include: SRC_DIR,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.scss$/,
        include: SRC_DIR,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpe?g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              limit: 10000
            }
          },
          'img-loader'
        ]
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [SRC_DIR, 'node_modules']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      hash: false
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
      disable: false
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  devServer: {
    contentBase: DIST_DIR,
    publicPath: '',
    historyApiFallback: true,
    noInfo: false,
    quiet: false,
    stats: 'errors-only',
    clientLogLevel: 'warning',
    compress: true,
    port: 8000
  }
};
