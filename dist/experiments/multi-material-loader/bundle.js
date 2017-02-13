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
	var axisHelper = void 0;
	var gridHelper = void 0;
	var orbitControls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
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

	function loadTextures(urls, callback) {
	  var textures = [];
	  var onLoad = function onLoad() {
	    callback(null, textures);
	  };
	  var onProgress = function onProgress() {};
	  var onError = function onError(url) {
	    callback(new Error('Cannot load' + url));
	  };
	  var manager = new THREE.LoadingManager(onLoad, onProgress, onError);
	  var loader = new THREE.TextureLoader(manager);
	  for (var i = 0; i < urls.length; i += 1) {
	    textures.push(loader.load(urls[i]));
	  }
	}

	function init() {
	  scene = new THREE.Scene();

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(5, 5, 5);
	  camera.lookAt(origin);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);

	  initStats();

	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);

	  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 200, -100);
	  scene.add(pointLight);

	  var urls = ['../../assets/textures/misc/free.jpg', '../../assets/textures/misc/uv_grid_sm.jpg'];

	  loadTextures(urls, function (error, textures) {
	    if (error) {
	      console.log(error);
	      return;
	    }
	    var geometry = new THREE.BoxGeometry(3, 3, 3);
	    geometry.faces.forEach(function (face) {
	      face.materialIndex %= 2;
	    });
	    var mat1 = new THREE.MeshLambertMaterial({ map: textures[0] });
	    var mat2 = new THREE.MeshLambertMaterial({ map: textures[1] });
	    var materials = [mat1, mat2];
	    var mats = new THREE.MultiMaterial(materials);
	    var cube = new THREE.Mesh(geometry, mats);
	    scene.add(cube);
	  });
	}

	function update() {
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