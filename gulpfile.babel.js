import gulp from 'gulp';
import gutil from 'gulp-util';
import yargs from 'yargs';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack/config';

function threeCDN(threeVersion) {
  return `https://cdnjs.cloudflare.com/ajax/libs/three.js/${threeVersion}/three.min.js`
}

function threeLocal(threeVersion) {
  return `lib/three/${threeVersion}/three.min.js`
}

gulp.task('serve', (callback) => {
  const app = yargs.argv.app;
  const config = webpackConfig(app, threeLocal);
  config.devtool = 'eval';
  config.debug = true;
  const compiler = webpack(config);
  const devServerConfig = {
    contentBase: [
      `./dist/${app}`,
      `./src/static`,
    ],
  };
  new WebpackDevServer(compiler, devServerConfig)
    .listen(8080, 'localhost', (error) => {
      if (error) {
        return callback(error);
      }
      gutil.log('[webpack:serve]', 'http://localhost:8080/');
      callback();
    }
  );
});

gulp.task('build', (callback) => {
  const app = yargs.argv.app;
  const config = webpackConfig(app, threeCDN);
  config.devtool = 'sourcemap';
  config.debug = true;
  const compiler = webpack(config);
  compiler.run((error, stats) => {
    if (error) {
      return callback(error);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true,
    }));
    callback();
  });
});
