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

/***/ "./src/experiments/simple-shadows/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/simple-shadows/index.js ***!
  \*************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar box;\nvar controls;\nvar redLight;\nvar blueLight;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction init() {\n    //\n    //\n    // SCENE\n    //\n    //\n    scene = new THREE.Scene();\n    //\n    //\n    // GRID HELPER\n    //\n    //\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    //\n    //\n    // AXIS HELPER\n    //\n    //\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    //\n    //\n    // CAMERA\n    //\n    //\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    //\n    //\n    // FLOOR\n    //\n    //\n    var floorGeometry = new THREE.PlaneGeometry(200, 200);\n    var floorMaterial = new THREE.MeshLambertMaterial({\n        side: THREE.DoubleSide\n    });\n    var floor = new THREE.Mesh(floorGeometry, floorMaterial);\n    floor.position.y = -0.1;\n    floor.rotation.x = -Math.PI / 2;\n    // Indicate which objects can receive shadows\n    floor.receiveShadow = true;\n    scene.add(floor);\n    //\n    //\n    // BOX\n    //\n    //\n    var boxGeometry = new THREE.BoxGeometry(20, 20, 20);\n    var boxMaterial = new THREE.MeshLambertMaterial();\n    box = new THREE.Mesh(boxGeometry, boxMaterial);\n    box.position.y = 40;\n    // Indicate which objects can cast shadows\n    box.castShadow = true;\n    box.receiveShadow = false;\n    scene.add(box);\n    //\n    //\n    // LIGHTS\n    //\n    //\n    // Indicate the lights that can cast shadows\n    redLight = new THREE.PointLight(0xff0000, 1, 500);\n    redLight.castShadow = true;\n    redLight.position.set(-50, 100, 50);\n    scene.add(redLight);\n    blueLight = new THREE.PointLight(0x0000ff, 1, 500);\n    blueLight.castShadow = true;\n    blueLight.position.set(50, 100, -50);\n    scene.add(blueLight);\n    //\n    //\n    // HELPERS\n    //\n    //\n    var sphereSize = 4;\n    var redPointLightHelper = new THREE.PointLightHelper(redLight, sphereSize);\n    scene.add(redPointLightHelper);\n    var bluePointLightHelper = new THREE.PointLightHelper(blueLight, sphereSize);\n    scene.add(bluePointLightHelper);\n    var redLightShadowHelper = new THREE.CameraHelper(redLight.shadow.camera);\n    scene.add(redLightShadowHelper);\n    var blueLightShadowHelper = new THREE.CameraHelper(blueLight.shadow.camera);\n    scene.add(blueLightShadowHelper);\n    //\n    //\n    // RENDERER\n    //\n    //\n    renderer = new THREE.WebGLRenderer();\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    // Enable shadows\n    renderer.shadowMap.enabled = true;\n    // Antialias the shadows\n    renderer.shadowMap.type = THREE.PCFSoftShadowMap;\n    //\n    //\n    // ORBIT CONTROLS\n    //\n    //\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction update() {\n    box.rotation.x += 0.01;\n    box.rotation.y += 0.01;\n    box.rotation.z += 0.01;\n    controls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/simple-shadows/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/simple-shadows/index.js"]();
/******/ 	
/******/ })()
;