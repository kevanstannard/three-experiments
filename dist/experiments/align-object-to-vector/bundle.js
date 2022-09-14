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

/***/ "./src/experiments/align-object-to-vector/index.js":
/*!*********************************************************!*\
  !*** ./src/experiments/align-object-to-vector/index.js ***!
  \*********************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar directionVectorAngle = 0;\nvar directionVectorHelper;\nvar directionVectorRadius = 50;\nvar directionVector = new THREE.Vector3(1, 1, 1).normalize();\nvar box1;\nvar box2;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction Box(size) {\n    var geometry = new THREE.BoxGeometry(size, size, size);\n    var material = new THREE.MeshLambertMaterial({\n        color: 0xffffff,\n        wireframe: true\n    });\n    THREE.Mesh.call(this, geometry, material);\n    // Define a vector in world coordinates for this box to look at\n    this.lookAtVector = new THREE.Vector3();\n    // Set the initial direction of the arrow\n    // This MUST have the  correct orientation for the initial box\n    // so that when the box is rotated, then this arrow will rotate with it\n    var direction = new THREE.Vector3(0, 0, 1);\n    // Create a vector to hold the arrows position\n    var position = new THREE.Vector3();\n    // Create the arrow\n    this.arrow = new THREE.ArrowHelper(direction, position, size, 0xffffff);\n    // And make it a child of the box\n    this.add(this.arrow);\n}\nBox.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {\n    constructor: Box,\n    setDirection: function setDirection(vector) {\n        this.lookAtVector.set(this.position.x + vector.x, this.position.y + vector.y, this.position.z + vector.z);\n        this.lookAt(this.lookAtVector);\n    }\n});\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    directionVectorHelper = new THREE.ArrowHelper(directionVector, origin, 50);\n    scene.add(directionVectorHelper);\n    box1 = new Box(20);\n    box1.position.set(50, 50, 0);\n    scene.add(box1);\n    box2 = new Box(30);\n    box2.position.set(0, 50, 50);\n    scene.add(box2);\n    ambientLight = new THREE.AmbientLight(0x444444);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 50, 50);\n    scene.add(pointLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(150, 150, 150);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction updateBoxes() {\n    box1.setDirection(directionVector);\n    box2.setDirection(directionVector);\n}\nfunction updateDirectionVector() {\n    directionVectorAngle += 0.01;\n    var x = directionVectorRadius * Math.cos(directionVectorAngle);\n    var y = directionVectorRadius * Math.sin(directionVectorAngle);\n    var z = directionVectorRadius * Math.sin(directionVectorAngle) * Math.cos(directionVectorAngle);\n    directionVector.set(x, y, z).normalize();\n    directionVectorHelper.setDirection(directionVector);\n}\nfunction update() {\n    updateDirectionVector();\n    updateBoxes();\n    controls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/align-object-to-vector/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/align-object-to-vector/index.js"]();
/******/ 	
/******/ })()
;