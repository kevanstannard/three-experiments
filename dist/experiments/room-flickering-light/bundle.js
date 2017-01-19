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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Bug = __webpack_require__(6);

	var _Bug2 = _interopRequireDefault(_Bug);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	var orbitControls = void 0;
	// let ambientLight;
	var stats = void 0;
	// let rectLight;
	// let rectLightHelper;
	var lights = [];
	var bugs = [];

	var origin = new THREE.Vector3(0, 0, 0);

	// function Wall(width, height) {
	//   const material = new THREE.MeshStandardMaterial({
	//     color: 0xffffff,
	//     metalness: 0,
	//     roughness: 1,
	//     side: THREE.DoubleSide,
	//   });
	//   const geometry = new THREE.PlaneBufferGeometry(width, height);
	//   THREE.Mesh.call(this, geometry, material);
	//   this.receiveShadow = true;
	// }
	//
	// Wall.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
	//   constructor: Wall,
	// });

	function Wall(width, height) {
	  THREE.Object3D.call(this);
	  var material = new THREE.MeshStandardMaterial({
	    color: 0xffffff,
	    metalness: 0,
	    roughness: 1,
	    side: THREE.DoubleSide
	  });
	  var geometry = new THREE.PlaneBufferGeometry(width, height);
	  this.wall = new THREE.Mesh(geometry, material);
	  this.add(this.wall);

	  var numStains = Math.floor(Math.random() * 5);
	  for (var i = 0; i < numStains; i += 1) {
	    var stainSize = 50 + Math.random() * 200;
	    var stainGeometry = new THREE.CircleBufferGeometry(stainSize);
	    var stainMaterial = new THREE.MeshStandardMaterial({
	      color: 0xdddddd,
	      metalness: 0,
	      roughness: 1
	    });
	    this.stain = new THREE.Mesh(stainGeometry, stainMaterial);
	    this.stain.position.z = 0.5;
	    this.stain.position.x = -100 + Math.random() * 200;
	    this.stain.position.y = -100 + Math.random() * 200;
	    this.add(this.stain);
	  }

	  // this.mesh.receiveShadow = true;
	}

	Wall.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
	  constructor: Wall
	});

	function Room(width, height, depth) {
	  THREE.Object3D.call(this);

	  var back = new Wall(width, height);
	  back.position.set(0, 0, -depth / 2);
	  this.add(back);

	  var right = new Wall(depth, height);
	  right.rotation.y = Math.PI / 2;
	  right.position.set(-width / 2, 0, 0);
	  this.add(right);

	  var left = new Wall(depth, height);
	  left.rotation.y = -Math.PI / 2;
	  left.position.set(width / 2, 0, 0);
	  this.add(left);

	  var bottom = new Wall(width, depth);
	  bottom.rotation.x = -Math.PI / 2;
	  bottom.position.set(0, -height / 2, 0);
	  this.add(bottom);

	  var top = new Wall(width, depth);
	  top.rotation.x = Math.PI / 2;
	  top.position.set(0, height / 2, 0);
	  this.add(top);
	}

	Room.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
	  constructor: Room
	});

	function Light() {
	  THREE.RectAreaLight.call(this, 0xFFFFFF, 100, 5, 40);
	  // this.castShadow = true;

	  this.helper = new THREE.RectAreaLightHelper(this);
	  this.add(this.helper);

	  // console.log(this.helper);

	  this.ON = Symbol('On');
	  this.OFF = Symbol('Off');
	  this.DIM = Symbol('Dim');

	  this.modes = [this.ON, this.DIM, this.OFF];

	  this.nextMode();
	}

	Light.prototype = Object.assign(Object.create(THREE.RectAreaLight.prototype), {
	  constructor: Light,
	  nextMode: function nextMode() {
	    var nextMode = void 0;
	    if (this.currentMode) {
	      if (this.currentMode.mode === this.OFF) {
	        if (Math.random() > 0.2) {
	          nextMode = this.DIM;
	        }
	      } else if (this.currentMode.mode === this.DIM) {
	        if (Math.random() > 0.2) {
	          nextMode = this.OFF;
	        }
	      }
	    }
	    if (!nextMode) {
	      nextMode = this.modes[Math.floor(Math.random() * 2)];
	    }
	    switch (nextMode) {
	      case this.OFF:
	        {
	          var duration = Math.floor(Math.random() * 0.1 * 60); // 60 FPS
	          this.currentMode = { mode: nextMode, duration: duration };
	          break;
	        }
	      case this.DIM:
	        {
	          var _duration = Math.floor(Math.random() * 0.1 * 60); // 60 FPS
	          var intensity = Math.random() / 4;
	          this.currentMode = { mode: nextMode, intensity: intensity, duration: _duration };
	          break;
	        }
	      default:
	        {
	          var _duration2 = Math.floor(Math.random() * 3 * 60); // 60 FPS
	          this.currentMode = { mode: nextMode, duration: _duration2 };
	        }
	    }
	  },
	  update: function update() {
	    switch (this.currentMode.mode) {
	      case this.OFF:
	        {
	          this.intensity = 0;
	          break;
	        }
	      case this.DIM:
	        {
	          this.intensity = this.currentMode.intensity;
	          break;
	        }
	      default:
	        {
	          this.intensity = 1000;
	        }
	    }
	    this.currentMode.duration = this.currentMode.duration - 1;
	    this.helper.update();
	    if (this.currentMode.duration <= 0) {
	      this.nextMode();
	    }
	  }
	});

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

	  // axisHelper = new THREE.AxisHelper(50);
	  // scene.add(axisHelper);

	  // ambientLight = new THREE.AmbientLight(0x000000, 0.1);
	  // scene.add(ambientLight);

	  var roomWidth = 250;
	  var roomHeight = 100;
	  var roomDepth = 300;
	  var room = new Room(roomWidth, roomHeight, roomDepth);
	  scene.add(room);

	  for (var i = 0; i < 30; i += 1) {
	    var bug = new _Bug2.default();
	    var x = -roomWidth / 2 + 1;
	    var y = -20 + Math.random() * 40;
	    var z = -20 + Math.random() * 40;
	    bug.position.set(x, y, z);
	    bug.rotation.y = Math.PI / 2;
	    bugs.push(bug);
	    scene.add(bug);
	  }

	  var light1 = new Light();
	  var light1Pos = {
	    x: 0,
	    y: roomHeight / 2 - 1,
	    z: 0
	  };
	  light1.position.set(light1Pos.x, light1Pos.y, light1Pos.z);
	  light1.lookAt(new THREE.Vector3(light1Pos.x, light1Pos.y - 1, light1Pos.z));
	  lights.push(light1);
	  scene.add(light1);

	  var light2 = new Light();
	  var light2Pos = {
	    x: -roomWidth / 4,
	    y: roomHeight / 2 - 1,
	    z: 0
	  };
	  light2.position.set(light2Pos.x, light2Pos.y, light2Pos.z);
	  light2.lookAt(new THREE.Vector3(light2Pos.x, light2Pos.y - 1, light2Pos.z));
	  lights.push(light2);
	  scene.add(light2);

	  var light3 = new Light();
	  var light3Pos = {
	    x: roomWidth / 4,
	    y: roomHeight / 2 - 1,
	    z: 0
	  };
	  light3.position.set(light3Pos.x, light3Pos.y, light3Pos.z);
	  light3.lookAt(new THREE.Vector3(light3Pos.x, light3Pos.y - 1, light3Pos.z));
	  lights.push(light3);
	  scene.add(light3);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	  renderer.shadowMap.enabled = true;
	  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(75, 0, 150);
	  camera.lookAt(origin);

	  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);

	  initStats();
	}

	function update() {
	  lights.forEach(function (light) {
	    return light.update();
	  });
	  bugs.forEach(function (bug) {
	    return bug.update();
	  });
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

/***/ },

/***/ 6:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function Bug() {
	  THREE.Object3D.call(this);
	  // const geometry = new THREE.SphereGeometry(1, 2, 2, 0, Math.PI);
	  var geometry = new THREE.CircleBufferGeometry(0.5);
	  var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
	  this.sphere = new THREE.Mesh(geometry, material);
	  this.sphere.castShadow = true;
	  this.sphere.receiveShadow = false;
	  this.add(this.sphere);
	}

	Bug.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
	  constructor: Bug,
	  update: function update() {
	    if (this.moveSteps) {
	      this.sphere.position.x += this.moveDelta.x;
	      this.sphere.position.y += this.moveDelta.y;
	      this.moveSteps -= 1;
	      return;
	    }
	    var wantsToMove = Math.random() > 0.9999;
	    if (wantsToMove) {
	      this.moveTarget = {
	        x: -20 + Math.random() * 40,
	        y: -20 + Math.random() * 40
	      };
	      this.moveSteps = 60 * 3;
	      this.moveDelta = {
	        x: this.moveTarget.x / this.moveSteps,
	        y: this.moveTarget.y / this.moveSteps
	      };
	    }
	  }
	});

	exports.default = Bug;

/***/ }

/******/ });