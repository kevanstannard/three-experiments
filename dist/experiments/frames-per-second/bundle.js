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

	var _FPS = __webpack_require__(6);

	var _FPS2 = _interopRequireDefault(_FPS);

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
	var axisHelper = void 0;
	var gridHelper = void 0;
	var orbitControls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	var stats = void 0;
	var fps = void 0;
	var fpsEl = void 0;

	var origin = new THREE.Vector3(0, 0, 0);

	function initStats() {
	  stats = new Stats();
	  stats.domElement.style.position = 'absolute';
	  stats.domElement.style.left = '0px';
	  stats.domElement.style.top = '20px';
	  stats.setMode(0); // 0: fps, 1: ms
	  document.getElementById('stats').appendChild(stats.domElement);
	}

	function init() {
	  fps = new _FPS2.default();

	  scene = new THREE.Scene();

	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);

	  var count = 3000;
	  for (var i = 0; i < count; i += 1) {
	    var geometry = new THREE.BoxGeometry(5, 5, 5);
	    var material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
	    var box = new THREE.Mesh(geometry, material);
	    box.position.x = Math.random() * 200 - 100;
	    box.position.y = Math.random() * 200 - 100;
	    box.position.z = Math.random() * 200 - 100;
	    scene.add(box);
	  }

	  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 200, -100);
	  scene.add(pointLight);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 200, 200);
	  camera.lookAt(origin);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);

	  initStats();

	  fpsEl = document.createElement('div');
	  fpsEl.style.color = 'white';
	  fpsEl.style.position = 'absolute';
	  fpsEl.style.top = '150px';
	  fpsEl.style.left = '0px';
	  document.body.appendChild(fpsEl);
	}

	var prevTime = void 0;
	var currTime = void 0;

	function update() {
	  fps.update();

	  currTime = Math.floor(fps.elapsed);
	  if (currTime !== prevTime) {
	    fpsEl.innerHTML = 'fps: ' + Math.round(fps.fps) + '<br />avg: ' + Math.round(fps.fpsAverage);
	    prevTime = currTime;
	  }

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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function now() {
	  return (window.performance || Date).now() / 1000; // Seconds
	}

	var FPS = function () {
	  function FPS() {
	    _classCallCheck(this, FPS);

	    this.prevTime = now();
	    this.delta = 0;
	    this.elapsed = 0;
	    this.frames = 0;
	    this.fps = 0;
	    this.fpsAverage = 0;
	  }

	  _createClass(FPS, [{
	    key: "update",
	    value: function update() {
	      var time = now();
	      this.frames += 1;
	      this.delta = time - this.prevTime;
	      this.elapsed += this.delta;
	      this.fps = 1 / this.delta;
	      this.fpsAverage = this.frames / this.elapsed;
	      this.prevTime = time;
	    }
	  }]);

	  return FPS;
	}();

	exports.default = FPS;

/***/ }

/******/ });