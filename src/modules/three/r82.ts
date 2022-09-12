/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as r82 from "../../libs/three/r82/three";

// @ts-ignore
window.THREE = r82;
require("../../libs/three/r82/controls/OrbitControls");

export const THREE = r82;

import Stats_ from "../../libs/stats/r17/stats";
export const Stats = Stats_;

export { windowResize } from "../windowResize";
