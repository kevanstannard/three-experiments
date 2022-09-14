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

/***/ "./src/experiments/multiple-cameras/index.js":
/*!***************************************************!*\
  !*** ./src/experiments/multiple-cameras/index.js ***!
  \***************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / 2 / SCREEN_HEIGHT;\nvar scene;\nvar camera1;\nvar camera2;\nvar renderer1;\nvar renderer2;\nvar axisHelper;\nvar gridHelper;\nvar orbitControls1;\nvar orbitControls2;\nvar pointLight;\nvar ambientLight;\nvar mesh;\nvar controls;\nvar stats;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction initControls() {\n    controls = {\n        xRotation: 0,\n        yRotation: 0,\n        zRotation: 0\n    };\n    var gui = new dat.GUI();\n    gui.add(controls, \"xRotation\", 0, Math.PI * 2);\n    gui.add(controls, \"yRotation\", 0, Math.PI * 2);\n    gui.add(controls, \"zRotation\", 0, Math.PI * 2);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    var geometry = new THREE.BoxGeometry(50, 50, 50);\n    var material = new THREE.MeshLambertMaterial({\n        color: 0xff0000\n    });\n    mesh = new THREE.Mesh(geometry, material);\n    scene.add(mesh);\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.25);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffff00, 2, 100);\n    scene.add(pointLight);\n    var pointLightHelper = new THREE.PointLightHelper(pointLight, 20);\n    scene.add(pointLightHelper);\n    camera1 = new THREE.PerspectiveCamera(30, ASPECT, 1, 1000);\n    camera1.position.set(200, 200, 200);\n    camera1.lookAt(origin);\n    var cameraHelper = new THREE.CameraHelper(camera1);\n    scene.add(cameraHelper);\n    camera2 = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, 1, 5000);\n    camera2.position.set(2000, 400, 200);\n    camera2.lookAt(origin);\n    renderer1 = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer1.setSize(SCREEN_WIDTH / 2, SCREEN_HEIGHT);\n    renderer2 = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer2.setSize(SCREEN_WIDTH / 2, SCREEN_HEIGHT);\n    orbitControls1 = new THREE.OrbitControls(camera1, renderer1.domElement);\n    orbitControls2 = new THREE.OrbitControls(camera2, renderer2.domElement);\n    THREEx.WindowResize(renderer1, camera1);\n    THREEx.WindowResize(renderer2, camera2);\n    var container1 = document.createElement(\"div\");\n    var container2 = document.createElement(\"div\");\n    container1.style.position = \"absolute\";\n    container1.style.top = \"0px\";\n    container1.style.bottom = \"0px\";\n    container1.style.left = \"0px\";\n    container1.style.right = \"\".concat(SCREEN_WIDTH / 2 - 1, \"px\");\n    container2.style.position = \"absolute\";\n    container2.style.top = \"0px\";\n    container2.style.bottom = \"0px\";\n    container2.style.left = \"\".concat(SCREEN_WIDTH / 2, \"px\");\n    container2.style.right = \"0px\";\n    document.body.appendChild(container1);\n    document.body.appendChild(container2);\n    container1.appendChild(renderer1.domElement);\n    container2.appendChild(renderer2.domElement);\n    initStats();\n    initControls();\n}\nfunction update() {\n    var t = new Date().getTime() / 1000;\n    pointLight.position.x = 100 * Math.sin(t);\n    pointLight.position.z = 100 * Math.cos(t);\n    mesh.rotation.set(mesh.rotation.x = controls.xRotation, mesh.rotation.y = controls.yRotation, mesh.rotation.z = controls.zRotation);\n    stats.update();\n    orbitControls1.update();\n    orbitControls2.update();\n}\nfunction render() {\n    renderer1.render(scene, camera1);\n    renderer2.render(scene, camera2);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/multiple-cameras/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/multiple-cameras/index.js"]();
/******/ 	
/******/ })()
;