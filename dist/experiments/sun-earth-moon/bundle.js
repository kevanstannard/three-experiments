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

/***/ "./src/experiments/sun-earth-moon/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/sun-earth-moon/index.js ***!
  \*************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar sun;\nvar earth;\nvar moon;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    // For each body we create\n    // 1) a Mesh\n    // 2) an Object3D\n    //\n    // The Object3D is the parent of the mesh\n    // The Object3D is the parent of other satellites\n    //\n    // When we rotate the Object3D it then rotates its satellites\n    //\n    // We can also undo the rotation on the mesh,\n    // (and give it an addtional rotattion)\n    // to prevent the mesh simply rotating with the Object3D\n    var sunGeometry = new THREE.SphereGeometry(30, 16, 16);\n    var sunMaterial = new THREE.MeshLambertMaterial({\n        color: 0xffff00,\n        wireframe: true\n    });\n    var sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);\n    sun = new THREE.Object3D();\n    sun.add(sunMesh);\n    scene.add(sun);\n    var earthGeometry = new THREE.SphereGeometry(10, 16, 16);\n    var earthMaterial = new THREE.MeshLambertMaterial({\n        color: 0x0000ff,\n        wireframe: true\n    });\n    var earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);\n    earth = new THREE.Object3D();\n    earth.add(earthMesh);\n    earth.position.x = 80;\n    sun.add(earth);\n    var moonGeometry = new THREE.SphereGeometry(3, 16, 16);\n    var moonMaterial = new THREE.MeshLambertMaterial({\n        color: 0x888888,\n        wireframe: true\n    });\n    var moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);\n    moon = new THREE.Object3D();\n    moon.add(moonMesh);\n    moon.position.x = 20;\n    earth.add(moon);\n    ambientLight = new THREE.AmbientLight(0x444444);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 50, 50);\n    scene.add(pointLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction update() {\n    sun.rotation.y += 0.01;\n    sun.children[0].rotation.y -= 0.01 + 0.001;\n    earth.rotation.y += 0.01;\n    earth.children[0].rotation.y -= 0.01 + 0.02;\n    moon.rotation.y += 0.01;\n    moon.children[0].rotation.y -= 0.01;\n    controls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/sun-earth-moon/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/sun-earth-moon/index.js"]();
/******/ 	
/******/ })()
;