/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as r86 from "../../libs/three/r86/three";

// @ts-ignore
window.THREE = r86;
require("../../libs/three/r86/controls/OrbitControls");
require("../../libs/three/r86/controls/TrackballControls");

export const THREE = r86;

import Stats_ from "../../libs/stats/r17/stats";
export const Stats = Stats_;

export { windowResize } from "../windowResize";

import KeyboardState_ from "../../libs/stemkoski/KeyboardState.js";
export const KeyboardState = KeyboardState_;
