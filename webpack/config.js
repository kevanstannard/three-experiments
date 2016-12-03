import path from 'path';
import _ from 'lodash';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const rootDir = path.resolve(__dirname, '..');

function createScripts(appConfig) {
  const scripts = [];
  scripts.push(`../../lib/three/${appConfig.threeVersion}/three.min.js`);
  scripts.push(`../../lib/three/${appConfig.threeVersion}/controls/OrbitControls.js`);
  scripts.push('../../lib/threex/THREEx.WindowResize.js');
  return scripts;
}

function transformIndexApp(app, config) {
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

function transformIndexApps(appConfigs) {
  return (content) => {
    const template = _.template(content);
    return template({ apps: appConfigs });
  };
}

export default function (apps, buildType) {
  const entry = {};
  const plugins = [];
  const appConfigs = [];
  apps.forEach((app) => {
    const appPath = path.join(rootDir, `src/apps/${app}`);
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const appConfig = require(`${appPath}/config.js`).default;
    if (appConfig.public || buildType === 'serve') {
      appConfig.id = app;
      appConfigs.push(appConfig);
    }
    entry[app] = appPath;
    const plugin = new CopyWebpackPlugin([
      {
        from: path.join(rootDir, 'src/index-app.html'),
        to: path.join(rootDir, `dist/apps/${app}/index.html`),
        transform: transformIndexApp(app, appConfig),
      },
    ]);
    plugins.push(plugin);
  });
  // Copy the libs
  plugins.push(new CopyWebpackPlugin([
    {
      from: path.join(rootDir, 'src/lib'),
      to: path.join(rootDir, 'dist/lib'),
    },
  ]));
  // Create the main index file
  plugins.push(new CopyWebpackPlugin([
    {
      from: path.join(rootDir, 'src/index-apps.html'),
      to: path.join(rootDir, 'index.html'),
      transform: transformIndexApps(appConfigs),
    },
  ]));
  return {
    entry,
    plugins,
    debug: false,
    output: {
      path: rootDir,
      filename: 'dist/apps/[name]/bundle.js',
    },
    resolve: {
      root: [
        path.resolve('./src'),
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
        {
          test: /\.json$/,
          loader: 'json',
        },
      ],
    },
  };
}
