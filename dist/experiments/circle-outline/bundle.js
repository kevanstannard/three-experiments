/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Ref:
// https://github.com/mrdoob/three.js/wiki/Drawing-lines

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45;
var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
var NEAR = 1;
var FAR = 10000;

var scene = void 0;
var camera = void 0;
var renderer = void 0;
var axisHelper = void 0;
var gridHelper = void 0;
var controls = void 0;
var line = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function CircleLineGeometry(radius, segments, thetaStart, thetaLength) {
  var args = {
    radius: radius || 50,
    segments: segments || 8,
    thetaStart: thetaStart || 0,
    thetaLength: thetaLength || 2 * Math.PI
  };
  var geometry = new THREE.Geometry();
  var delta = (args.thetaStart + args.thetaLength - args.thetaStart) / args.segments;
  for (var i = 0; i <= args.segments; i += 1) {
    var angle = args.thetaStart + delta * i;
    var x = args.radius * Math.cos(angle);
    var y = args.radius * Math.sin(angle);
    geometry.vertices.push(new THREE.Vector3(x, y, 0));
  }
  return geometry;
}

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(100, 100, 100);
  camera.lookAt(origin);

  var radius = 50;
  var segments = 32;
  var thetaStart = 0;
  var thetaLength = 2 * Math.PI;

  var geometry = new CircleLineGeometry(radius, segments, thetaStart, thetaLength);
  var material = new THREE.LineBasicMaterial({ color: 0xffff00 });
  line = new THREE.Line(geometry, material);
  scene.add(line);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  line.rotation.y += 0.01;
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();

/***/ })

/******/ });