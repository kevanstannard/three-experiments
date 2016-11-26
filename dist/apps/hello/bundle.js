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
	
	var scene = void 0,
	    camera = void 0,
	    renderer = void 0;
	var axisHelper = void 0,
	    geometry = void 0,
	    material = void 0,
	    mesh = void 0;
	
	init();
	animate();
	
	function init() {
	
	    scene = new THREE.Scene();
	
	    axisHelper = new THREE.AxisHelper(100);
	    scene.add(axisHelper);
	
	    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	    camera.position.set(500, 500, 500);
	    camera.lookAt(new THREE.Vector3(0, 0, 0));
	
	    geometry = new THREE.BoxGeometry(200, 200, 200);
	    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
	
	    mesh = new THREE.Mesh(geometry, material);
	    scene.add(mesh);
	
	    renderer = new THREE.WebGLRenderer();
	    renderer.setSize(window.innerWidth, window.innerHeight);
	
	    document.body.appendChild(renderer.domElement);
	}
	
	function animate() {
	
	    requestAnimationFrame(animate);
	
	    mesh.rotation.x += 0.01;
	    mesh.rotation.y += 0.02;
	
	    renderer.render(scene, camera);
	}
	
	// const SCREEN_WIDTH = window.innerWidth;
	// const SCREEN_HEIGHT = window.innerHeight;
	// const VIEW_ANGLE = 45;
	// const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
	// const NEAR = 0.1;
	// const FAR = 20000;
	//
	// const scene = new THREE.Scene();
	//
	// const axisHelper = new THREE.AxisHelper(100);
	// scene.add(axisHelper);
	//
	// const gridXZ = new THREE.GridHelper(10, 1);
	// scene.add(gridXZ);
	//
	// const ambientLight = new THREE.AmbientLight(0x111111);
	// scene.add(ambientLight);
	//
	// const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	// camera.position.set(100, 100, 100);
	// camera.lookAt(0, 0, 0);
	// scene.add(camera);
	//
	// const renderer = new THREE.WebGLRenderer({ antialias: true });
	// renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	//
	// renderer.render(scene, camera);
	//
	// document.body.appendChild(renderer.domElement);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map