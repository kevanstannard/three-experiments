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
	// let ambientLight;
	// let mesh;
	// let controls;
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

	// function initControls() {
	//   controls = {
	//     xRotation: 0,
	//     yRotation: 0,
	//     zRotation: 0,
	//   };
	//   const gui = new dat.GUI();
	//   gui.add(controls, 'xRotation', 0, Math.PI * 2);
	//   gui.add(controls, 'yRotation', 0, Math.PI * 2);
	//   gui.add(controls, 'zRotation', 0, Math.PI * 2);
	// }

	function init() {
	  scene = new THREE.Scene();

	  // gridHelper = new THREE.GridHelper(100, 10);
	  // scene.add(gridHelper);

	  // axisHelper = new THREE.AxisHelper(10);
	  // scene.add(axisHelper);

	  var backWallGeometry = new THREE.PlaneBufferGeometry(40, 40);
	  var backWallMaterial = new THREE.MeshLambertMaterial({
	    color: 0xffffff,
	    side: THREE.DoubleSide
	  });
	  var backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
	  backWall.position.set(10, 10, -10);
	  scene.add(backWall);

	  var rightWallGeometry = new THREE.PlaneBufferGeometry(40, 40);
	  var rightWallMaterial = new THREE.MeshLambertMaterial({
	    color: 0xffffff,
	    side: THREE.DoubleSide
	  });
	  var rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
	  rightWall.rotation.y = Math.PI / 2;
	  rightWall.position.set(-10, 10, 10);
	  scene.add(rightWall);

	  var bottomWallGeometry = new THREE.PlaneBufferGeometry(40, 40);
	  var bottomWallMaterial = new THREE.MeshLambertMaterial({
	    color: 0xffffff,
	    side: THREE.DoubleSide
	  });
	  var bottomWall = new THREE.Mesh(bottomWallGeometry, bottomWallMaterial);
	  bottomWall.rotation.x = -Math.PI / 2;
	  bottomWall.position.set(10, -10, 10);
	  scene.add(bottomWall);

	  // const geometry = new THREE.BoxGeometry(400, 400, 400);
	  // const material = new THREE.MeshLambertMaterial({
	  //   color: 0xffffff,
	  //   // side: THREE.DoubleSide,
	  // });
	  // const room = new THREE.Mesh(geometry, material);
	  // scene.add(room);

	  // ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
	  // scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffff00, 2, 40);
	  // pointLight.position.set(0, 180, 0);
	  scene.add(pointLight);

	  // var pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
	  // pointLight.position.set( 10, 10, 10 );
	  // scene.add( pointLight );

	  var sphereSize = 1;
	  var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
	  scene.add(pointLightHelper);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(90, 50, 40);
	  // camera.lookAt(origin);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);

	  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
	  orbitControls.target = origin;

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);

	  initStats();
	  // initControls();
	}

	var angle = 0;

	function update() {
	  // mesh.rotation.set(
	  //   mesh.rotation.x = controls.xRotation,
	  //   mesh.rotation.y = controls.yRotation,
	  //   mesh.rotation.z = controls.zRotation,
	  // );
	  angle += 0.01;
	  var x = 10 + Math.sin(angle) * 10;
	  var y = 10 + Math.cos(angle) * 10;
	  var z = 10 + Math.sin(angle) * 10;
	  pointLight.position.set(x, y, z);

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