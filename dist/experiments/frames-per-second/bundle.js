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

/***/ "./src/experiments/frames-per-second/FPS.js":
/*!**************************************************!*\
  !*** ./src/experiments/frames-per-second/FPS.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FPS)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nfunction now() {\n    return (window.performance || Date).now() / 1000; // Seconds\n}\nvar FPS = /*#__PURE__*/ function() {\n    \"use strict\";\n    function FPS() {\n        _classCallCheck(this, FPS);\n        this.prevTime = now();\n        this.delta = 0;\n        this.elapsed = 0;\n        this.frames = 0;\n        this.fps = 0;\n        this.fpsAverage = 0;\n    }\n    var _proto = FPS.prototype;\n    _proto.update = function update() {\n        var time = now();\n        this.frames += 1;\n        this.delta = time - this.prevTime;\n        this.elapsed += this.delta;\n        this.fps = 1 / this.delta;\n        this.fpsAverage = this.frames / this.elapsed;\n        this.prevTime = time;\n    };\n    return FPS;\n}();\n\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/frames-per-second/FPS.js?");

/***/ }),

/***/ "./src/experiments/frames-per-second/index.js":
/*!****************************************************!*\
  !*** ./src/experiments/frames-per-second/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _FPS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FPS */ \"./src/experiments/frames-per-second/FPS.js\");\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar orbitControls;\nvar pointLight;\nvar ambientLight;\nvar stats;\nvar fps;\nvar fpsEl;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    fps = new _FPS__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    var count = 3000;\n    for(var i = 0; i < count; i += 1){\n        var geometry = new THREE.BoxGeometry(5, 5, 5);\n        var material = new THREE.MeshStandardMaterial({\n            color: 0xff0000\n        });\n        var box = new THREE.Mesh(geometry, material);\n        box.position.x = Math.random() * 200 - 100;\n        box.position.y = Math.random() * 200 - 100;\n        box.position.z = Math.random() * 200 - 100;\n        scene.add(box);\n    }\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 200, -100);\n    scene.add(pointLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    fpsEl = document.createElement(\"div\");\n    fpsEl.style.color = \"white\";\n    fpsEl.style.position = \"absolute\";\n    fpsEl.style.top = \"150px\";\n    fpsEl.style.left = \"0px\";\n    document.body.appendChild(fpsEl);\n}\nvar prevTime;\nvar currTime;\nfunction update() {\n    fps.update();\n    currTime = Math.floor(fps.elapsed);\n    if (currTime !== prevTime) {\n        fpsEl.innerHTML = \"fps: \".concat(Math.round(fps.fps), \"<br />avg: \").concat(Math.round(fps.fpsAverage));\n        prevTime = currTime;\n    }\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/frames-per-second/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/experiments/frames-per-second/index.js");
/******/ 	
/******/ })()
;