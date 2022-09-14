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

/***/ "./src/experiments/keyboard-move/index.js":
/*!************************************************!*\
  !*** ./src/experiments/keyboard-move/index.js ***!
  \************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar pointLight;\nvar ambientLight;\nvar keyboard;\nvar mesh;\nvar key = {\n    FORWARD: \"W\",\n    BACKWARD: \"S\",\n    LEFT: \"A\",\n    RIGHT: \"D\",\n    UP: \"space\",\n    DOWN: \"shift\"\n};\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction init() {\n    keyboard = new KeyboardState();\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(1000, 50);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    var geometry = new THREE.BoxGeometry(50, 50, 50);\n    var material = new THREE.MeshLambertMaterial({\n        color: 0x888888\n    });\n    mesh = new THREE.Mesh(geometry, material);\n    scene.add(mesh);\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 50, 50);\n    scene.add(pointLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(0, 200, 200);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction update() {\n    keyboard.update();\n    // keyboard.debug();\n    if (keyboard.pressed(key.LEFT)) {\n        mesh.position.x -= 1;\n    }\n    if (keyboard.pressed(key.RIGHT)) {\n        mesh.position.x += 1;\n    }\n    if (keyboard.pressed(key.FORWARD)) {\n        mesh.position.z -= 1;\n    }\n    if (keyboard.pressed(key.BACKWARD)) {\n        mesh.position.z += 1;\n    }\n    if (keyboard.pressed(key.UP)) {\n        mesh.position.y += 1;\n    }\n    if (keyboard.pressed(key.DOWN)) {\n        mesh.position.y -= 1;\n    }\n    camera.lookAt(mesh.position);\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/keyboard-move/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/keyboard-move/index.js"]();
/******/ 	
/******/ })()
;