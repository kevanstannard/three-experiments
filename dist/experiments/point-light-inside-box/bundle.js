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

/***/ "./src/experiments/point-light-inside-box/index.js":
/*!*********************************************************!*\
  !*** ./src/experiments/point-light-inside-box/index.js ***!
  \*********************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\n// let axisHelper;\n// let gridHelper;\nvar orbitControls;\nvar pointLight;\n// let ambientLight;\n// let mesh;\n// let controls;\nvar stats;\nvar boxWidth;\nvar boxHeight;\nvar boxDepth;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\n// function initControls() {\n//   controls = {\n//     xRotation: 0,\n//     yRotation: 0,\n//     zRotation: 0,\n//   };\n//   const gui = new dat.GUI();\n//   gui.add(controls, 'xRotation', 0, Math.PI * 2);\n//   gui.add(controls, 'yRotation', 0, Math.PI * 2);\n//   gui.add(controls, 'zRotation', 0, Math.PI * 2);\n// }\nfunction init() {\n    scene = new THREE.Scene();\n    // gridHelper = new THREE.GridHelper(100, 10);\n    // scene.add(gridHelper);\n    // axisHelper = new THREE.AxisHelper(10);\n    // scene.add(axisHelper);\n    // const backWallGeometry = new THREE.PlaneBufferGeometry(40, 40);\n    // const backWallMaterial = new THREE.MeshLambertMaterial({\n    //   color: 0xffffff,\n    //   side: THREE.DoubleSide,\n    // });\n    // const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);\n    // backWall.position.set(10, 10, -10);\n    // scene.add(backWall);\n    // const rightWallGeometry = new THREE.PlaneBufferGeometry(40, 40);\n    // const rightWallMaterial = new THREE.MeshLambertMaterial({\n    //   color: 0xffffff,\n    //   side: THREE.DoubleSide,\n    // });\n    // const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);\n    // rightWall.rotation.y = Math.PI / 2;\n    // rightWall.position.set(-10, 10, 10);\n    // scene.add(rightWall);\n    // const bottomWallGeometry = new THREE.PlaneBufferGeometry(40, 40);\n    // const bottomWallMaterial = new THREE.MeshLambertMaterial({\n    //   color: 0xffffff,\n    //   side: THREE.DoubleSide,\n    // });\n    // const bottomWall = new THREE.Mesh(bottomWallGeometry, bottomWallMaterial);\n    // bottomWall.rotation.x = -Math.PI / 2;\n    // bottomWall.position.set(10, -10, 10);\n    // scene.add(bottomWall);\n    // const geometry = new THREE.BoxGeometry(400, 400, 400);\n    // const material = new THREE.MeshLambertMaterial({\n    //   color: 0xffffff,\n    //   // side: THREE.DoubleSide,\n    // });\n    // const room = new THREE.Mesh(geometry, material);\n    // scene.add(room);\n    // ambientLight = new THREE.AmbientLight(0xffffff, 0.1);\n    // scene.add(ambientLight);\n    boxWidth = 400;\n    boxHeight = 200;\n    boxDepth = 400;\n    var geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);\n    var material = new THREE.MeshLambertMaterial({\n        color: 0xffffff,\n        side: THREE.DoubleSide\n    });\n    var mesh = new THREE.Mesh(geometry, material);\n    scene.add(mesh);\n    pointLight = new THREE.PointLight(0xffff00, 2, boxDepth);\n    // pointLight.position.set(0, 180, 0);\n    scene.add(pointLight);\n    // var pointLight = new THREE.PointLight( 0xff0000, 1, 100 );\n    // pointLight.position.set( 10, 10, 10 );\n    // scene.add( pointLight );\n    var sphereSize = 1;\n    var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);\n    scene.add(pointLightHelper);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(0, 0, -boxDepth / 2);\n    // camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    orbitControls.target = origin;\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n// initControls();\n}\nvar angle = 0;\nfunction update() {\n    // mesh.rotation.set(\n    //   mesh.rotation.x = controls.xRotation,\n    //   mesh.rotation.y = controls.yRotation,\n    //   mesh.rotation.z = controls.zRotation,\n    // );\n    angle += 0.01;\n    var x = Math.sin(angle) * boxWidth / 3;\n    var z = Math.sin(angle) * boxDepth / 3;\n    pointLight.position.set(x, 0, z);\n    stats.update();\n    orbitControls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/point-light-inside-box/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/point-light-inside-box/index.js"]();
/******/ 	
/******/ })()
;