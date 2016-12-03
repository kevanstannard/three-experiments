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
	
	var orbitControlsEnabled = false;
	
	var scene = void 0;
	var camera = void 0;
	var renderer = void 0;
	var axisHelper = void 0;
	var gridHelper = void 0;
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	var height = void 0;
	
	// const origin = new THREE.Vector3(0, 0, 0);
	
	function mid(v1, v2) {
	  return new THREE.Vector3(v1.x + (v2.x - v1.x) / 2, v1.y + (v2.y - v1.y) / 2, v1.z + (v2.z - v1.z) / 2);
	}
	
	var points = {
	  from: new THREE.Vector3(-200, -150, 0),
	  to: new THREE.Vector3(50, -80, 0)
	};
	
	points.mid = mid(points.from, points.to);
	
	function init() {
	  scene = new THREE.Scene();
	
	  gridHelper = new THREE.GridHelper(200, 20);
	  gridHelper.rotation.x = Math.PI / 2;
	  scene.add(gridHelper);
	
	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);
	
	  var pointGeometry = new THREE.CircleGeometry(2, 32);
	  var pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
	
	  var pointFrom = new THREE.Mesh(pointGeometry, pointMaterial);
	  pointFrom.position.set(points.from.x, points.from.y, points.from.z);
	
	  var pointTo = new THREE.Mesh(pointGeometry, pointMaterial);
	  pointTo.position.set(points.to.x, points.to.y, points.to.z);
	
	  var pointMid = new THREE.Mesh(pointGeometry, pointMaterial);
	  pointMid.position.set(points.mid.x, points.mid.y, points.mid.z);
	
	  scene.add(pointFrom);
	  scene.add(pointTo);
	  scene.add(pointMid);
	
	  var radius = points.from.distanceTo(points.to) / 2;
	  var regionGeometry = new THREE.CircleGeometry(radius, 32);
	  var regionMaterial = new THREE.MeshBasicMaterial({
	    color: 0xffff00,
	    wireframe: true,
	    transparent: true,
	    opacity: 0.5
	  });
	  var region = new THREE.Mesh(regionGeometry, regionMaterial);
	  region.position.set(points.mid.x, points.mid.y, points.mid.z);
	  scene.add(region);
	
	  height = radius / Math.tan(Math.PI / 8);
	
	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(points.mid.x, points.mid.y, height);
	  camera.lookAt(points.mid);
	
	  ambientLight = new THREE.AmbientLight(0x444444);
	  scene.add(ambientLight);
	
	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 50, 50);
	  scene.add(pointLight);
	
	  renderer = new THREE.WebGLRenderer();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	
	  controls = new THREE.OrbitControls(camera, renderer.domElement);
	  controls.target.set(points.mid.x, points.mid.y, points.mid.z);
	  controls.enabled = orbitControlsEnabled;
	
	  THREEx.WindowResize(renderer, camera);
	
	  document.body.appendChild(renderer.domElement);
	}
	
	// let count = 0;
	
	var difX = points.from.distanceTo(points.to);
	
	var xMin = -difX / 4;
	var xMax = difX / 4;
	
	var camDelta = 1;
	var camX = 0;
	var camDir = 1;
	
	console.log(xMin, xMax, camX);
	
	function update() {
	  controls.update();
	
	  camX += camDelta * camDir;
	  // console.log(camX);
	  if (camX < xMin) {
	    camDir = -camDir;
	    camX = xMin + camDir * camDelta;
	  } else if (camX > xMax) {
	    camDir = -camDir;
	    camX = xMax + camDir * camDelta;
	  }
	
	  // count += 0.005;
	  // const angle = Math.PI * (5 / 8) + Math.sin(count) * Math.PI * (1 / 8);
	
	  // if (angle > angleMax) {
	  //   angleDir = -angleDir;
	  //   angle += 2 * angleDelta * angleDir;
	  // } else if (angle < angleMin) {
	  //   angleDir = -angleDir;
	  //   angle += 2 * angleDelta * angleDir;
	  // }
	
	  // const x = 0; // height * Math.sin(angle);
	  // const y = height * Math.cos(angle);
	  // const z = height * Math.sin(angle);
	  camera.position.set(points.mid.x + camX, points.mid.y - camX, height);
	  camera.lookAt(points.mid);
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
//# sourceMappingURL=bundle.js.map