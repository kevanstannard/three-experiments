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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45;
var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
var NEAR = 1;
var FAR = 10000;

var scene = void 0;
var camera = void 0;
var renderer = void 0;
var orbitControls = void 0;
var stats = void 0;
var labelEl = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.autoRotate = true;
  orbitControls.autoRotateSpeed = -2.0;

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  var gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  var axisHelper = new THREE.AxisHelper(50);
  scene.add(axisHelper);

  camera.position.set(0, 50, 100);
  camera.lookAt(origin);

  labelEl = document.createElement('div');
  labelEl.style.position = 'absolute';
  labelEl.style.width = '50px';
  labelEl.style.padding = '10px';
  labelEl.style.backgroundColor = '#333333';
  labelEl.style.color = 'white';
  labelEl.style.top = '120px';
  labelEl.style.left = '0px';
  labelEl.style.textAlign = 'center';
  document.body.appendChild(labelEl);

  // Ref:
  // http://stackoverflow.com/questions/42089919/three-js-camera-rotation-y-to-360-degrees-conversion/42112495?noredirect=1#comment71441294_42112495
  //
  // If you set
  //
  // camera.rotation.order = "YXZ"
  //
  // ( the default is "XYZ" ) the Euler angles will make a lot more sense to you:
  //
  // rotation.y will be the camera heading in radians
  //
  // rotation.x will be the camera pitch in radians
  //
  // rotation.z will be the camera roll in radians
  //
  // The rotations will be applied in that order.
  //
  // For more information, see this stackoverflow answer.
  //
  // http://stackoverflow.com/questions/17517937/three-js-camera-tilt-up-or-down-and-keep-horizon-level/17518092#17518092

  camera.rotation.order = 'YXZ';
}

function update() {
  var heading = camera.rotation.y;
  var radians = heading > 0 ? heading : 2 * Math.PI + heading;
  var degrees = THREE.Math.radToDeg(radians);
  labelEl.innerHTML = Math.floor(degrees);

  stats.update();
  orbitControls.update();
}

function render() {
  renderer.render(scene, camera);
}

function tick() {
  update();
  render();
  requestAnimationFrame(tick);
}

init();
tick();

/***/ })

/******/ });