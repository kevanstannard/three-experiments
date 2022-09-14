/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/experiments/helpers/index.js":
/*!******************************************!*\
  !*** ./src/experiments/helpers/index.js ***!
  \******************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 0.1;\nvar FAR = 20000;\nvar controls;\nvar renderer;\nvar scene;\nvar camera;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction renderGridHelper() {\n    var gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n}\nfunction renderAxisHelper() {\n    var axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n}\nfunction renderArrowHelper() {\n    var arrowDir = new THREE.Vector3(3, 2, 1).normalize();\n    var arrowLength = 100;\n    var arrowColor = 0xffff00;\n    var headLength = 12;\n    var headWidth = 4;\n    var arrowHelper = new THREE.ArrowHelper(arrowDir, origin, arrowLength, arrowColor, headLength, headWidth);\n    scene.add(arrowHelper);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    renderGridHelper();\n    renderAxisHelper();\n    renderArrowHelper();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    scene.add(camera);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    controls.update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/helpers/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/helpers/index.js"]();
/******/ 	
/******/ })()
;