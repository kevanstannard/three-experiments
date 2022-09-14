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

/***/ "./src/experiments/simple-fog/index.js":
/*!*********************************************!*\
  !*** ./src/experiments/simple-fog/index.js ***!
  \*********************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar guiControls;\nvar pointLight;\nvar fog;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initControls() {\n    guiControls = {\n        fogEnabled: true,\n        fogNear: 1,\n        fogFar: 500\n    };\n    var gui = new dat.GUI();\n    gui.add(guiControls, \"fogEnabled\");\n    gui.add(guiControls, \"fogNear\", 1, 500);\n    gui.add(guiControls, \"fogFar\", 1, 500);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    scene.background = new THREE.Color(0xffffff);\n    gridHelper = new THREE.GridHelper(500, 20);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(500);\n    scene.add(axisHelper);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(100, 100, 100);\n    scene.add(pointLight);\n    var texture = new THREE.Texture();\n    var textureLoader = new THREE.ImageLoader();\n    textureLoader.load(\"../../assets/textures/misc/uv_grid_sm.jpg\", function(image) {\n        texture.image = image;\n        texture.needsUpdate = true;\n    });\n    var numBoxes = 10;\n    var boxSize = 40;\n    var delta = Math.PI * 2 / numBoxes;\n    var lastBox;\n    for(var count = 0; count < 5; count += 1){\n        var radius = (count + 1) * 100;\n        for(var angle = 0; angle < Math.PI * 2; angle += delta){\n            var x = radius * Math.cos(angle);\n            var z = radius * Math.sin(angle);\n            var y = 0;\n            var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);\n            var material = new THREE.MeshLambertMaterial({\n                map: texture\n            });\n            var mesh = new THREE.Mesh(geometry, material);\n            mesh.position.set(x, y, z);\n            mesh.lookAt(origin);\n            scene.add(mesh);\n            lastBox = mesh;\n        }\n    }\n    var cameraHeight = boxSize;\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(0, cameraHeight, 0);\n    camera.lookAt(new THREE.Vector3(lastBox.position.x, cameraHeight, lastBox.position.z));\n    fog = new THREE.Fog(0xffffff, 1, 300);\n    scene.fog = fog;\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initControls();\n}\nfunction update() {\n    camera.rotation.y += 0.001;\n    // orbitControls.update();\n    if (guiControls.fogEnabled) {\n        scene.fog = fog;\n        scene.fog.near = guiControls.fogNear;\n        scene.fog.far = guiControls.fogFar;\n    } else {\n        scene.fog = null;\n    }\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/simple-fog/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/simple-fog/index.js"]();
/******/ 	
/******/ })()
;