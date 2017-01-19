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
	var ASPECT = SCREEN_WIDTH / 2 / SCREEN_HEIGHT;

	var scene = void 0;
	var camera1 = void 0;
	var camera2 = void 0;
	var renderer1 = void 0;
	var renderer2 = void 0;
	var axisHelper = void 0;
	var gridHelper = void 0;
	var orbitControls1 = void 0;
	var orbitControls2 = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	var mesh = void 0;
	var controls = void 0;
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

	function initControls() {
	  controls = {
	    xRotation: 0,
	    yRotation: 0,
	    zRotation: 0
	  };
	  var gui = new dat.GUI();
	  gui.add(controls, 'xRotation', 0, Math.PI * 2);
	  gui.add(controls, 'yRotation', 0, Math.PI * 2);
	  gui.add(controls, 'zRotation', 0, Math.PI * 2);
	}

	function init() {
	  scene = new THREE.Scene();

	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);

	  var geometry = new THREE.BoxGeometry(50, 50, 50);
	  var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
	  mesh = new THREE.Mesh(geometry, material);
	  scene.add(mesh);

	  ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffff00, 2, 100);
	  scene.add(pointLight);

	  var pointLightHelper = new THREE.PointLightHelper(pointLight, 20);
	  scene.add(pointLightHelper);

	  camera1 = new THREE.PerspectiveCamera(30, ASPECT, 1, 1000);
	  camera1.position.set(200, 200, 200);
	  camera1.lookAt(origin);

	  var cameraHelper = new THREE.CameraHelper(camera1);
	  scene.add(cameraHelper);

	  camera2 = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, 1, 5000);
	  camera2.position.set(2000, 400, 200);
	  camera2.lookAt(origin);

	  renderer1 = new THREE.WebGLRenderer({ antialias: true });
	  renderer1.setSize(SCREEN_WIDTH / 2, SCREEN_HEIGHT);

	  renderer2 = new THREE.WebGLRenderer({ antialias: true });
	  renderer2.setSize(SCREEN_WIDTH / 2, SCREEN_HEIGHT);

	  orbitControls1 = new THREE.OrbitControls(camera1, renderer1.domElement);
	  orbitControls2 = new THREE.OrbitControls(camera2, renderer2.domElement);

	  THREEx.WindowResize(renderer1, camera1);
	  THREEx.WindowResize(renderer2, camera2);

	  var container1 = document.createElement('div');
	  var container2 = document.createElement('div');

	  container1.style.position = 'absolute';
	  container1.style.top = '0px';
	  container1.style.bottom = '0px';
	  container1.style.left = '0px';
	  container1.style.right = SCREEN_WIDTH / 2 - 1 + 'px';

	  container2.style.position = 'absolute';
	  container2.style.top = '0px';
	  container2.style.bottom = '0px';
	  container2.style.left = SCREEN_WIDTH / 2 + 'px';
	  container2.style.right = '0px';

	  document.body.appendChild(container1);
	  document.body.appendChild(container2);

	  container1.appendChild(renderer1.domElement);
	  container2.appendChild(renderer2.domElement);

	  initStats();
	  initControls();
	}

	function update() {
	  var t = new Date().getTime() / 1000;
	  pointLight.position.x = 100 * Math.sin(t);
	  pointLight.position.z = 100 * Math.cos(t);
	  mesh.rotation.set(mesh.rotation.x = controls.xRotation, mesh.rotation.y = controls.yRotation, mesh.rotation.z = controls.zRotation);
	  stats.update();
	  orbitControls1.update();
	  orbitControls2.update();
	}

	function render() {
	  renderer1.render(scene, camera1);
	  renderer2.render(scene, camera2);
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