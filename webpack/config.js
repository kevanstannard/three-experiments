import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const rootDir = path.resolve(__dirname, '..');
const appsDir = path.resolve(__dirname, '..', 'src', 'apps');
const distDir = path.resolve(__dirname, '..', 'dist');

// function getApps() {
//   return new Promise((resolve, reject) => {
//     fs.readdir(appsDir, function(error, items) {
//       if (error) {
//         return reject(error);
//       }
//       return resolve(items);
//     });
//   });
// }

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

export default function(apps, { threePath }) {
  const entries = {};
  const plugins = [];
  apps.forEach(app => {
    const appPath = path.join(rootDir, `src/apps/${app}`);
    const appConfig = require(`${appPath}/config.js`).default;
    // Entry
    entries[app] = appPath;
    // Copy plugin
    const plugin = new CopyWebpackPlugin([
      {
        from: path.join(rootDir, 'src/index.html'),
        to: path.join(rootDir, `dist/apps/${app}/index.html`),
        transform: transformIndex(appConfig, app, threePath),
      },
    ]);
    plugins.push(plugin);
  });
  // Also copy the libs
  plugins.push(new CopyWebpackPlugin([
    {
      from: path.join(rootDir, 'src/lib'),
      to: path.join(rootDir, `dist/lib`),
    },
  ]));
  return {
    entry: entries,
    plugins: plugins,
    output: {
      path: path.resolve(rootDir, 'dist/apps'),
      filename: '[name]/bundle.js',
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
  };
}
