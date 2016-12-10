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

	// Ref:
	// https://solutiondesign.com/blog/-/blogs/webgl-and-three-js-texture-mappi-1

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
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	var mesh = void 0;

	var origin = new THREE.Vector3(0, 0, 0);

	var SKIN_WIDTH = 64;
	var SKIN_HEIGHT = 64;

	function faceVectors(x, y, w, h) {
	  // Convert to u/v orientation in pixels
	  var uvPix = {
	    x: x,
	    y: SKIN_HEIGHT - y,
	    w: w,
	    h: h
	  };
	  // Convert to u/v coordinates
	  var uv = {
	    x: uvPix.x / SKIN_WIDTH,
	    y: uvPix.y / SKIN_HEIGHT,
	    w: uvPix.w / SKIN_WIDTH,
	    h: uvPix.h / SKIN_HEIGHT
	  };
	  // Convert to points
	  var points = {
	    p1: { x: uv.x, y: uv.y },
	    p2: { x: uv.x, y: uv.y - uv.h },
	    p3: { x: uv.x + uv.w, y: uv.y - uv.h },
	    p4: { x: uv.x + uv.w, y: uv.y }
	  };
	  // Create vectors
	  var vectors = [new THREE.Vector2(points.p1.x, points.p1.y), new THREE.Vector2(points.p2.x, points.p2.y), new THREE.Vector2(points.p3.x, points.p3.y), new THREE.Vector2(points.p4.x, points.p4.y)];
	  return vectors;
	}

	function init() {
	  var head = {
	    front: faceVectors(8, 8, 8, 8),
	    right: faceVectors(0, 8, 8, 8),
	    left: faceVectors(16, 8, 8, 8),
	    back: faceVectors(24, 8, 8, 8),
	    top: faceVectors(8, 0, 8, 8),
	    bottom: faceVectors(16, 0, 8, 8)
	  };

	  var geometry = new THREE.CubeGeometry(10, 10, 10);

	  // Clear out any UV mapping that may have already existed on the cube
	  geometry.faceVertexUvs[0] = [];

	  geometry.faceVertexUvs[0][0] = [head.left[0], head.left[1], head.left[3]];
	  geometry.faceVertexUvs[0][1] = [head.left[1], head.left[2], head.left[3]];

	  geometry.faceVertexUvs[0][2] = [head.right[0], head.right[1], head.right[3]];
	  geometry.faceVertexUvs[0][3] = [head.right[1], head.right[2], head.right[3]];

	  geometry.faceVertexUvs[0][4] = [head.top[0], head.top[1], head.top[3]];
	  geometry.faceVertexUvs[0][5] = [head.top[1], head.top[2], head.top[3]];

	  geometry.faceVertexUvs[0][6] = [head.bottom[0], head.bottom[1], head.bottom[3]];
	  geometry.faceVertexUvs[0][7] = [head.bottom[1], head.bottom[2], head.bottom[3]];

	  geometry.faceVertexUvs[0][8] = [head.front[0], head.front[1], head.front[3]];
	  geometry.faceVertexUvs[0][9] = [head.front[1], head.front[2], head.front[3]];

	  geometry.faceVertexUvs[0][10] = [head.back[0], head.back[1], head.back[3]];
	  geometry.faceVertexUvs[0][11] = [head.back[1], head.back[2], head.back[3]];

	  var textureLoader = new THREE.TextureLoader();

	  var texture = textureLoader.load('steve.png');

	  // Keep the texture pixellated
	  texture.magFilter = THREE.NearestFilter;
	  texture.minFilter = THREE.LinearMipMapLinearFilter;

	  var material = new THREE.MeshLambertMaterial({
	    map: texture,
	    side: THREE.DoubleSide
	  });
	  mesh = new THREE.Mesh(geometry, material);

	  scene = new THREE.Scene();

	  scene.add(mesh);

	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(20, 20, 20);
	  camera.lookAt(origin);

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

	function update() {
	  // mesh.rotation.x += 0.01;
	  mesh.rotation.y += 0.01;
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