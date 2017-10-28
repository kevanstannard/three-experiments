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
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ({

/***/ 67:
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
var guiControls = void 0;
var pointLight = void 0;
var fog = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function initControls() {
  guiControls = {
    fogEnabled: true,
    fogNear: 1,
    fogFar: 500
  };
  var gui = new dat.GUI();
  gui.add(guiControls, 'fogEnabled');
  gui.add(guiControls, 'fogNear', 1, 500);
  gui.add(guiControls, 'fogFar', 1, 500);
}

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  gridHelper = new THREE.GridHelper(500, 20);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(500);
  scene.add(axisHelper);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(100, 100, 100);
  scene.add(pointLight);

  var texture = new THREE.Texture();
  var textureLoader = new THREE.ImageLoader();
  textureLoader.load('../../assets/textures/misc/uv_grid_sm.jpg', function (image) {
    texture.image = image;
    texture.needsUpdate = true;
  });

  var numBoxes = 10;
  var boxSize = 40;
  var delta = Math.PI * 2 / numBoxes;

  var lastBox = void 0;

  for (var count = 0; count < 5; count += 1) {
    var radius = (count + 1) * 100;
    for (var angle = 0; angle < Math.PI * 2; angle += delta) {
      var x = radius * Math.cos(angle);
      var z = radius * Math.sin(angle);
      var y = 0;
      var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
      var material = new THREE.MeshLambertMaterial({ map: texture });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.lookAt(origin);
      scene.add(mesh);
      lastBox = mesh;
    }
  }

  var cameraHeight = boxSize;

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, cameraHeight, 0);
  camera.lookAt(new THREE.Vector3(lastBox.position.x, cameraHeight, lastBox.position.z));

  fog = new THREE.Fog(0xffffff, 1, 300);
  scene.fog = fog;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initControls();
}

function update() {
  camera.rotation.y += 0.001;
  // orbitControls.update();
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