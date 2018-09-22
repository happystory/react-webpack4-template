const path = require('path');
const os = require('os');
const dns = require('dns');
const { promisify } = require('util');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const chalk = require('chalk');
const baseWebpackConfig = require('./webpack.base.conf');

const lookup = promisify(dns.lookup);

const HOST = '0.0.0.0';
const PORT = (process.env.PORT && Number(process.env.PORT)) || 8080;

const devWebpackConfig =  merge(baseWebpackConfig, {
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
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: '',
        ignore: ['.*', 'index.html']
      }
    ]),
  ],
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
  },
});


module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = PORT;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      devWebpackConfig.devServer.port = port;

      lookup(os.hostname()).then(res => {
        const ip = res.address;

        devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [chalk`App running at:\n  - Local:   {cyan http://localhost:{bold ${port}/}}\n  - Network: {cyan http://${ip}:{bold ${port}/}}`],
          },
          onErrors: undefined,
          clearConsole: true,
        }));

        resolve(devWebpackConfig);
      }).catch(err => {
        reject(err);
      });
    }
  })
})
