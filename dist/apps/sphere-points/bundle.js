/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	var geometry = void 0;
	var material = void 0;
	var mesh = void 0;
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	
	var origin = new THREE.Vector3(0, 0, 0);
	
	function init() {
	  scene = new THREE.Scene();
	
	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);
	
	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);
	
	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 200, 200);
	  camera.lookAt(origin);
	
	  geometry = new THREE.SphereGeometry(1, 2, 2);
	  material = new THREE.MeshLambertMaterial({ color: 0xffffff });
	
	  // https://en.wikipedia.org/wiki/Spherical_coordinate_system
	  // http://stackoverflow.com/questions/969798/plotting-a-point-on-the-edge-of-a-sphere
	
	  var r = 100;
	  var s0 = 0;
	  var s1 = Math.PI / 2;
	  var t0 = 0;
	  var t1 = Math.PI / 2;
	  var delta = 0.1;
	
	  for (var s = s0; s <= s1; s += delta) {
	    for (var t = t0; t <= t1; t += delta) {
	      var x = r * Math.cos(s) * Math.sin(t);
	      var y = r * Math.sin(s) * Math.sin(t);
	      var z = r * Math.cos(t);
	      mesh = new THREE.Mesh(geometry, material);
	      mesh.position.set(x, y, z);
	      scene.add(mesh);
	    }
	  }
	
	  ambientLight = new THREE.AmbientLight(0x444444);
	  scene.add(ambientLight);
	
	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 50, 50);
	  scene.add(pointLight);
	
	  renderer = new THREE.WebGLRenderer();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	
	  controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	  THREEx.WindowResize(renderer, camera);
	
	  document.body.appendChild(renderer.domElement);
	}
	
	function animate() {
	  requestAnimationFrame(animate);
	  controls.update();
	  renderer.render(scene, camera);
	}
	
	init();
	animate();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map