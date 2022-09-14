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

/***/ "./src/experiments/shadows-on-material/index.js":
/*!******************************************************!*\
  !*** ./src/experiments/shadows-on-material/index.js ***!
  \******************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar box;\nvar floor;\nvar controls;\nvar redLight;\nvar blueLight;\nvar greenLight;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction init() {\n    //\n    //\n    // SCENE\n    //\n    //\n    scene = new THREE.Scene();\n    //\n    //\n    // GRID HELPER\n    //\n    //\n    gridHelper = new THREE.GridHelper(100, 10);\n    gridHelper.material.transparent = true;\n    gridHelper.material.opacity = 0.25;\n    scene.add(gridHelper);\n    //\n    //\n    // AXIS HELPER\n    //\n    //\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    //\n    //\n    // CAMERA\n    //\n    //\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    //\n    //\n    // FLOOR\n    //\n    //\n    var loader = new THREE.TextureLoader();\n    loader.load(\"../../assets/textures/misc/green-eye.png\", function(texture) {\n        var floorGeometry = new THREE.PlaneGeometry(200, 200);\n        var floorMaterial = new THREE.MeshLambertMaterial({\n            side: THREE.DoubleSide,\n            map: texture,\n            transparent: true\n        });\n        floor = new THREE.Mesh(floorGeometry, floorMaterial);\n        floor.receiveShadow = true;\n        scene.add(floor);\n    });\n    //\n    //\n    // BOX\n    //\n    //\n    var boxGeometry = new THREE.BoxGeometry(20, 20, 20);\n    var boxMaterial = new THREE.MeshStandardMaterial();\n    box = new THREE.Mesh(boxGeometry, boxMaterial);\n    box.position.y = 40;\n    box.castShadow = true;\n    box.receiveShadow = false;\n    scene.add(box);\n    //\n    //\n    // LIGHTS\n    //\n    //\n    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    redLight = new THREE.PointLight(0xff0000, 2, 500);\n    redLight.castShadow = true;\n    redLight.position.set(-50, 100, 50);\n    scene.add(redLight);\n    blueLight = new THREE.PointLight(0x0000ff, 2, 500);\n    blueLight.castShadow = true;\n    blueLight.position.set(50, 100, -50);\n    scene.add(blueLight);\n    greenLight = new THREE.PointLight(0x00ff00, 1, 500);\n    greenLight.castShadow = true;\n    greenLight.position.set(50, 100, 50);\n    scene.add(greenLight);\n    //\n    //\n    // HELPERS\n    //\n    //\n    var sphereSize = 4;\n    var redPointLightHelper = new THREE.PointLightHelper(redLight, sphereSize);\n    scene.add(redPointLightHelper);\n    var redLightShadowHelper = new THREE.CameraHelper(redLight.shadow.camera);\n    redLightShadowHelper.material.transparent = true;\n    redLightShadowHelper.material.opacity = 0.25;\n    scene.add(redLightShadowHelper);\n    var bluePointLightHelper = new THREE.PointLightHelper(blueLight, sphereSize);\n    scene.add(bluePointLightHelper);\n    var blueLightShadowHelper = new THREE.CameraHelper(blueLight.shadow.camera);\n    blueLightShadowHelper.material.transparent = true;\n    blueLightShadowHelper.material.opacity = 0.25;\n    scene.add(blueLightShadowHelper);\n    var greenPointLightHelper = new THREE.PointLightHelper(greenLight, sphereSize);\n    scene.add(greenPointLightHelper);\n    var greenLightShadowHelper = new THREE.CameraHelper(greenLight.shadow.camera);\n    greenLightShadowHelper.material.transparent = true;\n    greenLightShadowHelper.material.opacity = 0.25;\n    scene.add(greenLightShadowHelper);\n    //\n    //\n    // RENDERER\n    //\n    //\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    // Enable shadows\n    renderer.shadowMap.enabled = true;\n    // Antialias the shadows\n    renderer.shadowMap.type = THREE.PCFSoftShadowMap;\n    //\n    //\n    // ORBIT CONTROLS\n    //\n    //\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nvar radius = 0.25;\nvar angle = 0;\nfunction update() {\n    box.rotation.x += 0.01;\n    box.rotation.y += 0.01;\n    box.rotation.z += 0.01;\n    if (floor) {\n        angle += 0.01;\n        floor.rotation.x = Math.PI / 2 + radius * Math.cos(angle);\n        floor.rotation.y = radius * Math.sin(angle);\n        floor.rotation.z += 0.01;\n    }\n    controls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/shadows-on-material/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/shadows-on-material/index.js"]();
/******/ 	
/******/ })()
;