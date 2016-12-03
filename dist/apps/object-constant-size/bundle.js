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
	
	// Reference:
	// http://stackoverflow.com/questions/15331358/three-js-get-object-size-with-respect-to-camera-and-object-position-on-screen
	
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
	var boxGeometry = void 0;
	var boxMaterial = void 0;
	var boxMesh = void 0;
	var planeGeometry = void 0;
	var planeMaterial = void 0;
	var planeMesh = void 0;
	var controls = void 0;
	var ambientLight = void 0;
	
	var origin = new THREE.Vector3(0, 0, 0);
	var fov = VIEW_ANGLE * (Math.PI / 180);
	
	var BOX_SIZE = 20;
	var BOX_SCALE = 0.25;
	
	var PLANE_SIZE = 20;
	var PLANE_SCALE = 0.2;
	
	function init() {
	  scene = new THREE.Scene();
	
	  gridHelper = new THREE.GridHelper(50, 10);
	  scene.add(gridHelper);
	
	  axisHelper = new THREE.AxisHelper(50);
	  scene.add(axisHelper);
	
	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(100, 100, 100);
	  camera.lookAt(origin);
	
	  boxGeometry = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
	  boxMaterial = new THREE.MeshNormalMaterial();
	  boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	  scene.add(boxMesh);
	
	  planeGeometry = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 32);
	  planeMaterial = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
	  planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
	  planeMesh.position.set(-50, 0, -50);
	  scene.add(planeMesh);
	
	  ambientLight = new THREE.AmbientLight(0x444444);
	  scene.add(ambientLight);
	
	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);
	
	  controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	  THREEx.WindowResize(renderer, camera);
	
	  document.body.appendChild(renderer.domElement);
	}
	
	function resetMeshSize(mesh, meshSize, meshScale) {
	  // Determine the distance of the camera to the object
	  var distance = camera.position.distanceTo(mesh.position);
	
	  // Calculate what the current frustrum radius/size.
	  var frustrumRadius = 2 * Math.tan(fov / 2) * distance;
	
	  // We want our object to remain the same size relative to the current
	  // frustrum size.
	  //
	  // For example:
	  //   Suppose frustrum size is 100, and object size is 20
	  //   then ratio (or scale) = 100 / 20 = 5.0
	  //
	  //   Suppose frustrum size changes to 200, and object size is 20
	  //   then ratio (or scale) = 200 / 20 = 10.0
	  //
	  // But this scale value alone will cause the object to fill
	  // the screen, so we need a scale value to get it back to a
	  // more useful size.
	  var scale = frustrumRadius / meshSize * meshScale;
	  mesh.scale.set(scale, scale, scale);
	}
	
	function update() {
	  planeMesh.rotation.x += 0.005;
	  planeMesh.rotation.y += 0.005;
	
	  resetMeshSize(boxMesh, BOX_SIZE, BOX_SCALE);
	  resetMeshSize(planeMesh, PLANE_SIZE, PLANE_SCALE);
	
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
//# sourceMappingURL=bundle.js.map