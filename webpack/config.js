// Ref:
// https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js

import _ from 'lodash';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(__dirname, '..', 'dist');

function transformIndex(config, app, threePath) {
  return function(content, path) {
    const template = _.template(content);
    return template({
      app,
      title: config.title,
      threePath: threePath(config.threeVersion),
    });
  }
}

export default function(app, threePath) {
  const appPath = path.join(rootDir, `src/apps/${app}`);
  const appConfig = require(`${appPath}/config.js`).default;
  return {
    entry: {
      app: [`./src/apps/${app}/index.js`],
    },
    output: {
      path: path.resolve(rootDir, `dist/${app}`),
      filename: 'bundle.js',
    },
    resolve: {
      root: [
        path.resolve(rootDir, 'src/lib'),
      ],
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-0'],
          },
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(rootDir, 'src/index.html'),
          transform: transformIndex(appConfig, app, threePath),
        },
      ]),
    ]
  };
}
