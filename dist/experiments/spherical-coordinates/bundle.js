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

/***/ "./src/experiments/spherical-coordinates/CircleLineGeometry.js":
/*!*********************************************************************!*\
  !*** ./src/experiments/spherical-coordinates/CircleLineGeometry.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// See:\n// https://github.com/mrdoob/three.js/wiki/Drawing-lines\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(radius, segments, thetaStart, thetaLength) {\n    var args = {\n        radius: radius || 50,\n        segments: segments || 8,\n        thetaStart: thetaStart || 0,\n        thetaLength: thetaLength || 2 * Math.PI\n    };\n    var geometry = new THREE.Geometry();\n    var delta = (args.thetaStart + args.thetaLength - args.thetaStart) / args.segments;\n    for(var i = 0; i <= args.segments; i += 1){\n        var angle = args.thetaStart + delta * i;\n        var x = args.radius * Math.cos(angle);\n        var y = args.radius * Math.sin(angle);\n        geometry.vertices.push(new THREE.Vector3(x, y, 0));\n    }\n    return geometry;\n};\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/spherical-coordinates/CircleLineGeometry.js?");

/***/ }),

/***/ "./src/experiments/spherical-coordinates/index.js":
/*!********************************************************!*\
  !*** ./src/experiments/spherical-coordinates/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_fonts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/fonts */ \"./src/modules/fonts/index.js\");\n/* harmony import */ var _CircleLineGeometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CircleLineGeometry */ \"./src/experiments/spherical-coordinates/CircleLineGeometry.js\");\n/* eslint no-prototype-builtins: \"off\" */ \n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar fonts;\nvar labels = [];\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction load() {\n    return (0,_modules_fonts__WEBPACK_IMPORTED_MODULE_0__.loadFonts)().then(function(theFonts) {\n        fonts = theFonts;\n    });\n}\nfunction renderLabel(text, position) {\n    var props = {\n        font: fonts.helvetiker_regular,\n        size: 12,\n        height: 1\n    };\n    var geometry = new THREE.TextGeometry(text, props);\n    var material = new THREE.MeshBasicMaterial();\n    var label = new THREE.Mesh(geometry, material);\n    label.position.set(position.x, position.y, position.z);\n    labels.push(label);\n    scene.add(label);\n}\nfunction renderGrid() {\n    var gridSize = 100;\n    var xzGrid = new THREE.GridHelper(gridSize, 10);\n    xzGrid.position.set(gridSize, 0, gridSize);\n    scene.add(xzGrid);\n    var xyGrid = new THREE.GridHelper(gridSize, 10);\n    xyGrid.rotation.x = Math.PI * (1 / 2);\n    xyGrid.position.set(gridSize, gridSize, 0);\n    scene.add(xyGrid);\n    var yzGrid = new THREE.GridHelper(gridSize, 10);\n    yzGrid.rotation.z = Math.PI * (1 / 2);\n    yzGrid.position.set(0, gridSize, gridSize);\n    scene.add(yzGrid);\n}\nfunction renderAxis(v, color, labelText) {\n    var axisLength = 250;\n    var labelDistance = axisLength * 1.1;\n    var dir = v.normalize();\n    var axis = new THREE.ArrowHelper(dir, origin, axisLength, color, 10, 5);\n    scene.add(axis);\n    renderLabel(labelText, new THREE.Vector3(dir.x * labelDistance, dir.y * labelDistance, dir.z * labelDistance));\n}\nfunction renderAxes() {\n    var xAxis = new THREE.Vector3(1, 0, 0);\n    renderAxis(xAxis, 0xff0000, \"x\");\n    var yAxis = new THREE.Vector3(0, 1, 0);\n    renderAxis(yAxis, 0x00ff00, \"y\");\n    var zAxis = new THREE.Vector3(0, 0, 1);\n    renderAxis(zAxis, 0x0000ff, \"z\");\n}\nfunction renderVector(vector) {\n    var v = vector.clone();\n    var arrowLength = v.length();\n    var arrowDir = v.normalize();\n    var arrowColor = 0xffff00;\n    var headLength = 12;\n    var headWidth = 4;\n    var arrowHelper = new THREE.ArrowHelper(arrowDir, origin, arrowLength, arrowColor, headLength, headWidth);\n    scene.add(arrowHelper);\n}\nfunction renderLine(from, to) {\n    var material = new THREE.LineDashedMaterial({\n        color: 0xffffff,\n        linewidth: 2,\n        dashSize: 2,\n        gapSize: 3,\n        transparent: true,\n        opacity: 0.5\n    });\n    // Three JS dashed line material not showing\n    // http://stackoverflow.com/questions/35523961/three-js-dashed-line-material-not-showing\n    var geometry = new THREE.Geometry();\n    geometry.vertices.push(from, to);\n    geometry.computeLineDistances();\n    var line = new THREE.Line(geometry, material);\n    scene.add(line);\n}\nfunction renderCoordinate() {\n    var radius = 200;\n    var theta = Math.PI * (2 / 8); // Angle from x axis\n    var phi = Math.PI * (2 / 8); // Angle from z axis\n    var x = radius * Math.sin(phi) * Math.cos(theta);\n    var y = radius * Math.sin(phi) * Math.sin(theta);\n    var z = radius * Math.cos(phi);\n    var pointNormal = new THREE.Vector3(x, y, z).normalize();\n    var point = pointNormal.clone().setLength(radius);\n    renderVector(point);\n    var xyPoint = new THREE.Vector3(x, y, 0);\n    renderLine(origin, xyPoint);\n    renderLine(point, xyPoint);\n    var angleRadius = 40;\n    // theta angle line\n    var thetaAngleGeometry = new _CircleLineGeometry__WEBPACK_IMPORTED_MODULE_1__[\"default\"](angleRadius, 32, 0, theta);\n    var thetaAngleMaterial = new THREE.LineBasicMaterial({\n        color: 0xffff00,\n        linewidth: 2\n    });\n    var thetaAngleLine = new THREE.Line(thetaAngleGeometry, thetaAngleMaterial);\n    scene.add(thetaAngleLine);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(300, 100, 300);\n    camera.lookAt(origin);\n    renderGrid();\n    renderAxes();\n    renderCoordinate();\n    ambientLight = new THREE.AmbientLight(0x444444);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 50, 50);\n    scene.add(pointLight);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    labels.forEach(function(label) {\n        label.lookAt(camera.position);\n    });\n    controls.update();\n    renderer.render(scene, camera);\n}\nload().then(function() {\n    init();\n    animate();\n});\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/spherical-coordinates/index.js?");

/***/ }),

/***/ "./src/modules/fonts/index.js":
/*!************************************!*\
  !*** ./src/modules/fonts/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadFont\": () => (/* binding */ loadFont),\n/* harmony export */   \"loadFonts\": () => (/* binding */ loadFonts)\n/* harmony export */ });\nfunction _defineProperty(obj, key, value) {\n    if (key in obj) {\n        Object.defineProperty(obj, key, {\n            value: value,\n            enumerable: true,\n            configurable: true,\n            writable: true\n        });\n    } else {\n        obj[key] = value;\n    }\n    return obj;\n}\nfunction _objectSpread(target) {\n    for(var i = 1; i < arguments.length; i++){\n        var source = arguments[i] != null ? arguments[i] : {};\n        var ownKeys = Object.keys(source);\n        if (typeof Object.getOwnPropertySymbols === \"function\") {\n            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {\n                return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n            }));\n        }\n        ownKeys.forEach(function(key) {\n            _defineProperty(target, key, source[key]);\n        });\n    }\n    return target;\n}\nfunction ownKeys(object, enumerableOnly) {\n    var keys = Object.keys(object);\n    if (Object.getOwnPropertySymbols) {\n        var symbols = Object.getOwnPropertySymbols(object);\n        if (enumerableOnly) {\n            symbols = symbols.filter(function(sym) {\n                return Object.getOwnPropertyDescriptor(object, sym).enumerable;\n            });\n        }\n        keys.push.apply(keys, symbols);\n    }\n    return keys;\n}\nfunction _objectSpreadProps(target, source) {\n    source = source != null ? source : {};\n    if (Object.getOwnPropertyDescriptors) {\n        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));\n    } else {\n        ownKeys(Object(source)).forEach(function(key) {\n            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));\n        });\n    }\n    return target;\n}\nvar fontLoader = new THREE.FontLoader();\nvar fonts = [\n    \"gentilis_bold\",\n    \"gentilis_regular\",\n    \"helvetiker_bold\",\n    \"helvetiker_regular\",\n    \"optimer_bold\",\n    \"optimer_regular\", \n];\nfunction loadFont(url) {\n    return new Promise(function(resolve) {\n        fontLoader.load(url, resolve);\n    });\n}\nfunction loadFonts() {\n    var promises = fonts.map(function(id) {\n        var url = \"../../modules/fonts/fonts/\".concat(id, \".typeface.json\");\n        return loadFont(url).then(function(font) {\n            return {\n                id: id,\n                font: font\n            };\n        });\n    });\n    return Promise.all(promises).then(function(results) {\n        var map = results.reduce(function(acc, result) {\n            return _objectSpreadProps(_objectSpread({}, acc), _defineProperty({}, result.id, result.font));\n        }, {});\n        return map;\n    });\n}\n\n\n//# sourceURL=webpack://three-experiments/./src/modules/fonts/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/experiments/spherical-coordinates/index.js");
/******/ 	
/******/ })()
;