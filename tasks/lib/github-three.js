const request = require('request');

const API_BASE_URL = 'https://api.github.com';
const LATEST_RELEASE_URL = `${API_BASE_URL}/repos/mrdoob/three.js/releases/latest`;

const get = url => new Promise((resolve, reject) => {
  const options = {
    url,
    headers: {
      'User-Agent': 'kevanstannard',
    },
  };
  request(options, (error, response, body) => {
    if (error) {
      reject(error);
      return;
    }
    const result = JSON.parse(body);
    resolve(result);
  });
});

const getLatestVersion = async () => new Promise((resolve, reject) => {
  get(LATEST_RELEASE_URL)
    .then(latestRelease => resolve(latestRelease.name))
    .catch(reject);
});

module.exports = {
  getLatestVersion,
};
