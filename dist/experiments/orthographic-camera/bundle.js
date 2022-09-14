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

/***/ "./src/experiments/orthographic-camera/index.js":
/*!******************************************************!*\
  !*** ./src/experiments/orthographic-camera/index.js ***!
  \******************************************************/
/***/ (() => {

eval("// See:\n// https://www.youtube.com/watch?v=k3adBAnDpos\n// http://stackoverflow.com/questions/17558085/three-js-orthographic-camera\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\n// View size is how much vertical space to fit in the view\n// This is in world coordinates\nvar VIEW_SIZE = 600;\n// The aspect ratio provides information about how wide our view should\n// be compared to how tall it should be\nvar ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar ambientLight;\nvar light;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(230, 3);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(230);\n    scene.add(axisHelper);\n    var boxSize = 100;\n    var gapSize = 50;\n    var gridSize = 3;\n    var areaSize = boxSize * gridSize + gapSize * (gridSize - 1);\n    var start = -(areaSize / 2) + boxSize / 2;\n    var end = areaSize / 2 + boxSize / 2;\n    for(var x = start; x <= end; x += boxSize + gapSize){\n        for(var z = start; z <= end; z += boxSize + gapSize){\n            var height = 1 + Math.random() * 199;\n            var geometry = new THREE.BoxGeometry(100, height, 100);\n            var material = new THREE.MeshLambertMaterial({\n                color: 0xffffff\n            });\n            var mesh = new THREE.Mesh(geometry, material);\n            mesh.position.set(x, height / 2, z);\n            scene.add(mesh);\n        }\n    }\n    ambientLight = new THREE.AmbientLight(0x444444);\n    scene.add(ambientLight);\n    light = new THREE.DirectionalLight(0xffffff, 1, 1000);\n    light.position.set(100, 300, 600);\n    scene.add(light);\n    camera = new THREE.OrthographicCamera(-(ASPECT_RATIO * VIEW_SIZE) / 2, ASPECT_RATIO * VIEW_SIZE / 2, VIEW_SIZE / 2, -(VIEW_SIZE / 2), -1000, 1000);\n    camera.position.set(300, 300, 300);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    controls.target.set(origin.x, origin.y, origin.z);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction update() {\n    controls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/orthographic-camera/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/orthographic-camera/index.js"]();
/******/ 	
/******/ })()
;