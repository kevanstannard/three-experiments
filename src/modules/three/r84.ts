/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as r84 from "../../libs/three/r84/three";

// @ts-ignore
window.THREE = r84;
require("../../libs/three/r84/controls/OrbitControls");
require("../../libs/three/r84/controls/TrackballControls");

export const THREE = r84;

import Stats_ from "../../libs/stats/r17/stats";
export const Stats = Stats_;

export { windowResize } from "../windowResize";

import KeyboardState_ from "../../libs/stemkoski/KeyboardState.js";
export const KeyboardState = KeyboardState_;
