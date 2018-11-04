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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/multi-frame-animation/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/multi-frame-animation/index.js":
/*!********************************************************!*\
  !*** ./src/experiments/multi-frame-animation/index.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _objects_bot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects/bot */ \"./src/experiments/multi-frame-animation/objects/bot.js\");\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar bot;\nvar clock;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction init() {\n  clock = new THREE.Clock();\n  clock.start();\n  scene = new THREE.Scene();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(200, 200, 200);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  var gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  var axisHelper = new THREE.AxesHelper(100);\n  scene.add(axisHelper);\n  bot = new _objects_bot__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  scene.add(bot);\n  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n  scene.add(ambientLight);\n  var pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 200, -100);\n  scene.add(pointLight);\n}\n\nfunction update() {\n  var delta = clock.getDelta();\n  orbitControls.update();\n  bot.update(delta);\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/multi-frame-animation/index.js?");

/***/ }),

/***/ "./src/experiments/multi-frame-animation/objects/bot.js":
/*!**************************************************************!*\
  !*** ./src/experiments/multi-frame-animation/objects/bot.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bot; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\n// Notes:\n// * A bone pivot is relative to the parent bone pivot.\n// * A box offset is relative to its bones pivot.\nvar botBone = {\n  name: 'body',\n  pivot: [0, 0, 0],\n  boxes: [{\n    size: [32, 64, 16],\n    offset: [0, 0, 0]\n  }],\n  children: [{\n    name: 'head',\n    pivot: [0, 32, 0],\n    boxes: [{\n      name: 'head',\n      size: [32, 32, 32],\n      offset: [0, 16, 0]\n    }, {\n      name: 'eye',\n      size: [24, 8, 4],\n      offset: [0, 16, 16]\n    }],\n    children: []\n  }, {\n    name: 'leftArm',\n    pivot: [24, 32, 0],\n    boxes: [{\n      size: [16, 64, 16],\n      offset: [0, -32, 0]\n    }],\n    children: []\n  }, {\n    name: 'rightArm',\n    pivot: [-24, 32, 0],\n    boxes: [{\n      size: [16, 64, 16],\n      offset: [0, -32, 0]\n    }],\n    children: []\n  }, {\n    name: 'leftLeg',\n    pivot: [8, -32, 0],\n    boxes: [{\n      size: [16, 64, 16],\n      offset: [0, -32, 0]\n    }],\n    children: []\n  }, {\n    name: 'rightLeg',\n    pivot: [-8, -32, 0],\n    boxes: [{\n      size: [16, 64, 16],\n      offset: [0, -32, 0]\n    }],\n    children: []\n  }]\n};\nvar ANIMATION_WALKING = 'WALKING';\nvar limbRotationDistance = Math.PI / 6;\n\nvar Bot =\n/*#__PURE__*/\nfunction (_THREE$Object3D) {\n  _inherits(Bot, _THREE$Object3D);\n\n  function Bot() {\n    var _this;\n\n    _classCallCheck(this, Bot);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bot).call(this));\n    _this.bones = {};\n\n    _this.addBone(_assertThisInitialized(_assertThisInitialized(_this)), botBone);\n\n    _this.currentAnimation = ANIMATION_WALKING;\n    _this.timeElapsed = 0;\n    return _this;\n  }\n\n  _createClass(Bot, [{\n    key: \"addBone\",\n    value: function addBone(parent, bone) {\n      var _this2 = this;\n\n      var pivot = new THREE.Object3D();\n\n      var _bone$pivot = _slicedToArray(bone.pivot, 3),\n          pivotX = _bone$pivot[0],\n          pivotY = _bone$pivot[1],\n          pivotZ = _bone$pivot[2];\n\n      pivot.position.set(pivotX, pivotY, pivotZ);\n      var pivotGeometry = new THREE.SphereGeometry(4, 4, 4);\n      var pivotMaterial = new THREE.MeshStandardMaterial({\n        color: 0xffffff\n      });\n      var pivotMesh = new THREE.Mesh(pivotGeometry, pivotMaterial);\n      pivot.add(pivotMesh);\n      var boxMaterial = new THREE.MeshStandardMaterial({\n        color: 0xffff00,\n        transparent: true,\n        opacity: 0.8\n      });\n      bone.boxes.forEach(function (box) {\n        var _box$offset = _slicedToArray(box.offset, 3),\n            offsetX = _box$offset[0],\n            offsetY = _box$offset[1],\n            offsetZ = _box$offset[2];\n\n        var _box$size = _slicedToArray(box.size, 3),\n            sizeX = _box$size[0],\n            sizeY = _box$size[1],\n            sizeZ = _box$size[2];\n\n        var boxGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);\n        var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);\n        boxMesh.position.set(offsetX, offsetY, offsetZ);\n        pivot.add(boxMesh);\n      });\n      parent.add(pivot);\n      this.bones[bone.name] = pivot;\n      bone.children.forEach(function (child) {\n        return _this2.addBone(pivot, child);\n      });\n    }\n  }, {\n    key: \"update\",\n    value: function update(delta) {\n      this.timeElapsed += delta;\n\n      switch (this.currentAnimation) {\n        case ANIMATION_WALKING:\n          {\n            var radians = this.timeElapsed * Math.PI * 2;\n            var position = Math.cos(radians);\n            var rotation = position * limbRotationDistance;\n            this.bones.rightLeg.rotation.x = -rotation;\n            this.bones.leftLeg.rotation.x = rotation;\n            this.bones.rightArm.rotation.x = rotation;\n            this.bones.leftArm.rotation.x = -rotation;\n            break;\n          }\n\n        default:\n          {// Do nothing\n          }\n      }\n    }\n  }]);\n\n  return Bot;\n}(THREE.Object3D);\n\n\n\n//# sourceURL=webpack:///./src/experiments/multi-frame-animation/objects/bot.js?");

/***/ })

/******/ });