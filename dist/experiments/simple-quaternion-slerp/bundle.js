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
	var orbitControls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	var stats = void 0;
	var object = void 0;
	var fromRotation = void 0;
	var toRotation = void 0;

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
	  camera.position.set(3, 5, 6);
	  camera.lookAt(origin);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);

	  initStats();

	  var gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  var axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);

	  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 200, -100);
	  scene.add(pointLight);

	  object = new THREE.Object3D();

	  var geometry = new THREE.BoxGeometry(1, 1, 1);
	  var material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
	  var mesh = new THREE.Mesh(geometry, material);
	  object.add(mesh);

	  var vector = new THREE.Vector3(0, 0, 1);

	  var arrow = new THREE.ArrowHelper(vector.clone().normalize(), mesh.position, vector.length(), 0xffffff);

	  object.add(arrow);

	  scene.add(object);

	  fromRotation = new THREE.Quaternion();
	  fromRotation.copy(object.quaternion);

	  toRotation = new THREE.Quaternion();
	  var axisNormalised = new THREE.Vector3(1, 1, 1).normalize();
	  var angle = Math.PI;
	  toRotation.setFromAxisAngle(axisNormalised, angle);

	  var axisArrow = new THREE.ArrowHelper(axisNormalised.clone(), mesh.position, axisNormalised.length() * 2, 0xffff00);
	  scene.add(axisArrow);
	}

	var angle = 0;

	function update() {
	  var percent = Math.abs(Math.sin(angle));
	  angle += 0.01;

	  THREE.Quaternion.slerp(fromRotation, toRotation, object.quaternion, percent);

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

/***/ }
/******/ ]);