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

/***/ "./src/experiments/moving-relative-objects/index.js":
/*!**********************************************************!*\
  !*** ./src/experiments/moving-relative-objects/index.js ***!
  \**********************************************************/
/***/ (() => {

eval("/* eslint-disable no-param-reassign, max-len */ var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar object;\nvar origin = new THREE.Vector3(0, 0, 0);\nvar sphereSize = 20;\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    var geometry = new THREE.SphereGeometry(10, 32, 32);\n    var material = new THREE.MeshNormalMaterial();\n    object = new THREE.Object3D();\n    var mid = new THREE.Mesh(geometry, material);\n    var top = new THREE.Mesh(geometry, material);\n    top.position.y = sphereSize;\n    top.move = {\n        x: 0,\n        y: 1,\n        z: 0\n    };\n    var bottom = new THREE.Mesh(geometry, material);\n    bottom.position.y = -sphereSize;\n    bottom.move = {\n        x: 0,\n        y: -1,\n        z: 0\n    };\n    var left = new THREE.Mesh(geometry, material);\n    left.position.x = sphereSize;\n    left.move = {\n        x: 1,\n        y: 0,\n        z: 0\n    };\n    var right = new THREE.Mesh(geometry, material);\n    right.position.x = -sphereSize;\n    right.move = {\n        x: -1,\n        y: 0,\n        z: 0\n    };\n    object.add(mid);\n    object.add(top);\n    object.add(bottom);\n    object.add(left);\n    object.add(right);\n    scene.add(object);\n    ambientLight = new THREE.AmbientLight(0x444444);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 50, 50);\n    scene.add(pointLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(0, 200, 200);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nvar radius = 40;\nvar theta = 0;\nfunction update() {\n    // Children\n    object.children.forEach(function(child) {\n        if (child.move) {\n            child.position.x = child.move.x * sphereSize + child.move.x * sphereSize * Math.sin(theta);\n            child.position.y = child.move.y * sphereSize + child.move.y * sphereSize * Math.sin(theta);\n            child.position.z = child.move.z * sphereSize + child.move.z * sphereSize * Math.sin(theta);\n        }\n    });\n    // Object\n    theta += 0.02;\n    var x = radius * Math.cos(theta);\n    var y = radius * Math.sin(theta);\n    var z = 0;\n    object.position.set(x, y, z);\n    // Controls\n    controls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/moving-relative-objects/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/moving-relative-objects/index.js"]();
/******/ 	
/******/ })()
;