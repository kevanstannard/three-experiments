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

/***/ "./src/experiments/line-vs-mesh/index.js":
/*!***********************************************!*\
  !*** ./src/experiments/line-vs-mesh/index.js ***!
  \***********************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar stats;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(10, 10, 10);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    // const gridHelper = new THREE.GridHelper(100, 10);\n    // scene.add(gridHelper);\n    // const axisHelper = new THREE.AxisHelper(1);\n    // scene.add(axisHelper);\n    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    var pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 200, -100);\n    scene.add(pointLight);\n    // LineGeometry with THREE.Line\n    var geometry1 = new THREE.CircleGeometry(4, 64);\n    geometry1.vertices.shift();\n    var material1 = new THREE.LineBasicMaterial({\n        color: 0x4375B6\n    });\n    var line1 = new THREE.Line(geometry1, material1);\n    line1.position.set(-5, 0, 0);\n    scene.add(line1);\n    // LineGeometry with THREE.Mesh\n    var geometry2 = new THREE.CircleGeometry(4, 64);\n    geometry2.vertices.shift();\n    var material2 = new THREE.LineBasicMaterial({\n        color: 0x4375B6\n    });\n    var line2 = new THREE.Mesh(geometry2, material2);\n    line2.position.set(5, 0, 0);\n    scene.add(line2);\n}\nfunction update() {\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/line-vs-mesh/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/line-vs-mesh/index.js"]();
/******/ 	
/******/ })()
;