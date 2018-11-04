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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/tetrahedron-lattice/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/tetrahedron-lattice/Array3d.js":
/*!********************************************************!*\
  !*** ./src/experiments/tetrahedron-lattice/Array3d.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Array3d; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction createArray(xSize, ySize, zSize) {\n  var initial = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;\n  var xarr = [];\n\n  for (var x = 0; x < xSize; x += 1) {\n    var yarr = [];\n\n    for (var y = 0; y < ySize; y += 1) {\n      var zarr = [];\n\n      for (var z = 0; z < zSize; z += 1) {\n        zarr.push(initial);\n      }\n\n      yarr.push(zarr);\n    }\n\n    xarr.push(yarr);\n  }\n\n  return xarr;\n}\n\nvar Array3d =\n/*#__PURE__*/\nfunction () {\n  function Array3d(xSize, ySize, zSize) {\n    _classCallCheck(this, Array3d);\n\n    this.dimensions = [xSize, ySize, zSize];\n    this.array = createArray(xSize, ySize, zSize);\n    this.origin = {\n      x: Math.floor(xSize / 2),\n      y: Math.floor(ySize / 2),\n      z: Math.floor(zSize / 2)\n    };\n  }\n\n  _createClass(Array3d, [{\n    key: \"set\",\n    value: function set(x, y, z, value) {\n      // TODO: If outside the bounds of the array then resize the array\n      var o = this.origin;\n      this.array[o.x + x][o.y + y][o.z + z] = value;\n    }\n  }, {\n    key: \"get\",\n    value: function get(x, y, z) {\n      var o = this.origin;\n      return this.array[o.x + x][o.y + y][o.z + z];\n    }\n  }]);\n\n  return Array3d;\n}();\n\n\n\n//# sourceURL=webpack:///./src/experiments/tetrahedron-lattice/Array3d.js?");

/***/ }),

/***/ "./src/experiments/tetrahedron-lattice/TetrahedronLattice.js":
/*!*******************************************************************!*\
  !*** ./src/experiments/tetrahedron-lattice/TetrahedronLattice.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TetrahedronLattice; });\n/* harmony import */ var _Array3d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Array3d */ \"./src/experiments/tetrahedron-lattice/Array3d.js\");\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar size = 11; // const vectors = [\n//   [1, 0, 0],\n//   [-1, 0, 0],\n//   [0, 1, 0],\n//   [0, -1, 0],\n//   [0, 0, 1],\n//   [0, 0, -1],\n//   [1, -1, 0],\n//   [-1, 1, 0],\n//   [1, 0, -1],\n//   [-1, 0, 1],\n//   [0, 1, -1],\n//   [0, -1, 1],\n// ];\n\nvar vectors = [{\n  x: 1,\n  y: 0,\n  z: 0\n}, {\n  x: -1,\n  y: 0,\n  z: 0\n}, {\n  x: 0,\n  y: 1,\n  z: 0\n}, {\n  x: 0,\n  y: -1,\n  z: 0\n}, {\n  x: 0,\n  y: 0,\n  z: 1\n}, {\n  x: 0,\n  y: 0,\n  z: -1\n}, {\n  x: 1,\n  y: -1,\n  z: 0\n}, {\n  x: -1,\n  y: 1,\n  z: 0\n}, {\n  x: 1,\n  y: 0,\n  z: -1\n}, {\n  x: -1,\n  y: 0,\n  z: 1\n}, {\n  x: 0,\n  y: 1,\n  z: -1\n}, {\n  x: 0,\n  y: -1,\n  z: 1\n}];\n\nfunction countNeighbours(array, node) {\n  var count = 0;\n  vectors.forEach(function (vector) {\n    var value = array.get(node.x + vector.x, node.y + vector.y, node.z + vector.z);\n\n    if (value) {\n      count += 1;\n    }\n  });\n  return count;\n}\n\nvar TetrahedronLattice =\n/*#__PURE__*/\nfunction () {\n  function TetrahedronLattice() {\n    _classCallCheck(this, TetrahedronLattice);\n\n    this.array = new _Array3d__WEBPACK_IMPORTED_MODULE_0__[\"default\"](size, size, size);\n    console.log(this.array);\n  } // Find node with most neighbours and least distance\n\n\n  _createClass(TetrahedronLattice, [{\n    key: \"findEmpty\",\n    value: function findEmpty(node) {\n      var currNode = node || _objectSpread({}, this.array.origin);\n\n      var currNodeValue = this.array.get(currNode.x, currNode.y, currNode.z);\n\n      if (!currNodeValue) {\n        var currNodeNeighbourCount = countNeighbours(this.array, currNode);\n        var currNodeDistance = 0;\n      }\n    } // findEmpty(node = this.array.origin) {\n    //   const a = this.array;\n    //   const nodeValue = a.get(node.x, node.y, node.z);\n    //   if (!nodeValue) {\n    //     return node;\n    //   }\n    //   const allEmptyNodes = [];\n    //   vectors.forEach((vector) => {\n    //     const nextNode = {\n    //       x: node.x + vector.x,\n    //       y: node.y + vector.y,\n    //       z: node.z + vector.z,\n    //     };\n    //     const vectorNodes = this.findEmpty(nextNode);\n    //     allEmptyNodes.concat(vectorNodes);\n    //   });\n    //   return null;\n    // }\n    // add(mesh) {\n    //   const node = this.findEmpty();\n    //   this.array.set(node.x, node.y, node.z, mesh);\n    // }\n\n  }]);\n\n  return TetrahedronLattice;\n}();\n\n\n\n//# sourceURL=webpack:///./src/experiments/tetrahedron-lattice/TetrahedronLattice.js?");

/***/ }),

/***/ "./src/experiments/tetrahedron-lattice/index.js":
/*!******************************************************!*\
  !*** ./src/experiments/tetrahedron-lattice/index.js ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TetrahedronLattice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TetrahedronLattice */ \"./src/experiments/tetrahedron-lattice/TetrahedronLattice.js\");\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar stats;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction init() {\n  var lattice = new _TetrahedronLattice__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  console.log(lattice);\n  scene = new THREE.Scene();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(200, 200, 200);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats();\n  var axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n  scene.add(ambientLight);\n  var pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 200, -100);\n  scene.add(pointLight);\n  var radius = 10;\n\n  for (var i = -1; i <= 2; i += 1) {\n    var gridHelperH = new THREE.GridHelper(radius * 6, 3);\n    gridHelperH.position.set(radius, i * radius * 2, radius);\n    scene.add(gridHelperH);\n    var gridHelperV = new THREE.GridHelper(radius * 6, 3);\n    gridHelperV.position.set(radius, radius, i * radius * 2);\n    gridHelperV.rotation.set(Math.PI / 2, 0, 0);\n    scene.add(gridHelperV);\n  } // const geometry = new THREE.BoxGeometry(radius * 2, radius * 2, radius * 2);\n\n\n  var geometry = new THREE.SphereGeometry(radius, 64, 64);\n  var material = new THREE.MeshStandardMaterial({\n    color: 0xff0000\n  });\n\n  function addSphere(x, y, z) {\n    var mesh = new THREE.Mesh(geometry, material);\n    mesh.position.set(x * radius * 2, y * radius * 2, z * radius * 2);\n    scene.add(mesh); // lattice.add(mesh);\n  }\n\n  addSphere(1, 0, 0);\n  addSphere(-1, 0, 0);\n  addSphere(0, 1, 0);\n  addSphere(0, -1, 0);\n  addSphere(0, 0, 1);\n  addSphere(0, 0, -1);\n  addSphere(1, -1, 0);\n  addSphere(-1, 1, 0);\n  addSphere(1, 0, -1);\n  addSphere(-1, 0, 1);\n  addSphere(0, 1, -1);\n  addSphere(0, -1, 1);\n}\n\nfunction update() {\n  stats.update();\n  orbitControls.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/tetrahedron-lattice/index.js?");

/***/ })

/******/ });