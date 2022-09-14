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

/***/ "./src/experiments/matrix-vector-multiplication/index.js":
/*!***************************************************************!*\
  !*** ./src/experiments/matrix-vector-multiplication/index.js ***!
  \***************************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 100;\nvar scene;\nvar camera;\nvar renderer;\nvar gridHelper;\nvar orbitControls;\nvar stats;\nvar origin = new THREE.Vector3();\nfunction Vector3Helper(vector, color) {\n    THREE.AxisHelper.call(this, 2);\n    this.material.transparent = true;\n    this.material.opacity = 0.5;\n    //\n    this.vector = vector;\n    this.length = vector.length();\n    this.vectorUnit = vector.clone().normalize();\n    var arrow = new THREE.ArrowHelper(this.vectorUnit, origin, this.length, color);\n    this.add(arrow);\n}\nVector3Helper.prototype = Object.assign(Object.create(THREE.AxisHelper.prototype), {\n    constructor: Vector3Helper\n});\n// function Matrix3Helper(m) {\n//   THREE.Object3D.call(this);\n//   const e = m.elements;\n//   this.v1 = new THREE.Vector3(e[0], e[1], e[2]);\n//   this.v2 = new THREE.Vector3(e[3], e[4], e[5]);\n//   this.v3 = new THREE.Vector3(e[6], e[7], e[8]);\n//   this.v1Normal = this.v1.clone().normalize();\n//   this.v2Normal = this.v2.clone().normalize();\n//   this.v3Normal = this.v3.clone().normalize();\n//   this.v1Arrow = new THREE.ArrowHelper(this.v1Normal, this.position, this.v1.length(), 0xff0000);\n//   this.v2Arrow = new THREE.ArrowHelper(this.v2Normal, this.position, this.v2.length(), 0x00ff00);\n//   this.v3Arrow = new THREE.ArrowHelper(this.v3Normal, this.position, this.v3.length(), 0x0000ff);\n//   this.add(this.v1Arrow);\n//   this.add(this.v2Arrow);\n//   this.add(this.v3Arrow);\n// }\n//\n// Matrix3Helper.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {\n//   constructor: Matrix3Helper,\n// });\nfunction Matrix3Helper(m) {\n    THREE.AxisHelper.call(this, 2);\n    this.material.transparent = true;\n    this.material.opacity = 0.5;\n    //\n    var e = m.elements;\n    this.v1 = new THREE.Vector3(e[0], e[1], e[2]);\n    this.v2 = new THREE.Vector3(e[3], e[4], e[5]);\n    this.v3 = new THREE.Vector3(e[6], e[7], e[8]);\n    this.v1Normal = this.v1.clone().normalize();\n    this.v2Normal = this.v2.clone().normalize();\n    this.v3Normal = this.v3.clone().normalize();\n    this.v1Arrow = new THREE.ArrowHelper(this.v1Normal, this.position, this.v1.length(), 0xff0000);\n    this.v2Arrow = new THREE.ArrowHelper(this.v2Normal, this.position, this.v2.length(), 0x00ff00);\n    this.v3Arrow = new THREE.ArrowHelper(this.v3Normal, this.position, this.v3.length(), 0x0000ff);\n    this.add(this.v1Arrow);\n    this.add(this.v2Arrow);\n    this.add(this.v3Arrow);\n}\nMatrix3Helper.prototype = Object.assign(Object.create(THREE.AxisHelper.prototype), {\n    constructor: Matrix3Helper\n});\nvar v = new THREE.Vector3(1, 1, 1);\nvar vHelper = new Vector3Helper(v, 0xff7700);\nvHelper.position.x = -3;\nvar m = new THREE.Matrix3()// .set(\n//   -1, -1, -1,\n//   0, 1, 0,\n//   0, 0, 1,\n// );\n.set(0, -1, 0, 1, 0, 0, 0, 0, 1);\nvar mHelper = new Matrix3Helper(m);\nvar result = v.clone();\nresult.applyMatrix3(m);\nvar resultHelper = new Vector3Helper(result, 0xffff00);\nresultHelper.position.x = 3;\nconsole.log(\"v\", v);\nconsole.log(\"m\", m.elements);\nconsole.log(\"result\", result);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(0, 4, 4);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    gridHelper = new THREE.GridHelper(10, 10);\n    gridHelper.material.transparent = true;\n    gridHelper.material.opacity = 0.2;\n    scene.add(gridHelper);\n    scene.add(vHelper);\n    scene.add(mHelper);\n    scene.add(resultHelper);\n}\nfunction update() {\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/matrix-vector-multiplication/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/matrix-vector-multiplication/index.js"]();
/******/ 	
/******/ })()
;