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

/***/ "./src/experiments/simple-dark-fog/index.js":
/*!**************************************************!*\
  !*** ./src/experiments/simple-dark-fog/index.js ***!
  \**************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\n// let gridHelper;\n// let geometry;\n// let material;\n// let mesh;\nvar orbitControls;\nvar guiControls;\nvar pointLight;\nvar ambientLight;\nvar fog;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initControls() {\n    guiControls = {\n        fogEnabled: true,\n        fogNear: 1,\n        fogFar: 1000\n    };\n    var gui = new dat.GUI();\n    gui.add(guiControls, \"fogEnabled\");\n    gui.add(guiControls, \"fogNear\", 1, 500);\n    gui.add(guiControls, \"fogFar\", 501, 1500);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    // gridHelper = new THREE.GridHelper(200, 10);\n    // scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(200);\n    scene.add(axisHelper);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(500, 200, 500);\n    camera.lookAt(origin);\n    // geometry = new THREE.BoxGeometry(50, 50, 50);\n    // material = new THREE.MeshLambertMaterial({ color: 0x888888 });\n    // mesh = new THREE.Mesh(geometry, material);\n    // scene.add(mesh);\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 500);\n    pointLight.position.set(200, 200, 200);\n    scene.add(pointLight);\n    var boxSize = 50;\n    var gapSize = 40;\n    var gridSize = 9;\n    var areaSize = boxSize * gridSize + gapSize * (gridSize - 1);\n    var start = -(areaSize / 2) + boxSize / 2;\n    var end = areaSize / 2 + boxSize / 2;\n    for(var x = start; x <= end; x += boxSize + gapSize){\n        for(var z = start; z <= end; z += boxSize + gapSize){\n            var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);\n            var material = new THREE.MeshLambertMaterial({\n                color: 0xffffff\n            });\n            var mesh = new THREE.Mesh(geometry, material);\n            mesh.position.set(x, 0, z);\n            scene.add(mesh);\n        }\n    }\n    // const texture = new THREE.Texture();\n    // const textureLoader = new THREE.ImageLoader();\n    // textureLoader.load('../../assets/textures/misc/uv_grid_sm.jpg', (image) => {\n    //   texture.image = image;\n    //   texture.needsUpdate = true;\n    // });\n    // const loader = new THREE.OBJLoader();\n    // loader.load('../../assets/objects/minecraft-tree.obj', (object) => {\n    //   // object.traverse((child) => {\n    //   //   if (child instanceof THREE.Mesh) {\n    //   //     child.material.map = texture;\n    //   //   }\n    //   // });\n    //   object.position.set(0, 4, 0);\n    //   object.scale.set(0.01, 0.01, 0.01);\n    //   scene.add(object);\n    //   camera.lookAt(object.position);\n    // });\n    fog = new THREE.Fog(0x000000, 1, 2000);\n    scene.fog = fog;\n    renderer = new THREE.WebGLRenderer();\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initControls();\n}\nfunction update() {\n    orbitControls.update();\n    if (guiControls.fogEnabled) {\n        scene.fog = fog;\n        scene.fog.near = guiControls.fogNear;\n        scene.fog.far = guiControls.fogFar;\n    } else {\n        scene.fog = null;\n    }\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/simple-dark-fog/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/simple-dark-fog/index.js"]();
/******/ 	
/******/ })()
;