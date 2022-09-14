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

/***/ "./src/experiments/raycaster/index.js":
/*!********************************************!*\
  !*** ./src/experiments/raycaster/index.js ***!
  \********************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar origin;\nvar direction;\nvar raycaster;\nvar controls;\nvar arrow;\nvar clock;\nvar planes = [];\nfunction createPlane(name, z) {\n    var geometry = new THREE.PlaneGeometry(10, 10);\n    var material = new THREE.MeshBasicMaterial({\n        side: THREE.DoubleSide\n    });\n    var mesh = new THREE.Mesh(geometry, material);\n    mesh.position.z = z;\n    mesh.name = name;\n    planes.push(mesh);\n    return mesh;\n}\nfunction init() {\n    clock = new THREE.Clock();\n    scene = new THREE.Scene();\n    var gridHelper = new THREE.GridHelper(20, 4);\n    scene.add(gridHelper);\n    var axisHelper = new THREE.AxisHelper(20);\n    scene.add(axisHelper);\n    origin = new THREE.Vector3();\n    direction = new THREE.Vector3();\n    arrow = new THREE.ArrowHelper(direction, origin, 20);\n    scene.add(arrow);\n    var plane1 = createPlane(\"Plane 1\", 0);\n    scene.add(plane1);\n    var plane2 = createPlane(\"Plane 2\", -10);\n    scene.add(plane2);\n    var plane3 = createPlane(\"Plane 3\", -20);\n    scene.add(plane3);\n    raycaster = new THREE.Raycaster();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(50, 50, -30);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    document.body.appendChild(renderer.domElement);\n}\nfunction updatePlanes() {\n    var t = clock.getElapsedTime();\n    var x = Math.sin(t);\n    var z = Math.cos(t);\n    direction.set(x, 0, z).normalize();\n    raycaster.set(origin, direction);\n    arrow.setDirection(direction);\n    planes.forEach(function(plane) {\n        return plane.material.color.set(0xffffff);\n    });\n    var intersections = raycaster.intersectObjects(planes);\n    intersections.forEach(function(intersection) {\n        intersection.object.material.color.set(0xff0000);\n    });\n}\nfunction update() {\n    controls.update();\n    updatePlanes();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/raycaster/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/raycaster/index.js"]();
/******/ 	
/******/ })()
;