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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45;
var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
var NEAR = 1;
var FAR = 500;

var scene = void 0;
var camera = void 0;
var renderer = void 0;
var axisHelper = void 0;
var gridHelper = void 0;
var orbitControls = void 0;
var stats = void 0;
var clock = void 0;
var cube1 = void 0;
var cube2 = void 0;
var cube3 = void 0;
var cube4 = void 0;
var cube5 = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function Cube(rotationPerSecond) {
  this.rotationPerSecond = rotationPerSecond || Math.PI / 2;
  var geometry = new THREE.BoxGeometry(10, 10, 10);
  var material = new THREE.MeshNormalMaterial();
  THREE.Mesh.call(this, geometry, material);
}

Cube.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
  constructor: Cube,
  update: function update(delta) {
    var rotation = this.rotationPerSecond * delta;
    this.rotation.z += rotation;
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
  clock.start();

  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(50, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(20);
  scene.add(axisHelper);

  cube1 = new Cube(Math.PI);
  cube1.position.set(-40, 0, 0);
  scene.add(cube1);

  cube2 = new Cube(Math.PI / 2);
  cube2.position.set(-20, 0, 0);
  scene.add(cube2);

  cube3 = new Cube(Math.PI / 4);
  cube3.position.set(0, 0, 0);
  scene.add(cube3);

  cube4 = new Cube(Math.PI / 8);
  cube4.position.set(20, 0, 0);
  scene.add(cube4);

  cube5 = new Cube(Math.PI / 16);
  cube5.position.set(40, 0, 0);
  scene.add(cube5);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(50, 50, 50);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
}

function update() {
  var delta = clock.getDelta();
  cube1.update(delta);
  cube2.update(delta);
  cube3.update(delta);
  cube4.update(delta);
  cube5.update(delta);
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