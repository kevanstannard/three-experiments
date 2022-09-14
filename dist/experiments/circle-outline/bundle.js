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

/***/ "./src/experiments/circle-outline/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/circle-outline/index.js ***!
  \*************************************************/
/***/ (() => {

eval("// Ref:\n// https://github.com/mrdoob/three.js/wiki/Drawing-lines\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar line;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction CircleLineGeometry(radius, segments, thetaStart, thetaLength) {\n    var args = {\n        radius: radius || 50,\n        segments: segments || 8,\n        thetaStart: thetaStart || 0,\n        thetaLength: thetaLength || 2 * Math.PI\n    };\n    var geometry = new THREE.Geometry();\n    var delta = (args.thetaStart + args.thetaLength - args.thetaStart) / args.segments;\n    for(var i = 0; i <= args.segments; i += 1){\n        var angle = args.thetaStart + delta * i;\n        var x = args.radius * Math.cos(angle);\n        var y = args.radius * Math.sin(angle);\n        geometry.vertices.push(new THREE.Vector3(x, y, 0));\n    }\n    return geometry;\n}\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(100, 100, 100);\n    camera.lookAt(origin);\n    var radius = 50;\n    var segments = 32;\n    var thetaStart = 0;\n    var thetaLength = 2 * Math.PI;\n    var geometry = new CircleLineGeometry(radius, segments, thetaStart, thetaLength);\n    var material = new THREE.LineBasicMaterial({\n        color: 0xffff00\n    });\n    line = new THREE.Line(geometry, material);\n    scene.add(line);\n    renderer = new THREE.WebGLRenderer();\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction update() {\n    line.rotation.y += 0.01;\n    controls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/circle-outline/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/circle-outline/index.js"]();
/******/ 	
/******/ })()
;