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

/***/ "./src/experiments/interactive-cubes/index.js":
/*!****************************************************!*\
  !*** ./src/experiments/interactive-cubes/index.js ***!
  \****************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar primaryLight;\nvar stats;\nvar raycaster;\nvar currentObject;\nvar mouse = new THREE.Vector2();\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction onDocumentMouseMove(event) {\n    event.preventDefault();\n    mouse.x = event.clientX / window.innerWidth * 2 - 1;\n    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;\n}\nfunction onDocumentClick() {\n    if (currentObject) {\n        currentObject.animate = {\n            radius: 40,\n            angle: 0\n        };\n    }\n}\nfunction init() {\n    scene = new THREE.Scene();\n    var cubeSize = 40;\n    for(var x = 0; x < 3; x += 1){\n        for(var y = 0; y < 3; y += 1){\n            var geometry = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);\n            var material = new THREE.MeshLambertMaterial({\n                color: 0xff0000\n            });\n            var mesh = new THREE.Mesh(geometry, material);\n            mesh.position.set((x - 1) * 60, (y - 1) * 60, 0);\n            scene.add(mesh);\n        }\n    }\n    primaryLight = new THREE.DirectionalLight(0xffffff);\n    primaryLight.position.set(500, 200, 100);\n    scene.add(primaryLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    raycaster = new THREE.Raycaster();\n    THREEx.WindowResize(renderer, camera);\n    document.addEventListener(\"mousemove\", onDocumentMouseMove, false);\n    document.addEventListener(\"click\", onDocumentClick, false);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n}\nfunction update() {\n    raycaster.setFromCamera(mouse, camera);\n    var intersects = raycaster.intersectObjects(scene.children);\n    if (intersects.length > 0) {\n        if (currentObject !== intersects[0].object) {\n            if (currentObject) {\n                currentObject.material.emissive.setHex(currentObject.currentHex);\n            }\n            currentObject = intersects[0].object;\n            currentObject.currentHex = currentObject.material.emissive.getHex();\n            currentObject.material.emissive.setHex(0x444444);\n        }\n    } else {\n        if (currentObject) {\n            currentObject.material.emissive.setHex(currentObject.currentHex);\n        }\n        currentObject = null;\n    }\n    scene.children.forEach(function(object) {\n        if (object.animate) {\n            object.position.z = Math.sin(object.animate.angle) * object.animate.radius;\n            object.animate.radius -= 0.05;\n            object.animate.angle += 0.1;\n            if (object.animate.radius < 0) {\n                object.animate = null;\n            }\n        }\n    });\n    stats.update();\n    orbitControls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/interactive-cubes/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/interactive-cubes/index.js"]();
/******/ 	
/******/ })()
;