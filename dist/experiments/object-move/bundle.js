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

/***/ "./src/experiments/object-move/index.js":
/*!**********************************************!*\
  !*** ./src/experiments/object-move/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objects_car__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects/car */ \"./src/experiments/object-move/objects/car.js\");\n/* harmony import */ var _objects_bot_car__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objects/bot-car */ \"./src/experiments/object-move/objects/bot-car.js\");\n\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar pointLight;\nvar ambientLight;\nvar keyboard;\nvar car;\nvar botCars;\nvar clock;\nvar botCarCount = 3;\nvar key = {\n    FORWARD: \"W\",\n    BACKWARD: \"S\",\n    LEFT: \"A\",\n    RIGHT: \"D\",\n    UP: \"space\",\n    DOWN: \"shift\"\n};\nfunction init() {\n    clock = new THREE.Clock();\n    clock.start();\n    keyboard = new KeyboardState();\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(1000, 50);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    car = new _objects_car__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n        name: \"Player\",\n        color: 0x888888,\n        size: 20\n    });\n    scene.add(car);\n    botCars = [];\n    for(var i = 0; i < botCarCount; i += 1){\n        var botCar = new _objects_bot_car__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n            name: \"Bot\",\n            color: 0xff8888,\n            size: 20\n        });\n        botCars.push(botCar);\n        scene.add(botCar);\n    }\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 50, 50);\n    scene.add(pointLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(0, 200, -200);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction updateCamera() {\n    var carDirection = car.getWorldDirection(); // Unit vector\n    var reverseDirection = carDirection.negate();\n    var heightVector = new THREE.Vector3(0, 400, 0);\n    var cameraVector = reverseDirection.multiplyScalar(600).add(heightVector);\n    var cameraPosition = car.position.clone().add(cameraVector);\n    camera.position.copy(cameraPosition);\n    camera.lookAt(car.position);\n}\nfunction update() {\n    var delta = clock.getDelta();\n    keyboard.update();\n    if (keyboard.pressed(key.LEFT)) {\n        car.rotateLeft(delta);\n    }\n    if (keyboard.pressed(key.RIGHT)) {\n        car.rotateRight(delta);\n    }\n    if (keyboard.pressed(key.FORWARD)) {\n        car.moveForward(delta);\n    }\n    if (keyboard.pressed(key.BACKWARD)) {\n        car.moveBackward(delta);\n    }\n    updateCamera();\n    botCars.forEach(function(botCar) {\n        return botCar.update(delta);\n    });\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/object-move/index.js?");

/***/ }),

/***/ "./src/experiments/object-move/objects/bot-car.js":
/*!********************************************************!*\
  !*** ./src/experiments/object-move/objects/bot-car.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BotCar)\n/* harmony export */ });\n/* harmony import */ var _car__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./car */ \"./src/experiments/object-move/objects/car.js\");\nfunction _assertThisInitialized(self) {\n    if (self === void 0) {\n        throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return self;\n}\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nfunction _getPrototypeOf(o) {\n    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n        return o.__proto__ || Object.getPrototypeOf(o);\n    };\n    return _getPrototypeOf(o);\n}\nfunction _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n        throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n        constructor: {\n            value: subClass,\n            writable: true,\n            configurable: true\n        }\n    });\n    if (superClass) _setPrototypeOf(subClass, superClass);\n}\nfunction _possibleConstructorReturn(self, call) {\n    if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n        return call;\n    }\n    return _assertThisInitialized(self);\n}\nfunction _setPrototypeOf(o, p) {\n    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n        o.__proto__ = p;\n        return o;\n    };\n    return _setPrototypeOf(o, p);\n}\nvar _typeof = function(obj) {\n    \"@swc/helpers - typeof\";\n    return obj && typeof Symbol !== \"undefined\" && obj.constructor === Symbol ? \"symbol\" : typeof obj;\n};\nfunction _isNativeReflectConstruct() {\n    if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n    if (Reflect.construct.sham) return false;\n    if (typeof Proxy === \"function\") return true;\n    try {\n        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));\n        return true;\n    } catch (e) {\n        return false;\n    }\n}\nfunction _createSuper(Derived) {\n    var hasNativeReflectConstruct = _isNativeReflectConstruct();\n    return function _createSuperInternal() {\n        var Super = _getPrototypeOf(Derived), result;\n        if (hasNativeReflectConstruct) {\n            var NewTarget = _getPrototypeOf(this).constructor;\n            result = Reflect.construct(Super, arguments, NewTarget);\n        } else {\n            result = Super.apply(this, arguments);\n        }\n        return _possibleConstructorReturn(this, result);\n    };\n}\n\nvar ACTION_FORWARD = -1;\nvar ACTION_LEFT = 0;\nvar ACTION_RIGHT = 1;\nvar shouldTurn = function() {\n    return Math.random() < 0.5;\n};\nvar whichTurn = function() {\n    return Math.floor(Math.random() * 2);\n};\nvar BotCar = /*#__PURE__*/ function(Car) {\n    \"use strict\";\n    _inherits(BotCar, Car);\n    var _super = _createSuper(BotCar);\n    function BotCar(props) {\n        _classCallCheck(this, BotCar);\n        var _this;\n        _this = _super.call(this, props);\n        _this.currentAction = ACTION_FORWARD;\n        _this.timeRemaining = 0;\n        return _this;\n    }\n    var _proto = BotCar.prototype;\n    _proto.update = function update(delta) {\n        this.timeRemaining -= delta;\n        if (this.timeRemaining <= 0) {\n            if (shouldTurn()) {\n                this.currentAction = whichTurn();\n            } else {\n                this.currentAction = ACTION_FORWARD;\n            }\n            this.timeRemaining = 1;\n        }\n        switch(this.currentAction){\n            case ACTION_LEFT:\n                {\n                    this.rotateLeft(delta);\n                    break;\n                }\n            case ACTION_RIGHT:\n                {\n                    this.rotateRight(delta);\n                    break;\n                }\n            default:\n                {\n                // No default\n                }\n        }\n        this.moveForward(delta);\n    };\n    return BotCar;\n}(_car__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/object-move/objects/bot-car.js?");

/***/ }),

/***/ "./src/experiments/object-move/objects/car.js":
/*!****************************************************!*\
  !*** ./src/experiments/object-move/objects/car.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Car)\n/* harmony export */ });\nfunction _assertThisInitialized(self) {\n    if (self === void 0) {\n        throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return self;\n}\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nfunction _getPrototypeOf(o) {\n    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n        return o.__proto__ || Object.getPrototypeOf(o);\n    };\n    return _getPrototypeOf(o);\n}\nfunction _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n        throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n        constructor: {\n            value: subClass,\n            writable: true,\n            configurable: true\n        }\n    });\n    if (superClass) _setPrototypeOf(subClass, superClass);\n}\nfunction _possibleConstructorReturn(self, call) {\n    if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n        return call;\n    }\n    return _assertThisInitialized(self);\n}\nfunction _setPrototypeOf(o, p) {\n    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n        o.__proto__ = p;\n        return o;\n    };\n    return _setPrototypeOf(o, p);\n}\nvar _typeof = function(obj) {\n    \"@swc/helpers - typeof\";\n    return obj && typeof Symbol !== \"undefined\" && obj.constructor === Symbol ? \"symbol\" : typeof obj;\n};\nfunction _isNativeReflectConstruct() {\n    if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n    if (Reflect.construct.sham) return false;\n    if (typeof Proxy === \"function\") return true;\n    try {\n        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));\n        return true;\n    } catch (e) {\n        return false;\n    }\n}\nfunction _createSuper(Derived) {\n    var hasNativeReflectConstruct = _isNativeReflectConstruct();\n    return function _createSuperInternal() {\n        var Super = _getPrototypeOf(Derived), result;\n        if (hasNativeReflectConstruct) {\n            var NewTarget = _getPrototypeOf(this).constructor;\n            result = Reflect.construct(Super, arguments, NewTarget);\n        } else {\n            result = Super.apply(this, arguments);\n        }\n        return _possibleConstructorReturn(this, result);\n    };\n}\nvar Car = /*#__PURE__*/ function(_Object3D) {\n    \"use strict\";\n    _inherits(Car, _Object3D);\n    var _super = _createSuper(Car);\n    function Car(props) {\n        _classCallCheck(this, Car);\n        var _this;\n        _this = _super.call(this);\n        var name = props.name, color = props.color, size = props.size;\n        var bodyGeometry = new THREE.BoxGeometry(size, size, size);\n        var bodyMaterial = new THREE.MeshLambertMaterial({\n            color: color\n        });\n        var body = new THREE.Mesh(bodyGeometry, bodyMaterial);\n        body.position.set(0, size / 2, 0);\n        var arrowDirection = new THREE.Vector3(0, 0, 1).normalize();\n        var arrowLength = size;\n        var arrowColor = 0xffffff;\n        var arrowPosition = new THREE.Vector3(0, 0, 0);\n        var arrow = new THREE.ArrowHelper(arrowDirection, arrowPosition, arrowLength, arrowColor);\n        body.add(arrow);\n        _this.add(body);\n        _this.name = name;\n        var speedScale = 50 / size;\n        _this.moveSpeed = 50 * speedScale; // units per second\n        _this.rotationSpeed = Math.PI / 180 * 50 * speedScale; // radians per second\n        return _this;\n    }\n    var _proto = Car.prototype;\n    _proto.rotateLeft = function rotateLeft(delta) {\n        var rotationAngle = this.rotationSpeed * delta;\n        this.rotateY(rotationAngle);\n    };\n    _proto.rotateRight = function rotateRight(delta) {\n        var rotationAngle = this.rotationSpeed * delta;\n        this.rotateY(-rotationAngle);\n    };\n    _proto.moveForward = function moveForward(delta) {\n        var distance = this.moveSpeed * delta;\n        var forwardDirection = this.getWorldDirection(); // Note: This is a unit vector\n        forwardDirection.multiplyScalar(distance);\n        this.position.add(forwardDirection);\n    };\n    _proto.moveBackward = function moveBackward(delta) {\n        var distance = this.moveSpeed * delta;\n        var backwardDirection = this.getWorldDirection().negate();\n        backwardDirection.multiplyScalar(distance);\n        this.position.add(backwardDirection);\n    };\n    return Car;\n}(THREE.Object3D);\n\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/object-move/objects/car.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/experiments/object-move/index.js");
/******/ 	
/******/ })()
;