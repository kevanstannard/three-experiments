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
	var gridHelper = void 0;
	var orbitControls = void 0;
	var stats = void 0;
	var skeletonHelper = void 0;
	var bones = void 0;
	var clock = void 0;

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
	  clock = new THREE.Clock();

	  scene = new THREE.Scene();

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(10, 10, 10);
	  camera.lookAt(origin);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);

	  initStats();

	  gridHelper = new THREE.GridHelper(10, 10);
	  scene.add(gridHelper);

	  // axisHelper = new THREE.AxisHelper(100);
	  // scene.add(axisHelper);

	  var lights = [];
	  lights[0] = new THREE.PointLight(0xffffff, 1, 0);
	  lights[1] = new THREE.PointLight(0xffffff, 1, 0);
	  lights[2] = new THREE.PointLight(0xffffff, 1, 0);

	  lights[0].position.set(0, 200, 0);
	  lights[1].position.set(100, 200, 100);
	  lights[2].position.set(-100, -200, -100);

	  scene.add(lights[0]);
	  scene.add(lights[1]);
	  scene.add(lights[2]);

	  // We have two bones, but this is visually
	  // represented as a single line between them

	  bones = [];
	  var bone1 = new THREE.Bone();
	  bone1.position.y = -2;
	  bones.push(bone1);

	  var bone2 = new THREE.Bone();
	  bone2.position.y = 2;
	  bone1.add(bone2);
	  bones.push(bone2);

	  var bone3 = new THREE.Bone();
	  bone3.position.y = 2;
	  bone2.add(bone3);
	  bones.push(bone3);

	  var skeleton = new THREE.Skeleton(bones);

	  var height = 4;
	  var halfHeight = height / 2;
	  var heightSegments = 16;
	  var segmentHeight = 4 / heightSegments;

	  var geometry = new THREE.CylinderGeometry(2, // radiusTop
	  2, // radiusBottom
	  height, // height
	  4, // radiusSegments
	  heightSegments, // heightSegments
	  true);

	  // Describe how the geometry vertices are affected by the bones
	  geometry.vertices.forEach(function (vertex) {
	    var y = vertex.y + halfHeight;
	    var skinIndex = Math.floor(y / segmentHeight);
	    var skinWeight = y % segmentHeight / segmentHeight;
	    geometry.skinIndices.push(new THREE.Vector4(skinIndex, 0, 0, 0));
	    geometry.skinWeights.push(new THREE.Vector4(1 - skinWeight, 0, 0, 0));
	  });

	  var material = new THREE.MeshStandardMaterial({
	    skinning: true,
	    color: 0x156289,
	    emissive: 0x072534,
	    side: THREE.DoubleSide,
	    shading: THREE.FlatShading
	  });

	  var mesh = new THREE.SkinnedMesh(geometry, material);
	  scene.add(mesh);

	  mesh.add(bones[0]);
	  mesh.bind(skeleton);

	  skeletonHelper = new THREE.SkeletonHelper(mesh);
	  scene.add(skeletonHelper);
	}

	function update() {
	  var t = clock.getElapsedTime();
	  var y = Math.sin(t);
	  bones[2].rotation.z = Math.abs(y);
	  bones[1].rotation.z = Math.abs(y);
	  bones[0].rotation.z = Math.abs(y);
	  skeletonHelper.update();
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