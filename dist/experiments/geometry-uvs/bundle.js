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
	var axisHelper = void 0;
	var gridHelper = void 0;
	var controls = void 0;
	var ambientLight = void 0;
	var plane = void 0;

	var origin = new THREE.Vector3(0, 0, 0);

	var textures = {};

	function loadTexture(id, url) {
	  return new Promise(function (resolve) {
	    var loader = new THREE.TextureLoader();
	    loader.load(url, function (texture) {
	      textures[id] = texture;
	      resolve();
	    });
	  });
	}

	function load() {
	  var promises = [];
	  promises.push(loadTexture('free', '../../assets/textures/misc/free.jpg'));
	  return Promise.all(promises);
	}

	function UVSizeAnimation(geometry) {
	  this.geometry = geometry;
	  this.original = geometry.clone();
	  this.deltaMin = 0.5;
	  this.deltaMax = 1;
	  this.delta = this.deltaMax;
	  this.speed = 0.005;
	  this.direction = -1;
	}

	UVSizeAnimation.prototype = {
	  updateDelta: function updateDelta() {
	    var newDelta = this.delta + this.speed * this.direction;
	    if (newDelta < this.deltaMin) {
	      newDelta = this.deltaMin;
	      this.direction = 1;
	    } else if (newDelta > this.deltaMax) {
	      newDelta = this.deltaMax;
	      this.direction = -1;
	    }
	    this.delta = newDelta;
	  },
	  update: function update() {
	    this.updateDelta();
	    var triangles = this.original.faceVertexUvs[0];
	    for (var i = 0; i < triangles.length; i += 1) {
	      var tri = this.geometry.faceVertexUvs[0][i];
	      var orig = this.original.faceVertexUvs[0][i];
	      for (var j = 0; j < tri.length; j += 1) {
	        tri[j].x = orig[j].x * this.delta;
	        tri[j].y = orig[j].y * this.delta;
	      }
	    }
	    this.geometry.uvsNeedUpdate = true;
	  }
	};

	function AnimatedPlaneGeometry(size) {
	  THREE.PlaneGeometry.call(this, size, size, 1);
	  this.animation = new UVSizeAnimation(this);
	}

	AnimatedPlaneGeometry.prototype = Object.assign(Object.create(THREE.PlaneGeometry.prototype), {
	  constructor: AnimatedPlaneGeometry,
	  update: function update() {
	    this.animation.update();
	  }
	});

	function AnimatedPlane() {
	  this.geometry = new AnimatedPlaneGeometry(100);
	  this.material = new THREE.MeshBasicMaterial({
	    side: THREE.DoubleSide,
	    map: textures.free
	  });
	  THREE.Mesh.call(this, this.geometry, this.material);
	}

	AnimatedPlane.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
	  constructor: AnimatedPlane,
	  update: function update() {
	    this.geometry.update();
	  }
	});

	function init() {
	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(100, 120, 140);
	  camera.lookAt(origin);

	  scene = new THREE.Scene();

	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);

	  plane = new AnimatedPlane();
	  scene.add(plane);

	  // console.log(plane.geometry);

	  // console.log(geometry);
	  // console.log(JSON.stringify(geometry.faceVertexUvs, null, 2));

	  // geometry.vertices
	  //
	  // [
	  //   {
	  //     "x": -50,
	  //     "y": 50,
	  //     "z": 0
	  //   },
	  //   {
	  //     "x": 50,
	  //     "y": 50,
	  //     "z": 0
	  //   },
	  //   {
	  //     "x": -50,
	  //     "y": -50,
	  //     "z": 0
	  //   },
	  //   {
	  //     "x": 50,
	  //     "y": -50,
	  //     "z": 0
	  //   }
	  // ]

	  // geometry.faceVertexUvs
	  //
	  // [
	  //   [
	  //     [
	  //       {
	  //         "x": 0,
	  //         "y": 1
	  //       },
	  //       {
	  //         "x": 0,
	  //         "y": 0
	  //       },
	  //       {
	  //         "x": 1,
	  //         "y": 1
	  //       }
	  //     ],
	  //     [
	  //       {
	  //         "x": 0,
	  //         "y": 0
	  //       },
	  //       {
	  //         "x": 1,
	  //         "y": 0
	  //       },
	  //       {
	  //         "x": 1,
	  //         "y": 1
	  //       }
	  //     ]
	  //   ]
	  // ]

	  // geometry.faces
	  // [
	  //   {
	  //     "a": 0,
	  //     "b": 2,
	  //     "c": 1,
	  //     "normal": {
	  //       "x": 0,
	  //       "y": 0,
	  //       "z": 1
	  //     },
	  //     "vertexNormals": [
	  //       {
	  //         "x": 0,
	  //         "y": 0,
	  //         "z": 1
	  //       },
	  //       {
	  //         "x": 0,
	  //         "y": 0,
	  //         "z": 1
	  //       },
	  //       {
	  //         "x": 0,
	  //         "y": 0,
	  //         "z": 1
	  //       }
	  //     ],
	  //     "color": 16777215,
	  //     "vertexColors": [],
	  //     "materialIndex": 0
	  //   },
	  //   {
	  //     "a": 2,
	  //     "b": 3,
	  //     "c": 1,
	  //     "normal": {
	  //       "x": 0,
	  //       "y": 0,
	  //       "z": 1
	  //     },
	  //     "vertexNormals": [
	  //       {
	  //         "x": 0,
	  //         "y": 0,
	  //         "z": 1
	  //       },
	  //       {
	  //         "x": 0,
	  //         "y": 0,
	  //         "z": 1
	  //       },
	  //       {
	  //         "x": 0,
	  //         "y": 0,
	  //         "z": 1
	  //       }
	  //     ],
	  //     "color": 16777215,
	  //     "vertexColors": [],
	  //     "materialIndex": 0
	  //   }
	  // ]

	  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	  scene.add(ambientLight);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);

	  controls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);
	}

	function update() {
	  plane.update();
	  controls.update();
	}

	function animate() {
	  requestAnimationFrame(animate);
	  update();
	  renderer.render(scene, camera);
	}

	load().then(function () {
	  init();
	  animate();
	});

/***/ }
/******/ ]);