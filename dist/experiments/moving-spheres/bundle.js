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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/moving-spheres/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/moving-spheres/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/moving-spheres/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _move_stationary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./move/stationary */ \"./src/experiments/moving-spheres/move/stationary.js\");\n/* harmony import */ var _move_perimeter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./move/perimeter */ \"./src/experiments/moving-spheres/move/perimeter.js\");\n/* harmony import */ var _move_circle_target__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./move/circle-target */ \"./src/experiments/moving-spheres/move/circle-target.js\");\n/* harmony import */ var _objects_bot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objects/bot */ \"./src/experiments/moving-spheres/objects/bot.js\");\n\n\n\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axesHelper;\nvar gridHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar prevTime = Date.now();\nvar origin = new THREE.Vector3(0, 0, 0);\nvar bots = [];\nvar bot0 = new _objects_bot__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n  name: 'Bot 0',\n  radius: 10,\n  color: '#777777',\n  move: new _move_stationary__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n});\nbots.push(bot0);\nvar bot1 = new _objects_bot__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n  name: 'Bot 1',\n  radius: 10,\n  color: '#ff0000',\n  move: new _move_perimeter__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    speed: 40,\n    boundary: [new THREE.Vector3(-50, 0, -50), new THREE.Vector3(50, 0, -50), new THREE.Vector3(50, 0, 50), new THREE.Vector3(-50, 0, 50)]\n  })\n});\nbots.push(bot1);\nvar bot2 = new _objects_bot__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n  name: 'Bot 2',\n  radius: 30,\n  color: '#0000ff',\n  move: new _move_perimeter__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    speed: 20,\n    boundary: [new THREE.Vector3(-100, 0, -100), new THREE.Vector3(100, 0, -100), new THREE.Vector3(100, 0, 100), new THREE.Vector3(-100, 0, 100)]\n  })\n});\nbots.push(bot2);\nvar bot3 = new _objects_bot__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n  name: 'Bot 3',\n  radius: 5,\n  color: '#ffff00',\n  move: new _move_circle_target__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n    speed: Math.PI / 2,\n    radius: 20,\n    target: bot1\n  })\n});\nbots.push(bot3);\n\nfunction init() {\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(200, 10);\n  scene.add(gridHelper);\n  axesHelper = new THREE.AxesHelper(100);\n  scene.add(axesHelper);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(200, 200, 200);\n  camera.lookAt(origin);\n  bots.forEach(function (bot) {\n    return scene.add(bot);\n  });\n  ambientLight = new THREE.AmbientLight(0x444444);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0x0000ff, 1, 1000);\n  pointLight.position.set(100, 100, 100);\n  scene.add(pointLight);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction update() {\n  var time = Date.now();\n  var delta = time - prevTime;\n  prevTime = time;\n  bots.forEach(function (bot) {\n    return bot.update(delta);\n  });\n  controls.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/moving-spheres/index.js?");

/***/ }),

/***/ "./src/experiments/moving-spheres/move/circle-target.js":
/*!**************************************************************!*\
  !*** ./src/experiments/moving-spheres/move/circle-target.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CircleTarget; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar CircleTarget =\n/*#__PURE__*/\nfunction () {\n  function CircleTarget(_ref) {\n    var speed = _ref.speed,\n        radius = _ref.radius,\n        target = _ref.target;\n\n    _classCallCheck(this, CircleTarget);\n\n    this.speed = speed; // radians per second\n\n    this.radius = radius;\n    this.target = target;\n    this.angle = 0;\n  }\n\n  _createClass(CircleTarget, [{\n    key: \"getMoveVector\",\n    value: function getMoveVector(currentPosition, delta) {\n      var angleToMove = delta / 1000 * this.speed;\n      this.angle = this.angle + angleToMove;\n      var x = this.radius * Math.cos(this.angle);\n      var z = this.radius * Math.sin(this.angle);\n      var y = 0;\n      var targetPosition = new THREE.Vector3(this.target.position.x + x, this.target.position.y + y, this.target.position.z + z);\n      var moveVector = targetPosition.clone().sub(currentPosition);\n      return moveVector;\n    }\n  }]);\n\n  return CircleTarget;\n}();\n\n\n\n//# sourceURL=webpack:///./src/experiments/moving-spheres/move/circle-target.js?");

/***/ }),

/***/ "./src/experiments/moving-spheres/move/perimeter.js":
/*!**********************************************************!*\
  !*** ./src/experiments/moving-spheres/move/perimeter.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Perimeter; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Perimeter =\n/*#__PURE__*/\nfunction () {\n  function Perimeter(_ref) {\n    var speed = _ref.speed,\n        boundary = _ref.boundary;\n\n    _classCallCheck(this, Perimeter);\n\n    this.speed = speed;\n    this.targetPositions = boundary;\n    this.targetPositionIndex = -1;\n    this.targetPosition = null;\n  }\n\n  _createClass(Perimeter, [{\n    key: \"getMoveVector\",\n    value: function getMoveVector(currentPosition, delta) {\n      if (!this.targetPosition) {\n        this.targetPositionIndex = 1;\n        this.targetPosition = this.targetPositions[this.targetPositionIndex];\n        return this.targetPositions[0];\n      }\n\n      var distanceToMove = delta / 1000 * this.speed;\n      var vectorToTarget = this.targetPosition.clone().sub(currentPosition);\n      var distanceToTarget = currentPosition.distanceTo(this.targetPosition);\n      var moveVector;\n\n      if (distanceToMove >= distanceToTarget) {\n        moveVector = vectorToTarget;\n        this.targetPositionIndex = (this.targetPositionIndex + 1) % this.targetPositions.length;\n        this.targetPosition = this.targetPositions[this.targetPositionIndex];\n      } else {\n        moveVector = vectorToTarget.normalize().multiplyScalar(distanceToMove);\n      }\n\n      return moveVector;\n    }\n  }]);\n\n  return Perimeter;\n}();\n\n\n\n//# sourceURL=webpack:///./src/experiments/moving-spheres/move/perimeter.js?");

/***/ }),

/***/ "./src/experiments/moving-spheres/move/stationary.js":
/*!***********************************************************!*\
  !*** ./src/experiments/moving-spheres/move/stationary.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Stationary; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/* eslint class-methods-use-this: off */\nvar zero = new THREE.Vector3();\n\nvar Stationary =\n/*#__PURE__*/\nfunction () {\n  function Stationary() {\n    _classCallCheck(this, Stationary);\n  }\n\n  _createClass(Stationary, [{\n    key: \"getMoveVector\",\n    value: function getMoveVector() {\n      return zero;\n    }\n  }]);\n\n  return Stationary;\n}();\n\n\n\n//# sourceURL=webpack:///./src/experiments/moving-spheres/move/stationary.js?");

/***/ }),

/***/ "./src/experiments/moving-spheres/objects/bot.js":
/*!*******************************************************!*\
  !*** ./src/experiments/moving-spheres/objects/bot.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bot; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nvar Bot =\n/*#__PURE__*/\nfunction (_THREE$Object3D) {\n  _inherits(Bot, _THREE$Object3D);\n\n  function Bot(props) {\n    var _this;\n\n    _classCallCheck(this, Bot);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bot).call(this));\n    var name = props.name,\n        radius = props.radius,\n        color = props.color,\n        move = props.move;\n    var geometry = new THREE.SphereBufferGeometry(radius, 32, 32);\n    var material = new THREE.MeshBasicMaterial({\n      color: color\n    });\n    var mesh = new THREE.Mesh(geometry, material);\n\n    _this.add(mesh);\n\n    _this.name = name;\n    _this.radius = radius;\n    _this.move = move;\n    return _this;\n  }\n\n  _createClass(Bot, [{\n    key: \"update\",\n    value: function update(delta) {\n      var moveVector = this.move.getMoveVector(this.position, delta);\n      this.position.add(moveVector);\n    }\n  }]);\n\n  return Bot;\n}(THREE.Object3D);\n\n\n\n//# sourceURL=webpack:///./src/experiments/moving-spheres/objects/bot.js?");

/***/ })

/******/ });