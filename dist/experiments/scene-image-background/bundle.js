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

	// Textures:
	// http://www.humus.name/index.php?page=Textures

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
	var orbitControls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	var mesh = void 0;
	var controls = void 0;
	var stats = void 0;
	var skyboxes = {};

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
	    skybox: 'langholmen'
	  };
	  var gui = new dat.GUI();
	  gui.add(controls, 'skybox', ['sky', 'langholmen']);
	}

	function skyboxUrl(id, type) {
	  return '../../assets/textures/skybox/' + id + '/' + type + '.jpg';
	}

	function skyboxUrls(id) {
	  return [skyboxUrl(id, 'posx'), skyboxUrl(id, 'negx'), skyboxUrl(id, 'posy'), skyboxUrl(id, 'negy'), skyboxUrl(id, 'posz'), skyboxUrl(id, 'negz')];
	}

	function skybox(id) {
	  var urls = skyboxUrls(id);
	  var box = new THREE.CubeTextureLoader().load(urls);
	  box.format = THREE.RGBFormat;
	  return box;
	}

	function init() {
	  skyboxes.sky = skybox('sky');
	  skyboxes.langholmen = skybox('langholmen');

	  scene = new THREE.Scene();
	  scene.background = skyboxes.langholmen;

	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);

	  var geometry = new THREE.BoxGeometry(50, 50, 50);
	  var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
	  mesh = new THREE.Mesh(geometry, material);
	  scene.add(mesh);

	  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 200, -100);
	  scene.add(pointLight);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 200, 200);
	  camera.lookAt(origin);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);

	  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);

	  initStats();
	  initControls();
	}

	function update() {
	  mesh.rotation.x += 0.01;
	  mesh.rotation.y += 0.01;
	  mesh.rotation.z += 0.01;
	  scene.background = skyboxes[controls.skybox];
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

/***/ }
/******/ ]);