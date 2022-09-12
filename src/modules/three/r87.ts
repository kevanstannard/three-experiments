/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as r87 from "../../libs/three/r87/three";

// @ts-ignore
window.THREE = r87;
require("../../libs/three/r87/controls/OrbitControls");
require("../../libs/three/r87/controls/TrackballControls");

export const THREE = r87;

import Stats_ from "../../libs/stats/r17/stats";
export const Stats = Stats_;

export { windowResize } from "../windowResize";

import KeyboardState_ from "../../libs/stemkoski/KeyboardState.js";
export const KeyboardState = KeyboardState_;
