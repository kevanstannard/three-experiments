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

/***/ "./src/experiments/camera-rotation-angle/index.js":
/*!********************************************************!*\
  !*** ./src/experiments/camera-rotation-angle/index.js ***!
  \********************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar stats;\nvar labelEl;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    orbitControls.autoRotate = true;\n    orbitControls.autoRotateSpeed = -2.0;\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    var gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    var axisHelper = new THREE.AxisHelper(50);\n    scene.add(axisHelper);\n    camera.position.set(0, 50, 100);\n    camera.lookAt(origin);\n    labelEl = document.createElement(\"div\");\n    labelEl.style.position = \"absolute\";\n    labelEl.style.width = \"50px\";\n    labelEl.style.padding = \"10px\";\n    labelEl.style.backgroundColor = \"#333333\";\n    labelEl.style.color = \"white\";\n    labelEl.style.top = \"120px\";\n    labelEl.style.left = \"0px\";\n    labelEl.style.textAlign = \"center\";\n    document.body.appendChild(labelEl);\n    // Ref:\n    // http://stackoverflow.com/questions/42089919/three-js-camera-rotation-y-to-360-degrees-conversion/42112495?noredirect=1#comment71441294_42112495\n    //\n    // If you set\n    //\n    // camera.rotation.order = \"YXZ\"\n    //\n    // ( the default is \"XYZ\" ) the Euler angles will make a lot more sense to you:\n    //\n    // rotation.y will be the camera heading in radians\n    //\n    // rotation.x will be the camera pitch in radians\n    //\n    // rotation.z will be the camera roll in radians\n    //\n    // The rotations will be applied in that order.\n    //\n    // For more information, see this stackoverflow answer.\n    //\n    // http://stackoverflow.com/questions/17517937/three-js-camera-tilt-up-or-down-and-keep-horizon-level/17518092#17518092\n    camera.rotation.order = \"YXZ\";\n}\nfunction update() {\n    var heading = camera.rotation.y;\n    var radians = heading > 0 ? heading : 2 * Math.PI + heading;\n    var degrees = THREE.Math.radToDeg(radians);\n    labelEl.innerHTML = Math.floor(degrees);\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/camera-rotation-angle/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/camera-rotation-angle/index.js"]();
/******/ 	
/******/ })()
;