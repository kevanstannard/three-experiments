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

/***/ "./src/experiments/svg-image/index.js":
/*!********************************************!*\
  !*** ./src/experiments/svg-image/index.js ***!
  \********************************************/
/***/ (() => {

eval("/* eslint-disable no-console */ var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar ambientLight;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    var image = document.createElement(\"img\");\n    image.onload = function() {\n        var texture = new THREE.Texture();\n        texture.image = image;\n        texture.needsUpdate = true;\n        var geometry = new THREE.BoxGeometry(100, 100, 100);\n        var material = new THREE.MeshLambertMaterial({\n            side: THREE.DoubleSide,\n            map: texture,\n            transparent: true\n        });\n        var mesh = new THREE.Mesh(geometry, material);\n        scene.add(mesh);\n    };\n    image.onerror = function(error) {\n        console.log(\"Error:\", error);\n    };\n    image.src = \"../../assets/textures/misc/darktable.svg\";\n    ambientLight = new THREE.AmbientLight(0xffffff, 1);\n    scene.add(ambientLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction update() {\n    controls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/svg-image/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/svg-image/index.js"]();
/******/ 	
/******/ })()
;