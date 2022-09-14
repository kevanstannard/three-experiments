/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/experiments/moving-spheres/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/moving-spheres/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _move_stationary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./move/stationary */ \"./src/experiments/moving-spheres/move/stationary.js\");\n/* harmony import */ var _move_perimeter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./move/perimeter */ \"./src/experiments/moving-spheres/move/perimeter.js\");\n/* harmony import */ var _move_circle_target__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./move/circle-target */ \"./src/experiments/moving-spheres/move/circle-target.js\");\n/* harmony import */ var _objects_bot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objects/bot */ \"./src/experiments/moving-spheres/objects/bot.js\");\n\n\n\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axesHelper;\nvar gridHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar prevTime = Date.now();\nvar origin = new THREE.Vector3(0, 0, 0);\nvar bots = [];\nvar bot0 = new _objects_bot__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n    name: \"Bot 0\",\n    radius: 10,\n    color: \"#777777\",\n    move: new _move_stationary__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\n});\nbots.push(bot0);\nvar bot1 = new _objects_bot__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n    name: \"Bot 1\",\n    radius: 10,\n    color: \"#ff0000\",\n    move: new _move_perimeter__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n        speed: 40,\n        boundary: [\n            new THREE.Vector3(-50, 0, -50),\n            new THREE.Vector3(50, 0, -50),\n            new THREE.Vector3(50, 0, 50),\n            new THREE.Vector3(-50, 0, 50), \n        ]\n    })\n});\nbots.push(bot1);\nvar bot2 = new _objects_bot__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n    name: \"Bot 2\",\n    radius: 30,\n    color: \"#0000ff\",\n    move: new _move_perimeter__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n        speed: 20,\n        boundary: [\n            new THREE.Vector3(-100, 0, -100),\n            new THREE.Vector3(100, 0, -100),\n            new THREE.Vector3(100, 0, 100),\n            new THREE.Vector3(-100, 0, 100), \n        ]\n    })\n});\nbots.push(bot2);\nvar bot3 = new _objects_bot__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n    name: \"Bot 3\",\n    radius: 5,\n    color: \"#ffff00\",\n    move: new _move_circle_target__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n        speed: Math.PI / 2,\n        radius: 20,\n        target: bot1\n    })\n});\nbots.push(bot3);\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(200, 10);\n    scene.add(gridHelper);\n    axesHelper = new THREE.AxesHelper(100);\n    scene.add(axesHelper);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    bots.forEach(function(bot) {\n        return scene.add(bot);\n    });\n    ambientLight = new THREE.AmbientLight(0x444444);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0x0000ff, 1, 1000);\n    pointLight.position.set(100, 100, 100);\n    scene.add(pointLight);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction update() {\n    var time = Date.now();\n    var delta = time - prevTime;\n    prevTime = time;\n    bots.forEach(function(bot) {\n        return bot.update(delta);\n    });\n    controls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/moving-spheres/index.js?");

/***/ }),

/***/ "./src/experiments/moving-spheres/move/circle-target.js":
/*!**************************************************************!*\
  !*** ./src/experiments/moving-spheres/move/circle-target.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CircleTarget)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nvar CircleTarget = /*#__PURE__*/ function() {\n    \"use strict\";\n    function CircleTarget(param) {\n        var speed = param.speed, radius = param.radius, target = param.target;\n        _classCallCheck(this, CircleTarget);\n        this.speed = speed; // radians per second\n        this.radius = radius;\n        this.target = target;\n        this.angle = 0;\n    }\n    var _proto = CircleTarget.prototype;\n    _proto.getMoveVector = function getMoveVector(currentPosition, delta) {\n        var angleToMove = delta / 1000 * this.speed;\n        this.angle = this.angle + angleToMove;\n        var x = this.radius * Math.cos(this.angle);\n        var z = this.radius * Math.sin(this.angle);\n        var y = 0;\n        var targetPosition = new THREE.Vector3(this.target.position.x + x, this.target.position.y + y, this.target.position.z + z);\n        var moveVector = targetPosition.clone().sub(currentPosition);\n        return moveVector;\n    };\n    return CircleTarget;\n}();\n\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/moving-spheres/move/circle-target.js?");

/***/ }),

/***/ "./src/experiments/moving-spheres/move/perimeter.js":
/*!**********************************************************!*\
  !*** ./src/experiments/moving-spheres/move/perimeter.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Perimeter)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nvar Perimeter = /*#__PURE__*/ function() {\n    \"use strict\";\n    function Perimeter(param) {\n        var speed = param.speed, boundary = param.boundary;\n        _classCallCheck(this, Perimeter);\n        this.speed = speed;\n        this.targetPositions = boundary;\n        this.targetPositionIndex = -1;\n        this.targetPosition = null;\n    }\n    var _proto = Perimeter.prototype;\n    _proto.getMoveVector = function getMoveVector(currentPosition, delta) {\n        if (!this.targetPosition) {\n            this.targetPositionIndex = 1;\n            this.targetPosition = this.targetPositions[this.targetPositionIndex];\n            return this.targetPositions[0];\n        }\n        var distanceToMove = delta / 1000 * this.speed;\n        var vectorToTarget = this.targetPosition.clone().sub(currentPosition);\n        var distanceToTarget = currentPosition.distanceTo(this.targetPosition);\n        var moveVector;\n        if (distanceToMove >= distanceToTarget) {\n            moveVector = vectorToTarget;\n            this.targetPositionIndex = (this.targetPositionIndex + 1) % this.targetPositions.length;\n            this.targetPosition = this.targetPositions[this.targetPositionIndex];\n        } else {\n            moveVector = vectorToTarget.normalize().multiplyScalar(distanceToMove);\n        }\n        return moveVector;\n    };\n    return Perimeter;\n}();\n\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/moving-spheres/move/perimeter.js?");

/***/ }),

/***/ "./src/experiments/moving-spheres/move/stationary.js":
/*!***********************************************************!*\
  !*** ./src/experiments/moving-spheres/move/stationary.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Stationary)\n/* harmony export */ });\n/* eslint class-methods-use-this: off */ function _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nvar zero = new THREE.Vector3();\nvar Stationary = /*#__PURE__*/ function() {\n    \"use strict\";\n    function Stationary() {\n        _classCallCheck(this, Stationary);\n    }\n    var _proto = Stationary.prototype;\n    _proto.getMoveVector = function getMoveVector() {\n        return zero;\n    };\n    return Stationary;\n}();\n\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/moving-spheres/move/stationary.js?");

/***/ }),

/***/ "./src/experiments/moving-spheres/objects/bot.js":
/*!*******************************************************!*\
  !*** ./src/experiments/moving-spheres/objects/bot.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Bot)\n/* harmony export */ });\nfunction _assertThisInitialized(self) {\n    if (self === void 0) {\n        throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return self;\n}\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nfunction _getPrototypeOf(o) {\n    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n        return o.__proto__ || Object.getPrototypeOf(o);\n    };\n    return _getPrototypeOf(o);\n}\nfunction _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n        throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n        constructor: {\n            value: subClass,\n            writable: true,\n            configurable: true\n        }\n    });\n    if (superClass) _setPrototypeOf(subClass, superClass);\n}\nfunction _possibleConstructorReturn(self, call) {\n    if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n        return call;\n    }\n    return _assertThisInitialized(self);\n}\nfunction _setPrototypeOf(o, p) {\n    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n        o.__proto__ = p;\n        return o;\n    };\n    return _setPrototypeOf(o, p);\n}\nvar _typeof = function(obj) {\n    \"@swc/helpers - typeof\";\n    return obj && typeof Symbol !== \"undefined\" && obj.constructor === Symbol ? \"symbol\" : typeof obj;\n};\nfunction _isNativeReflectConstruct() {\n    if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n    if (Reflect.construct.sham) return false;\n    if (typeof Proxy === \"function\") return true;\n    try {\n        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));\n        return true;\n    } catch (e) {\n        return false;\n    }\n}\nfunction _createSuper(Derived) {\n    var hasNativeReflectConstruct = _isNativeReflectConstruct();\n    return function _createSuperInternal() {\n        var Super = _getPrototypeOf(Derived), result;\n        if (hasNativeReflectConstruct) {\n            var NewTarget = _getPrototypeOf(this).constructor;\n            result = Reflect.construct(Super, arguments, NewTarget);\n        } else {\n            result = Super.apply(this, arguments);\n        }\n        return _possibleConstructorReturn(this, result);\n    };\n}\nvar Bot = /*#__PURE__*/ function(_Object3D) {\n    \"use strict\";\n    _inherits(Bot, _Object3D);\n    var _super = _createSuper(Bot);\n    function Bot(props) {\n        _classCallCheck(this, Bot);\n        var _this;\n        _this = _super.call(this);\n        var name = props.name, radius = props.radius, color = props.color, move = props.move;\n        var geometry = new THREE.SphereBufferGeometry(radius, 32, 32);\n        var material = new THREE.MeshBasicMaterial({\n            color: color\n        });\n        var mesh = new THREE.Mesh(geometry, material);\n        _this.add(mesh);\n        _this.name = name;\n        _this.radius = radius;\n        _this.move = move;\n        return _this;\n    }\n    var _proto = Bot.prototype;\n    _proto.update = function update(delta) {\n        var moveVector = this.move.getMoveVector(this.position, delta);\n        this.position.add(moveVector);\n    };\n    return Bot;\n}(THREE.Object3D);\n\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/moving-spheres/objects/bot.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/experiments/moving-spheres/index.js");
/******/ 	
/******/ })()
;