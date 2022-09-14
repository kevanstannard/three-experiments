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

/***/ "./src/experiments/load-obj/index.js":
/*!*******************************************!*\
  !*** ./src/experiments/load-obj/index.js ***!
  \*******************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\n// let geometry;\n// let material;\n// let mesh;\nvar controls;\nvar pointLight;\n// let ambientLight;\n// const origin = new THREE.Vector3(0, 0, 0);\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(10, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(10);\n    scene.add(axisHelper);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(15, 10, 15);\n    // camera.lookAt(origin);\n    // geometry = new THREE.BoxGeometry(50, 50, 50);\n    // material = new THREE.MeshLambertMaterial({ color: 0x888888 });\n    // mesh = new THREE.Mesh(geometry, material);\n    // scene.add(mesh);\n    // ambientLight = new THREE.AmbientLight(0xffffff, 0.1);\n    // scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 500);\n    pointLight.position.set(10, 10, 10);\n    scene.add(pointLight);\n    var texture = new THREE.Texture();\n    var textureLoader = new THREE.ImageLoader();\n    textureLoader.load(\"../../assets/textures/misc/uv_grid_sm.jpg\", function(image) {\n        texture.image = image;\n        texture.needsUpdate = true;\n    });\n    var loader = new THREE.OBJLoader();\n    loader.load(\"../../assets/objects/minecraft-tree.obj\", function(object) {\n        // object.traverse((child) => {\n        //   if (child instanceof THREE.Mesh) {\n        //     child.material.map = texture;\n        //   }\n        // });\n        object.position.set(0, 4, 0);\n        object.scale.set(0.01, 0.01, 0.01);\n        scene.add(object);\n        camera.lookAt(object.position);\n    });\n    renderer = new THREE.WebGLRenderer();\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction update() {\n    controls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/load-obj/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/load-obj/index.js"]();
/******/ 	
/******/ })()
;