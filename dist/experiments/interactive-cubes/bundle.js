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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
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
var primaryLight = void 0;
var stats = void 0;
var raycaster = void 0;
var currentObject = void 0;

var mouse = new THREE.Vector2();

var origin = new THREE.Vector3(0, 0, 0);

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentClick() {
  if (currentObject) {
    currentObject.animate = {
      radius: 40,
      angle: 0
    };
  }
}

function init() {
  scene = new THREE.Scene();

  var cubeSize = 40;

  for (var x = 0; x < 3; x += 1) {
    for (var y = 0; y < 3; y += 1) {
      var geometry = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
      var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((x - 1) * 60, (y - 1) * 60, 0);
      scene.add(mesh);
    }
  }

  primaryLight = new THREE.DirectionalLight(0xffffff);
  primaryLight.position.set(500, 200, 100);
  scene.add(primaryLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  raycaster = new THREE.Raycaster();

  THREEx.WindowResize(renderer, camera);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('click', onDocumentClick, false);

  document.body.appendChild(renderer.domElement);

  initStats();
}

function update() {
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    if (currentObject !== intersects[0].object) {
      if (currentObject) {
        currentObject.material.emissive.setHex(currentObject.currentHex);
      }
      currentObject = intersects[0].object;
      currentObject.currentHex = currentObject.material.emissive.getHex();
      currentObject.material.emissive.setHex(0x444444);
    }
  } else {
    if (currentObject) {
      currentObject.material.emissive.setHex(currentObject.currentHex);
    }
    currentObject = null;
  }

  scene.children.forEach(function (object) {
    if (object.animate) {
      object.position.z = Math.sin(object.animate.angle) * object.animate.radius;
      object.animate.radius -= 0.05;
      object.animate.angle += 0.1;
      if (object.animate.radius < 0) {
        object.animate = null;
      }
    }
  });

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