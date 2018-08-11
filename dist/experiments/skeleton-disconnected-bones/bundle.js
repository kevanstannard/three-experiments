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
/******/ 	return __webpack_require__(__webpack_require__.s = 85);
/******/ })
/************************************************************************/
/******/ ({

/***/ 85:
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
var orbit = void 0;
var stats = void 0;
var lights = void 0;
// let helper;

var mesh = void 0;

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
  camera.position.set(20, 30, 40);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbit = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  // const gridHelper = new THREE.GridHelper(40, 10);
  // scene.add(gridHelper);

  // const axisHelper = new THREE.AxisHelper(2);
  // scene.add(axisHelper);

  lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1);
  lights[1] = new THREE.PointLight(0xffffff, 1);
  // lights[2] = new THREE.PointLight(0xffffff, 1);

  lights[0].position.set(200, 300, 400);
  lights[1].position.set(-200, -300, -400);
  // lights[2].position.set(-400, -500, 500);

  scene.add(lights[0]);
  scene.add(lights[1]);
  // scene.add(lights[2]);

  var bodyBone = new THREE.Bone();
  var headBone = new THREE.Bone();
  var leftArmBone = new THREE.Bone();
  var rightArmBone = new THREE.Bone();
  var leftLegBone = new THREE.Bone();
  var rightLegBone = new THREE.Bone();

  bodyBone.position.set(0, 0, 0);
  headBone.position.set(0, 10, 0);
  leftArmBone.position.set(6, 6, 0);
  rightArmBone.position.set(-6, 6, 0);
  leftLegBone.position.set(2, -6, 0);
  rightLegBone.position.set(-2, -6, 0);

  // bodyBone.add(headBone);
  // bodyBone.add(leftArmBone);
  // bodyBone.add(rightArmBone);
  // bodyBone.add(leftLegBone);
  // bodyBone.add(rightLegBone);

  var bones = [];
  bones.push(bodyBone);
  bones.push(headBone);
  bones.push(leftArmBone);
  bones.push(rightArmBone);
  bones.push(leftLegBone);
  bones.push(rightLegBone);

  var skeleton = new THREE.Skeleton(bones);

  var bodyGeometry = new THREE.BoxGeometry(8, 12, 4, 1, 1, 1);
  var headGeometry = new THREE.BoxGeometry(8, 8, 8, 1, 1, 1);
  var leftArmGeometry = new THREE.BoxGeometry(4, 12, 4, 1, 1, 1);
  var rightArmGeometry = new THREE.BoxGeometry(4, 12, 4, 1, 1, 1);
  var leftLegGeometry = new THREE.BoxGeometry(4, 12, 4, 1, 1, 1);
  var rightLegGeometry = new THREE.BoxGeometry(4, 12, 4, 1, 1, 1);

  headGeometry.translate(0, 10, 0);
  leftArmGeometry.translate(6, 0, 0);
  rightArmGeometry.translate(-6, 0, 0);
  leftLegGeometry.translate(2, -12, 0);
  rightLegGeometry.translate(-2, -12, 0);

  var humanGeometry = new THREE.Geometry();
  humanGeometry.merge(bodyGeometry);
  humanGeometry.merge(headGeometry);
  humanGeometry.merge(leftArmGeometry);
  humanGeometry.merge(rightArmGeometry);
  humanGeometry.merge(leftLegGeometry);
  humanGeometry.merge(rightLegGeometry);

  // 6 geometries, 6 bones, 8 vertices per geometry
  for (var boneIndex = 0; boneIndex < 6; boneIndex += 1) {
    for (var vertexIndex = 0; vertexIndex < 8; vertexIndex += 1) {
      humanGeometry.skinIndices.push(new THREE.Vector4(boneIndex, 0, 0, 0));
      humanGeometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));
    }
  }

  var material = new THREE.MeshBasicMaterial({
    skinning: true,
    wireframe: true
  });

  mesh = new THREE.SkinnedMesh(humanGeometry, material);

  mesh.add(headBone);
  mesh.add(bodyBone);
  mesh.add(leftArmBone);
  mesh.add(rightArmBone);
  mesh.add(leftLegBone);
  mesh.add(rightLegBone);

  mesh.bind(skeleton);

  scene.add(mesh);

  // helper = new THREE.SkeletonHelper(mesh);
  // helper.material.linewidth = 4; // Not working ?
  // scene.add(helper);
}

function update() {
  var time = Date.now() * 0.004;
  var angle = Math.sin(time);

  var bones = mesh.skeleton.bones;

  // Head
  bones[1].rotation.y = Math.PI * angle / 8;

  // Left arm
  bones[2].rotation.x = Math.PI * angle / 4;

  // Right arm
  bones[3].rotation.x = -(Math.PI * angle) / 4;

  // Left leg
  bones[4].rotation.x = -(Math.PI * angle) / 4;

  // Right leg
  bones[5].rotation.x = Math.PI * angle / 4;

  // helper.update();
  stats.update();
  orbit.update();
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