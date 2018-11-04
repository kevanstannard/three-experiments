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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/geometry-vertices/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/geometry-vertices/index.js":
/*!****************************************************!*\
  !*** ./src/experiments/geometry-vertices/index.js ***!
  \****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_fonts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/fonts */ \"./src/modules/fonts/index.js\");\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar fonts;\nvar box;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction load() {\n  return Object(_modules_fonts__WEBPACK_IMPORTED_MODULE_0__[\"loadFonts\"])().then(function (theFonts) {\n    fonts = theFonts;\n  });\n}\n\nfunction VerticesAnimation(geometry) {\n  this.geometry = geometry;\n  this.original = geometry.clone();\n  this.vertexIndex = 0;\n  this.theta = 0;\n}\n\nVerticesAnimation.prototype = {\n  update: function update() {\n    this.theta += 0.1;\n\n    if (this.theta > Math.PI) {\n      this.theta = 0;\n      this.vertexIndex = (this.vertexIndex + 1) % this.geometry.vertices.length;\n    }\n\n    var orig = this.original.vertices[this.vertexIndex];\n    var curr = this.geometry.vertices[this.vertexIndex];\n    var delta = Math.sin(this.theta);\n    curr.x = orig.x + orig.x * delta;\n    curr.y = orig.y + orig.y * delta;\n    curr.z = orig.z + orig.z * delta;\n    this.geometry.verticesNeedUpdate = true;\n  }\n};\n\nfunction AnimatedBoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {\n  THREE.BoxGeometry.call(this, width, height, depth, widthSegments, heightSegments, depthSegments);\n  this.animation = new VerticesAnimation(this);\n}\n\nAnimatedBoxGeometry.prototype = Object.assign(Object.create(THREE.BoxGeometry.prototype), {\n  constructor: AnimatedBoxGeometry,\n  update: function update() {\n    this.animation.update();\n  }\n});\n\nfunction Label(text) {\n  var params = {\n    font: fonts.helvetiker_regular,\n    size: 5,\n    height: 1 // Thickness\n\n  };\n  var geometry = new THREE.TextGeometry(text, params);\n  var material = new THREE.MeshNormalMaterial();\n  THREE.Mesh.call(this, geometry, material);\n}\n\nLabel.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {\n  constructor: Label\n});\n\nfunction AnimatedBox(size, _camera) {\n  this.camera = _camera;\n  this.geometry = new AnimatedBoxGeometry(size, size, size);\n  this.material = new THREE.MeshNormalMaterial({\n    wireframe: true\n  });\n  THREE.Mesh.call(this, this.geometry, this.material);\n  var vertices = this.geometry.vertices;\n  this.labels = [];\n\n  for (var i = 0; i < vertices.length; i += 1) {\n    var label = new Label(String(i));\n    label.position.copy(vertices[i]);\n    this.labels.push(label);\n    this.add(label);\n  }\n}\n\nAnimatedBox.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {\n  constructor: AnimatedBox,\n  update: function update() {\n    this.geometry.update();\n\n    for (var i = 0; i < this.geometry.vertices.length; i += 1) {\n      this.labels[i].position.copy(this.geometry.vertices[i]);\n      this.labels[i].lookAt(this.camera.position);\n    }\n  }\n});\n\nfunction init() {\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(100, 120, 140);\n  camera.lookAt(origin);\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  box = new AnimatedBox(50, camera);\n  scene.add(box); // vertices\n  //\n  // [\n  //   {\"x\":5,\"y\":5,\"z\":5},       // 0\n  //   {\"x\":5,\"y\":5,\"z\":-5},      // 1\n  //   {\"x\":5,\"y\":-5,\"z\":5},      // 2\n  //   {\"x\":5,\"y\":-5,\"z\":-5},     // 3\n  //   {\"x\":-5,\"y\":5,\"z\":-5},     // 4\n  //   {\"x\":-5,\"y\":5,\"z\":5},      // 5\n  //   {\"x\":-5,\"y\":-5,\"z\":-5},    // 6\n  //   {\"x\":-5,\"y\":-5,\"z\":5},     // 7\n  // ]\n  //\n  // Faces\n  //\n  // [{\n  //     \"a\": 0,                  // {\"x\":5,\"y\":5,\"z\":5}\n  //     \"b\": 2,                  // {\"x\":5,\"y\":-5,\"z\":5}\n  //     \"c\": 1,                  // {\"x\":5,\"y\":5,\"z\":-5}\n  //     \"normal\": {\n  //         \"x\": 1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     },\n  //     \"vertexNormals\": [{\n  //         \"x\": 1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //      }, {\n  //         \"x\": 1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": 1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     }],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 0\n  // }, {\n  //     \"a\": 2,\n  //     \"b\": 3,\n  //     \"c\": 1,\n  //     \"normal\": {\n  //         \"x\": 1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     },\n  //     \"vertexNormals\": [{\n  //         \"x\": 1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": 1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": 1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     }],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 0\n  // }, {\n  //     \"a\": 4,\n  //     \"b\": 6,\n  //     \"c\": 5,\n  //     \"normal\": {\n  //         \"x\": -1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     },\n  //     \"vertexNormals\": [{\n  //         \"x\": -1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": -1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": -1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     }],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 1\n  // }, {\n  //     \"a\": 6,\n  //     \"b\": 7,\n  //     \"c\": 5,\n  //     \"normal\": {\n  //         \"x\": -1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     },\n  //     \"vertexNormals\": [{\n  //         \"x\": -1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": -1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": -1,\n  //         \"y\": 0,\n  //         \"z\": 0\n  //     }],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 1\n  // }, {\n  //     \"a\": 4,\n  //     \"b\": 5,\n  //     \"c\": 1,\n  //     \"normal\": {\n  //         \"x\": 0,\n  //         \"y\": 1,\n  //         \"z\": 0\n  //     },\n  //     \"vertexNormals\": [{\n  //         \"x\": 0,\n  //         \"y\": 1,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": 1,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": 1,\n  //         \"z\": 0\n  //     }],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 2\n  // }, {\n  //     \"a\": 5,\n  //     \"b\": 0,\n  //     \"c\": 1,\n  //     \"normal\": {\n  //         \"x\": 0,\n  //         \"y\": 1,\n  //         \"z\": 0\n  //     },\n  //     \"vertexNormals\": [{\n  //         \"x\": 0,\n  //         \"y\": 1,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": 1,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": 1,\n  //         \"z\": 0\n  //     }],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 2\n  // }, {\n  //     \"a\": 7,\n  //     \"b\": 6,\n  //     \"c\": 2,\n  //     \"normal\": {\n  //         \"x\": 0,\n  //         \"y\": -1,\n  //         \"z\": 0\n  //     },\n  //     \"vertexNormals\": [{\n  //         \"x\": 0,\n  //         \"y\": -1,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": -1,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": -1,\n  //         \"z\": 0\n  //     }],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 3\n  // }, {\n  //     \"a\": 6,\n  //     \"b\": 3,\n  //     \"c\": 2,\n  //     \"normal\": {\n  //         \"x\": 0,\n  //         \"y\": -1,\n  //         \"z\": 0\n  //     },\n  //     \"vertexNormals\": [{\n  //         \"x\": 0,\n  //         \"y\": -1,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": -1,\n  //         \"z\": 0\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": -1,\n  //         \"z\": 0\n  //     }],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 3\n  // }, {\n  //     \"a\": 5,\n  //     \"b\": 7,\n  //     \"c\": 0,\n  //     \"normal\": {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //     },\n  //     \"vertexNormals\": [{\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //     }],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 4\n  // }, {\n  //     \"a\": 7,\n  //     \"b\": 2,\n  //     \"c\": 0,\n  //     \"normal\": {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //     },\n  //     \"vertexNormals\": [{\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //     }],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 4\n  // }, {\n  //     \"a\": 1,\n  //     \"b\": 3,\n  //     \"c\": 4,\n  //     \"normal\": {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": -1\n  //     },\n  //     \"vertexNormals\": [{\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": -1\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": -1\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": -1\n  //     }],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 5\n  // }, {\n  //     \"a\": 3,\n  //     \"b\": 6,\n  //     \"c\": 4,\n  //     \"normal\": {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": -1\n  //     },\n  //     \"vertexNormals\": [{\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": -1\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": -1\n  //     }, {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": -1\n  //     }],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 5\n  // }]\n  //\n  // faceVertexUvs\n  //\n  // [\n  //     [\n  //         [{\n  //             \"x\": 0,\n  //             \"y\": 1\n  //         }, {\n  //             \"x\": 0,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 1\n  //         }],\n  //         [{\n  //             \"x\": 0,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 1\n  //         }],\n  //         [{\n  //             \"x\": 0,\n  //             \"y\": 1\n  //         }, {\n  //             \"x\": 0,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 1\n  //         }],\n  //         [{\n  //             \"x\": 0,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 1\n  //         }],\n  //         [{\n  //             \"x\": 0,\n  //             \"y\": 1\n  //         }, {\n  //             \"x\": 0,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 1\n  //         }],\n  //         [{\n  //             \"x\": 0,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 1\n  //         }],\n  //         [{\n  //             \"x\": 0,\n  //             \"y\": 1\n  //         }, {\n  //             \"x\": 0,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 1\n  //         }],\n  //         [{\n  //             \"x\": 0,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 1\n  //         }],\n  //         [{\n  //             \"x\": 0,\n  //             \"y\": 1\n  //         }, {\n  //             \"x\": 0,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 1\n  //         }],\n  //         [{\n  //             \"x\": 0,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 1\n  //         }],\n  //         [{\n  //             \"x\": 0,\n  //             \"y\": 1\n  //         }, {\n  //             \"x\": 0,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 1\n  //         }],\n  //         [{\n  //             \"x\": 0,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 0\n  //         }, {\n  //             \"x\": 1,\n  //             \"y\": 1\n  //         }]\n  //     ]\n  // ]\n\n  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 50, 50);\n  scene.add(pointLight);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction update() {\n  box.update();\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\nload().then(function () {\n  init();\n  animate();\n});\n\n//# sourceURL=webpack:///./src/experiments/geometry-vertices/index.js?");

/***/ }),

/***/ "./src/modules/fonts/index.js":
/*!************************************!*\
  !*** ./src/modules/fonts/index.js ***!
  \************************************/
/*! exports provided: loadFont, loadFonts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadFont\", function() { return loadFont; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadFonts\", function() { return loadFonts; });\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar fontLoader = new THREE.FontLoader();\nvar fonts = ['gentilis_bold', 'gentilis_regular', 'helvetiker_bold', 'helvetiker_regular', 'optimer_bold', 'optimer_regular'];\nfunction loadFont(url) {\n  return new Promise(function (resolve) {\n    fontLoader.load(url, resolve);\n  });\n}\nfunction loadFonts() {\n  var promises = fonts.map(function (id) {\n    var url = \"../../modules/fonts/fonts/\".concat(id, \".typeface.json\");\n    return loadFont(url).then(function (font) {\n      return {\n        id: id,\n        font: font\n      };\n    });\n  });\n  return Promise.all(promises).then(function (results) {\n    var map = results.reduce(function (acc, result) {\n      return _objectSpread({}, acc, _defineProperty({}, result.id, result.font));\n    }, {});\n    return map;\n  });\n}\n\n//# sourceURL=webpack:///./src/modules/fonts/index.js?");

/***/ })

/******/ });