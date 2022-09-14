import fs from "fs";
import path from "path";
import { makeConfig } from "./webpack/config";

const EXPERIMENTS_DIR = path.join(__dirname, "src/experiments");
const experiments = fs.readdirSync(EXPERIMENTS_DIR);

export default makeConfig(experiments, "serve");
