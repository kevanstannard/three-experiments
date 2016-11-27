import path from 'path';
import _ from 'lodash';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const rootDir = path.resolve(__dirname, '..');

function createScripts(appConfig) {
  const scripts = [];
  scripts.push(`../../lib/three/${appConfig.threeVersion}/three.min.js`);
  scripts.push(`../../lib/three/${appConfig.threeVersion}/controls/OrbitControls.js`);
  return scripts;
}

function transformIndex(app, config) {
  const scripts = createScripts(config);
  return (content) => {
    const template = _.template(content);
    return template({
      ...config,
      app,
      scripts,
    });
  };
}

export default function (apps) {
  const entry = {};
  const plugins = [];
  apps.forEach((app) => {
    const appPath = path.join(rootDir, `src/apps/${app}`);
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const appConfig = require(`${appPath}/config.js`).default;
    entry[app] = appPath;
    const plugin = new CopyWebpackPlugin([
      {
        from: path.join(rootDir, 'src/index.html'),
        to: path.join(rootDir, `dist/apps/${app}/index.html`),
        transform: transformIndex(app, appConfig),
      },
    ]);
    plugins.push(plugin);
  });
  // Also copy the libs
  plugins.push(new CopyWebpackPlugin([
    {
      from: path.join(rootDir, 'src/lib'),
      to: path.join(rootDir, 'dist/lib'),
    },
  ]));
  return {
    entry,
    plugins,
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
