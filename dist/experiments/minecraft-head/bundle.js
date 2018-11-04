/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/minecraft-head/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/minecraft-head/MinecraftHeadGeometry.js":
/*!*****************************************************************!*\
  !*** ./src/experiments/minecraft-head/MinecraftHeadGeometry.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MinecraftHeadGeometry; });\n// UV Mapping\n//\n// UV mapping is the process of taking an image and assigning parts of that\n// image to individual faces of our 3D object.\n//\n// UV vectors are used to specify parts of a texture that may be applied\n// to faces in a geometry.\n//\n// UV coordinates of an image look like this:\n//\n//\n//   (0,1)     (1,1)\n//     +---------+\n//     |         |\n//   v |         |\n//     |         |\n//     +---------+\n//   (0,0)  u  (1,0)\n//\n//\n// Suppose our texture had 4 sub-images:\n//\n//\n//   (0,1)        (1,1)\n//     +------+-----+\n//     |   A  |  B  |\n//     |      |     |\n//   v +------+-----+\n//     |   C  |  D  |\n//     |      |     |\n//     +------+-----+\n//   (0,0)    u   (1,0)\n//\n//\n// The corners of the \"A\" image would be:\n//   Top Left:     (0, 1)\n//   Bottom Left:  (0, 0.5)\n//   Bottom Right: (0.5, 0.5)\n//   Top Right:    (0.5, 0)\n//\n// Default width and height of a Minecraft skin\nvar SKIN_WIDTH = 64;\nvar SKIN_HEIGHT = 64;\n\nfunction faceVectors(x, y, w, h) {\n  // Convert skin coordinates that have (0, 0) in the top left corner\n  // into a UV orientation that has (0, 0) in the bottom left corner.\n  var uvPix = {\n    x: x,\n    y: SKIN_HEIGHT - y,\n    w: w,\n    h: h\n  }; // Convert from pixel coordinates (e.g. 0 to 64)\n  // into to UV coordinates (e.g. from 0 to 1)\n\n  var uv = {\n    x: uvPix.x / SKIN_WIDTH,\n    y: uvPix.y / SKIN_HEIGHT,\n    w: uvPix.w / SKIN_WIDTH,\n    h: uvPix.h / SKIN_HEIGHT\n  }; // Convert to points\n\n  var points = {\n    p1: {\n      x: uv.x,\n      y: uv.y\n    },\n    // Top left\n    p2: {\n      x: uv.x,\n      y: uv.y - uv.h\n    },\n    // Bottom left\n    p3: {\n      x: uv.x + uv.w,\n      y: uv.y - uv.h\n    },\n    // Bottom right\n    p4: {\n      x: uv.x + uv.w,\n      y: uv.y\n    } // Top right\n\n  }; // Create vectors\n\n  var vectors = [new THREE.Vector2(points.p1.x, points.p1.y), new THREE.Vector2(points.p2.x, points.p2.y), new THREE.Vector2(points.p3.x, points.p3.y), new THREE.Vector2(points.p4.x, points.p4.y)];\n  return vectors;\n}\n\nfunction MinecraftHeadGeometry(size) {\n  var head = {\n    front: faceVectors(8, 8, 8, 8),\n    right: faceVectors(0, 8, 8, 8),\n    left: faceVectors(16, 8, 8, 8),\n    back: faceVectors(24, 8, 8, 8),\n    top: faceVectors(8, 0, 8, 8),\n    bottom: faceVectors(16, 0, 8, 8)\n  };\n  var geometry = new THREE.CubeGeometry(size, size, size); // Clear out any UV mapping that may have already existed on the cube\n\n  geometry.faceVertexUvs[0] = [];\n  geometry.faceVertexUvs[0][0] = [head.left[0], head.left[1], head.left[3]];\n  geometry.faceVertexUvs[0][1] = [head.left[1], head.left[2], head.left[3]];\n  geometry.faceVertexUvs[0][2] = [head.right[0], head.right[1], head.right[3]];\n  geometry.faceVertexUvs[0][3] = [head.right[1], head.right[2], head.right[3]];\n  geometry.faceVertexUvs[0][4] = [head.top[0], head.top[1], head.top[3]];\n  geometry.faceVertexUvs[0][5] = [head.top[1], head.top[2], head.top[3]];\n  geometry.faceVertexUvs[0][6] = [head.bottom[0], head.bottom[1], head.bottom[3]];\n  geometry.faceVertexUvs[0][7] = [head.bottom[1], head.bottom[2], head.bottom[3]];\n  geometry.faceVertexUvs[0][8] = [head.front[0], head.front[1], head.front[3]];\n  geometry.faceVertexUvs[0][9] = [head.front[1], head.front[2], head.front[3]];\n  geometry.faceVertexUvs[0][10] = [head.back[0], head.back[1], head.back[3]];\n  geometry.faceVertexUvs[0][11] = [head.back[1], head.back[2], head.back[3]];\n  return geometry;\n}\n\n//# sourceURL=webpack:///./src/experiments/minecraft-head/MinecraftHeadGeometry.js?");

/***/ }),

/***/ "./src/experiments/minecraft-head/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/minecraft-head/index.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MinecraftHeadGeometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MinecraftHeadGeometry */ \"./src/experiments/minecraft-head/MinecraftHeadGeometry.js\");\n// Ref:\n// https://solutiondesign.com/blog/-/blogs/webgl-and-three-js-texture-mappi-1\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar steve;\nvar alex;\nvar textureLoader = new THREE.TextureLoader();\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction init() {\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  var headGeometry = new _MinecraftHeadGeometry__WEBPACK_IMPORTED_MODULE_0__[\"default\"](10); // Pixellated texture\n\n  var steveTexture = textureLoader.load('../../assets/textures/minecraft/skins/steve.png');\n  steveTexture.magFilter = THREE.NearestFilter;\n  steveTexture.minFilter = THREE.LinearMipMapLinearFilter;\n  var steveMaterial = new THREE.MeshLambertMaterial({\n    map: steveTexture,\n    side: THREE.DoubleSide\n  });\n  steve = new THREE.Mesh(headGeometry, steveMaterial);\n  steve.position.set(-10, 5, 0);\n  scene.add(steve); // Pixellated texture\n\n  var alexTexture = textureLoader.load('../../assets/textures/minecraft/skins/alex.png');\n  alexTexture.magFilter = THREE.NearestFilter;\n  alexTexture.minFilter = THREE.LinearMipMapLinearFilter;\n  var alexMaterial = new THREE.MeshLambertMaterial({\n    map: alexTexture,\n    side: THREE.DoubleSide\n  });\n  alex = new THREE.Mesh(headGeometry, alexMaterial);\n  alex.position.set(10, 5, 0);\n  scene.add(alex);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(0, 20, 40);\n  camera.lookAt(origin);\n  ambientLight = new THREE.AmbientLight(0x444444);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 50, 50);\n  scene.add(pointLight);\n  renderer = new THREE.WebGLRenderer();\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction update() {\n  steve.rotation.y += 0.01;\n  alex.rotation.y -= 0.01;\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/minecraft-head/index.js?");

/***/ })

/******/ });