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

/***/ "./src/experiments/cross-product/index.js":
/*!************************************************!*\
  !*** ./src/experiments/cross-product/index.js ***!
  \************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar orbitControls;\nvar stats;\nvar clock;\nvar origin;\nvar direction1;\nvar direction1Arrow;\nvar direction2;\nvar direction2Arrow;\nvar direction3;\nvar direction3Arrow;\nvar line;\nfunction Line() {\n    this.start = new THREE.Vector3();\n    this.end = new THREE.Vector3();\n    var material = new THREE.LineBasicMaterial({\n        color: 0xffffff\n    });\n    var geometry = new THREE.Geometry();\n    geometry.vertices.push(this.start, this.end);\n    THREE.Line.call(this, geometry, material);\n}\nLine.prototype = Object.assign(Object.create(THREE.Line.prototype), {\n    constructor: Line,\n    set: function set(start, end) {\n        this.start.copy(start);\n        this.end.copy(end);\n    }\n});\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    clock = new THREE.Clock();\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(2, 4);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(2);\n    scene.add(axisHelper);\n    origin = new THREE.Vector3(0, 0, 0);\n    direction1 = new THREE.Vector3();\n    direction1Arrow = new THREE.ArrowHelper(direction1, origin, 1, 0xff0000);\n    scene.add(direction1Arrow);\n    direction2 = new THREE.Vector3();\n    direction2Arrow = new THREE.ArrowHelper(direction2, origin, 1, 0x00ff00);\n    scene.add(direction2Arrow);\n    direction3 = new THREE.Vector3();\n    direction3Arrow = new THREE.ArrowHelper(direction3, origin, 1, 0x0000ff);\n    scene.add(direction3Arrow);\n    line = new Line();\n    scene.add(line);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(3, 3, 3);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n}\nfunction update() {\n    var t = clock.getElapsedTime();\n    var a = Math.sin(t / 10);\n    var b = Math.cos(t / 10);\n    direction1.set(a, 0, b).normalize();\n    direction2.set(a, b, 0).normalize();\n    direction3.crossVectors(direction1, direction2).normalize();\n    direction1Arrow.setDirection(direction1);\n    direction2Arrow.setDirection(direction2);\n    direction3Arrow.setDirection(direction3);\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/cross-product/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/cross-product/index.js"]();
/******/ 	
/******/ })()
;