import fs from "fs";
import path from "path";
import gulp from "gulp";
import gutil from "gulp-util";
import clean from "gulp-clean";
import express from "express";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import webpackConfig from "./webpack/config";

const EXPERIMENTS_DIR = path.join(__dirname, "src/experiments");

function getExperiments() {
  return new Promise((resolve, reject) => {
    fs.readdir(EXPERIMENTS_DIR, (error, items) => {
      if (error) {
        return reject(error);
      }
      return resolve(items);
    });
  });
}

function build(experiments) {
  return new Promise((resolve, reject) => {
    const config = webpackConfig(experiments, "build");
    const compiler = webpack(config);
    compiler.run((error, stats) => {
      if (error) {
        return reject(error);
      }
      gutil.log("[webpack:build]", stats.toString({ colors: true }));
      return resolve(config);
    });
  });
}

function dev(experiments) {
  const PORT = 8001;
  const HOST = "localhost";
  return new Promise((resolve, reject) => {
    const config = webpackConfig(experiments, "serve");
    const compiler = webpack(config);
    const devServerConfig = {
      stats: { colors: true },
      before: experiment => {
        experiment.use("/dist", express.static("./src"));
      }
    };
    new WebpackDevServer(compiler, devServerConfig).listen(
      PORT,
      HOST,
      error => {
        if (error) {
          return reject(error);
        }
        gutil.log("[webpack:serve]", `http://${HOST}:${PORT}/`);
        return resolve();
      }
    );
  });
}

gulp.task("clean", () =>
  gulp.src(["./dist", "./index.html"], { read: false }).pipe(clean())
);

gulp.task("build", gulp.series(["clean"], () => getExperiments().then(build)));

gulp.task("dev", () => getExperiments().then(dev));
