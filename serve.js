var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config');
var bundler = webpack(webpackConfig);

browserSync({
  notify: false,
  port: 5080,
  server: {
    baseDir: 'src',
    index: 'index.html',
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true,
          //   modules: true,
          //   reasons: true,
          //   errorDetails: true
        },
      }),
      webpackHotMiddleware(bundler),
    ],
  },
  files: ['app/*.css', 'app/*.js', 'app/*.html'],
});
