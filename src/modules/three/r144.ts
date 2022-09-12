/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as r144 from "../../libs/three/r144/three";

// @ts-ignore
window.THREE = r144;
require("../../libs/three/r144/controls/OrbitControls");
require("../../libs/three/r144/controls/TrackballControls");

export const THREE = r144;

import Stats_ from "../../libs/stats/r17/stats";
export const Stats = Stats_;

export { windowResize } from "../windowResize";

import KeyboardState_ from "../../libs/stemkoski/KeyboardState.js";
export const KeyboardState = KeyboardState_;
