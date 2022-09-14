import request from "request";

const API_BASE_URL = "https://api.github.com";

type Release = { name: string };

function latestReleaseUrl(owner: string, repo: string) {
  return `${API_BASE_URL}/repos/${owner}/${repo}/releases/latest`;
}

function get<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      headers: {
        "User-Agent": "kevanstannard",
      },
    };
    request(options, (error: Error, response: unknown, body: string) => {
      if (error) {
        reject(error);
        return;
      }
      const result: T = JSON.parse(body);
      resolve(result);
    });
  });
}

function getLatestRelease(owner: string, repo: string): Promise<Release> {
  return get(latestReleaseUrl(owner, repo));
}

export function getLatestVersion(owner: string, repo: string): Promise<string> {
  return new Promise((resolve, reject) => {
    getLatestRelease(owner, repo)
      .then((latestRelease) => resolve(latestRelease.name))
      .catch(reject);
  });
}
