import fs from "fs";
import path from "path";
import request from "request";
import mkdirp from "mkdirp";
import * as github from "./lib/github";

const THREE_DIR = path.resolve(__dirname, "../src/libs/three");

const THREEJS_RAW_BASE_URL =
  "https://raw.githubusercontent.com/mrdoob/three.js";

interface DownloadFile {
  url: string;
  filePath: string;
}

function createRequest(aFile: DownloadFile) {
  const { url, filePath } = aFile;
  const filePathParts = path.parse(filePath);
  return mkdirp(filePathParts.dir).then(() => {
    console.log("Fetching ", url);
    const stream = request(url).pipe(fs.createWriteStream(filePath));
    stream.on("error", (streamError) => {
      console.log("Fetching error", url, streamError);
      return Promise.reject(streamError);
    });
    stream.on("finish", () => {
      return Promise.resolve();
    });
  });
}

function makeRawFileUrl(version: string, filePath: string) {
  return `${THREEJS_RAW_BASE_URL}/${version}${filePath}`;
}

function downloadVersion(version: string) {
  console.log("Downloading version", version);
  const versionRoot = `${THREE_DIR}/${version}`;
  const files: DownloadFile[] = [
    {
      url: makeRawFileUrl(version, "/build/three.js"),
      filePath: `${versionRoot}/three.js`,
    },
    {
      url: makeRawFileUrl(version, "/build/three.min.js"),
      filePath: `${versionRoot}/three.min.js`,
    },
    {
      url: makeRawFileUrl(version, "/examples/js/controls/OrbitControls.js"),
      filePath: `${versionRoot}/controls/OrbitControls.js`,
    },
    {
      url: makeRawFileUrl(
        version,
        "/examples/js/controls/TrackballControls.js"
      ),
      filePath: `${versionRoot}/controls/TrackballControls.js`,
    },
  ];
  return Promise.all(files.map(createRequest));
}

console.log("Getting latest version");
github
  .getLatestVersion("mrdoob", "three.js")
  .then(downloadVersion)
  .catch(console.error);
