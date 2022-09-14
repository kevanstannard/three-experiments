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

/***/ "./src/experiments/clock-delta-animation/index.js":
/*!********************************************************!*\
  !*** ./src/experiments/clock-delta-animation/index.js ***!
  \********************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 500;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar orbitControls;\nvar stats;\nvar clock;\nvar cube1;\nvar cube2;\nvar cube3;\nvar cube4;\nvar cube5;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction Cube(rotationPerSecond) {\n    this.rotationPerSecond = rotationPerSecond || Math.PI / 2;\n    var geometry = new THREE.BoxGeometry(10, 10, 10);\n    var material = new THREE.MeshNormalMaterial();\n    THREE.Mesh.call(this, geometry, material);\n}\nCube.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {\n    constructor: Cube,\n    update: function update(delta) {\n        var rotation = this.rotationPerSecond * delta;\n        this.rotation.z += rotation;\n    }\n});\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    clock = new THREE.Clock();\n    clock.start();\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(50, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(20);\n    scene.add(axisHelper);\n    cube1 = new Cube(Math.PI);\n    cube1.position.set(-40, 0, 0);\n    scene.add(cube1);\n    cube2 = new Cube(Math.PI / 2);\n    cube2.position.set(-20, 0, 0);\n    scene.add(cube2);\n    cube3 = new Cube(Math.PI / 4);\n    cube3.position.set(0, 0, 0);\n    scene.add(cube3);\n    cube4 = new Cube(Math.PI / 8);\n    cube4.position.set(20, 0, 0);\n    scene.add(cube4);\n    cube5 = new Cube(Math.PI / 16);\n    cube5.position.set(40, 0, 0);\n    scene.add(cube5);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(50, 50, 50);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n}\nfunction update() {\n    var delta = clock.getDelta();\n    cube1.update(delta);\n    cube2.update(delta);\n    cube3.update(delta);\n    cube4.update(delta);\n    cube5.update(delta);\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/clock-delta-animation/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/clock-delta-animation/index.js"]();
/******/ 	
/******/ })()
;