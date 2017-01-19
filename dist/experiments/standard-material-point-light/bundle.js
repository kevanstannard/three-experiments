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
	// let axisHelper;
	// let gridHelper;
	var orbitControls = void 0;
	var pointLight = void 0;
	var pointLightHelper = void 0;
	var ambientLight = void 0;
	var material = void 0;
	var geometry = void 0;
	var mesh = void 0;
	var controls = void 0;
	var stats = void 0;
	var bumpTexture = void 0;

	var textureLoader = new THREE.TextureLoader();

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
	    metalness: 0,
	    roughness: 0,
	    distance: 10,
	    bumpMap: false
	  };
	  var gui = new dat.GUI();
	  gui.add(controls, 'metalness', 0, 1);
	  gui.add(controls, 'roughness', 0, 1);
	  gui.add(controls, 'distance', 10, 50);
	  gui.add(controls, 'bumpMap');
	}

	function init() {
	  scene = new THREE.Scene();

	  // gridHelper = new THREE.GridHelper(100, 10);
	  // scene.add(gridHelper);

	  // axisHelper = new THREE.AxisHelper(100);
	  // scene.add(axisHelper);

	  geometry = new THREE.BoxGeometry(100, 10, 100);
	  material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	  mesh = new THREE.Mesh(geometry, material);
	  scene.add(mesh);

	  textureLoader.load('../../assets/textures/bump/stone-001-500x500.jpg', function (texture) {
	    bumpTexture = texture;
	  });

	  ambientLight = new THREE.AmbientLight(0xffffff, 0.03);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffffff, 1, 200);
	  scene.add(pointLight);

	  pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
	  scene.add(pointLightHelper);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(100, 100, 100);
	  camera.lookAt(origin);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);

	  initStats();
	  initControls();
	}

	function update() {
	  var t = new Date().getTime() / 1000;
	  var x = Math.sin(t) * controls.distance;
	  var y = controls.distance;
	  var z = Math.cos(t) * controls.distance;

	  pointLight.position.x = x;
	  pointLight.position.y = y;
	  pointLight.position.z = z;

	  material.metalness = controls.metalness;
	  material.roughness = controls.roughness;

	  if (controls.bumpMap && !material.bumpMap) {
	    material.bumpMap = bumpTexture;
	    material.needsUpdate = true;
	  } else if (!controls.bumpMap && material.bumpMap) {
	    material.bumpMap = null;
	    material.needsUpdate = true;
	  }

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