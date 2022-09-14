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

/***/ "./src/experiments/skeleton-torso/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/skeleton-torso/index.js ***!
  \*************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbit;\nvar stats;\nvar lights;\nvar helper;\nvar mesh;\nvar bones;\nvar boneIndexes;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(10, 10, 20);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbit = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    // const gridHelper = new THREE.GridHelper(40, 10);\n    // scene.add(gridHelper);\n    var axisHelper = new THREE.AxisHelper(2);\n    scene.add(axisHelper);\n    lights = [];\n    lights[0] = new THREE.PointLight(0xffffff, 1);\n    lights[1] = new THREE.PointLight(0xffffff, 1);\n    // lights[2] = new THREE.PointLight(0xffffff, 1);\n    lights[0].position.set(200, 300, 400);\n    lights[1].position.set(-200, -300, -400);\n    // lights[2].position.set(-400, 500, 500);\n    scene.add(lights[0]);\n    scene.add(lights[1]);\n    // scene.add(lights[2]);\n    var bodyBone = new THREE.Bone();\n    var chestBone = new THREE.Bone();\n    var hipBone = new THREE.Bone();\n    bodyBone.add(chestBone);\n    bodyBone.add(hipBone);\n    chestBone.position.set(0, 4, 0);\n    hipBone.position.set(0, -4, 0);\n    bones = [];\n    bones.push(bodyBone);\n    bones.push(chestBone);\n    bones.push(hipBone);\n    boneIndexes = {\n        BODY_BONE: 0,\n        CHEST_BONE: 1,\n        HIP_BONE: 2\n    };\n    var skeleton = new THREE.Skeleton(bones);\n    var params = {\n        width: 8,\n        height: 12,\n        depth: 4,\n        widthSegments: 1,\n        heightSegments: 1,\n        depthSegments: 1\n    };\n    var geometry = new THREE.BoxGeometry(params.width, params.height, params.depth, params.widthSegments, params.heightSegments, params.depthSegments);\n    var shoulderPos = params.height / 2;\n    var waistPos = -params.height / 2;\n    geometry.vertices.forEach(function(vertex) {\n        if (vertex.y === shoulderPos) {\n            geometry.skinIndices.push(new THREE.Vector4(boneIndexes.CHEST_BONE, 0, 0, 0));\n            geometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));\n        } else if (vertex.y === waistPos) {\n            geometry.skinIndices.push(new THREE.Vector4(boneIndexes.HIP_BONE, 0, 0, 0));\n            geometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));\n        } else {\n            geometry.skinIndices.push(new THREE.Vector4(boneIndexes.CHEST_BONE, boneIndexes.HIP_BONE, 0, 0));\n            geometry.skinWeights.push(new THREE.Vector4(0.5, 0.5, 0, 0));\n        }\n    });\n    var material = new THREE.MeshStandardMaterial({\n        skinning: true,\n        // wireframe: true,\n        color: 0x0088ff,\n        metalness: 0,\n        roughness: 1\n    });\n    mesh = new THREE.SkinnedMesh(geometry, material);\n    mesh.add(bodyBone);\n    mesh.bind(skeleton);\n    scene.add(mesh);\n    helper = new THREE.SkeletonHelper(mesh);\n    scene.add(helper);\n}\nfunction update() {\n    var time = Date.now() * 0.001;\n    var angle = Math.sin(time);\n    var skeletonBones = mesh.skeleton.bones;\n    skeletonBones[boneIndexes.CHEST_BONE].rotation.y = Math.PI * angle / 8;\n    skeletonBones[boneIndexes.HIP_BONE].rotation.y = -(Math.PI * angle) / 8;\n    helper.update();\n    stats.update();\n    orbit.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/skeleton-torso/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/skeleton-torso/index.js"]();
/******/ 	
/******/ })()
;