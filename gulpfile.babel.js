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
    const config = webpackConfig(apps, 'build');
    const compiler = webpack(config);
    compiler.run((error, stats) => {
      if (error) {
        return reject(error);
      }
      gutil.log('[webpack:build]', stats.toString({ colors: true }));
      return resolve(config);
    });
  });
}

function serve(apps) {
  const PORT = 8080;
  const HOST = 'localhost';
  return new Promise((resolve, reject) => {
    const config = webpackConfig(apps, 'serve');
    const compiler = webpack(config);
    const devServerConfig = {
      setup: (app) => {
        app.use('/dist/lib', express.static('./src/lib'));
      },
    };
    new WebpackDevServer(compiler, devServerConfig)
      .listen(PORT, HOST, (error) => {
        if (error) {
          return reject(error);
        }
        gutil.log('[webpack:serve]', `http://${HOST}:${PORT}/`);
        return resolve();
      },
    );
  });
}

gulp.task('clean', () =>
  gulp
    .src(['./dist', './index.html'], { read: false })
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
