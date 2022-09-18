import fs from "fs";
import path from "path";
import _ from "lodash";
import * as webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";

const rootDir = path.resolve(__dirname, "..");

function transformIndexExperiment(experiment: string, config: any) {
  const scripts = config.scripts || [];
  const styles = config.styles || [];
  return (content: any) => {
    const template = _.template(content);
    const templateConfig = {
      ...config,
      experiment,
      scripts,
      styles,
    };
    return template(templateConfig);
  };
}

function transformIndexExperiments(experimentConfigs: any[]) {
  return (content: any) => {
    const template = _.template(content);
    return template({ experiments: experimentConfigs });
  };
}

export function makeConfig(
  experiments: string[],
  buildType: "build" | "serve"
) {
  const entry: webpack.Configuration["entry"] = {};
  const plugins: webpack.Configuration["plugins"] = [];
  const experimentConfigs: any[] = [];
  experiments.forEach((experiment) => {
    const experimentPath = path.join(rootDir, `src/experiments/${experiment}`);

    // Ensure we have a directory
    if (!fs.lstatSync(experimentPath).isDirectory()) {
      return;
    }

    const experimentConfig = require(`${experimentPath}/config.js`).default;

    const includeExperiment =
      buildType === "serve" ||
      (buildType === "build" && experimentConfig.public);

    if (includeExperiment) {
      experimentConfig.id = experiment;
      experimentConfigs.push(experimentConfig);
      entry[experiment] = experimentPath;
      const plugin = new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(rootDir, "src/index-experiment.html"),
            to: path.join(rootDir, `dist/experiments/${experiment}/index.html`),
            transform: transformIndexExperiment(experiment, experimentConfig),
          },
        ],
      });
      plugins.push(plugin);
    }
  });

  // Copy the static files
  plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(rootDir, "src/assets"),
          to: path.join(rootDir, "dist/assets"),
        },
        {
          from: path.join(rootDir, "src/libs"),
          to: path.join(rootDir, "dist/libs"),
        },
        {
          from: path.join(rootDir, "src/modules"),
          to: path.join(rootDir, "dist/modules"),
        },
        {
          from: path.join(rootDir, "src/index-experiments.html"),
          to: path.join(rootDir, "index.html"),
          transform: transformIndexExperiments(experimentConfigs),
        },
      ],
    })
  );

  const config: webpack.Configuration = {
    mode: buildType === "build" ? "production" : "development",
    entry,
    plugins,
    output: {
      path: rootDir,
      filename: "dist/experiments/[name]/bundle.js",
    },
    resolve: {
      modules: ["node_modules", "src"],
      extensions: [".js", ".json", ".ts"],
    },
    externals: {
      "../../libs/three/r144/three.js": "THREE",
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                },
              },
            },
          },
        },
      ],
    },
  };

  return config;
}
