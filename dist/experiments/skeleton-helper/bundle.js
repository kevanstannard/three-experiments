/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

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
	var bones = void 0;
	// let skeleton;

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

	  var leftShoulderBone = new THREE.Bone();
	  var leftHandBone = new THREE.Bone();

	  var rightShoulderBone = new THREE.Bone();
	  var rightHandBone = new THREE.Bone();

	  var leftHipBone = new THREE.Bone();
	  var leftFootBone = new THREE.Bone();

	  var rightHipBone = new THREE.Bone();
	  var rightFootBone = new THREE.Bone();

	  bodyBone.position.set(0, 0, 0);

	  headBone.position.set(0, 10, 0);

	  leftShoulderBone.position.set(6, 6, 0);
	  leftHandBone.position.set(0, -6, 0);

	  rightShoulderBone.position.set(-6, 6, 0);
	  rightHandBone.position.set(0, -6, 0);

	  leftHipBone.position.set(2, -6, 0);
	  leftFootBone.position.set(0, -6, 0);

	  rightHipBone.position.set(-2, -6, 0);
	  rightFootBone.position.set(0, -6, 0);

	  bodyBone.add(headBone);

	  bodyBone.add(leftShoulderBone);
	  leftShoulderBone.add(leftHandBone);

	  bodyBone.add(rightShoulderBone);
	  rightShoulderBone.add(rightHandBone);

	  bodyBone.add(leftHipBone);
	  leftHipBone.add(leftFootBone);

	  bodyBone.add(rightHipBone);
	  rightHipBone.add(rightFootBone);

	  bones = [];
	  bones.push(bodyBone);
	  bones.push(headBone);
	  bones.push(leftShoulderBone);
	  bones.push(leftHandBone);
	  bones.push(rightShoulderBone);
	  bones.push(rightHandBone);
	  bones.push(leftHipBone);
	  bones.push(leftFootBone);
	  bones.push(rightHipBone);
	  bones.push(rightFootBone);

	  // Interesting, we don't actually need a skeleton ???
	  // skeleton = new THREE.Skeleton(bones);

	  helper = new THREE.SkeletonHelper(bodyBone);

	  scene.add(helper);
	  scene.add(bodyBone);
	}

	function update() {
	  var time = Date.now() * 0.001;
	  var angle = Math.sin(time);

	  bones[1].rotation.y = Math.PI * angle / 8; // Head
	  bones[2].rotation.x = Math.PI * angle / 4; // Left shoulder
	  bones[4].rotation.x = -(Math.PI * angle) / 4; // Right shoulder
	  bones[6].rotation.x = -(Math.PI * angle) / 4; // Left hip
	  bones[8].rotation.x = Math.PI * angle / 4; // Right hip

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

/***/ }
/******/ ]);