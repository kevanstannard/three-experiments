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
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
/******/ })
/************************************************************************/
/******/ ({

/***/ 74:
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
var orbitControls = void 0;
// let ambientLight;
var stats = void 0;
var rectLight = void 0;
var rectLightHelper = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function Wall(width, height) {
  var material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 1,
    side: THREE.DoubleSide
  });
  var geometry = new THREE.PlaneBufferGeometry(width, height);
  THREE.Mesh.call(this, geometry, material);
}

Wall.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
  constructor: Wall
});

function Room(width, height, depth) {
  THREE.Object3D.call(this);

  var back = new Wall(width, height);
  back.position.set(0, 0, -depth / 2);
  this.add(back);

  var right = new Wall(depth, height);
  right.rotation.y = Math.PI / 2;
  right.position.set(-width / 2, 0, 0);
  this.add(right);

  var left = new Wall(depth, height);
  left.rotation.y = -Math.PI / 2;
  left.position.set(width / 2, 0, 0);
  this.add(left);

  var bottom = new Wall(width, depth);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.set(0, -height / 2, 0);
  this.add(bottom);

  var top = new Wall(width, depth);
  top.rotation.x = Math.PI / 2;
  top.position.set(0, height / 2, 0);
  this.add(top);
}

Room.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
  constructor: Room
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
  scene = new THREE.Scene();

  axisHelper = new THREE.AxisHelper(50);
  scene.add(axisHelper);

  // ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  // scene.add(ambientLight);

  var roomSize = 100;
  var room = new Room(roomSize, roomSize, roomSize);
  scene.add(room);

  rectLight = new THREE.RectAreaLight(0xFFFFFF, 1000, 5, 20);
  rectLight.matrixAutoUpdate = true;
  rectLight.position.set(5, 5, 0);

  rectLightHelper = new THREE.RectAreaLightHelper(rectLight);
  rectLight.add(rectLightHelper);

  scene.add(rectLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 0, 200);
  camera.lookAt(origin);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
}

function update() {
  var t = Date.now() / 1000;
  var r = 15.0;
  var lx = r * Math.cos(t);
  var lz = r * Math.sin(t);
  var ly = 5.0 + 5.0 * Math.sin(t / 3.0);
  rectLight.position.set(lx, ly, lz);
  rectLight.lookAt(origin);
  rectLight.updateMatrixWorld();

  rectLightHelper.update();
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