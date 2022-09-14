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

/***/ "./src/experiments/point-light-on-cubes/index.js":
/*!*******************************************************!*\
  !*** ./src/experiments/point-light-on-cubes/index.js ***!
  \*******************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\n// let axisHelper;\n// let gridHelper;\nvar orbitControls;\nvar pointLight;\nvar ambientLight;\n// let mesh;\n// let controls;\nvar stats;\nvar boxSize = 50;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\n// function initControls() {\n//   controls = {\n//     xRotation: 0,\n//     yRotation: 0,\n//     zRotation: 0,\n//   };\n//   const gui = new dat.GUI();\n//   gui.add(controls, 'xRotation', 0, Math.PI * 2);\n//   gui.add(controls, 'yRotation', 0, Math.PI * 2);\n//   gui.add(controls, 'zRotation', 0, Math.PI * 2);\n// }\nfunction init() {\n    scene = new THREE.Scene();\n    // gridHelper = new THREE.GridHelper(100, 10);\n    // scene.add(gridHelper);\n    // axisHelper = new THREE.AxisHelper(50);\n    // scene.add(axisHelper);\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.05);\n    scene.add(ambientLight);\n    for(var x = 0; x <= 2; x += 1){\n        var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);\n        var material = new THREE.MeshStandardMaterial({\n            color: 0xffffff,\n            // side: THREE.BackSide,\n            metalness: 0,\n            roughness: 1\n        });\n        var mesh = new THREE.Mesh(geometry, material);\n        mesh.position.x = (x - 1) * boxSize;\n        scene.add(mesh);\n    }\n    // for (let z = 0; z <= 2; z += 1) {\n    //   const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);\n    //   const material = new THREE.MeshStandardMaterial({\n    //     color: 0xffffff,\n    //     // side: THREE.BackSide,\n    //     metalness: 0,\n    //     roughness: 1,\n    //   });\n    //   const mesh = new THREE.Mesh(geometry, material);\n    //   mesh.position.x = -boxSize * 2;\n    //   mesh.position.z = boxSize + (z - 1) * boxSize;\n    //   scene.add(mesh);\n    // }\n    pointLight = new THREE.PointLight(0xffff00, 1, boxSize * 2);\n    pointLight.position.set(0, 0, boxSize);\n    scene.add(pointLight);\n    var sphereSize = 1;\n    var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);\n    scene.add(pointLightHelper);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(0, boxSize * 2, boxSize * 4);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    orbitControls.target = origin;\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n}\nvar angle = 0;\nfunction update() {\n    angle += 0.01;\n    pointLight.position.x = Math.sin(angle) * boxSize;\n    stats.update();\n    orbitControls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/point-light-on-cubes/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/point-light-on-cubes/index.js"]();
/******/ 	
/******/ })()
;