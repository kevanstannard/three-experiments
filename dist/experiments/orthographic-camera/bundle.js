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
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ({

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// See:
// https://www.youtube.com/watch?v=k3adBAnDpos
// http://stackoverflow.com/questions/17558085/three-js-orthographic-camera

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

// View size is how much vertical space to fit in the view
// This is in world coordinates
var VIEW_SIZE = 600;

// The aspect ratio provides information about how wide our view should
// be compared to how tall it should be
var ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

var scene = void 0;
var camera = void 0;
var renderer = void 0;
var axisHelper = void 0;
var gridHelper = void 0;
var controls = void 0;
var ambientLight = void 0;
var light = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(230, 3);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(230);
  scene.add(axisHelper);

  var boxSize = 100;
  var gapSize = 50;
  var gridSize = 3;

  var areaSize = boxSize * gridSize + gapSize * (gridSize - 1);
  var start = -(areaSize / 2) + boxSize / 2;
  var end = areaSize / 2 + boxSize / 2;

  for (var x = start; x <= end; x += boxSize + gapSize) {
    for (var z = start; z <= end; z += boxSize + gapSize) {
      var height = 1 + Math.random() * 199;
      var geometry = new THREE.BoxGeometry(100, height, 100);
      var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, height / 2, z);
      scene.add(mesh);
    }
  }

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  light = new THREE.DirectionalLight(0xffffff, 1, 1000);
  light.position.set(100, 300, 600);
  scene.add(light);

  camera = new THREE.OrthographicCamera(-(ASPECT_RATIO * VIEW_SIZE) / 2, ASPECT_RATIO * VIEW_SIZE / 2, VIEW_SIZE / 2, -(VIEW_SIZE / 2), -1000, 1000);

  camera.position.set(300, 300, 300);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(origin.x, origin.y, origin.z);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
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