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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/solar-system/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/solar-system/index.js":
/*!***********************************************!*\
  !*** ./src/experiments/solar-system/index.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _model_scaled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/scaled */ \"./src/experiments/solar-system/model/scaled.js\");\n/* harmony import */ var _lib_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/factory */ \"./src/experiments/solar-system/lib/factory.js\");\n/* harmony import */ var _objects_solar_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objects/solar-system */ \"./src/experiments/solar-system/objects/solar-system.js\");\n\n\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 5000000;\nvar prevTime = Date.now();\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar stats;\nvar solarSystem;\nvar followObject;\nvar followObjectWorldPosition = new THREE.Vector3();\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  var axisHelper = new THREE.AxisHelper(1000);\n  scene.add(axisHelper);\n  solarSystem = new _objects_solar_system__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  var sol = Object(_lib_factory__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_model_scaled__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n  solarSystem.addBody(sol);\n  scene.add(solarSystem); // console.log(sol.children);\n  // followObject = sol.children[9];\n\n  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n  scene.add(ambientLight);\n  var pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 200, -100);\n  scene.add(pointLight);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(0, -100000, 100000);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n\n  if (!followObject) {\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  }\n\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats();\n}\n\nfunction update() {\n  var time = Date.now();\n  var delta = time - prevTime;\n  prevTime = time;\n  solarSystem.update(delta);\n  stats.update();\n\n  if (!followObject) {\n    orbitControls.update();\n  } else {\n    followObject.getWorldPosition(followObjectWorldPosition);\n    camera.position.set(followObjectWorldPosition.x, followObjectWorldPosition.y, 5000);\n    camera.lookAt(followObjectWorldPosition);\n  }\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/solar-system/index.js?");

/***/ }),

/***/ "./src/experiments/solar-system/lib/constants.js":
/*!*******************************************************!*\
  !*** ./src/experiments/solar-system/lib/constants.js ***!
  \*******************************************************/
/*! exports provided: ONE_MILLION, ONE_BILLION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ONE_MILLION\", function() { return ONE_MILLION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ONE_BILLION\", function() { return ONE_BILLION; });\nvar ONE_MILLION = 1000000;\nvar ONE_BILLION = ONE_MILLION * 1000;\n\n//# sourceURL=webpack:///./src/experiments/solar-system/lib/constants.js?");

/***/ }),

/***/ "./src/experiments/solar-system/lib/factory.js":
/*!*****************************************************!*\
  !*** ./src/experiments/solar-system/lib/factory.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objects_star__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/star */ \"./src/experiments/solar-system/objects/star.js\");\n/* harmony import */ var _objects_planet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/planet */ \"./src/experiments/solar-system/objects/planet.js\");\n/* harmony import */ var _objects_moon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/moon */ \"./src/experiments/solar-system/objects/moon.js\");\n\n\n\n\nfunction createMoon(moonModel) {\n  var moon = new _objects_moon__WEBPACK_IMPORTED_MODULE_2__[\"default\"](moonModel);\n  return moon;\n}\n\nfunction createPlanet(planetModel) {\n  var planet = new _objects_planet__WEBPACK_IMPORTED_MODULE_1__[\"default\"](planetModel);\n\n  if (planetModel.moons) {\n    planetModel.moons.forEach(function (moonModel) {\n      var moon = createMoon(moonModel);\n      planet.addMoon(moon);\n    });\n  }\n\n  return planet;\n}\n\nfunction createStar(starModel) {\n  var star = new _objects_star__WEBPACK_IMPORTED_MODULE_0__[\"default\"](starModel);\n\n  if (starModel.planets) {\n    starModel.planets.forEach(function (planetModel) {\n      var planet = createPlanet(planetModel);\n      star.addPlanet(planet);\n    });\n  }\n\n  return star;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createStar);\n\n//# sourceURL=webpack:///./src/experiments/solar-system/lib/factory.js?");

/***/ }),

/***/ "./src/experiments/solar-system/lib/orbit-period-scale.js":
/*!****************************************************************!*\
  !*** ./src/experiments/solar-system/lib/orbit-period-scale.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return orbitPeriodScale; });\nfunction orbitPeriodScale(periodDays) {\n  return periodDays / (365 * 24 * 6);\n}\n\n//# sourceURL=webpack:///./src/experiments/solar-system/lib/orbit-period-scale.js?");

/***/ }),

/***/ "./src/experiments/solar-system/model/index.js":
/*!*****************************************************!*\
  !*** ./src/experiments/solar-system/model/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/constants */ \"./src/experiments/solar-system/lib/constants.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'sol',\n  radius: 695700,\n  color: 0xffff00,\n  planets: [{\n    name: 'mercury',\n    color: 0xffffff,\n    radius: 2440,\n    // kms\n    orbitRadius: 58000000,\n    // kms\n    orbitPeriod: 88 // days\n\n  }, {\n    name: 'venus',\n    color: 0xd2691e,\n    radius: 6052,\n    // kms\n    orbitRadius: 108000000,\n    // kms\n    orbitPeriod: 225 // days\n\n  }, {\n    name: 'earth',\n    color: 0x0000ff,\n    radius: 6371,\n    // kms\n    orbitRadius: 150000000,\n    // kms\n    orbitPeriod: 365,\n    // days\n    moons: [{\n      name: 'moon',\n      color: 0xffffff,\n      radius: 1737,\n      // kms\n      orbitRadius: 384000,\n      // kms\n      orbitPeriod: 27 // days\n\n    }]\n  }, {\n    name: 'mars',\n    color: 0xff0000,\n    radius: 3390,\n    // kms\n    orbitRadius: 230000000,\n    // kms\n    orbitPeriod: 687 // days\n\n  }, {\n    name: 'jupiter',\n    color: 0xff6347,\n    radius: 69911,\n    // kms\n    orbitRadius: 778 * _lib_constants__WEBPACK_IMPORTED_MODULE_0__[\"ONE_MILLION\"],\n    // kms\n    orbitPeriod: 4329,\n    // days\n    moons: [{\n      name: 'ganymede',\n      color: 0xffffff,\n      radius: 5262 / 2,\n      orbitRadius: 1.07 * _lib_constants__WEBPACK_IMPORTED_MODULE_0__[\"ONE_MILLION\"],\n      orbitPeriod: 7\n    }, {\n      name: 'callisto',\n      color: 0xffffff,\n      radius: 4821 / 2,\n      orbitRadius: 1.8827 * _lib_constants__WEBPACK_IMPORTED_MODULE_0__[\"ONE_MILLION\"],\n      orbitPeriod: 17\n    }, {\n      name: 'io',\n      color: 0xffffff,\n      radius: 3660 / 2,\n      orbitRadius: 0.422 * _lib_constants__WEBPACK_IMPORTED_MODULE_0__[\"ONE_MILLION\"],\n      orbitPeriod: 1.7691\n    }]\n  }, {\n    name: 'saturn',\n    color: 0xffd700,\n    radius: 58232,\n    // kms\n    orbitRadius: 1.4 * _lib_constants__WEBPACK_IMPORTED_MODULE_0__[\"ONE_BILLION\"],\n    // kms\n    orbitPeriod: 10759 // days\n\n  }, {\n    name: 'uranus',\n    color: 0xccffff,\n    radius: 25362,\n    // kms\n    orbitRadius: 3 * _lib_constants__WEBPACK_IMPORTED_MODULE_0__[\"ONE_BILLION\"],\n    // kms\n    orbitPeriod: 84 * 365 // days\n\n  }, {\n    name: 'neptune',\n    color: 0x336699,\n    radius: 24622,\n    // kms\n    orbitRadius: 4.5 * _lib_constants__WEBPACK_IMPORTED_MODULE_0__[\"ONE_BILLION\"],\n    // kms\n    orbitPeriod: 165 * 365 // days\n\n  }]\n});\n\n//# sourceURL=webpack:///./src/experiments/solar-system/model/index.js?");

/***/ }),

/***/ "./src/experiments/solar-system/model/scaled.js":
/*!******************************************************!*\
  !*** ./src/experiments/solar-system/model/scaled.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/experiments/solar-system/model/index.js\");\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nvar RADIUS_SCALE = 0.01;\nvar ORBIT_RADIUS_SCALE = 0.0001;\n\nfunction scale(model) {\n  var scaledModel = _objectSpread({}, model);\n\n  if (model.radius) {\n    scaledModel.radius = model.radius * RADIUS_SCALE;\n  }\n\n  if (model.orbitRadius) {\n    scaledModel.orbitRadius = model.orbitRadius * ORBIT_RADIUS_SCALE;\n  }\n\n  return scaledModel;\n}\n\nfunction scaleMoon(model) {\n  var scaled = scale(model);\n  return scaled;\n}\n\nfunction scalePlanet(model) {\n  var scaled = scale(model);\n\n  if (model.moons) {\n    scaled.moons = model.moons.map(scaleMoon);\n  }\n\n  return scaled;\n}\n\nfunction scaleStar(model) {\n  var scaled = scale(model);\n\n  if (model.planets) {\n    scaled.planets = model.planets.map(scalePlanet);\n  }\n\n  return scaled;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (scaleStar(_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n\n//# sourceURL=webpack:///./src/experiments/solar-system/model/scaled.js?");

/***/ }),

/***/ "./src/experiments/solar-system/objects/moon.js":
/*!******************************************************!*\
  !*** ./src/experiments/solar-system/objects/moon.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Moon; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nvar Moon =\n/*#__PURE__*/\nfunction (_THREE$Object3D) {\n  _inherits(Moon, _THREE$Object3D);\n\n  function Moon(props) {\n    var _this;\n\n    _classCallCheck(this, Moon);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Moon).call(this));\n    var name = props.name,\n        radius = props.radius,\n        color = props.color,\n        orbitRadius = props.orbitRadius,\n        orbitPeriod = props.orbitPeriod;\n    var geometry = new THREE.SphereBufferGeometry(radius, 32, 32);\n    var material = new THREE.MeshBasicMaterial({\n      color: color\n    });\n    var mesh = new THREE.Mesh(geometry, material);\n\n    _this.add(mesh);\n\n    _this.name = name;\n    _this.radius = radius;\n    _this.orbitRadius = orbitRadius;\n    _this.orbitPeriod = orbitPeriod;\n    return _this;\n  }\n\n  return Moon;\n}(THREE.Object3D);\n\n\n\n//# sourceURL=webpack:///./src/experiments/solar-system/objects/moon.js?");

/***/ }),

/***/ "./src/experiments/solar-system/objects/orbit.js":
/*!*******************************************************!*\
  !*** ./src/experiments/solar-system/objects/orbit.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Orbit; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nvar Orbit =\n/*#__PURE__*/\nfunction (_THREE$Object3D) {\n  _inherits(Orbit, _THREE$Object3D);\n\n  function Orbit(radius) {\n    var _this;\n\n    _classCallCheck(this, Orbit);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Orbit).call(this));\n    var geometry = new THREE.CircleGeometry(radius, 1024);\n    geometry.vertices.shift(); // Remove the line that goes from the center to the ring\n\n    var material = new THREE.LineBasicMaterial({\n      color: 0xffffff,\n      transparent: true,\n      opacity: 0.2\n    });\n    var mesh = new THREE.Line(geometry, material);\n\n    _this.add(mesh);\n\n    return _this;\n  }\n\n  return Orbit;\n}(THREE.Object3D);\n\n\n\n//# sourceURL=webpack:///./src/experiments/solar-system/objects/orbit.js?");

/***/ }),

/***/ "./src/experiments/solar-system/objects/planet.js":
/*!********************************************************!*\
  !*** ./src/experiments/solar-system/objects/planet.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Planet; });\n/* harmony import */ var _orbit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orbit */ \"./src/experiments/solar-system/objects/orbit.js\");\n/* harmony import */ var _lib_orbit_period_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/orbit-period-scale */ \"./src/experiments/solar-system/lib/orbit-period-scale.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nfunction daysToSeconds(days) {\n  return days * 24 * 60 * 60;\n}\n\nvar Planet =\n/*#__PURE__*/\nfunction (_THREE$Object3D) {\n  _inherits(Planet, _THREE$Object3D);\n\n  function Planet(props) {\n    var _this;\n\n    _classCallCheck(this, Planet);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Planet).call(this));\n    var name = props.name,\n        radius = props.radius,\n        color = props.color,\n        orbitRadius = props.orbitRadius,\n        orbitPeriod = props.orbitPeriod;\n    var geometry = new THREE.SphereBufferGeometry(radius, 32, 32);\n    var material = new THREE.MeshBasicMaterial({\n      color: color\n    });\n    var mesh = new THREE.Mesh(geometry, material);\n\n    _this.add(mesh);\n\n    _this.name = name;\n    _this.radius = radius;\n    _this.orbitRadius = orbitRadius;\n    _this.orbitPeriod = orbitPeriod;\n    _this.satellites = [];\n    _this.prev = 0;\n    return _this;\n  }\n\n  _createClass(Planet, [{\n    key: \"addMoon\",\n    value: function addMoon(moon) {\n      var orbitPeriod = Object(_lib_orbit_period_scale__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(moon.orbitPeriod);\n      var satellite = {\n        moon: moon,\n        x: 0,\n        y: 0,\n        z: 0,\n        angle: 0,\n        orbitRadius: this.radius + moon.orbitRadius + moon.radius,\n        orbitPeriod: orbitPeriod,\n        orbitAnglePerSecond: 2 * Math.PI / daysToSeconds(orbitPeriod)\n      };\n      this.satellites.push(satellite);\n      this.add(moon);\n      var orbit = new _orbit__WEBPACK_IMPORTED_MODULE_0__[\"default\"](satellite.orbitRadius);\n      orbit.name = \"\".concat(moon.name, \"-orbit\");\n      this.add(orbit);\n    }\n  }, {\n    key: \"update\",\n    value: function update(delta) {\n      this.satellites.forEach(function (satellite) {\n        var deltaSeconds = delta / 1000;\n        var angleDelta = satellite.orbitAnglePerSecond * deltaSeconds;\n        satellite.angle += angleDelta;\n        satellite.x = satellite.orbitRadius * Math.cos(satellite.angle);\n        satellite.y = satellite.orbitRadius * Math.sin(satellite.angle);\n        satellite.moon.position.set(satellite.x, satellite.y, satellite.z);\n      });\n    }\n  }]);\n\n  return Planet;\n}(THREE.Object3D);\n\n\n\n//# sourceURL=webpack:///./src/experiments/solar-system/objects/planet.js?");

/***/ }),

/***/ "./src/experiments/solar-system/objects/solar-system.js":
/*!**************************************************************!*\
  !*** ./src/experiments/solar-system/objects/solar-system.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SolarSystem; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nvar SolarSystem =\n/*#__PURE__*/\nfunction (_THREE$Object3D) {\n  _inherits(SolarSystem, _THREE$Object3D);\n\n  function SolarSystem() {\n    var _this;\n\n    _classCallCheck(this, SolarSystem);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(SolarSystem).call(this));\n    _this.bodies = [];\n    return _this;\n  }\n\n  _createClass(SolarSystem, [{\n    key: \"addBody\",\n    value: function addBody(body) {\n      this.bodies.push(body);\n      this.add(body);\n    }\n  }, {\n    key: \"update\",\n    value: function update(delta) {\n      this.bodies.forEach(function (body) {\n        body.update(delta);\n      });\n    }\n  }]);\n\n  return SolarSystem;\n}(THREE.Object3D);\n\n\n\n//# sourceURL=webpack:///./src/experiments/solar-system/objects/solar-system.js?");

/***/ }),

/***/ "./src/experiments/solar-system/objects/star.js":
/*!******************************************************!*\
  !*** ./src/experiments/solar-system/objects/star.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Star; });\n/* harmony import */ var _orbit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orbit */ \"./src/experiments/solar-system/objects/orbit.js\");\n/* harmony import */ var _lib_orbit_period_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/orbit-period-scale */ \"./src/experiments/solar-system/lib/orbit-period-scale.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nfunction daysToSeconds(days) {\n  return days * 24 * 60 * 60;\n}\n\nvar Star =\n/*#__PURE__*/\nfunction (_THREE$Object3D) {\n  _inherits(Star, _THREE$Object3D);\n\n  function Star(props) {\n    var _this;\n\n    _classCallCheck(this, Star);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Star).call(this));\n    var name = props.name,\n        radius = props.radius,\n        color = props.color;\n    var geometry = new THREE.SphereBufferGeometry(radius, 32, 32);\n    var material = new THREE.MeshBasicMaterial({\n      color: color,\n      transparent: true,\n      opacity: 0.25\n    });\n    var mesh = new THREE.Mesh(geometry, material);\n\n    _this.add(mesh);\n\n    _this.name = name;\n    _this.radius = radius;\n    _this.satellites = [];\n    _this.prevTime = 0;\n    return _this;\n  }\n\n  _createClass(Star, [{\n    key: \"addPlanet\",\n    value: function addPlanet(planet) {\n      var satellite = {\n        planet: planet,\n        x: 0,\n        y: 0,\n        z: 0,\n        angle: 0,\n        orbitRadius: this.radius + planet.orbitRadius + planet.radius\n      };\n      this.satellites.push(satellite);\n      this.add(planet);\n      var orbit = new _orbit__WEBPACK_IMPORTED_MODULE_0__[\"default\"](satellite.orbitRadius);\n      this.add(orbit);\n    }\n  }, {\n    key: \"update\",\n    value: function update(delta) {\n      this.satellites.forEach(function (satellite) {\n        var orbitPeriod = Object(_lib_orbit_period_scale__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(satellite.planet.orbitPeriod);\n        var orbitAnglePerSecond = 2 * Math.PI / daysToSeconds(orbitPeriod);\n        var deltaSeconds = delta / 1000;\n        var angleDelta = orbitAnglePerSecond * deltaSeconds;\n        satellite.angle += angleDelta;\n        satellite.x = satellite.orbitRadius * Math.cos(satellite.angle);\n        satellite.y = satellite.orbitRadius * Math.sin(satellite.angle);\n        satellite.planet.position.set(satellite.x, satellite.y, satellite.z);\n        satellite.planet.update(delta);\n      });\n    }\n  }]);\n\n  return Star;\n}(THREE.Object3D);\n\n\n\n//# sourceURL=webpack:///./src/experiments/solar-system/objects/star.js?");

/***/ })

/******/ });