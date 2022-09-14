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

/***/ "./src/experiments/sphere-points/index.js":
/*!************************************************!*\
  !*** ./src/experiments/sphere-points/index.js ***!
  \************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar geometry;\nvar material;\nvar mesh;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    geometry = new THREE.SphereGeometry(1, 32, 32);\n    material = new THREE.MeshLambertMaterial({\n        color: 0xffffff\n    });\n    // https://en.wikipedia.org/wiki/Spherical_coordinate_system\n    // http://stackoverflow.com/questions/969798/plotting-a-point-on-the-edge-of-a-sphere\n    var radius = 100;\n    var intervals = 10;\n    // phi is the angle on the xy plane\n    // [0, 2PI]\n    var phi0 = Math.PI * (0 / 4);\n    var phi1 = Math.PI * (2 / 4);\n    var phiDelta = (phi1 - phi0) / intervals;\n    // theta is the angle from the z axis\n    // [0, PI]\n    var theta0 = Math.PI * (0 / 2);\n    var theta1 = Math.PI * (2 / 4);\n    var thetaDelta = (theta1 - theta0) / intervals;\n    // let count = 0;\n    for(var phi = phi0; phi <= phi1; phi += phiDelta){\n        for(var theta = theta0; theta <= theta1; theta += thetaDelta){\n            // count += 1;\n            // console.log(count);\n            var x = radius * Math.sin(theta) * Math.cos(phi);\n            var y = radius * Math.sin(theta) * Math.sin(phi);\n            var z = radius * Math.cos(theta);\n            mesh = new THREE.Mesh(geometry, material);\n            mesh.position.set(x, y, z);\n            scene.add(mesh);\n        }\n    }\n    ambientLight = new THREE.AmbientLight(0x444444);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 50, 50);\n    scene.add(pointLight);\n    renderer = new THREE.WebGLRenderer();\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    controls.update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/sphere-points/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/sphere-points/index.js"]();
/******/ 	
/******/ })()
;