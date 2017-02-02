/* eslint no-console: 0 */

import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import async from 'async';
import request from 'request';
import mkdirp from 'mkdirp';

const THREE_DIR = path.resolve(__dirname, '../src/libs/three');

const version = 'r84';
const versionRoot = `${THREE_DIR}/${version}`;

const threeBuildUrl = `https://github.com/mrdoob/three.js/raw/${version}/build`;

const files = [
  {
    url: `${threeBuildUrl}/three.js`,
    filePath: `${versionRoot}/three.js`,
  },
  {
    url: `${threeBuildUrl}/three.min.js`,
    filePath: `${versionRoot}/three.min.js`,
  },
  {
    url: 'https://github.com/mrdoob/three.js/raw/r84/examples/js/controls/OrbitControls.js',
    filePath: `${versionRoot}/controls/OrbitControls.js`,
  },
];

function createRequest(aFile) {
  const { url, filePath } = aFile;
  const filePathParts = path.parse(filePath);
  return (callback) => {
    console.log('Ensuring dir ', filePathParts.dir);
    mkdirp(filePathParts.dir, (err) => {
      if (err) {
        callback(err);
        return;
      }
      console.log('Fetching ', url);
      const stream = request(url).pipe(fs.createWriteStream(filePath));
      stream.on('error', (error) => {
        console.log('Fetching error', url, error);
        callback(error);
      });
      stream.on('finish', () => {
        console.log('Done fetching', url);
        callback();
      });
    });
  };
}

gulp.task('fetchthree', (done) => {
  const requests = files.map(createRequest);
  async.parallel(requests, done);
});
