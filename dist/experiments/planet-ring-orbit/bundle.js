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

/***/ "./src/experiments/planet-ring-orbit/index.js":
/*!****************************************************!*\
  !*** ./src/experiments/planet-ring-orbit/index.js ***!
  \****************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar pointLight;\nvar ambientLight;\nvar stats;\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(100, 100, 100);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    var gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    var axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 200, -100);\n    scene.add(pointLight);\n    var starGeometry = new THREE.SphereGeometry(10, 32, 32);\n    var starMaterial = new THREE.MeshBasicMaterial({\n        color: 0xCDF409\n    });\n    var starMesh = new THREE.Mesh(starGeometry, starMaterial);\n    scene.add(starMesh);\n    var planetGeometry = new THREE.SphereGeometry(5, 32, 32);\n    var planetMaterial = new THREE.MeshBasicMaterial({\n        color: 0x09F425\n    });\n    var planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);\n    planetMesh.position.set(20, 30, -40);\n    scene.add(planetMesh);\n    var radius = starMesh.position.distanceTo(planetMesh.position);\n    var ringGeometry = new THREE.CircleGeometry(radius, 32);\n    ringGeometry.rotateX(-Math.PI / 2);\n    ringGeometry.vertices.shift(); // Remove the line that goes from the center to the ring\n    var ringMaterial = new THREE.LineBasicMaterial({\n        color: 0xCC0000\n    });\n    var ringMesh = new THREE.Line(ringGeometry, ringMaterial);\n    scene.add(ringMesh);\n    ringMesh.lookAt(planetMesh.position);\n}\nfunction update() {\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/planet-ring-orbit/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/planet-ring-orbit/index.js"]();
/******/ 	
/******/ })()
;