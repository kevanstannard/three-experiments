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

/***/ "./src/experiments/box-wireframe/index.js":
/*!************************************************!*\
  !*** ./src/experiments/box-wireframe/index.js ***!
  \************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar geometry;\nvar material;\nvar mesh;\nfunction init() {\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.z = 1000;\n    geometry = new THREE.BoxGeometry(200, 200, 200);\n    material = new THREE.MeshBasicMaterial({\n        color: 0xff0000,\n        wireframe: true\n    });\n    mesh = new THREE.Mesh(geometry, material);\n    scene.add(mesh);\n    renderer = new THREE.WebGLRenderer();\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    document.body.appendChild(renderer.domElement);\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    mesh.rotation.x += 0.01;\n    mesh.rotation.y += 0.02;\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/box-wireframe/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/box-wireframe/index.js"]();
/******/ 	
/******/ })()
;