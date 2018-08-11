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
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
/******/ })
/************************************************************************/
/******/ ({

/***/ 71:
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
var origin = void 0;
var direction = void 0;
var raycaster = void 0;
var controls = void 0;
var arrow = void 0;
var clock = void 0;

var planes = [];

function createPlane(name, z) {
  var geometry = new THREE.PlaneGeometry(10, 10);
  var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = z;
  mesh.name = name;
  planes.push(mesh);
  return mesh;
}

function init() {
  clock = new THREE.Clock();

  scene = new THREE.Scene();

  var gridHelper = new THREE.GridHelper(20, 4);
  scene.add(gridHelper);

  var axisHelper = new THREE.AxisHelper(20);
  scene.add(axisHelper);

  origin = new THREE.Vector3();
  direction = new THREE.Vector3();

  arrow = new THREE.ArrowHelper(direction, origin, 20);
  scene.add(arrow);

  var plane1 = createPlane('Plane 1', 0);
  scene.add(plane1);

  var plane2 = createPlane('Plane 2', -10);
  scene.add(plane2);

  var plane3 = createPlane('Plane 3', -20);
  scene.add(plane3);

  raycaster = new THREE.Raycaster();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(50, 50, -30);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);
}

function updatePlanes() {
  var t = clock.getElapsedTime();
  var x = Math.sin(t);
  var z = Math.cos(t);
  direction.set(x, 0, z).normalize();
  raycaster.set(origin, direction);
  arrow.setDirection(direction);
  planes.forEach(function (plane) {
    return plane.material.color.set(0xffffff);
  });
  var intersections = raycaster.intersectObjects(planes);
  intersections.forEach(function (intersection) {
    intersection.object.material.color.set(0xff0000);
  });
}

function update() {
  controls.update();
  updatePlanes();
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