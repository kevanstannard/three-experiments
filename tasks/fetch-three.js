/* eslint no-console: off */

const fs = require('fs');
const path = require('path');
const request = require('request');
const mkdirp = require('mkdirp');

const githubThree = require('./lib/github-three');

const THREE_DIR = path.resolve(__dirname, '../src/libs/three');

const createRequest = (aFile) => {
  const { url, filePath } = aFile;
  const filePathParts = path.parse(filePath);
  return new Promise((resolve, reject) => {
    mkdirp(filePathParts.dir, (mkdirError) => {
      if (mkdirError) {
        reject(mkdirError);
      } else {
        console.log('Fetching ', url);
        const stream = request(url).pipe(fs.createWriteStream(filePath));
        stream.on('error', (streamError) => {
          console.log('Fetching error', url, streamError);
          reject(streamError);
        });
        stream.on('finish', () => {
          resolve();
        });
      }
    });
  });
};

const downloadVersion = (version) => {
  console.log('Downloading version', version);
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
      url: `https://github.com/mrdoob/three.js/raw/${version}/examples/js/controls/OrbitControls.js`,
      filePath: `${versionRoot}/controls/OrbitControls.js`,
    },
    {
      url: `https://github.com/mrdoob/three.js/raw/${version}/examples/js/controls/TrackballControls.js`,
      filePath: `${versionRoot}/controls/TrackballControls.js`,
    },
  ];
  return Promise.all(files.map(createRequest));
};

console.log('Getting latest version');
githubThree
  .getLatestVersion()
  .then(downloadVersion)
  .catch(console.error);
