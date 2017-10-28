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
/******/ 	return __webpack_require__(__webpack_require__.s = 76);
/******/ })
/************************************************************************/
/******/ ({

/***/ 76:
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
var helper = void 0;
var mesh = void 0;
var bones = void 0;
var boneIndexes = void 0;

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
  camera.position.set(10, 10, 20);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbit = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  // const gridHelper = new THREE.GridHelper(40, 10);
  // scene.add(gridHelper);

  var axisHelper = new THREE.AxisHelper(2);
  scene.add(axisHelper);

  lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1);
  lights[1] = new THREE.PointLight(0xffffff, 1);
  // lights[2] = new THREE.PointLight(0xffffff, 1);

  lights[0].position.set(200, 300, 400);
  lights[1].position.set(-200, -300, -400);
  // lights[2].position.set(-400, 500, 500);

  scene.add(lights[0]);
  scene.add(lights[1]);
  // scene.add(lights[2]);

  var bodyBone = new THREE.Bone();
  var chestBone = new THREE.Bone();
  var hipBone = new THREE.Bone();

  bodyBone.add(chestBone);
  bodyBone.add(hipBone);

  chestBone.position.set(0, 4, 0);
  hipBone.position.set(0, -4, 0);

  bones = [];
  bones.push(bodyBone);
  bones.push(chestBone);
  bones.push(hipBone);

  boneIndexes = {
    BODY_BONE: 0,
    CHEST_BONE: 1,
    HIP_BONE: 2
  };

  var skeleton = new THREE.Skeleton(bones);

  var params = {
    width: 8,
    height: 12,
    depth: 4,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1
  };

  var geometry = new THREE.BoxGeometry(params.width, params.height, params.depth, params.widthSegments, params.heightSegments, params.depthSegments);

  var shoulderPos = params.height / 2;
  var waistPos = -params.height / 2;

  geometry.vertices.forEach(function (vertex) {
    if (vertex.y === shoulderPos) {
      // Shoulder
      geometry.skinIndices.push(new THREE.Vector4(boneIndexes.CHEST_BONE, 0, 0, 0));
      geometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));
    } else if (vertex.y === waistPos) {
      // Waist
      geometry.skinIndices.push(new THREE.Vector4(boneIndexes.HIP_BONE, 0, 0, 0));
      geometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));
    } else {
      geometry.skinIndices.push(new THREE.Vector4(boneIndexes.CHEST_BONE, boneIndexes.HIP_BONE, 0, 0));
      geometry.skinWeights.push(new THREE.Vector4(0.5, 0.5, 0, 0));
    }
  });

  var material = new THREE.MeshStandardMaterial({
    skinning: true,
    // wireframe: true,
    color: 0x0088ff,
    metalness: 0,
    roughness: 1
  });

  mesh = new THREE.SkinnedMesh(geometry, material);

  mesh.add(bodyBone);
  mesh.bind(skeleton);

  scene.add(mesh);

  helper = new THREE.SkeletonHelper(mesh);
  scene.add(helper);
}

function update() {
  var time = Date.now() * 0.001;
  var angle = Math.sin(time);

  var skeletonBones = mesh.skeleton.bones;

  skeletonBones[boneIndexes.CHEST_BONE].rotation.y = Math.PI * angle / 8;
  skeletonBones[boneIndexes.HIP_BONE].rotation.y = -(Math.PI * angle) / 8;

  helper.update();
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