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

/***/ "./src/experiments/simple-quaternion/index.js":
/*!****************************************************!*\
  !*** ./src/experiments/simple-quaternion/index.js ***!
  \****************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar pointLight;\nvar ambientLight;\nvar stats;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(5, 5, 5);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    var gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    var axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 200, -100);\n    scene.add(pointLight);\n    // Creating a quaterion with\n    // a) the axis pointing along Y\n    // b) a rotation of Math.PI / 4\n    var quaternion = new THREE.Quaternion();\n    var axisNormalised = new THREE.Vector3(0, 1, 0).normalize();\n    var angle = Math.PI / 4;\n    quaternion.setFromAxisAngle(axisNormalised, angle);\n    var beforeVector = new THREE.Vector3(1, 0, 0);\n    var afterVector = beforeVector.clone();\n    afterVector.applyQuaternion(quaternion);\n    // console.log('beforeVector', beforeVector);\n    // console.log('afterVector', afterVector);\n    var geometry = new THREE.BoxGeometry(1, 1, 1);\n    var material = new THREE.MeshStandardMaterial({\n        color: 0xff0000\n    });\n    var mesh = new THREE.Mesh(geometry, material);\n    mesh.quaternion.copy(quaternion);\n    scene.add(mesh);\n    var beforeArrow = new THREE.ArrowHelper(beforeVector.clone().normalize(), origin, beforeVector.length(), 0xffff00);\n    scene.add(beforeArrow);\n    var afterArrow = new THREE.ArrowHelper(afterVector.clone().normalize(), origin, afterVector.length() * 2, 0xffffff);\n    scene.add(afterArrow);\n}\nfunction update() {\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/simple-quaternion/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/simple-quaternion/index.js"]();
/******/ 	
/******/ })()
;