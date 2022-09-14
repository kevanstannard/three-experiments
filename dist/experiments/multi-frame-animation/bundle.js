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

/***/ "./src/experiments/multi-frame-animation/index.js":
/*!********************************************************!*\
  !*** ./src/experiments/multi-frame-animation/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objects_bot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects/bot */ \"./src/experiments/multi-frame-animation/objects/bot.js\");\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar bot;\nvar clock;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction init() {\n    clock = new THREE.Clock();\n    clock.start();\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    var gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    var axisHelper = new THREE.AxesHelper(100);\n    scene.add(axisHelper);\n    bot = new _objects_bot__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    scene.add(bot);\n    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    var pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 200, -100);\n    scene.add(pointLight);\n}\nfunction update() {\n    var delta = clock.getDelta();\n    orbitControls.update();\n    bot.update(delta);\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/multi-frame-animation/index.js?");

/***/ }),

/***/ "./src/experiments/multi-frame-animation/objects/bot.js":
/*!**************************************************************!*\
  !*** ./src/experiments/multi-frame-animation/objects/bot.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Bot)\n/* harmony export */ });\n// Notes:\n// * A bone pivot is relative to the parent bone pivot.\n// * A box offset is relative to its bones pivot.\nfunction _arrayLikeToArray(arr, len) {\n    if (len == null || len > arr.length) len = arr.length;\n    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];\n    return arr2;\n}\nfunction _arrayWithHoles(arr) {\n    if (Array.isArray(arr)) return arr;\n}\nfunction _assertThisInitialized(self) {\n    if (self === void 0) {\n        throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return self;\n}\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nfunction _getPrototypeOf(o) {\n    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n        return o.__proto__ || Object.getPrototypeOf(o);\n    };\n    return _getPrototypeOf(o);\n}\nfunction _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n        throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n        constructor: {\n            value: subClass,\n            writable: true,\n            configurable: true\n        }\n    });\n    if (superClass) _setPrototypeOf(subClass, superClass);\n}\nfunction _iterableToArrayLimit(arr, i) {\n    var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"];\n    if (_i == null) return;\n    var _arr = [];\n    var _n = true;\n    var _d = false;\n    var _s, _e;\n    try {\n        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){\n            _arr.push(_s.value);\n            if (i && _arr.length === i) break;\n        }\n    } catch (err) {\n        _d = true;\n        _e = err;\n    } finally{\n        try {\n            if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n        } finally{\n            if (_d) throw _e;\n        }\n    }\n    return _arr;\n}\nfunction _nonIterableRest() {\n    throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nfunction _possibleConstructorReturn(self, call) {\n    if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n        return call;\n    }\n    return _assertThisInitialized(self);\n}\nfunction _setPrototypeOf(o, p) {\n    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n        o.__proto__ = p;\n        return o;\n    };\n    return _setPrototypeOf(o, p);\n}\nfunction _slicedToArray(arr, i) {\n    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();\n}\nvar _typeof = function(obj) {\n    \"@swc/helpers - typeof\";\n    return obj && typeof Symbol !== \"undefined\" && obj.constructor === Symbol ? \"symbol\" : typeof obj;\n};\nfunction _unsupportedIterableToArray(o, minLen) {\n    if (!o) return;\n    if (typeof o === \"string\") return _arrayLikeToArray(o, minLen);\n    var n = Object.prototype.toString.call(o).slice(8, -1);\n    if (n === \"Object\" && o.constructor) n = o.constructor.name;\n    if (n === \"Map\" || n === \"Set\") return Array.from(n);\n    if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);\n}\nfunction _isNativeReflectConstruct() {\n    if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n    if (Reflect.construct.sham) return false;\n    if (typeof Proxy === \"function\") return true;\n    try {\n        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));\n        return true;\n    } catch (e) {\n        return false;\n    }\n}\nfunction _createSuper(Derived) {\n    var hasNativeReflectConstruct = _isNativeReflectConstruct();\n    return function _createSuperInternal() {\n        var Super = _getPrototypeOf(Derived), result;\n        if (hasNativeReflectConstruct) {\n            var NewTarget = _getPrototypeOf(this).constructor;\n            result = Reflect.construct(Super, arguments, NewTarget);\n        } else {\n            result = Super.apply(this, arguments);\n        }\n        return _possibleConstructorReturn(this, result);\n    };\n}\nvar botBone = {\n    name: \"body\",\n    pivot: [\n        0,\n        0,\n        0\n    ],\n    boxes: [\n        {\n            size: [\n                32,\n                64,\n                16\n            ],\n            offset: [\n                0,\n                0,\n                0\n            ]\n        }, \n    ],\n    children: [\n        {\n            name: \"head\",\n            pivot: [\n                0,\n                32,\n                0\n            ],\n            boxes: [\n                {\n                    name: \"head\",\n                    size: [\n                        32,\n                        32,\n                        32\n                    ],\n                    offset: [\n                        0,\n                        16,\n                        0\n                    ]\n                },\n                {\n                    name: \"eye\",\n                    size: [\n                        24,\n                        8,\n                        4\n                    ],\n                    offset: [\n                        0,\n                        16,\n                        16\n                    ]\n                }, \n            ],\n            children: []\n        },\n        {\n            name: \"leftArm\",\n            pivot: [\n                24,\n                32,\n                0\n            ],\n            boxes: [\n                {\n                    size: [\n                        16,\n                        64,\n                        16\n                    ],\n                    offset: [\n                        0,\n                        -32,\n                        0\n                    ]\n                }, \n            ],\n            children: []\n        },\n        {\n            name: \"rightArm\",\n            pivot: [\n                -24,\n                32,\n                0\n            ],\n            boxes: [\n                {\n                    size: [\n                        16,\n                        64,\n                        16\n                    ],\n                    offset: [\n                        0,\n                        -32,\n                        0\n                    ]\n                }, \n            ],\n            children: []\n        },\n        {\n            name: \"leftLeg\",\n            pivot: [\n                8,\n                -32,\n                0\n            ],\n            boxes: [\n                {\n                    size: [\n                        16,\n                        64,\n                        16\n                    ],\n                    offset: [\n                        0,\n                        -32,\n                        0\n                    ]\n                }, \n            ],\n            children: []\n        },\n        {\n            name: \"rightLeg\",\n            pivot: [\n                -8,\n                -32,\n                0\n            ],\n            boxes: [\n                {\n                    size: [\n                        16,\n                        64,\n                        16\n                    ],\n                    offset: [\n                        0,\n                        -32,\n                        0\n                    ]\n                }, \n            ],\n            children: []\n        }, \n    ]\n};\nvar ANIMATION_WALKING = \"WALKING\";\nvar limbRotationDistance = Math.PI / 6;\nvar Bot = /*#__PURE__*/ function(_Object3D) {\n    \"use strict\";\n    _inherits(Bot, _Object3D);\n    var _super = _createSuper(Bot);\n    function Bot() {\n        _classCallCheck(this, Bot);\n        var _this;\n        _this = _super.call(this);\n        _this.bones = {};\n        _this.addBone(_assertThisInitialized(_this), botBone);\n        _this.currentAnimation = ANIMATION_WALKING;\n        _this.timeElapsed = 0;\n        return _this;\n    }\n    var _proto = Bot.prototype;\n    _proto.addBone = function addBone(parent, bone) {\n        var _this = this;\n        var pivot = new THREE.Object3D();\n        var _pivot = _slicedToArray(bone.pivot, 3), pivotX = _pivot[0], pivotY = _pivot[1], pivotZ = _pivot[2];\n        pivot.position.set(pivotX, pivotY, pivotZ);\n        var pivotGeometry = new THREE.SphereGeometry(4, 4, 4);\n        var pivotMaterial = new THREE.MeshStandardMaterial({\n            color: 0xffffff\n        });\n        var pivotMesh = new THREE.Mesh(pivotGeometry, pivotMaterial);\n        pivot.add(pivotMesh);\n        var boxMaterial = new THREE.MeshStandardMaterial({\n            color: 0xffff00,\n            transparent: true,\n            opacity: 0.8\n        });\n        bone.boxes.forEach(function(box) {\n            var _offset = _slicedToArray(box.offset, 3), offsetX = _offset[0], offsetY = _offset[1], offsetZ = _offset[2];\n            var _size = _slicedToArray(box.size, 3), sizeX = _size[0], sizeY = _size[1], sizeZ = _size[2];\n            var boxGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);\n            var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);\n            boxMesh.position.set(offsetX, offsetY, offsetZ);\n            pivot.add(boxMesh);\n        });\n        parent.add(pivot);\n        this.bones[bone.name] = pivot;\n        bone.children.forEach(function(child) {\n            return _this.addBone(pivot, child);\n        });\n    };\n    _proto.update = function update(delta) {\n        this.timeElapsed += delta;\n        switch(this.currentAnimation){\n            case ANIMATION_WALKING:\n                {\n                    var radians = this.timeElapsed * Math.PI * 2;\n                    var position = Math.cos(radians);\n                    var rotation = position * limbRotationDistance;\n                    this.bones.rightLeg.rotation.x = -rotation;\n                    this.bones.leftLeg.rotation.x = rotation;\n                    this.bones.rightArm.rotation.x = rotation;\n                    this.bones.leftArm.rotation.x = -rotation;\n                    break;\n                }\n            default:\n                {\n                // Do nothing\n                }\n        }\n    };\n    return Bot;\n}(THREE.Object3D);\n\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/multi-frame-animation/objects/bot.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/experiments/multi-frame-animation/index.js");
/******/ 	
/******/ })()
;