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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/spherical-coordinates/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/spherical-coordinates/CircleLineGeometry.js":
/*!*********************************************************************!*\
  !*** ./src/experiments/spherical-coordinates/CircleLineGeometry.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// See:\n// https://github.com/mrdoob/three.js/wiki/Drawing-lines\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (radius, segments, thetaStart, thetaLength) {\n  var args = {\n    radius: radius || 50,\n    segments: segments || 8,\n    thetaStart: thetaStart || 0,\n    thetaLength: thetaLength || 2 * Math.PI\n  };\n  var geometry = new THREE.Geometry();\n  var delta = (args.thetaStart + args.thetaLength - args.thetaStart) / args.segments;\n\n  for (var i = 0; i <= args.segments; i += 1) {\n    var angle = args.thetaStart + delta * i;\n    var x = args.radius * Math.cos(angle);\n    var y = args.radius * Math.sin(angle);\n    geometry.vertices.push(new THREE.Vector3(x, y, 0));\n  }\n\n  return geometry;\n});\n\n//# sourceURL=webpack:///./src/experiments/spherical-coordinates/CircleLineGeometry.js?");

/***/ }),

/***/ "./src/experiments/spherical-coordinates/index.js":
/*!********************************************************!*\
  !*** ./src/experiments/spherical-coordinates/index.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_fonts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/fonts */ \"./src/modules/fonts/index.js\");\n/* harmony import */ var _CircleLineGeometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CircleLineGeometry */ \"./src/experiments/spherical-coordinates/CircleLineGeometry.js\");\n/* eslint no-prototype-builtins: \"off\" */\n\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar fonts;\nvar labels = [];\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction load() {\n  return Object(_modules_fonts__WEBPACK_IMPORTED_MODULE_0__[\"loadFonts\"])().then(function (theFonts) {\n    fonts = theFonts;\n  });\n}\n\nfunction renderLabel(text, position) {\n  var props = {\n    font: fonts.helvetiker_regular,\n    size: 12,\n    height: 1\n  };\n  var geometry = new THREE.TextGeometry(text, props);\n  var material = new THREE.MeshBasicMaterial();\n  var label = new THREE.Mesh(geometry, material);\n  label.position.set(position.x, position.y, position.z);\n  labels.push(label);\n  scene.add(label);\n}\n\nfunction renderGrid() {\n  var gridSize = 100;\n  var xzGrid = new THREE.GridHelper(gridSize, 10);\n  xzGrid.position.set(gridSize, 0, gridSize);\n  scene.add(xzGrid);\n  var xyGrid = new THREE.GridHelper(gridSize, 10);\n  xyGrid.rotation.x = Math.PI * (1 / 2);\n  xyGrid.position.set(gridSize, gridSize, 0);\n  scene.add(xyGrid);\n  var yzGrid = new THREE.GridHelper(gridSize, 10);\n  yzGrid.rotation.z = Math.PI * (1 / 2);\n  yzGrid.position.set(0, gridSize, gridSize);\n  scene.add(yzGrid);\n}\n\nfunction renderAxis(v, color, labelText) {\n  var axisLength = 250;\n  var labelDistance = axisLength * 1.1;\n  var dir = v.normalize();\n  var axis = new THREE.ArrowHelper(dir, origin, axisLength, color, 10, 5);\n  scene.add(axis);\n  renderLabel(labelText, new THREE.Vector3(dir.x * labelDistance, dir.y * labelDistance, dir.z * labelDistance));\n}\n\nfunction renderAxes() {\n  var xAxis = new THREE.Vector3(1, 0, 0);\n  renderAxis(xAxis, 0xff0000, 'x');\n  var yAxis = new THREE.Vector3(0, 1, 0);\n  renderAxis(yAxis, 0x00ff00, 'y');\n  var zAxis = new THREE.Vector3(0, 0, 1);\n  renderAxis(zAxis, 0x0000ff, 'z');\n}\n\nfunction renderVector(vector) {\n  var v = vector.clone();\n  var arrowLength = v.length();\n  var arrowDir = v.normalize();\n  var arrowColor = 0xffff00;\n  var headLength = 12;\n  var headWidth = 4;\n  var arrowHelper = new THREE.ArrowHelper(arrowDir, origin, arrowLength, arrowColor, headLength, headWidth);\n  scene.add(arrowHelper);\n}\n\nfunction renderLine(from, to) {\n  var material = new THREE.LineDashedMaterial({\n    color: 0xffffff,\n    linewidth: 2,\n    dashSize: 2,\n    gapSize: 3,\n    transparent: true,\n    opacity: 0.5\n  }); // Three JS dashed line material not showing\n  // http://stackoverflow.com/questions/35523961/three-js-dashed-line-material-not-showing\n\n  var geometry = new THREE.Geometry();\n  geometry.vertices.push(from, to);\n  geometry.computeLineDistances();\n  var line = new THREE.Line(geometry, material);\n  scene.add(line);\n}\n\nfunction renderCoordinate() {\n  var radius = 200;\n  var theta = Math.PI * (2 / 8); // Angle from x axis\n\n  var phi = Math.PI * (2 / 8); // Angle from z axis\n\n  var x = radius * Math.sin(phi) * Math.cos(theta);\n  var y = radius * Math.sin(phi) * Math.sin(theta);\n  var z = radius * Math.cos(phi);\n  var pointNormal = new THREE.Vector3(x, y, z).normalize();\n  var point = pointNormal.clone().setLength(radius);\n  renderVector(point);\n  var xyPoint = new THREE.Vector3(x, y, 0);\n  renderLine(origin, xyPoint);\n  renderLine(point, xyPoint);\n  var angleRadius = 40; // theta angle line\n\n  var thetaAngleGeometry = new _CircleLineGeometry__WEBPACK_IMPORTED_MODULE_1__[\"default\"](angleRadius, 32, 0, theta);\n  var thetaAngleMaterial = new THREE.LineBasicMaterial({\n    color: 0xffff00,\n    linewidth: 2\n  });\n  var thetaAngleLine = new THREE.Line(thetaAngleGeometry, thetaAngleMaterial);\n  scene.add(thetaAngleLine);\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(300, 100, 300);\n  camera.lookAt(origin);\n  renderGrid();\n  renderAxes();\n  renderCoordinate();\n  ambientLight = new THREE.AmbientLight(0x444444);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 50, 50);\n  scene.add(pointLight);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  labels.forEach(function (label) {\n    label.lookAt(camera.position);\n  });\n  controls.update();\n  renderer.render(scene, camera);\n}\n\nload().then(function () {\n  init();\n  animate();\n});\n\n//# sourceURL=webpack:///./src/experiments/spherical-coordinates/index.js?");

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