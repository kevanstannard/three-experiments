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

/***/ "./src/experiments/simple-quaternion-slerp/index.js":
/*!**********************************************************!*\
  !*** ./src/experiments/simple-quaternion-slerp/index.js ***!
  \**********************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar pointLight;\nvar ambientLight;\nvar stats;\nvar object;\nvar fromRotation;\nvar toRotation;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(3, 5, 6);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    var gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    var axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 200, -100);\n    scene.add(pointLight);\n    object = new THREE.Object3D();\n    var geometry = new THREE.BoxGeometry(1, 1, 1);\n    var material = new THREE.MeshStandardMaterial({\n        color: 0xff0000\n    });\n    var mesh = new THREE.Mesh(geometry, material);\n    object.add(mesh);\n    var vector = new THREE.Vector3(0, 0, 1);\n    var arrow = new THREE.ArrowHelper(vector.clone().normalize(), mesh.position, vector.length(), 0xffffff);\n    object.add(arrow);\n    scene.add(object);\n    fromRotation = new THREE.Quaternion();\n    fromRotation.copy(object.quaternion);\n    toRotation = new THREE.Quaternion();\n    var axisNormalised = new THREE.Vector3(1, 1, 1).normalize();\n    var angle = Math.PI;\n    toRotation.setFromAxisAngle(axisNormalised, angle);\n    var axisArrow = new THREE.ArrowHelper(axisNormalised.clone(), mesh.position, axisNormalised.length() * 2, 0xffff00);\n    scene.add(axisArrow);\n}\nvar angle = 0;\nfunction update() {\n    var percent = Math.abs(Math.sin(angle));\n    angle += 0.01;\n    THREE.Quaternion.slerp(fromRotation, toRotation, object.quaternion, percent);\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/simple-quaternion-slerp/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/simple-quaternion-slerp/index.js"]();
/******/ 	
/******/ })()
;