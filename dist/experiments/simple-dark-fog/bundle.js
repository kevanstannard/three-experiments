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
/******/ 	return __webpack_require__(__webpack_require__.s = 77);
/******/ })
/************************************************************************/
/******/ ({

/***/ 77:
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
// let gridHelper;
// let geometry;
// let material;
// let mesh;
var orbitControls = void 0;
var guiControls = void 0;
var pointLight = void 0;
var ambientLight = void 0;
var fog = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function initControls() {
  guiControls = {
    fogEnabled: true,
    fogNear: 1,
    fogFar: 1000
  };
  var gui = new dat.GUI();
  gui.add(guiControls, 'fogEnabled');
  gui.add(guiControls, 'fogNear', 1, 500);
  gui.add(guiControls, 'fogFar', 501, 1500);
}

function init() {
  scene = new THREE.Scene();

  // gridHelper = new THREE.GridHelper(200, 10);
  // scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(200);
  scene.add(axisHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(500, 200, 500);
  camera.lookAt(origin);

  // geometry = new THREE.BoxGeometry(50, 50, 50);
  // material = new THREE.MeshLambertMaterial({ color: 0x888888 });
  // mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 500);
  pointLight.position.set(200, 200, 200);
  scene.add(pointLight);

  var boxSize = 50;
  var gapSize = 40;
  var gridSize = 9;

  var areaSize = boxSize * gridSize + gapSize * (gridSize - 1);
  var start = -(areaSize / 2) + boxSize / 2;
  var end = areaSize / 2 + boxSize / 2;

  for (var x = start; x <= end; x += boxSize + gapSize) {
    for (var z = start; z <= end; z += boxSize + gapSize) {
      var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
      var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, 0, z);
      scene.add(mesh);
    }
  }

  // const texture = new THREE.Texture();
  // const textureLoader = new THREE.ImageLoader();
  // textureLoader.load('../../assets/textures/misc/uv_grid_sm.jpg', (image) => {
  //   texture.image = image;
  //   texture.needsUpdate = true;
  // });

  // const loader = new THREE.OBJLoader();
  // loader.load('../../assets/objects/minecraft-tree.obj', (object) => {
  //   // object.traverse((child) => {
  //   //   if (child instanceof THREE.Mesh) {
  //   //     child.material.map = texture;
  //   //   }
  //   // });
  //   object.position.set(0, 4, 0);
  //   object.scale.set(0.01, 0.01, 0.01);
  //   scene.add(object);
  //   camera.lookAt(object.position);
  // });

  fog = new THREE.Fog(0x000000, 1, 2000);
  scene.fog = fog;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initControls();
}

function update() {
  orbitControls.update();
  if (guiControls.fogEnabled) {
    scene.fog = fog;
    scene.fog.near = guiControls.fogNear;
    scene.fog.far = guiControls.fogFar;
  } else {
    scene.fog = null;
  }
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