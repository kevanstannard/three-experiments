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

/***/ "./src/experiments/scene-image-background/index.js":
/*!*********************************************************!*\
  !*** ./src/experiments/scene-image-background/index.js ***!
  \*********************************************************/
/***/ (() => {

eval("// Textures:\n// http://www.humus.name/index.php?page=Textures\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar orbitControls;\nvar pointLight;\nvar ambientLight;\nvar mesh;\nvar controls;\nvar stats;\nvar skyboxes = {};\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction initControls() {\n    controls = {\n        skybox: \"langholmen\"\n    };\n    var gui = new dat.GUI();\n    gui.add(controls, \"skybox\", [\n        \"sky\",\n        \"langholmen\"\n    ]);\n}\nfunction skyboxUrl(id, type) {\n    return \"../../assets/textures/skybox/\".concat(id, \"/\").concat(type, \".jpg\");\n}\nfunction skyboxUrls(id) {\n    return [\n        skyboxUrl(id, \"posx\"),\n        skyboxUrl(id, \"negx\"),\n        skyboxUrl(id, \"posy\"),\n        skyboxUrl(id, \"negy\"),\n        skyboxUrl(id, \"posz\"),\n        skyboxUrl(id, \"negz\"), \n    ];\n}\nfunction skybox(id) {\n    var urls = skyboxUrls(id);\n    var box = new THREE.CubeTextureLoader().load(urls);\n    box.format = THREE.RGBFormat;\n    return box;\n}\nfunction init() {\n    skyboxes.sky = skybox(\"sky\");\n    skyboxes.langholmen = skybox(\"langholmen\");\n    scene = new THREE.Scene();\n    scene.background = skyboxes.langholmen;\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    var geometry = new THREE.BoxGeometry(50, 50, 50);\n    var material = new THREE.MeshLambertMaterial({\n        color: 0xff0000\n    });\n    mesh = new THREE.Mesh(geometry, material);\n    scene.add(mesh);\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 200, -100);\n    scene.add(pointLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    initControls();\n}\nfunction update() {\n    mesh.rotation.x += 0.01;\n    mesh.rotation.y += 0.01;\n    mesh.rotation.z += 0.01;\n    scene.background = skyboxes[controls.skybox];\n    stats.update();\n    orbitControls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/scene-image-background/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/scene-image-background/index.js"]();
/******/ 	
/******/ })()
;