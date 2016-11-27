import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import clean from 'gulp-clean';
import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack/config';

const APPS_DIR = path.join(__dirname, 'src/apps');

function getApps() {
  return new Promise((resolve, reject) => {
    fs.readdir(APPS_DIR, (error, items) => {
      if (error) {
        return reject(error);
      }
      return resolve(items);
    });
  });
}

function build(apps) {
  return new Promise((resolve, reject) => {
    const config = webpackConfig(apps);
    config.devtool = 'sourcemap';
    config.debug = true;
    const compiler = webpack(config);
    compiler.run((error, stats) => {
      if (error) {
        return reject(error);
      }
      gutil.log('[webpack:build-all]', stats.toString({ colors: true }));
      return resolve(config);
    });
  });
}

function serve(apps) {
  return new Promise((resolve, reject) => {
    const config = webpackConfig(apps);
    config.devtool = 'sourcemap';
    config.debug = true;
    const compiler = webpack(config);
    const devServerConfig = {
      publicPath: '/dist/apps/',
      setup: (app) => {
        app.use('/dist/lib', express.static('./src/lib'));
      },
    };
    new WebpackDevServer(compiler, devServerConfig)
      .listen(8080, 'localhost', (error) => {
        if (error) {
          return reject(error);
        }
        gutil.log('[webpack:serve-all]', 'http://localhost:8080/');
        return resolve();
      },
    );
  });
}

gulp.task('clean', () =>
  gulp
    .src('./dist', { read: false })
    .pipe(clean()),
);

gulp.task('build', ['clean'], (callback) => {
  getApps()
    .then(build)
    .catch(callback);
});

gulp.task('serve', (callback) => {
  getApps()
    .then(serve)
    .catch(callback);
});
