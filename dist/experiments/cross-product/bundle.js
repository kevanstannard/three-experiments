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
var axisHelper = void 0;
var gridHelper = void 0;
var orbitControls = void 0;
var stats = void 0;
var clock = void 0;

var origin = void 0;

var direction1 = void 0;
var direction1Arrow = void 0;

var direction2 = void 0;
var direction2Arrow = void 0;

var direction3 = void 0;
var direction3Arrow = void 0;

var line = void 0;

function Line() {
  this.start = new THREE.Vector3();
  this.end = new THREE.Vector3();
  var material = new THREE.LineBasicMaterial({
    color: 0xffffff
  });
  var geometry = new THREE.Geometry();
  geometry.vertices.push(this.start, this.end);
  THREE.Line.call(this, geometry, material);
}

Line.prototype = Object.assign(Object.create(THREE.Line.prototype), {

  constructor: Line,

  set: function set(start, end) {
    this.start.copy(start);
    this.end.copy(end);
  }
});

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function init() {
  clock = new THREE.Clock();

  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(2, 4);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(2);
  scene.add(axisHelper);

  origin = new THREE.Vector3(0, 0, 0);

  direction1 = new THREE.Vector3();
  direction1Arrow = new THREE.ArrowHelper(direction1, origin, 1, 0xff0000);
  scene.add(direction1Arrow);

  direction2 = new THREE.Vector3();
  direction2Arrow = new THREE.ArrowHelper(direction2, origin, 1, 0x00ff00);
  scene.add(direction2Arrow);

  direction3 = new THREE.Vector3();
  direction3Arrow = new THREE.ArrowHelper(direction3, origin, 1, 0x0000ff);
  scene.add(direction3Arrow);

  line = new Line();
  scene.add(line);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(3, 3, 3);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
}

function update() {
  var t = clock.getElapsedTime();
  var a = Math.sin(t / 10);
  var b = Math.cos(t / 10);

  direction1.set(a, 0, b).normalize();
  direction2.set(a, b, 0).normalize();
  direction3.crossVectors(direction1, direction2).normalize();

  direction1Arrow.setDirection(direction1);
  direction2Arrow.setDirection(direction2);
  direction3Arrow.setDirection(direction3);

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