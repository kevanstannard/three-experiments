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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/object-move/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/object-move/index.js":
/*!**********************************************!*\
  !*** ./src/experiments/object-move/index.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objects_car__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects/car */ \"./src/experiments/object-move/objects/car.js\");\n/* harmony import */ var _objects_bot_car__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objects/bot-car */ \"./src/experiments/object-move/objects/bot-car.js\");\n\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar pointLight;\nvar ambientLight;\nvar keyboard;\nvar car;\nvar botCars;\nvar clock;\nvar botCarCount = 3;\nvar key = {\n  FORWARD: 'W',\n  BACKWARD: 'S',\n  LEFT: 'A',\n  RIGHT: 'D',\n  UP: 'space',\n  DOWN: 'shift'\n};\n\nfunction init() {\n  clock = new THREE.Clock();\n  clock.start();\n  keyboard = new KeyboardState();\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(1000, 50);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  car = new _objects_car__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n    name: 'Player',\n    color: 0x888888,\n    size: 20\n  });\n  scene.add(car);\n  botCars = [];\n\n  for (var i = 0; i < botCarCount; i += 1) {\n    var botCar = new _objects_bot_car__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      name: 'Bot',\n      color: 0xff8888,\n      size: 20\n    });\n    botCars.push(botCar);\n    scene.add(botCar);\n  }\n\n  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 50, 50);\n  scene.add(pointLight);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(0, 200, -200);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction updateCamera() {\n  var carDirection = car.getWorldDirection(); // Unit vector\n\n  var reverseDirection = carDirection.negate();\n  var heightVector = new THREE.Vector3(0, 400, 0);\n  var cameraVector = reverseDirection.multiplyScalar(600).add(heightVector);\n  var cameraPosition = car.position.clone().add(cameraVector);\n  camera.position.copy(cameraPosition);\n  camera.lookAt(car.position);\n}\n\nfunction update() {\n  var delta = clock.getDelta();\n  keyboard.update();\n\n  if (keyboard.pressed(key.LEFT)) {\n    car.rotateLeft(delta);\n  }\n\n  if (keyboard.pressed(key.RIGHT)) {\n    car.rotateRight(delta);\n  }\n\n  if (keyboard.pressed(key.FORWARD)) {\n    car.moveForward(delta);\n  }\n\n  if (keyboard.pressed(key.BACKWARD)) {\n    car.moveBackward(delta);\n  }\n\n  updateCamera();\n  botCars.forEach(function (botCar) {\n    return botCar.update(delta);\n  });\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/object-move/index.js?");

/***/ }),

/***/ "./src/experiments/object-move/objects/bot-car.js":
/*!********************************************************!*\
  !*** ./src/experiments/object-move/objects/bot-car.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BotCar; });\n/* harmony import */ var _car__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./car */ \"./src/experiments/object-move/objects/car.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\nvar ACTION_FORWARD = -1;\nvar ACTION_LEFT = 0;\nvar ACTION_RIGHT = 1;\n\nvar shouldTurn = function shouldTurn() {\n  return Math.random() < 0.5;\n};\n\nvar whichTurn = function whichTurn() {\n  return Math.floor(Math.random() * 2);\n};\n\nvar BotCar =\n/*#__PURE__*/\nfunction (_Car) {\n  _inherits(BotCar, _Car);\n\n  function BotCar(props) {\n    var _this;\n\n    _classCallCheck(this, BotCar);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(BotCar).call(this, props));\n    _this.currentAction = ACTION_FORWARD;\n    _this.timeRemaining = 0;\n    return _this;\n  }\n\n  _createClass(BotCar, [{\n    key: \"update\",\n    value: function update(delta) {\n      this.timeRemaining -= delta;\n\n      if (this.timeRemaining <= 0) {\n        if (shouldTurn()) {\n          this.currentAction = whichTurn();\n        } else {\n          this.currentAction = ACTION_FORWARD;\n        }\n\n        this.timeRemaining = 1;\n      }\n\n      switch (this.currentAction) {\n        case ACTION_LEFT:\n          {\n            this.rotateLeft(delta);\n            break;\n          }\n\n        case ACTION_RIGHT:\n          {\n            this.rotateRight(delta);\n            break;\n          }\n\n        default:\n          {// No default\n          }\n      }\n\n      this.moveForward(delta);\n    }\n  }]);\n\n  return BotCar;\n}(_car__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./src/experiments/object-move/objects/bot-car.js?");

/***/ }),

/***/ "./src/experiments/object-move/objects/car.js":
/*!****************************************************!*\
  !*** ./src/experiments/object-move/objects/car.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Car; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nvar Car =\n/*#__PURE__*/\nfunction (_THREE$Object3D) {\n  _inherits(Car, _THREE$Object3D);\n\n  function Car(props) {\n    var _this;\n\n    _classCallCheck(this, Car);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Car).call(this));\n    var name = props.name,\n        color = props.color,\n        size = props.size;\n    var bodyGeometry = new THREE.BoxGeometry(size, size, size);\n    var bodyMaterial = new THREE.MeshLambertMaterial({\n      color: color\n    });\n    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);\n    body.position.set(0, size / 2, 0);\n    var arrowDirection = new THREE.Vector3(0, 0, 1).normalize();\n    var arrowLength = size;\n    var arrowColor = 0xffffff;\n    var arrowPosition = new THREE.Vector3(0, 0, 0);\n    var arrow = new THREE.ArrowHelper(arrowDirection, arrowPosition, arrowLength, arrowColor);\n    body.add(arrow);\n\n    _this.add(body);\n\n    _this.name = name;\n    var speedScale = 50 / size;\n    _this.moveSpeed = 50 * speedScale; // units per second\n\n    _this.rotationSpeed = Math.PI / 180 * 50 * speedScale; // radians per second\n\n    return _this;\n  }\n\n  _createClass(Car, [{\n    key: \"rotateLeft\",\n    value: function rotateLeft(delta) {\n      var rotationAngle = this.rotationSpeed * delta;\n      this.rotateY(rotationAngle);\n    }\n  }, {\n    key: \"rotateRight\",\n    value: function rotateRight(delta) {\n      var rotationAngle = this.rotationSpeed * delta;\n      this.rotateY(-rotationAngle);\n    }\n  }, {\n    key: \"moveForward\",\n    value: function moveForward(delta) {\n      var distance = this.moveSpeed * delta;\n      var forwardDirection = this.getWorldDirection(); // Note: This is a unit vector\n\n      forwardDirection.multiplyScalar(distance);\n      this.position.add(forwardDirection);\n    }\n  }, {\n    key: \"moveBackward\",\n    value: function moveBackward(delta) {\n      var distance = this.moveSpeed * delta;\n      var backwardDirection = this.getWorldDirection().negate();\n      backwardDirection.multiplyScalar(distance);\n      this.position.add(backwardDirection);\n    }\n  }]);\n\n  return Car;\n}(THREE.Object3D);\n\n\n\n//# sourceURL=webpack:///./src/experiments/object-move/objects/car.js?");

/***/ })

/******/ });