/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/pulsing-circles/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/pulsing-circles/CircleLineGeometry.js":
/*!***************************************************************!*\
  !*** ./src/experiments/pulsing-circles/CircleLineGeometry.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CircleLineGeometry; });\nfunction CircleLineGeometry(radius, segments, thetaStart, thetaLength) {\n  var args = {\n    radius: radius || 50,\n    segments: segments || 8,\n    thetaStart: thetaStart || 0,\n    thetaLength: thetaLength || 2 * Math.PI\n  };\n  var geometry = new THREE.Geometry();\n  var delta = (args.thetaStart + args.thetaLength - args.thetaStart) / args.segments;\n\n  for (var i = 0; i <= args.segments; i += 1) {\n    var angle = args.thetaStart + delta * i;\n    var x = args.radius * Math.cos(angle);\n    var y = args.radius * Math.sin(angle);\n    geometry.vertices.push(new THREE.Vector3(x, y, 0));\n  }\n\n  return geometry;\n}\n\n//# sourceURL=webpack:///./src/experiments/pulsing-circles/CircleLineGeometry.js?");

/***/ }),

/***/ "./src/experiments/pulsing-circles/Pulse.js":
/*!**************************************************!*\
  !*** ./src/experiments/pulsing-circles/Pulse.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Pulse; });\n/* harmony import */ var _CircleLineGeometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CircleLineGeometry */ \"./src/experiments/pulsing-circles/CircleLineGeometry.js\");\n\nfunction Pulse(radius) {\n  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;\n  var autoStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;\n  THREE.Object3D.call(this);\n  this.duration = duration;\n  var segments = 32;\n  var discColor = 0x8DE2E0;\n  var lineColor = discColor;\n  var discGeometry = new THREE.CircleGeometry(radius, segments);\n  var discMaterial = new THREE.MeshLambertMaterial({\n    side: THREE.DoubleSide,\n    color: discColor,\n    transparent: true,\n    opacity: 0\n  });\n  this.disc = new THREE.Mesh(discGeometry, discMaterial);\n  this.add(this.disc);\n  var lineGeometry = new _CircleLineGeometry__WEBPACK_IMPORTED_MODULE_0__[\"default\"](radius, segments);\n  var lineMaterial = new THREE.LineBasicMaterial({\n    color: lineColor,\n    linewidth: 1,\n    transparent: true,\n    opacity: 0\n  });\n  this.line = new THREE.Line(lineGeometry, lineMaterial);\n  this.add(this.line);\n\n  if (autoStart) {\n    this.start();\n  }\n}\nPulse.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {\n  constructor: Pulse,\n  start: function start() {\n    this.started = new Date();\n  },\n  stop: function stop() {\n    this.started = null;\n  },\n  update: function update() {\n    if (!this.started) {\n      return;\n    }\n\n    var now = new Date();\n    var timeElapsed = now - this.started;\n    var percentElapsed = timeElapsed / this.duration;\n\n    if (percentElapsed >= 1) {\n      percentElapsed -= Math.floor(percentElapsed);\n    }\n\n    var opacity = 1 - percentElapsed;\n    var scale = percentElapsed;\n\n    if (scale <= 0) {\n      scale = 0.001;\n    } // I was getting an error:\n    //  Matrix3.getInverse(): can't invert matrix, determinant is 0\n    //\n    // From SO:\n    //  Matrix3.getInverse(): can't invert matrix, determinant is 0\n    //  usually happens when either the scale.x, scale.y or scale.z are 0.\n    //  Make sure you're not scaling the object to 0.\n    //\n    // Ref:\n    //  http://stackoverflow.com/questions/19150120/scaling-an-object-in-three-js\n\n\n    this.scale.set(scale, scale, scale);\n    this.line.material.opacity = opacity;\n    this.disc.material.opacity = opacity * 0.15;\n  }\n});\n\n//# sourceURL=webpack:///./src/experiments/pulsing-circles/Pulse.js?");

/***/ }),

/***/ "./src/experiments/pulsing-circles/Pulses.js":
/*!***************************************************!*\
  !*** ./src/experiments/pulsing-circles/Pulses.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Pulses; });\n/* harmony import */ var _Pulse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pulse */ \"./src/experiments/pulsing-circles/Pulse.js\");\n\nfunction Pulses(radius) {\n  var _this = this;\n\n  THREE.Object3D.call(this);\n  this.pulse1 = new _Pulse__WEBPACK_IMPORTED_MODULE_0__[\"default\"](radius, 4000, false);\n  this.pulse1.position.z = -0.5;\n  this.pulse2 = new _Pulse__WEBPACK_IMPORTED_MODULE_0__[\"default\"](radius, 4000, false);\n  this.pulse2.position.z = 0.5;\n  this.add(this.pulse1);\n  this.add(this.pulse2);\n  this.pulse1.start();\n  setTimeout(function () {\n    _this.pulse2.start();\n  }, 2000);\n}\nPulses.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {\n  constructor: Pulses,\n  update: function update() {\n    this.pulse1.update();\n    this.pulse2.update();\n  }\n});\n\n//# sourceURL=webpack:///./src/experiments/pulsing-circles/Pulses.js?");

/***/ }),

/***/ "./src/experiments/pulsing-circles/index.js":
/*!**************************************************!*\
  !*** ./src/experiments/pulsing-circles/index.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Pulses__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pulses */ \"./src/experiments/pulsing-circles/Pulses.js\");\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar pulses1;\nvar pulses2;\nvar pulses3;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction init() {\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  pulses1 = new _Pulses__WEBPACK_IMPORTED_MODULE_0__[\"default\"](20);\n  pulses1.position.set(-20, 20, -10); // pulses1.rotation.x = -Math.PI / 4;\n\n  scene.add(pulses1);\n  pulses2 = new _Pulses__WEBPACK_IMPORTED_MODULE_0__[\"default\"](20);\n  pulses2.position.set(20, 20, 10); // pulses2.rotation.y = Math.PI / 4;\n\n  scene.add(pulses2);\n  pulses3 = new _Pulses__WEBPACK_IMPORTED_MODULE_0__[\"default\"](20);\n  pulses3.position.set(0, 0, 0);\n  scene.add(pulses3);\n  ambientLight = new THREE.AmbientLight(0x444444);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 50, 50);\n  scene.add(pointLight);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(0, 50, 100);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction update() {\n  pulses1.update();\n  pulses1.rotation.x += 0.005;\n  pulses1.rotation.y += 0.005;\n  pulses1.rotation.z += 0.005;\n  pulses2.update();\n  pulses2.rotation.x += 0.01;\n  pulses2.rotation.y += 0.01;\n  pulses2.rotation.z += 0.01;\n  pulses3.update();\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/pulsing-circles/index.js?");

/***/ })

/******/ });