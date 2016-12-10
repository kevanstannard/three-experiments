import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const rootDir = path.resolve(__dirname, '..');

function createScripts(experimentConfig) {
  const threeFile = experimentConfig.debug ? 'three.js' : 'three.min.js';
  const scripts = [];
  scripts.push(`../../lib/three/${experimentConfig.threeVersion}/${threeFile}`);
  scripts.push(`../../lib/three/${experimentConfig.threeVersion}/controls/OrbitControls.js`);
  scripts.push('../../lib/threex/THREEx.WindowResize.js');
  return scripts;
}

function transformIndexExperiment(experiment, config) {
  const scripts = createScripts(config);
  return (content) => {
    const template = _.template(content);
    return template({
      ...config,
      experiment,
      scripts,
    });
  };
}

function transformIndexExperiments(experimentConfigs) {
  return (content) => {
    const template = _.template(content);
    return template({ experiments: experimentConfigs });
  };
}

export default function (experiments, buildType) {
  const entry = {};
  const plugins = [];
  const experimentConfigs = [];
  experiments.forEach((experiment) => {
    const experimentPath = path.join(rootDir, `src/experiments/${experiment}`);
    // Ensure we have a directory
    if (!fs.lstatSync(experimentPath).isDirectory()) {
      return;
    }
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const experimentConfig = require(`${experimentPath}/config.js`).default;
    if (experimentConfig.public || buildType === 'serve') {
      experimentConfig.id = experiment;
      experimentConfigs.push(experimentConfig);
    }
    entry[experiment] = experimentPath;
    const plugin = new CopyWebpackPlugin([
      {
        from: path.join(rootDir, 'src/index-experiment.html'),
        to: path.join(rootDir, `dist/experiments/${experiment}/index.html`),
        transform: transformIndexExperiment(experiment, experimentConfig),
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
      from: path.join(rootDir, 'src/index-experiments.html'),
      to: path.join(rootDir, 'index.html'),
      transform: transformIndexExperiments(experimentConfigs),
    },
  ]));
  return {
    entry,
    plugins,
    debug: false,
    output: {
      path: rootDir,
      filename: 'dist/experiments/[name]/bundle.js',
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
