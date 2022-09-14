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

/***/ "./src/experiments/custom-geometry/index.js":
/*!**************************************************!*\
  !*** ./src/experiments/custom-geometry/index.js ***!
  \**************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar orbitControls;\nvar pointLight;\nvar ambientLight;\nvar mesh;\nvar controls;\nvar stats;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction initControls() {\n    controls = {\n        xRotation: 0,\n        yRotation: 0,\n        zRotation: 0\n    };\n    var gui = new dat.GUI();\n    gui.add(controls, \"xRotation\", 0, Math.PI * 2);\n    gui.add(controls, \"yRotation\", 0, Math.PI * 2);\n    gui.add(controls, \"zRotation\", 0, Math.PI * 2);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    // Vertices of a 4 sided pyramid\n    var vertices = [\n        new THREE.Vector3(30, 0, 0),\n        new THREE.Vector3(0, 0, 30),\n        new THREE.Vector3(-30, 0, 0),\n        new THREE.Vector3(0, 0, -30),\n        new THREE.Vector3(0, 30, 0), \n    ];\n    // Anti-clockwise = outer face\n    // Clockwise = inner face\n    var faces = [\n        new THREE.Face3(4, 1, 0),\n        new THREE.Face3(4, 2, 1),\n        new THREE.Face3(4, 3, 2),\n        new THREE.Face3(4, 0, 3),\n        new THREE.Face3(1, 2, 3),\n        new THREE.Face3(3, 0, 1), \n    ];\n    var geometry = new THREE.Geometry();\n    geometry.vertices = vertices;\n    geometry.faces = faces;\n    geometry.computeFaceNormals();\n    var material = new THREE.MeshLambertMaterial({\n        opacity: 0.5,\n        color: 0x44ff44,\n        transparent: true,\n        side: THREE.DoubleSide\n    });\n    mesh = new THREE.Mesh(geometry, material);\n    mesh.position.set(0, 20, 0);\n    scene.add(mesh);\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 200, -100);\n    scene.add(pointLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(100, 100, 100);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    initControls();\n}\nfunction update() {\n    mesh.rotation.set(mesh.rotation.x = controls.xRotation, mesh.rotation.y = controls.yRotation, mesh.rotation.z = controls.zRotation);\n    stats.update();\n    orbitControls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/custom-geometry/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/custom-geometry/index.js"]();
/******/ 	
/******/ })()
;