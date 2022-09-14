/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/experiments/minecraft-head/MinecraftHeadGeometry.js":
/*!*****************************************************************!*\
  !*** ./src/experiments/minecraft-head/MinecraftHeadGeometry.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MinecraftHeadGeometry)\n/* harmony export */ });\n// UV Mapping\n//\n// UV mapping is the process of taking an image and assigning parts of that\n// image to individual faces of our 3D object.\n//\n// UV vectors are used to specify parts of a texture that may be applied\n// to faces in a geometry.\n//\n// UV coordinates of an image look like this:\n//\n//\n//   (0,1)     (1,1)\n//     +---------+\n//     |         |\n//   v |         |\n//     |         |\n//     +---------+\n//   (0,0)  u  (1,0)\n//\n//\n// Suppose our texture had 4 sub-images:\n//\n//\n//   (0,1)        (1,1)\n//     +------+-----+\n//     |   A  |  B  |\n//     |      |     |\n//   v +------+-----+\n//     |   C  |  D  |\n//     |      |     |\n//     +------+-----+\n//   (0,0)    u   (1,0)\n//\n//\n// The corners of the \"A\" image would be:\n//   Top Left:     (0, 1)\n//   Bottom Left:  (0, 0.5)\n//   Bottom Right: (0.5, 0.5)\n//   Top Right:    (0.5, 0)\n//\n// Default width and height of a Minecraft skin\nvar SKIN_WIDTH = 64;\nvar SKIN_HEIGHT = 64;\nfunction faceVectors(x, y, w, h) {\n    // Convert skin coordinates that have (0, 0) in the top left corner\n    // into a UV orientation that has (0, 0) in the bottom left corner.\n    var uvPix = {\n        x: x,\n        y: SKIN_HEIGHT - y,\n        w: w,\n        h: h\n    };\n    // Convert from pixel coordinates (e.g. 0 to 64)\n    // into to UV coordinates (e.g. from 0 to 1)\n    var uv = {\n        x: uvPix.x / SKIN_WIDTH,\n        y: uvPix.y / SKIN_HEIGHT,\n        w: uvPix.w / SKIN_WIDTH,\n        h: uvPix.h / SKIN_HEIGHT\n    };\n    // Convert to points\n    var points = {\n        p1: {\n            x: uv.x,\n            y: uv.y\n        },\n        p2: {\n            x: uv.x,\n            y: uv.y - uv.h\n        },\n        p3: {\n            x: uv.x + uv.w,\n            y: uv.y - uv.h\n        },\n        p4: {\n            x: uv.x + uv.w,\n            y: uv.y\n        }\n    };\n    // Create vectors\n    var vectors = [\n        new THREE.Vector2(points.p1.x, points.p1.y),\n        new THREE.Vector2(points.p2.x, points.p2.y),\n        new THREE.Vector2(points.p3.x, points.p3.y),\n        new THREE.Vector2(points.p4.x, points.p4.y), \n    ];\n    return vectors;\n}\nfunction MinecraftHeadGeometry(size) {\n    var head = {\n        front: faceVectors(8, 8, 8, 8),\n        right: faceVectors(0, 8, 8, 8),\n        left: faceVectors(16, 8, 8, 8),\n        back: faceVectors(24, 8, 8, 8),\n        top: faceVectors(8, 0, 8, 8),\n        bottom: faceVectors(16, 0, 8, 8)\n    };\n    var geometry = new THREE.CubeGeometry(size, size, size);\n    // Clear out any UV mapping that may have already existed on the cube\n    geometry.faceVertexUvs[0] = [];\n    geometry.faceVertexUvs[0][0] = [\n        head.left[0],\n        head.left[1],\n        head.left[3]\n    ];\n    geometry.faceVertexUvs[0][1] = [\n        head.left[1],\n        head.left[2],\n        head.left[3]\n    ];\n    geometry.faceVertexUvs[0][2] = [\n        head.right[0],\n        head.right[1],\n        head.right[3]\n    ];\n    geometry.faceVertexUvs[0][3] = [\n        head.right[1],\n        head.right[2],\n        head.right[3]\n    ];\n    geometry.faceVertexUvs[0][4] = [\n        head.top[0],\n        head.top[1],\n        head.top[3]\n    ];\n    geometry.faceVertexUvs[0][5] = [\n        head.top[1],\n        head.top[2],\n        head.top[3]\n    ];\n    geometry.faceVertexUvs[0][6] = [\n        head.bottom[0],\n        head.bottom[1],\n        head.bottom[3]\n    ];\n    geometry.faceVertexUvs[0][7] = [\n        head.bottom[1],\n        head.bottom[2],\n        head.bottom[3]\n    ];\n    geometry.faceVertexUvs[0][8] = [\n        head.front[0],\n        head.front[1],\n        head.front[3]\n    ];\n    geometry.faceVertexUvs[0][9] = [\n        head.front[1],\n        head.front[2],\n        head.front[3]\n    ];\n    geometry.faceVertexUvs[0][10] = [\n        head.back[0],\n        head.back[1],\n        head.back[3]\n    ];\n    geometry.faceVertexUvs[0][11] = [\n        head.back[1],\n        head.back[2],\n        head.back[3]\n    ];\n    return geometry;\n};\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/minecraft-head/MinecraftHeadGeometry.js?");

/***/ }),

/***/ "./src/experiments/minecraft-head/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/minecraft-head/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MinecraftHeadGeometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MinecraftHeadGeometry */ \"./src/experiments/minecraft-head/MinecraftHeadGeometry.js\");\n// Ref:\n// https://solutiondesign.com/blog/-/blogs/webgl-and-three-js-texture-mappi-1\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar steve;\nvar alex;\nvar textureLoader = new THREE.TextureLoader();\nvar origin = new THREE.Vector3(0, 0, 0);\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    var headGeometry = new _MinecraftHeadGeometry__WEBPACK_IMPORTED_MODULE_0__[\"default\"](10);\n    // Pixellated texture\n    var steveTexture = textureLoader.load(\"../../assets/textures/minecraft/skins/steve.png\");\n    steveTexture.magFilter = THREE.NearestFilter;\n    steveTexture.minFilter = THREE.LinearMipMapLinearFilter;\n    var steveMaterial = new THREE.MeshLambertMaterial({\n        map: steveTexture,\n        side: THREE.DoubleSide\n    });\n    steve = new THREE.Mesh(headGeometry, steveMaterial);\n    steve.position.set(-10, 5, 0);\n    scene.add(steve);\n    // Pixellated texture\n    var alexTexture = textureLoader.load(\"../../assets/textures/minecraft/skins/alex.png\");\n    alexTexture.magFilter = THREE.NearestFilter;\n    alexTexture.minFilter = THREE.LinearMipMapLinearFilter;\n    var alexMaterial = new THREE.MeshLambertMaterial({\n        map: alexTexture,\n        side: THREE.DoubleSide\n    });\n    alex = new THREE.Mesh(headGeometry, alexMaterial);\n    alex.position.set(10, 5, 0);\n    scene.add(alex);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(0, 20, 40);\n    camera.lookAt(origin);\n    ambientLight = new THREE.AmbientLight(0x444444);\n    scene.add(ambientLight);\n    pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n    pointLight.position.set(50, 50, 50);\n    scene.add(pointLight);\n    renderer = new THREE.WebGLRenderer();\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction update() {\n    steve.rotation.y += 0.01;\n    alex.rotation.y -= 0.01;\n    controls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/minecraft-head/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/experiments/minecraft-head/index.js");
/******/ 	
/******/ })()
;