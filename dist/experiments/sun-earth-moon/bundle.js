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
/******/ 	return __webpack_require__(__webpack_require__.s = 91);
/******/ })
/************************************************************************/
/******/ ({

/***/ 91:
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

var sun = void 0;
var earth = void 0;
var moon = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  // For each body we create
  // 1) a Mesh
  // 2) an Object3D
  //
  // The Object3D is the parent of the mesh
  // The Object3D is the parent of other satellites
  //
  // When we rotate the Object3D it then rotates its satellites
  //
  // We can also undo the rotation on the mesh,
  // (and give it an addtional rotattion)
  // to prevent the mesh simply rotating with the Object3D

  var sunGeometry = new THREE.SphereGeometry(30, 16, 16);
  var sunMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00, wireframe: true });
  var sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
  sun = new THREE.Object3D();
  sun.add(sunMesh);
  scene.add(sun);

  var earthGeometry = new THREE.SphereGeometry(10, 16, 16);
  var earthMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff, wireframe: true });
  var earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  earth = new THREE.Object3D();
  earth.add(earthMesh);
  earth.position.x = 80;
  sun.add(earth);

  var moonGeometry = new THREE.SphereGeometry(3, 16, 16);
  var moonMaterial = new THREE.MeshLambertMaterial({ color: 0x888888, wireframe: true });
  var moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
  moon = new THREE.Object3D();
  moon.add(moonMesh);
  moon.position.x = 20;
  earth.add(moon);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  sun.rotation.y += 0.01;
  sun.children[0].rotation.y -= 0.01 + 0.001;

  earth.rotation.y += 0.01;
  earth.children[0].rotation.y -= 0.01 + 0.02;

  moon.rotation.y += 0.01;
  moon.children[0].rotation.y -= 0.01;

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