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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 8:
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
var controls = void 0;
var pointLight = void 0;
var ambientLight = void 0;

var directionVectorAngle = 0;
var directionVectorHelper = void 0;
var directionVectorRadius = 50;
var directionVector = new THREE.Vector3(1, 1, 1).normalize();

var box1 = void 0;
var box2 = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function Box(size) {
  var geometry = new THREE.BoxGeometry(size, size, size);
  var material = new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: true });
  THREE.Mesh.call(this, geometry, material);

  // Define a vector in world coordinates for this box to look at
  this.lookAtVector = new THREE.Vector3();

  // Set the initial direction of the arrow
  // This MUST have the  correct orientation for the initial box
  // so that when the box is rotated, then this arrow will rotate with it
  var direction = new THREE.Vector3(0, 0, 1);

  // Create a vector to hold the arrows position
  var position = new THREE.Vector3();

  // Create the arrow
  this.arrow = new THREE.ArrowHelper(direction, position, size, 0xffffff);

  // And make it a child of the box
  this.add(this.arrow);
}

Box.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {

  constructor: Box,

  setDirection: function setDirection(vector) {
    this.lookAtVector.set(this.position.x + vector.x, this.position.y + vector.y, this.position.z + vector.z);
    this.lookAt(this.lookAtVector);
  }
});

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  directionVectorHelper = new THREE.ArrowHelper(directionVector, origin, 50);
  scene.add(directionVectorHelper);

  box1 = new Box(20);
  box1.position.set(50, 50, 0);
  scene.add(box1);

  box2 = new Box(30);
  box2.position.set(0, 50, 50);
  scene.add(box2);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(150, 150, 150);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function updateBoxes() {
  box1.setDirection(directionVector);
  box2.setDirection(directionVector);
}

function updateDirectionVector() {
  directionVectorAngle += 0.01;
  var x = directionVectorRadius * Math.cos(directionVectorAngle);
  var y = directionVectorRadius * Math.sin(directionVectorAngle);
  var z = directionVectorRadius * Math.sin(directionVectorAngle) * Math.cos(directionVectorAngle);
  directionVector.set(x, y, z).normalize();
  directionVectorHelper.setDirection(directionVector);
}

function update() {
  updateDirectionVector();
  updateBoxes();
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