const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = (process.env.PORT && Number(process.env.PORT)) || 8080;

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ]
  },
  devtool: '#source-map',
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') },
      ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: HOST,
    port: PORT,
    open: false,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    proxy: {},
    quiet: true,
    watchOptions: {
      poll: false,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: '"http://www.test.com/"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${HOST}:${PORT}`],
      },
      onErrors: undefined,
      clearConsole: true,
    }),
  ],
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  },
});
