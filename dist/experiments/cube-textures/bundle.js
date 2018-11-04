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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/cube-textures/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/cube-textures/index.js":
/*!************************************************!*\
  !*** ./src/experiments/cube-textures/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Ref:\n// https://solutiondesign.com/blog/-/blogs/webgl-and-three-js-texture-mappi-1\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar mesh;\nvar origin = new THREE.Vector3(0, 0, 0);\nvar SKIN_WIDTH = 64;\nvar SKIN_HEIGHT = 64;\n\nfunction faceVectors(x, y, w, h) {\n  // Convert to u/v orientation in pixels\n  var uvPix = {\n    x: x,\n    y: SKIN_HEIGHT - y,\n    w: w,\n    h: h\n  }; // Convert to u/v coordinates\n\n  var uv = {\n    x: uvPix.x / SKIN_WIDTH,\n    y: uvPix.y / SKIN_HEIGHT,\n    w: uvPix.w / SKIN_WIDTH,\n    h: uvPix.h / SKIN_HEIGHT\n  }; // Convert to points\n\n  var points = {\n    p1: {\n      x: uv.x,\n      y: uv.y\n    },\n    p2: {\n      x: uv.x,\n      y: uv.y - uv.h\n    },\n    p3: {\n      x: uv.x + uv.w,\n      y: uv.y - uv.h\n    },\n    p4: {\n      x: uv.x + uv.w,\n      y: uv.y\n    }\n  }; // Create vectors\n\n  var vectors = [new THREE.Vector2(points.p1.x, points.p1.y), new THREE.Vector2(points.p2.x, points.p2.y), new THREE.Vector2(points.p3.x, points.p3.y), new THREE.Vector2(points.p4.x, points.p4.y)];\n  return vectors;\n}\n\nfunction init() {\n  var head = {\n    front: faceVectors(8, 8, 8, 8),\n    right: faceVectors(0, 8, 8, 8),\n    left: faceVectors(16, 8, 8, 8),\n    back: faceVectors(24, 8, 8, 8),\n    top: faceVectors(8, 0, 8, 8),\n    bottom: faceVectors(16, 0, 8, 8)\n  };\n  var geometry = new THREE.CubeGeometry(10, 10, 10); // Clear out any UV mapping that may have already existed on the cube\n\n  geometry.faceVertexUvs[0] = [];\n  geometry.faceVertexUvs[0][0] = [head.left[0], head.left[1], head.left[3]];\n  geometry.faceVertexUvs[0][1] = [head.left[1], head.left[2], head.left[3]];\n  geometry.faceVertexUvs[0][2] = [head.right[0], head.right[1], head.right[3]];\n  geometry.faceVertexUvs[0][3] = [head.right[1], head.right[2], head.right[3]];\n  geometry.faceVertexUvs[0][4] = [head.top[0], head.top[1], head.top[3]];\n  geometry.faceVertexUvs[0][5] = [head.top[1], head.top[2], head.top[3]];\n  geometry.faceVertexUvs[0][6] = [head.bottom[0], head.bottom[1], head.bottom[3]];\n  geometry.faceVertexUvs[0][7] = [head.bottom[1], head.bottom[2], head.bottom[3]];\n  geometry.faceVertexUvs[0][8] = [head.front[0], head.front[1], head.front[3]];\n  geometry.faceVertexUvs[0][9] = [head.front[1], head.front[2], head.front[3]];\n  geometry.faceVertexUvs[0][10] = [head.back[0], head.back[1], head.back[3]];\n  geometry.faceVertexUvs[0][11] = [head.back[1], head.back[2], head.back[3]];\n  var textureLoader = new THREE.TextureLoader();\n  var texture = textureLoader.load('../../assets/textures/minecraft/skins/steve.png'); // Keep the texture pixellated\n\n  texture.magFilter = THREE.NearestFilter;\n  texture.minFilter = THREE.LinearMipMapLinearFilter;\n  var material = new THREE.MeshLambertMaterial({\n    map: texture,\n    side: THREE.DoubleSide\n  });\n  mesh = new THREE.Mesh(geometry, material);\n  scene = new THREE.Scene();\n  scene.add(mesh);\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(20, 20, 20);\n  camera.lookAt(origin);\n  ambientLight = new THREE.AmbientLight(0x444444);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 50, 50);\n  scene.add(pointLight);\n  renderer = new THREE.WebGLRenderer();\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction update() {\n  // mesh.rotation.x += 0.01;\n  mesh.rotation.y += 0.01;\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/cube-textures/index.js?");

/***/ })

/******/ });