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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/multiple-fonts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/multiple-fonts/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/multiple-fonts/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_fonts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/fonts */ \"./src/modules/fonts/index.js\");\n// References\n// https://github.com/mrdoob/three.js/tree/master/examples/fonts\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar fonts;\nvar origin = new THREE.Vector3(0, 0, 0);\nvar FONT_SIZE = 36; // ES5 alternative to load the fonts\n// https://github.com/kevanstannard/three/issues/1\n// var fontLoader = new THREE.FontLoader();\n//\n// var fonts = {};\n//\n// function loadFont(name) {\n//   var url = '../../modules/fonts/fonts/' + name + '.typeface.json';\n//   return new Promise(function(resolve) {\n//     fontLoader.load(url, function(font) {\n//       fonts[name] = font;\n//       resolve();\n//     });\n//   });\n// }\n//\n// function loadFonts() {\n//   var promises = [\n//     loadFont('gentilis_regular'),\n//     loadFont('helvetiker_regular'),\n//     loadFont('optimer_regular'),\n//   ];\n//   return Promise.all(promises);\n// }\n\nfunction createText(text, fontId) {\n  var params = {\n    font: fonts[fontId],\n    size: FONT_SIZE,\n    height: 1 // Thickness\n\n  };\n  var geometry = new THREE.TextGeometry(text, params);\n  var material = new THREE.MeshLambertMaterial({\n    color: 0x888888\n  });\n  var mesh = new THREE.Mesh(geometry, material);\n  return mesh;\n}\n\nfunction load() {\n  return Object(_modules_fonts__WEBPACK_IMPORTED_MODULE_0__[\"loadFonts\"])().then(function (theFonts) {\n    fonts = theFonts;\n  });\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  var lineHeight = FONT_SIZE;\n  var one = createText('one', 'gentilis_regular', 0xff0000);\n  one.position.y = lineHeight * 2;\n  scene.add(one);\n  var two = createText('two', 'helvetiker_regular', 0x00ff00);\n  two.position.y = lineHeight * 1;\n  scene.add(two);\n  var three = createText('three', 'optimer_regular', 0x0000ff);\n  three.position.y = lineHeight * 0;\n  scene.add(three);\n  ambientLight = new THREE.AmbientLight(0x888888);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffffff, 2, 1000);\n  pointLight.position.set(100, 100, 100);\n  scene.add(pointLight);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(200, 200, 200);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  controls.update();\n  renderer.render(scene, camera);\n}\n\nload().then(function () {\n  init();\n  animate();\n});\n\n//# sourceURL=webpack:///./src/experiments/multiple-fonts/index.js?");

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