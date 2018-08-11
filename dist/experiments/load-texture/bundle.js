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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ({

/***/ 30:
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
var pointLight = void 0;
var ambientLight = void 0;
var stats = void 0;

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
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  // const gridHelper = new THREE.GridHelper(100, 10);
  // scene.add(gridHelper);

  // const axisHelper = new THREE.AxisHelper(100);
  // scene.add(axisHelper);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  var geometry = new THREE.BoxGeometry(50, 50, 50);

  var material1 = new THREE.MeshStandardMaterial();
  var box1 = new THREE.Mesh(geometry, material1);
  box1.position.x = -50;
  scene.add(box1);

  var material2 = new THREE.MeshStandardMaterial();
  var box2 = new THREE.Mesh(geometry, material2);
  box2.position.x = 0;
  scene.add(box2);

  var material3 = new THREE.MeshStandardMaterial();
  var box3 = new THREE.Mesh(geometry, material3);
  box3.position.x = 50;
  scene.add(box3);

  // Local
  var imageUrl1 = '../../assets/textures/misc/isaac-128x128.jpg';

  // Data URI
  // ** Does not work on Safari **
  var imageUrl2 = 'data:image/jpeg;base64,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';

  // External
  var imageUrl3 = 'https://upload.wikimedia.org/wikipedia/commons/3/39/GodfreyKneller-IsaacNewton-1689.jpg';

  var loader = new THREE.TextureLoader();

  // IMPORTANT:
  // When image URLs are on a different domain
  // then we need to specify that it's a CORS anonymouns cross origin request
  // This was introduced in r84
  loader.crossOrigin = 'anonymous';

  loader.load(imageUrl1, function (texture) {
    material1.map = texture;
    material1.needsUpdate = true;
  });

  loader.load(imageUrl2, function (texture) {
    material2.map = texture;
    material2.needsUpdate = true;
  });

  loader.load(imageUrl3, function (texture) {
    material3.map = texture;
    material3.needsUpdate = true;
  });
}

function update() {
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