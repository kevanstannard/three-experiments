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
	var controls = void 0;
	var redLight = void 0;
	var blueLight = void 0;

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

	  var floorGeometry = new THREE.PlaneGeometry(200, 200);
	  var floorMaterial = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
	  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	  floor.position.y = -0.1;
	  floor.rotation.x = -Math.PI / 2;

	  // Indicate which objects can receive shadows
	  floor.receiveShadow = true;

	  scene.add(floor);

	  //
	  //
	  // BOX
	  //
	  //

	  var boxGeometry = new THREE.BoxGeometry(20, 20, 20);
	  var boxMaterial = new THREE.MeshLambertMaterial();
	  box = new THREE.Mesh(boxGeometry, boxMaterial);
	  box.position.y = 40;

	  // Indicate which objects can cast shadows
	  box.castShadow = true;
	  box.receiveShadow = false;

	  scene.add(box);

	  //
	  //
	  // LIGHTS
	  //
	  //

	  // Indicate the lights that can cast shadows

	  redLight = new THREE.PointLight(0xff0000, 1, 500);
	  redLight.castShadow = true;
	  redLight.position.set(-50, 100, 50);
	  scene.add(redLight);

	  blueLight = new THREE.PointLight(0x0000ff, 1, 500);
	  blueLight.castShadow = true;
	  blueLight.position.set(50, 100, -50);
	  scene.add(blueLight);

	  //
	  //
	  // HELPERS
	  //
	  //

	  var sphereSize = 4;

	  var redPointLightHelper = new THREE.PointLightHelper(redLight, sphereSize);
	  scene.add(redPointLightHelper);

	  var bluePointLightHelper = new THREE.PointLightHelper(blueLight, sphereSize);
	  scene.add(bluePointLightHelper);

	  var redLightShadowHelper = new THREE.CameraHelper(redLight.shadow.camera);
	  scene.add(redLightShadowHelper);

	  var blueLightShadowHelper = new THREE.CameraHelper(blueLight.shadow.camera);
	  scene.add(blueLightShadowHelper);

	  //
	  //
	  // RENDERER
	  //
	  //

	  renderer = new THREE.WebGLRenderer();
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

	function update() {
	  box.rotation.x += 0.01;
	  box.rotation.y += 0.01;
	  box.rotation.z += 0.01;
	  controls.update();
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