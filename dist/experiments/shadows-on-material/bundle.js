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
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ({

/***/ 65:
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
var box = void 0;
var floor = void 0;
var controls = void 0;
var redLight = void 0;
var blueLight = void 0;
var greenLight = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function init() {
  //
  //
  // SCENE
  //
  //

  scene = new THREE.Scene();

  //
  //
  // GRID HELPER
  //
  //

  gridHelper = new THREE.GridHelper(100, 10);
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.25;
  scene.add(gridHelper);

  //
  //
  // AXIS HELPER
  //
  //

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  //
  //
  // CAMERA
  //
  //

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  //
  //
  // FLOOR
  //
  //

  var loader = new THREE.TextureLoader();
  loader.load('../../assets/textures/misc/green-eye.png', function (texture) {
    var floorGeometry = new THREE.PlaneGeometry(200, 200);
    var floorMaterial = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      map: texture,
      transparent: true
    });
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    scene.add(floor);
  });

  //
  //
  // BOX
  //
  //

  var boxGeometry = new THREE.BoxGeometry(20, 20, 20);
  var boxMaterial = new THREE.MeshStandardMaterial();
  box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.y = 40;
  box.castShadow = true;
  box.receiveShadow = false;

  scene.add(box);

  //
  //
  // LIGHTS
  //
  //

  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  redLight = new THREE.PointLight(0xff0000, 2, 500);
  redLight.castShadow = true;
  redLight.position.set(-50, 100, 50);
  scene.add(redLight);

  blueLight = new THREE.PointLight(0x0000ff, 2, 500);
  blueLight.castShadow = true;
  blueLight.position.set(50, 100, -50);
  scene.add(blueLight);

  greenLight = new THREE.PointLight(0x00ff00, 1, 500);
  greenLight.castShadow = true;
  greenLight.position.set(50, 100, 50);
  scene.add(greenLight);

  //
  //
  // HELPERS
  //
  //

  var sphereSize = 4;

  var redPointLightHelper = new THREE.PointLightHelper(redLight, sphereSize);
  scene.add(redPointLightHelper);

  var redLightShadowHelper = new THREE.CameraHelper(redLight.shadow.camera);
  redLightShadowHelper.material.transparent = true;
  redLightShadowHelper.material.opacity = 0.25;
  scene.add(redLightShadowHelper);

  var bluePointLightHelper = new THREE.PointLightHelper(blueLight, sphereSize);
  scene.add(bluePointLightHelper);

  var blueLightShadowHelper = new THREE.CameraHelper(blueLight.shadow.camera);
  blueLightShadowHelper.material.transparent = true;
  blueLightShadowHelper.material.opacity = 0.25;
  scene.add(blueLightShadowHelper);

  var greenPointLightHelper = new THREE.PointLightHelper(greenLight, sphereSize);
  scene.add(greenPointLightHelper);

  var greenLightShadowHelper = new THREE.CameraHelper(greenLight.shadow.camera);
  greenLightShadowHelper.material.transparent = true;
  greenLightShadowHelper.material.opacity = 0.25;
  scene.add(greenLightShadowHelper);

  //
  //
  // RENDERER
  //
  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Enable shadows
  renderer.shadowMap.enabled = true;

  // Antialias the shadows
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  //
  //
  // ORBIT CONTROLS
  //
  //

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

var radius = 0.25;
var angle = 0;

function update() {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  box.rotation.z += 0.01;

  if (floor) {
    angle += 0.01;
    floor.rotation.x = Math.PI / 2 + radius * Math.cos(angle);
    floor.rotation.y = radius * Math.sin(angle);
    floor.rotation.z += 0.01;
  }

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