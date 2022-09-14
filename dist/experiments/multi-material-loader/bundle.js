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

/***/ "./src/experiments/multi-material-loader/index.js":
/*!********************************************************!*\
  !*** ./src/experiments/multi-material-loader/index.js ***!
  \********************************************************/
/***/ (() => {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar orbitControls;\nvar pointLight;\nvar ambientLight;\nvar stats;\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction loadTextures(urls, callback) {\n    var textures = [];\n    var onLoad = function() {\n        callback(null, textures);\n    };\n    var onProgress = function() {};\n    var onError = function(url) {\n        callback(new Error(\"Cannot load\".concat(url)));\n    };\n    var manager = new THREE.LoadingManager(onLoad, onProgress, onError);\n    var loader = new THREE.TextureLoader(manager);\n    for(var i = 0; i < urls.length; i += 1){\n        textures.push(loader.load(urls[i]));\n    }\n}\nfunction init() {\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(5, 5, 5);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 200, -100);\n    scene.add(pointLight);\n    var urls = [\n        \"../../assets/textures/misc/free.jpg\",\n        \"../../assets/textures/misc/uv_grid_sm.jpg\", \n    ];\n    loadTextures(urls, function(error, textures) {\n        if (error) {\n            console.log(error);\n            return;\n        }\n        var geometry = new THREE.BoxGeometry(3, 3, 3);\n        geometry.faces.forEach(function(face) {\n            face.materialIndex %= 2;\n        });\n        var mat1 = new THREE.MeshLambertMaterial({\n            map: textures[0]\n        });\n        var mat2 = new THREE.MeshLambertMaterial({\n            map: textures[1]\n        });\n        var materials = [\n            mat1,\n            mat2\n        ];\n        var mats = new THREE.MultiMaterial(materials);\n        var cube = new THREE.Mesh(geometry, mats);\n        scene.add(cube);\n    });\n}\nfunction update() {\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/multi-material-loader/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/multi-material-loader/index.js"]();
/******/ 	
/******/ })()
;