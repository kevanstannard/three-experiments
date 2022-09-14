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

/***/ "./src/experiments/standard-material-point-light/index.js":
/*!****************************************************************!*\
  !*** ./src/experiments/standard-material-point-light/index.js ***!
  \****************************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\n// let axisHelper;\n// let gridHelper;\nvar orbitControls;\nvar pointLight;\nvar pointLightHelper;\nvar ambientLight;\nvar material;\nvar geometry;\nvar mesh;\nvar controls;\nvar stats;\nvar bumpTexture;\nvar textureLoader = new THREE.TextureLoader();\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction initControls() {\n    controls = {\n        metalness: 0,\n        roughness: 0,\n        distance: 10,\n        bumpMap: false\n    };\n    var gui = new dat.GUI();\n    gui.add(controls, \"metalness\", 0, 1);\n    gui.add(controls, \"roughness\", 0, 1);\n    gui.add(controls, \"distance\", 10, 50);\n    gui.add(controls, \"bumpMap\");\n}\nfunction init() {\n    scene = new THREE.Scene();\n    // gridHelper = new THREE.GridHelper(100, 10);\n    // scene.add(gridHelper);\n    // axisHelper = new THREE.AxisHelper(100);\n    // scene.add(axisHelper);\n    geometry = new THREE.BoxGeometry(100, 10, 100);\n    material = new THREE.MeshStandardMaterial({\n        color: 0xffffff\n    });\n    mesh = new THREE.Mesh(geometry, material);\n    scene.add(mesh);\n    textureLoader.load(\"../../assets/textures/bump/stone-001-500x500.jpg\", function(texture) {\n        bumpTexture = texture;\n    });\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.03);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 200);\n    scene.add(pointLight);\n    pointLightHelper = new THREE.PointLightHelper(pointLight, 1);\n    scene.add(pointLightHelper);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(100, 100, 100);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    initControls();\n}\nfunction update() {\n    var t = new Date().getTime() / 1000;\n    var x = Math.sin(t) * controls.distance;\n    var y = controls.distance;\n    var z = Math.cos(t) * controls.distance;\n    pointLight.position.x = x;\n    pointLight.position.y = y;\n    pointLight.position.z = z;\n    material.metalness = controls.metalness;\n    material.roughness = controls.roughness;\n    if (controls.bumpMap && !material.bumpMap) {\n        material.bumpMap = bumpTexture;\n        material.needsUpdate = true;\n    } else if (!controls.bumpMap && material.bumpMap) {\n        material.bumpMap = null;\n        material.needsUpdate = true;\n    }\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/standard-material-point-light/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/standard-material-point-light/index.js"]();
/******/ 	
/******/ })()
;