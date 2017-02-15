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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Pulses = __webpack_require__(5);

	var _Pulses2 = _interopRequireDefault(_Pulses);

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
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;

	var pulses1 = void 0;
	var pulses2 = void 0;
	var pulses3 = void 0;

	var origin = new THREE.Vector3(0, 0, 0);

	function init() {
	  scene = new THREE.Scene();

	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);

	  pulses1 = new _Pulses2.default(20);
	  pulses1.position.set(-20, 20, -10);
	  // pulses1.rotation.x = -Math.PI / 4;
	  scene.add(pulses1);

	  pulses2 = new _Pulses2.default(20);
	  pulses2.position.set(20, 20, 10);
	  // pulses2.rotation.y = Math.PI / 4;
	  scene.add(pulses2);

	  pulses3 = new _Pulses2.default(20);
	  pulses3.position.set(0, 0, 0);
	  scene.add(pulses3);

	  ambientLight = new THREE.AmbientLight(0x444444);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 50, 50);
	  scene.add(pointLight);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(0, 50, 100);
	  camera.lookAt(origin);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);

	  controls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);
	}

	function update() {
	  pulses1.update();
	  pulses1.rotation.x += 0.005;
	  pulses1.rotation.y += 0.005;
	  pulses1.rotation.z += 0.005;

	  pulses2.update();
	  pulses2.rotation.x += 0.01;
	  pulses2.rotation.y += 0.01;
	  pulses2.rotation.z += 0.01;

	  pulses3.update();

	  controls.update();
	}

	function animate() {
	  requestAnimationFrame(animate);
	  update();
	  renderer.render(scene, camera);
	}

	init();
	animate();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Pulses;

	var _Pulse = __webpack_require__(6);

	var _Pulse2 = _interopRequireDefault(_Pulse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Pulses(radius) {
	  var _this = this;

	  THREE.Object3D.call(this);

	  this.pulse1 = new _Pulse2.default(radius, 4000, false);
	  this.pulse1.position.z = -0.5;

	  this.pulse2 = new _Pulse2.default(radius, 4000, false);
	  this.pulse2.position.z = 0.5;

	  this.add(this.pulse1);
	  this.add(this.pulse2);

	  this.pulse1.start();
	  setTimeout(function () {
	    _this.pulse2.start();
	  }, 2000);
	}

	Pulses.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {

	  constructor: Pulses,

	  update: function update() {
	    this.pulse1.update();
	    this.pulse2.update();
	  }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Pulse;

	var _CircleLineGeometry = __webpack_require__(7);

	var _CircleLineGeometry2 = _interopRequireDefault(_CircleLineGeometry);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Pulse(radius) {
	  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;
	  var autoStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	  THREE.Object3D.call(this);

	  this.duration = duration;
	  var segments = 32;
	  var discColor = 0x8DE2E0;
	  var lineColor = discColor;

	  var discGeometry = new THREE.CircleGeometry(radius, segments);
	  var discMaterial = new THREE.MeshLambertMaterial({
	    side: THREE.DoubleSide,
	    color: discColor,
	    transparent: true,
	    opacity: 0
	  });
	  this.disc = new THREE.Mesh(discGeometry, discMaterial);
	  this.add(this.disc);

	  var lineGeometry = new _CircleLineGeometry2.default(radius, segments);
	  var lineMaterial = new THREE.LineBasicMaterial({
	    color: lineColor,
	    linewidth: 1,
	    transparent: true,
	    opacity: 0
	  });
	  this.line = new THREE.Line(lineGeometry, lineMaterial);
	  this.add(this.line);

	  if (autoStart) {
	    this.start();
	  }
	}

	Pulse.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {

	  constructor: Pulse,

	  start: function start() {
	    this.started = new Date();
	  },
	  stop: function stop() {
	    this.started = null;
	  },
	  update: function update() {
	    if (!this.started) {
	      return;
	    }
	    var now = new Date();
	    var timeElapsed = now - this.started;
	    var percentElapsed = timeElapsed / this.duration;
	    if (percentElapsed >= 1) {
	      percentElapsed -= Math.floor(percentElapsed);
	    }

	    var opacity = 1 - percentElapsed;

	    var scale = percentElapsed;
	    if (scale <= 0) {
	      scale = 0.001;
	    }

	    // I was getting an error:
	    //  Matrix3.getInverse(): can't invert matrix, determinant is 0
	    //
	    // From SO:
	    //  Matrix3.getInverse(): can't invert matrix, determinant is 0
	    //  usually happens when either the scale.x, scale.y or scale.z are 0.
	    //  Make sure you're not scaling the object to 0.
	    //
	    // Ref:
	    //  http://stackoverflow.com/questions/19150120/scaling-an-object-in-three-js

	    this.scale.set(scale, scale, scale);
	    this.line.material.opacity = opacity;
	    this.disc.material.opacity = opacity * 0.15;
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = CircleLineGeometry;
	function CircleLineGeometry(radius, segments, thetaStart, thetaLength) {
	  var args = {
	    radius: radius || 50,
	    segments: segments || 8,
	    thetaStart: thetaStart || 0,
	    thetaLength: thetaLength || 2 * Math.PI
	  };
	  var geometry = new THREE.Geometry();
	  var delta = (args.thetaStart + args.thetaLength - args.thetaStart) / args.segments;
	  for (var i = 0; i <= args.segments; i += 1) {
	    var angle = args.thetaStart + delta * i;
	    var x = args.radius * Math.cos(angle);
	    var y = args.radius * Math.sin(angle);
	    geometry.vertices.push(new THREE.Vector3(x, y, 0));
	  }
	  return geometry;
	}

/***/ }
/******/ ]);