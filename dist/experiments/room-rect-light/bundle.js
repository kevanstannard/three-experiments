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

/***/ "./src/experiments/room-rect-light/index.js":
/*!**************************************************!*\
  !*** ./src/experiments/room-rect-light/index.js ***!
  \**************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar orbitControls;\n// let ambientLight;\nvar stats;\nvar rectLight;\nvar rectLightHelper;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction Wall(width, height) {\n    var material = new THREE.MeshStandardMaterial({\n        color: 0xffffff,\n        metalness: 0,\n        roughness: 1,\n        side: THREE.DoubleSide\n    });\n    var geometry = new THREE.PlaneBufferGeometry(width, height);\n    THREE.Mesh.call(this, geometry, material);\n}\nWall.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {\n    constructor: Wall\n});\nfunction Room(width, height, depth) {\n    THREE.Object3D.call(this);\n    var back = new Wall(width, height);\n    back.position.set(0, 0, -depth / 2);\n    this.add(back);\n    var right = new Wall(depth, height);\n    right.rotation.y = Math.PI / 2;\n    right.position.set(-width / 2, 0, 0);\n    this.add(right);\n    var left = new Wall(depth, height);\n    left.rotation.y = -Math.PI / 2;\n    left.position.set(width / 2, 0, 0);\n    this.add(left);\n    var bottom = new Wall(width, depth);\n    bottom.rotation.x = -Math.PI / 2;\n    bottom.position.set(0, -height / 2, 0);\n    this.add(bottom);\n    var top = new Wall(width, depth);\n    top.rotation.x = Math.PI / 2;\n    top.position.set(0, height / 2, 0);\n    this.add(top);\n}\nRoom.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {\n    constructor: Room\n});\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    axisHelper = new THREE.AxisHelper(50);\n    scene.add(axisHelper);\n    // ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    // scene.add(ambientLight);\n    var roomSize = 100;\n    var room = new Room(roomSize, roomSize, roomSize);\n    scene.add(room);\n    rectLight = new THREE.RectAreaLight(0xFFFFFF, 1000, 5, 20);\n    rectLight.matrixAutoUpdate = true;\n    rectLight.position.set(5, 5, 0);\n    rectLightHelper = new THREE.RectAreaLightHelper(rectLight);\n    rectLight.add(rectLightHelper);\n    scene.add(rectLight);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(0, 0, 200);\n    camera.lookAt(origin);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n}\nfunction update() {\n    var t = Date.now() / 1000;\n    var r = 15.0;\n    var lx = r * Math.cos(t);\n    var lz = r * Math.sin(t);\n    var ly = 5.0 + 5.0 * Math.sin(t / 3.0);\n    rectLight.position.set(lx, ly, lz);\n    rectLight.lookAt(origin);\n    rectLight.updateMatrixWorld();\n    rectLightHelper.update();\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/room-rect-light/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/room-rect-light/index.js"]();
/******/ 	
/******/ })()
;