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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/geometry-uvs/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/geometry-uvs/index.js":
/*!***********************************************!*\
  !*** ./src/experiments/geometry-uvs/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar ambientLight;\nvar plane;\nvar origin = new THREE.Vector3(0, 0, 0);\nvar textures = {};\n\nfunction loadTexture(id, url) {\n  return new Promise(function (resolve) {\n    var loader = new THREE.TextureLoader();\n    loader.load(url, function (texture) {\n      textures[id] = texture;\n      resolve();\n    });\n  });\n}\n\nfunction load() {\n  var promises = [];\n  promises.push(loadTexture('free', '../../assets/textures/misc/free.jpg'));\n  return Promise.all(promises);\n}\n\nfunction UVSizeAnimation(geometry) {\n  this.geometry = geometry;\n  this.original = geometry.clone();\n  this.deltaMin = 0.5;\n  this.deltaMax = 1;\n  this.delta = this.deltaMax;\n  this.speed = 0.005;\n  this.direction = -1;\n}\n\nUVSizeAnimation.prototype = {\n  updateDelta: function updateDelta() {\n    var newDelta = this.delta + this.speed * this.direction;\n\n    if (newDelta < this.deltaMin) {\n      newDelta = this.deltaMin;\n      this.direction = 1;\n    } else if (newDelta > this.deltaMax) {\n      newDelta = this.deltaMax;\n      this.direction = -1;\n    }\n\n    this.delta = newDelta;\n  },\n  update: function update() {\n    this.updateDelta();\n    var triangles = this.original.faceVertexUvs[0];\n\n    for (var i = 0; i < triangles.length; i += 1) {\n      var tri = this.geometry.faceVertexUvs[0][i];\n      var orig = this.original.faceVertexUvs[0][i];\n\n      for (var j = 0; j < tri.length; j += 1) {\n        tri[j].x = orig[j].x * this.delta;\n        tri[j].y = orig[j].y * this.delta;\n      }\n    }\n\n    this.geometry.uvsNeedUpdate = true;\n  }\n};\n\nfunction AnimatedPlaneGeometry(size) {\n  THREE.PlaneGeometry.call(this, size, size, 1);\n  this.animation = new UVSizeAnimation(this);\n}\n\nAnimatedPlaneGeometry.prototype = Object.assign(Object.create(THREE.PlaneGeometry.prototype), {\n  constructor: AnimatedPlaneGeometry,\n  update: function update() {\n    this.animation.update();\n  }\n});\n\nfunction AnimatedPlane() {\n  this.geometry = new AnimatedPlaneGeometry(100);\n  this.material = new THREE.MeshBasicMaterial({\n    side: THREE.DoubleSide,\n    map: textures.free // wireframe: true,\n\n  });\n  THREE.Mesh.call(this, this.geometry, this.material);\n}\n\nAnimatedPlane.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {\n  constructor: AnimatedPlane,\n  update: function update() {\n    this.geometry.update();\n  }\n});\n\nfunction init() {\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(100, 120, 140);\n  camera.lookAt(origin);\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  plane = new AnimatedPlane();\n  scene.add(plane); // console.log(plane.geometry);\n  // console.log(geometry);\n  // console.log(JSON.stringify(geometry.faceVertexUvs, null, 2));\n  // geometry.vertices\n  //\n  // [\n  //   {\n  //     \"x\": -50,\n  //     \"y\": 50,\n  //     \"z\": 0\n  //   },\n  //   {\n  //     \"x\": 50,\n  //     \"y\": 50,\n  //     \"z\": 0\n  //   },\n  //   {\n  //     \"x\": -50,\n  //     \"y\": -50,\n  //     \"z\": 0\n  //   },\n  //   {\n  //     \"x\": 50,\n  //     \"y\": -50,\n  //     \"z\": 0\n  //   }\n  // ]\n  // geometry.faceVertexUvs\n  //\n  // [\n  //   [\n  //     [\n  //       {\n  //         \"x\": 0,\n  //         \"y\": 1\n  //       },\n  //       {\n  //         \"x\": 0,\n  //         \"y\": 0\n  //       },\n  //       {\n  //         \"x\": 1,\n  //         \"y\": 1\n  //       }\n  //     ],\n  //     [\n  //       {\n  //         \"x\": 0,\n  //         \"y\": 0\n  //       },\n  //       {\n  //         \"x\": 1,\n  //         \"y\": 0\n  //       },\n  //       {\n  //         \"x\": 1,\n  //         \"y\": 1\n  //       }\n  //     ]\n  //   ]\n  // ]\n  // geometry.faces\n  // [\n  //   {\n  //     \"a\": 0,\n  //     \"b\": 2,\n  //     \"c\": 1,\n  //     \"normal\": {\n  //       \"x\": 0,\n  //       \"y\": 0,\n  //       \"z\": 1\n  //     },\n  //     \"vertexNormals\": [\n  //       {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //       },\n  //       {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //       },\n  //       {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //       }\n  //     ],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 0\n  //   },\n  //   {\n  //     \"a\": 2,\n  //     \"b\": 3,\n  //     \"c\": 1,\n  //     \"normal\": {\n  //       \"x\": 0,\n  //       \"y\": 0,\n  //       \"z\": 1\n  //     },\n  //     \"vertexNormals\": [\n  //       {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //       },\n  //       {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //       },\n  //       {\n  //         \"x\": 0,\n  //         \"y\": 0,\n  //         \"z\": 1\n  //       }\n  //     ],\n  //     \"color\": 16777215,\n  //     \"vertexColors\": [],\n  //     \"materialIndex\": 0\n  //   }\n  // ]\n\n  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n  scene.add(ambientLight);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction update() {\n  plane.update();\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\nload().then(function () {\n  init();\n  animate();\n});\n\n//# sourceURL=webpack:///./src/experiments/geometry-uvs/index.js?");

/***/ })

/******/ });