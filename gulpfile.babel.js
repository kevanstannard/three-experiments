import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import clean from 'gulp-clean';
import yargs from 'yargs';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack/config';

const APPS_DIR = path.join(__dirname, 'src/apps');

function threeCDN(threeVersion) {
  return `https://cdnjs.cloudflare.com/ajax/libs/three.js/${threeVersion}/three.min.js`
}

function threeLocal(threeVersion) {
  return `../../lib/three/${threeVersion}/three.min.js`
}

function getApps() {
  return new Promise((resolve, reject) => {
    fs.readdir(APPS_DIR, function(error, items) {
      if (error) {
        return reject(error);
      }
      return resolve(items);
    });
  });
}

function buildApps(apps) {
  return new Promise((resolve, reject) => {
    const configOptions = { threePath: threeLocal };
    const config = webpackConfig(apps, configOptions);
    config.devtool = 'sourcemap';
    config.debug = true;
    const compiler = webpack(config);
    compiler.run((error, stats) => {
      if (error) {
        return reject(error);
      }
      gutil.log('[webpack:build-all]', stats.toString({ colors: true }));
      resolve(config);
    });
  });
}

function serveApps(apps) {
  return new Promise((resolve, reject) => {
    const configOptions = { threePath: threeLocal };
    const config = webpackConfig(apps, configOptions);
    config.devtool = 'sourcemap';
    config.debug = true;
    const compiler = webpack(config);
    const devServerConfig = {
      contentBase: [
        `./dist`,
        `./src/static`,
      ],
    };
    new WebpackDevServer(compiler, devServerConfig)
      .listen(8080, 'localhost', (error) => {
        if (error) {
          return reject(error);
        }
        gutil.log('[webpack:serve-all]', 'http://localhost:8080/');
        return resolve();
      }
    );
  });
}

gulp.task('clean', () =>
	gulp
		.src('./dist', { read: false })
		.pipe(clean())
);

gulp.task('build', ['clean'], (callback) => {
  getApps()
    .then(buildApps)
    .catch(callback);
});

gulp.task('serve', (callback) => {
  getApps()
    .then(serveApps)
    .catch(callback);
});
