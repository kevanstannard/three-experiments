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
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ({

/***/ 55:
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
// let axisHelper;
// let gridHelper;
var orbitControls = void 0;
var pointLight = void 0;
var ambientLight = void 0;
// let mesh;
// let controls;
var stats = void 0;

var boxSize = 50;

var origin = new THREE.Vector3(0, 0, 0);

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

// function initControls() {
//   controls = {
//     xRotation: 0,
//     yRotation: 0,
//     zRotation: 0,
//   };
//   const gui = new dat.GUI();
//   gui.add(controls, 'xRotation', 0, Math.PI * 2);
//   gui.add(controls, 'yRotation', 0, Math.PI * 2);
//   gui.add(controls, 'zRotation', 0, Math.PI * 2);
// }

function init() {
  scene = new THREE.Scene();

  // gridHelper = new THREE.GridHelper(100, 10);
  // scene.add(gridHelper);

  // axisHelper = new THREE.AxisHelper(50);
  // scene.add(axisHelper);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
  scene.add(ambientLight);

  for (var x = 0; x <= 2; x += 1) {
    var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    var material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      // side: THREE.BackSide,
      metalness: 0,
      roughness: 1
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (x - 1) * boxSize;
    scene.add(mesh);
  }

  // for (let z = 0; z <= 2; z += 1) {
  //   const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  //   const material = new THREE.MeshStandardMaterial({
  //     color: 0xffffff,
  //     // side: THREE.BackSide,
  //     metalness: 0,
  //     roughness: 1,
  //   });
  //   const mesh = new THREE.Mesh(geometry, material);
  //   mesh.position.x = -boxSize * 2;
  //   mesh.position.z = boxSize + (z - 1) * boxSize;
  //   scene.add(mesh);
  // }

  pointLight = new THREE.PointLight(0xffff00, 1, boxSize * 2);
  pointLight.position.set(0, 0, boxSize);
  scene.add(pointLight);

  var sphereSize = 1;
  var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
  scene.add(pointLightHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, boxSize * 2, boxSize * 4);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.target = origin;

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
}

var angle = 0;

function update() {
  angle += 0.01;
  pointLight.position.x = Math.sin(angle) * boxSize;
  stats.update();
  orbitControls.update();
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