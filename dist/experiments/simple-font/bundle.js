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

/***/ "./src/experiments/simple-font/index.js":
/*!**********************************************!*\
  !*** ./src/experiments/simple-font/index.js ***!
  \**********************************************/
/***/ (() => {

eval("// References\n// https://github.com/mrdoob/three.js/tree/master/examples/fonts\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar fonts = {};\nvar origin = new THREE.Vector3(0, 0, 0);\nvar fontLoader = new THREE.FontLoader();\nfunction loadFont(fontId) {\n    return new Promise(function(resolve) {\n        var fontUrl = \"../../modules/fonts/fonts/\".concat(fontId, \".typeface.json\");\n        fontLoader.load(fontUrl, function(font) {\n            fonts[fontId] = font;\n            resolve();\n        });\n    });\n}\nfunction load() {\n    return loadFont(\"helvetiker_regular\");\n}\nfunction init() {\n    scene = new THREE.Scene();\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    var params = {\n        font: fonts.helvetiker_regular,\n        size: 28,\n        height: 20\n    };\n    var textGeometry = new THREE.TextGeometry(\"three\", params);\n    var textMaterial = new THREE.MeshLambertMaterial({\n        color: 0x888888\n    });\n    var text = new THREE.Mesh(textGeometry, textMaterial);\n    scene.add(text);\n    ambientLight = new THREE.AmbientLight(0x888888);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 2, 1000);\n    pointLight.position.set(100, 100, 100);\n    scene.add(pointLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 0, 200);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    controls.update();\n    renderer.render(scene, camera);\n}\nload().then(function() {\n    init();\n    animate();\n});\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/simple-font/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/simple-font/index.js"]();
/******/ 	
/******/ })()
;