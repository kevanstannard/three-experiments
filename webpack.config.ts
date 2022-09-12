import * as path from "path";
import * as webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

// Import this if TypeScript types for devServer are not working
// import "webpack-dev-server";

import { experiments } from "./experiment";

const config: webpack.Configuration = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist2"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      // {
      //   test: /\.(t|j)sx?$/,
      //   exclude: /node_modules/,
      //   use: "ts-loader",
      // },

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
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  performance: {
    hints: false,
  },
};

const entry: webpack.Configuration["entry"] = {};

entry["react"] = "react";

entry["three-r82"] = "./src/modules/three/r82.ts";
entry["three-r83"] = "./src/modules/three/r83.ts";
entry["three-r84"] = "./src/modules/three/r84.ts";
entry["three-r86"] = "./src/modules/three/r86.ts";
entry["three-r87"] = "./src/modules/three/r87.ts";
entry["three-r92"] = "./src/modules/three/r92.ts";
entry["three-r144"] = "./src/modules/three/r144.ts";

entry["index"] = {
  import: "./src/index.tsx",
};

experiments.forEach((experiment) => {
  entry[experiment.id] = {
    import: `./src/experiments2/${experiment.id}/index.tsx`,
    dependOn: experiment.dependOn,
  };
});

config.entry = entry;

const plugins: webpack.Configuration["plugins"] = [];

plugins.push(
  new webpack.ProvidePlugin({
    React: "react",
  })
);

plugins.push(new CleanWebpackPlugin());

plugins.push(
  new HtmlWebpackPlugin({
    template: "./templates/main.html",
    filename: `index.html`,
    chunks: ["index"],
  })
);

experiments.forEach((experiment) => {
  plugins.push(
    new HtmlWebpackPlugin({
      template: "./templates/main.html",
      filename: `${experiment.id}.html`,
      chunks: [...experiment.dependOn, experiment.id],
    })
  );
});

config.plugins = plugins;

export default config;
