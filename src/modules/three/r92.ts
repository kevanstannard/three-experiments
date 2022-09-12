/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as r92 from "../../libs/three/r92/three";

// @ts-ignore
window.THREE = r92;
require("../../libs/three/r92/controls/OrbitControls");
require("../../libs/three/r92/controls/TrackballControls");

export const THREE = r92;

import Stats_ from "../../libs/stats/r17/stats";
export const Stats = Stats_;

export { windowResize } from "../windowResize";

import KeyboardState_ from "../../libs/stemkoski/KeyboardState.js";
export const KeyboardState = KeyboardState_;
