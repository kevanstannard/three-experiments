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

/***/ "./src/experiments/multiple-fonts/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/multiple-fonts/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_fonts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/fonts */ \"./src/modules/fonts/index.js\");\n// References\n// https://github.com/mrdoob/three.js/tree/master/examples/fonts\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar fonts;\nvar origin = new THREE.Vector3(0, 0, 0);\nvar FONT_SIZE = 36;\n// ES5 alternative to load the fonts\n// https://github.com/kevanstannard/three/issues/1\n// var fontLoader = new THREE.FontLoader();\n//\n// var fonts = {};\n//\n// function loadFont(name) {\n//   var url = '../../modules/fonts/fonts/' + name + '.typeface.json';\n//   return new Promise(function(resolve) {\n//     fontLoader.load(url, function(font) {\n//       fonts[name] = font;\n//       resolve();\n//     });\n//   });\n// }\n//\n// function loadFonts() {\n//   var promises = [\n//     loadFont('gentilis_regular'),\n//     loadFont('helvetiker_regular'),\n//     loadFont('optimer_regular'),\n//   ];\n//   return Promise.all(promises);\n// }\nfunction createText(text, fontId) {\n    var params = {\n        font: fonts[fontId],\n        size: FONT_SIZE,\n        height: 1\n    };\n    var geometry = new THREE.TextGeometry(text, params);\n    var material = new THREE.MeshLambertMaterial({\n        color: 0x888888\n    });\n    var mesh = new THREE.Mesh(geometry, material);\n    return mesh;\n}\nfunction load() {\n    return (0,_modules_fonts__WEBPACK_IMPORTED_MODULE_0__.loadFonts)().then(function(theFonts) {\n        fonts = theFonts;\n    });\n}\nfunction init() {\n    scene = new THREE.Scene();\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    var lineHeight = FONT_SIZE;\n    var one = createText(\"one\", \"gentilis_regular\", 0xff0000);\n    one.position.y = lineHeight * 2;\n    scene.add(one);\n    var two = createText(\"two\", \"helvetiker_regular\", 0x00ff00);\n    two.position.y = lineHeight * 1;\n    scene.add(two);\n    var three = createText(\"three\", \"optimer_regular\", 0x0000ff);\n    three.position.y = lineHeight * 0;\n    scene.add(three);\n    ambientLight = new THREE.AmbientLight(0x888888);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 2, 1000);\n    pointLight.position.set(100, 100, 100);\n    scene.add(pointLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    controls.update();\n    renderer.render(scene, camera);\n}\nload().then(function() {\n    init();\n    animate();\n});\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/multiple-fonts/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/experiments/multiple-fonts/index.js");
/******/ 	
/******/ })()
;