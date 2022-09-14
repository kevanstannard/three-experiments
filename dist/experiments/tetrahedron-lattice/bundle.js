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

/***/ "./src/experiments/tetrahedron-lattice/Array3d.js":
/*!********************************************************!*\
  !*** ./src/experiments/tetrahedron-lattice/Array3d.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Array3d)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nfunction createArray(xSize, ySize, zSize) {\n    var initial = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;\n    var xarr = [];\n    for(var x = 0; x < xSize; x += 1){\n        var yarr = [];\n        for(var y = 0; y < ySize; y += 1){\n            var zarr = [];\n            for(var z = 0; z < zSize; z += 1){\n                zarr.push(initial);\n            }\n            yarr.push(zarr);\n        }\n        xarr.push(yarr);\n    }\n    return xarr;\n}\nvar Array3d = /*#__PURE__*/ function() {\n    \"use strict\";\n    function Array3d(xSize, ySize, zSize) {\n        _classCallCheck(this, Array3d);\n        this.dimensions = [\n            xSize,\n            ySize,\n            zSize\n        ];\n        this.array = createArray(xSize, ySize, zSize);\n        this.origin = {\n            x: Math.floor(xSize / 2),\n            y: Math.floor(ySize / 2),\n            z: Math.floor(zSize / 2)\n        };\n    }\n    var _proto = Array3d.prototype;\n    _proto.set = function set(x, y, z, value) {\n        // TODO: If outside the bounds of the array then resize the array\n        var o = this.origin;\n        this.array[o.x + x][o.y + y][o.z + z] = value;\n    };\n    _proto.get = function get(x, y, z) {\n        var o = this.origin;\n        return this.array[o.x + x][o.y + y][o.z + z];\n    };\n    return Array3d;\n}();\n\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/tetrahedron-lattice/Array3d.js?");

/***/ }),

/***/ "./src/experiments/tetrahedron-lattice/TetrahedronLattice.js":
/*!*******************************************************************!*\
  !*** ./src/experiments/tetrahedron-lattice/TetrahedronLattice.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TetrahedronLattice)\n/* harmony export */ });\n/* harmony import */ var _Array3d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Array3d */ \"./src/experiments/tetrahedron-lattice/Array3d.js\");\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nfunction _defineProperty(obj, key, value) {\n    if (key in obj) {\n        Object.defineProperty(obj, key, {\n            value: value,\n            enumerable: true,\n            configurable: true,\n            writable: true\n        });\n    } else {\n        obj[key] = value;\n    }\n    return obj;\n}\nfunction _objectSpread(target) {\n    for(var i = 1; i < arguments.length; i++){\n        var source = arguments[i] != null ? arguments[i] : {};\n        var ownKeys = Object.keys(source);\n        if (typeof Object.getOwnPropertySymbols === \"function\") {\n            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {\n                return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n            }));\n        }\n        ownKeys.forEach(function(key) {\n            _defineProperty(target, key, source[key]);\n        });\n    }\n    return target;\n}\n\nvar size = 11;\n// const vectors = [\n//   [1, 0, 0],\n//   [-1, 0, 0],\n//   [0, 1, 0],\n//   [0, -1, 0],\n//   [0, 0, 1],\n//   [0, 0, -1],\n//   [1, -1, 0],\n//   [-1, 1, 0],\n//   [1, 0, -1],\n//   [-1, 0, 1],\n//   [0, 1, -1],\n//   [0, -1, 1],\n// ];\nvar vectors = [\n    {\n        x: 1,\n        y: 0,\n        z: 0\n    },\n    {\n        x: -1,\n        y: 0,\n        z: 0\n    },\n    {\n        x: 0,\n        y: 1,\n        z: 0\n    },\n    {\n        x: 0,\n        y: -1,\n        z: 0\n    },\n    {\n        x: 0,\n        y: 0,\n        z: 1\n    },\n    {\n        x: 0,\n        y: 0,\n        z: -1\n    },\n    {\n        x: 1,\n        y: -1,\n        z: 0\n    },\n    {\n        x: -1,\n        y: 1,\n        z: 0\n    },\n    {\n        x: 1,\n        y: 0,\n        z: -1\n    },\n    {\n        x: -1,\n        y: 0,\n        z: 1\n    },\n    {\n        x: 0,\n        y: 1,\n        z: -1\n    },\n    {\n        x: 0,\n        y: -1,\n        z: 1\n    }, \n];\nfunction countNeighbours(array, node) {\n    var count = 0;\n    vectors.forEach(function(vector) {\n        var value = array.get(node.x + vector.x, node.y + vector.y, node.z + vector.z);\n        if (value) {\n            count += 1;\n        }\n    });\n    return count;\n}\nvar TetrahedronLattice = /*#__PURE__*/ function() {\n    \"use strict\";\n    function TetrahedronLattice() {\n        _classCallCheck(this, TetrahedronLattice);\n        this.array = new _Array3d__WEBPACK_IMPORTED_MODULE_0__[\"default\"](size, size, size);\n        console.log(this.array);\n    }\n    var _proto = TetrahedronLattice.prototype;\n    // Find node with most neighbours and least distance\n    _proto.findEmpty = function findEmpty(node) {\n        var currNode = node || _objectSpread({}, this.array.origin);\n        var currNodeValue = this.array.get(currNode.x, currNode.y, currNode.z);\n        if (!currNodeValue) {\n            var currNodeNeighbourCount = countNeighbours(this.array, currNode);\n            var currNodeDistance = 0;\n        }\n    };\n    return TetrahedronLattice;\n}();\n\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/tetrahedron-lattice/TetrahedronLattice.js?");

/***/ }),

/***/ "./src/experiments/tetrahedron-lattice/index.js":
/*!******************************************************!*\
  !*** ./src/experiments/tetrahedron-lattice/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TetrahedronLattice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TetrahedronLattice */ \"./src/experiments/tetrahedron-lattice/TetrahedronLattice.js\");\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar stats;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    var addSphere = function addSphere(x, y, z) {\n        var mesh = new THREE.Mesh(geometry, material);\n        mesh.position.set(x * radius * 2, y * radius * 2, z * radius * 2);\n        scene.add(mesh);\n    // lattice.add(mesh);\n    };\n    var lattice = new _TetrahedronLattice__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    console.log(lattice);\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    var axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    var pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 200, -100);\n    scene.add(pointLight);\n    var radius = 10;\n    for(var i = -1; i <= 2; i += 1){\n        var gridHelperH = new THREE.GridHelper(radius * 6, 3);\n        gridHelperH.position.set(radius, i * radius * 2, radius);\n        scene.add(gridHelperH);\n        var gridHelperV = new THREE.GridHelper(radius * 6, 3);\n        gridHelperV.position.set(radius, radius, i * radius * 2);\n        gridHelperV.rotation.set(Math.PI / 2, 0, 0);\n        scene.add(gridHelperV);\n    }\n    // const geometry = new THREE.BoxGeometry(radius * 2, radius * 2, radius * 2);\n    var geometry = new THREE.SphereGeometry(radius, 64, 64);\n    var material = new THREE.MeshStandardMaterial({\n        color: 0xff0000\n    });\n    addSphere(1, 0, 0);\n    addSphere(-1, 0, 0);\n    addSphere(0, 1, 0);\n    addSphere(0, -1, 0);\n    addSphere(0, 0, 1);\n    addSphere(0, 0, -1);\n    addSphere(1, -1, 0);\n    addSphere(-1, 1, 0);\n    addSphere(1, 0, -1);\n    addSphere(-1, 0, 1);\n    addSphere(0, 1, -1);\n    addSphere(0, -1, 1);\n}\nfunction update() {\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/tetrahedron-lattice/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/experiments/tetrahedron-lattice/index.js");
/******/ 	
/******/ })()
;