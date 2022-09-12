/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as r83 from "../../libs/three/r83/three";

// @ts-ignore
window.THREE = r83;
require("../../libs/three/r83/controls/OrbitControls");
require("../../libs/three/r83/loaders/OBJLoader");

export const THREE = r83;

import Stats_ from "../../libs/stats/r17/stats";
export const Stats = Stats_;

export { windowResize } from "../windowResize";

import DatGUI_ from "../../libs/dat.gui/0.6.2/dat.gui";
export const DatGUI = DatGUI_;

import KeyboardState_ from "../../libs/stemkoski/KeyboardState.js";
export const KeyboardState = KeyboardState_;
