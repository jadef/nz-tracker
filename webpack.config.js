const webpack = require('webpack');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  // devtool: '#eval-source-map',
  context: path.join(__dirname, 'src'),
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './index.js',
  ],
  output: {
    path: path.join(__dirname, 'app'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    // new ReactRefreshWebpackPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new ESLintPlugin(),
    new StyleLintPlugin({
      configFile: 'stylelint.config.js',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
  },
  module: {
    rules: [
      {
        //   "enforce": "pre",
        //   "test": /\.vue?$/,
        //   "exclude": /node_modules/,
        //   "use": [
        //     { "loader": "eslint-loader" }
        //   ]
        // }, {
        test: /\.vue?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'vue-loader' },
          { loader: 'webpack-module-hot-accept' },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'vue-style-loader' },
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
};
