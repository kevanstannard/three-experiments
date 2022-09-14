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

/***/ "./src/experiments/skeleton-helper/index.js":
/*!**************************************************!*\
  !*** ./src/experiments/skeleton-helper/index.js ***!
  \**************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbit;\nvar stats;\nvar lights;\nvar helper;\nvar bones;\n// let skeleton;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(20, 30, 40);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbit = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    // const gridHelper = new THREE.GridHelper(40, 10);\n    // scene.add(gridHelper);\n    // const axisHelper = new THREE.AxisHelper(2);\n    // scene.add(axisHelper);\n    lights = [];\n    lights[0] = new THREE.PointLight(0xffffff, 1);\n    lights[1] = new THREE.PointLight(0xffffff, 1);\n    // lights[2] = new THREE.PointLight(0xffffff, 1);\n    lights[0].position.set(200, 300, 400);\n    lights[1].position.set(-200, -300, -400);\n    // lights[2].position.set(-400, -500, 500);\n    scene.add(lights[0]);\n    scene.add(lights[1]);\n    // scene.add(lights[2]);\n    var bodyBone = new THREE.Bone();\n    var headBone = new THREE.Bone();\n    var leftShoulderBone = new THREE.Bone();\n    var leftHandBone = new THREE.Bone();\n    var rightShoulderBone = new THREE.Bone();\n    var rightHandBone = new THREE.Bone();\n    var leftHipBone = new THREE.Bone();\n    var leftFootBone = new THREE.Bone();\n    var rightHipBone = new THREE.Bone();\n    var rightFootBone = new THREE.Bone();\n    bodyBone.position.set(0, 0, 0);\n    headBone.position.set(0, 10, 0);\n    leftShoulderBone.position.set(6, 6, 0);\n    leftHandBone.position.set(0, -6, 0);\n    rightShoulderBone.position.set(-6, 6, 0);\n    rightHandBone.position.set(0, -6, 0);\n    leftHipBone.position.set(2, -6, 0);\n    leftFootBone.position.set(0, -6, 0);\n    rightHipBone.position.set(-2, -6, 0);\n    rightFootBone.position.set(0, -6, 0);\n    bodyBone.add(headBone);\n    bodyBone.add(leftShoulderBone);\n    leftShoulderBone.add(leftHandBone);\n    bodyBone.add(rightShoulderBone);\n    rightShoulderBone.add(rightHandBone);\n    bodyBone.add(leftHipBone);\n    leftHipBone.add(leftFootBone);\n    bodyBone.add(rightHipBone);\n    rightHipBone.add(rightFootBone);\n    bones = [];\n    bones.push(bodyBone);\n    bones.push(headBone);\n    bones.push(leftShoulderBone);\n    bones.push(leftHandBone);\n    bones.push(rightShoulderBone);\n    bones.push(rightHandBone);\n    bones.push(leftHipBone);\n    bones.push(leftFootBone);\n    bones.push(rightHipBone);\n    bones.push(rightFootBone);\n    // Interesting, we don't actually need a skeleton ???\n    // skeleton = new THREE.Skeleton(bones);\n    helper = new THREE.SkeletonHelper(bodyBone);\n    scene.add(helper);\n    scene.add(bodyBone);\n}\nfunction update() {\n    var time = Date.now() * 0.001;\n    var angle = Math.sin(time);\n    bones[1].rotation.y = Math.PI * angle / 8; // Head\n    bones[2].rotation.x = Math.PI * angle / 4; // Left shoulder\n    bones[4].rotation.x = -(Math.PI * angle) / 4; // Right shoulder\n    bones[6].rotation.x = -(Math.PI * angle) / 4; // Left hip\n    bones[8].rotation.x = Math.PI * angle / 4; // Right hip\n    helper.update();\n    stats.update();\n    orbit.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/skeleton-helper/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/skeleton-helper/index.js"]();
/******/ 	
/******/ })()
;