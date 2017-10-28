const request = require('request');

const API_BASE_URL = 'https://api.github.com';

const latestReleaseUrl = (owner, repo) => `${API_BASE_URL}/repos/${owner}/${repo}/releases/latest`;

const get = url =>
  new Promise((resolve, reject) => {
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

const getLatestRelease = (owner, repo) => get(latestReleaseUrl(owner, repo));

const getLatestVersion = (owner, repo) =>
  new Promise((resolve, reject) => {
    getLatestRelease(owner, repo)
      .then(latestRelease => resolve(latestRelease.name))
      .catch(reject);
  });

module.exports = {
  getLatestVersion,
};
