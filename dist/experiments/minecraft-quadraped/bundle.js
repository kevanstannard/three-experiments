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
	var orbitControls = void 0;
	var stats = void 0;
	var mesh = void 0;
	var helper = void 0;

	// const origin = new THREE.Vector3(0, 0, 0);

	var quadraped = {
	  bones: [{
	    name: 'body',
	    pivot: [0.0, 19.0, 2.0],
	    cubes: [{
	      origin: [-5.0, 13.0, -5.0],
	      size: [10, 16, 8],
	      uv: [28, 8]
	    }]
	  }, {
	    name: 'head',
	    pivot: [0.0, 18.0, -6.0],
	    cubes: [{
	      origin: [-4.0, 14.0, -14.0],
	      size: [8, 8, 8],
	      uv: [0, 0]
	    }]
	  }, {
	    name: 'leg0',
	    pivot: [-3.0, 12.0, 7.0],
	    cubes: [{
	      origin: [-5.0, 0.0, 5.0],
	      size: [4, 12, 4],
	      uv: [0, 16]
	    }]
	  }, {
	    name: 'leg1',
	    pivot: [3.0, 12.0, 7.0],
	    cubes: [{
	      origin: [1.0, 0.0, 5.0],
	      size: [4, 12, 4],
	      uv: [0, 16]
	    }]
	  }, {
	    name: 'leg2',
	    pivot: [-3.0, 12.0, -5.0],
	    cubes: [{
	      origin: [-5.0, 0.0, -7.0],
	      size: [4, 12, 4],
	      uv: [0, 16]
	    }]
	  }, {
	    name: 'leg3',
	    pivot: [3.0, 12.0, -5.0],
	    cubes: [{
	      origin: [1.0, 0.0, -7.0],
	      size: [4, 12, 4],
	      uv: [0, 16]
	    }]
	  }]
	};

	function initStats() {
	  stats = new Stats();
	  stats.domElement.style.position = 'absolute';
	  stats.domElement.style.left = '0px';
	  stats.domElement.style.top = '20px';
	  stats.setMode(0); // 0: fps, 1: ms
	  document.getElementById('stats').appendChild(stats.domElement);
	}

	function init() {
	  scene = new THREE.Scene();

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(40, 40, -40);

	  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
	  orbitControls.target = new THREE.Vector3(0, 15, 0);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);

	  initStats();

	  // const gridHelper = new THREE.GridHelper(100, 10);
	  // scene.add(gridHelper);

	  var axisHelper = new THREE.AxisHelper(20);
	  scene.add(axisHelper);

	  // const geometry = new THREE.BoxGeometry(50, 50, 50);
	  // const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
	  // mesh = new THREE.Mesh(geometry, material);
	  // scene.add(mesh);

	  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	  scene.add(ambientLight);

	  var pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 200, -100);
	  scene.add(pointLight);

	  var bones = [];
	  var geometry = new THREE.Geometry();
	  quadraped.bones.forEach(function (geometryBone, boneIndex) {
	    var pivot = geometryBone.pivot;
	    // console.log(pivot);
	    var cubes = geometryBone.cubes;
	    var bone = new THREE.Bone();
	    bone.position.set(pivot[0], pivot[1], pivot[2]);
	    cubes.forEach(function (cube) {
	      var size = cube.size;
	      var origin = cube.origin;
	      var width = size[0];
	      var height = size[1];
	      var depth = size[2];
	      var xoff = width / 2;
	      var yoff = height / 2;
	      var zoff = depth / 2;
	      var x = origin[0] + xoff;
	      var y = origin[1] + yoff;
	      var z = origin[2] + zoff;
	      var boxGeometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
	      boxGeometry.translate(x, y, z);
	      geometry.merge(boxGeometry);
	      for (var i = 0; i < boxGeometry.vertices.length; i += 1) {
	        geometry.skinIndices.push(new THREE.Vector4(boneIndex, 0, 0, 0));
	        geometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));
	      }
	    });
	    bones.push(bone);
	  });

	  var skeleton = new THREE.Skeleton(bones);

	  var material = new THREE.MeshStandardMaterial({
	    skinning: true,
	    wireframe: true
	  });

	  mesh = new THREE.SkinnedMesh(geometry, material);

	  bones.forEach(function (bone) {
	    mesh.add(bone);
	  });

	  mesh.bind(skeleton);

	  // For some reason the data has the body at an
	  // odd orentation. Fixing that here.
	  bones[0].rotation.x = -Math.PI / 2;

	  scene.add(mesh);

	  helper = new THREE.SkeletonHelper(mesh);
	  helper.material.linewidth = 4; // Not working ?
	  scene.add(helper);

	  // var geometry = new THREE.SphereGeometry( 5, 32, 32 );
	  // var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	  // var sphere = new THREE.Mesh( geometry, material );
	  // scene.add( sphere );

	  var pivots = new THREE.Group();
	  var pivotMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
	  bones.forEach(function (bone) {
	    // console.log(bone.position);
	    var pivotGeometry = new THREE.SphereGeometry(0.5, 8, 8);
	    pivotGeometry.translate(bone.position.x, bone.position.y, bone.position.z);
	    var pivot = new THREE.Mesh(pivotGeometry, pivotMaterial);
	    pivots.add(pivot);
	  });

	  mesh.add(pivots);
	}

	function update() {
	  var time = Date.now() * 0.002;
	  var angle = Math.sin(time);

	  var bones = mesh.skeleton.bones;
	  bones[1].rotation.y = Math.PI * angle / 8; // Head
	  bones[2].rotation.x = Math.PI * angle / 16; // Leg 0
	  bones[3].rotation.x = -(Math.PI * angle) / 16; // Leg 1
	  bones[4].rotation.x = Math.PI * angle / 16; // Leg 2
	  bones[5].rotation.x = -(Math.PI * angle) / 16; // Leg 3

	  helper.update();
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