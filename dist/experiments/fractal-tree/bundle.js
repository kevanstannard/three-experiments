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

	/* eslint-disable no-param-reassign */

	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45;
	var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
	var NEAR = 1;
	var FAR = 1000;

	var scene = void 0;
	var camera = void 0;
	var renderer = void 0;
	var gridHelper = void 0;
	var controls = void 0;
	// let pointLight;
	// let ambientLight;
	var tree = void 0;

	// const origin = new THREE.Vector3(0, 0, 0);

	function Tree() {
	  var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
	  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

	  var geometry = new THREE.BoxGeometry(size / 8, size, size / 8);

	  // Change the geometrys center position to be the base of the geometry
	  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, size / 2, 0));

	  var material = new THREE.MeshNormalMaterial({ wireframe: true });
	  // const material = new THREE.MeshStandardMaterial({
	  //   color: 0x2194ce,
	  //   metalness: 0.5,
	  //   roughness: 0,
	  //   shading: THREE.SmoothShading,
	  // });
	  // const material = new THREE.MeshPhongMaterial({
	  //   color: 0x888888,
	  //   shininess: 100,
	  //   shading: THREE.FlatShading,
	  // });
	  THREE.Mesh.call(this, geometry, material);

	  this.branches = [];

	  var top = new THREE.Vector3(0, size, 0);

	  if (depth > 1) {
	    var branchSize = size * 0.7;

	    var branch1 = new Tree(depth - 1, branchSize);
	    branch1.position.set(top.x, top.y, top.z);
	    branch1.rotateZ(Math.PI * (1 / 4));
	    branch1.rotation.y = 2 * Math.PI / 3 * 0;
	    this.add(branch1);
	    this.branches.push(branch1);

	    var branch2 = new Tree(depth - 1, branchSize);
	    branch2.position.set(top.x, top.y, top.z);
	    branch2.rotateZ(Math.PI * (1 / 4));
	    branch2.rotation.y = 2 * Math.PI / 3 * 1;
	    this.add(branch2);
	    this.branches.push(branch2);

	    var branch3 = new Tree(depth - 1, branchSize);
	    branch3.position.set(top.x, top.y, top.z);
	    branch3.rotateZ(Math.PI * (1 / 4));
	    branch3.rotation.y = 2 * Math.PI / 3 * 2;
	    this.add(branch3);
	    this.branches.push(branch3);
	  }
	}

	Tree.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {

	  constructor: Tree,

	  update: function update() {
	    this.branches.forEach(function (branch) {
	      branch.rotation.y += 0.001;
	      branch.update();
	    });
	  }
	});

	function init() {
	  scene = new THREE.Scene();

	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  tree = new Tree();
	  scene.add(tree);

	  // ambientLight = new THREE.AmbientLight(0x000000);
	  // scene.add(ambientLight);

	  // pointLight = new THREE.PointLight(0xffffff, 2, 500);
	  // pointLight.position.set(80, 80, 80);
	  // scene.add(pointLight);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(0, 400, 400);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);

	  controls = new THREE.OrbitControls(camera, renderer.domElement);
	  var withinTree = new THREE.Vector3(tree.position.x, tree.position.y + 100, tree.position.z);
	  controls.target.set(withinTree.x, withinTree.y, withinTree.z);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);
	}

	function update() {
	  tree.update();
	  tree.rotation.y -= 0.002;
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