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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/orthographic-camera/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/orthographic-camera/index.js":
/*!******************************************************!*\
  !*** ./src/experiments/orthographic-camera/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// See:\n// https://www.youtube.com/watch?v=k3adBAnDpos\n// http://stackoverflow.com/questions/17558085/three-js-orthographic-camera\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight; // View size is how much vertical space to fit in the view\n// This is in world coordinates\n\nvar VIEW_SIZE = 600; // The aspect ratio provides information about how wide our view should\n// be compared to how tall it should be\n\nvar ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar ambientLight;\nvar light;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction init() {\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(230, 3);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(230);\n  scene.add(axisHelper);\n  var boxSize = 100;\n  var gapSize = 50;\n  var gridSize = 3;\n  var areaSize = boxSize * gridSize + gapSize * (gridSize - 1);\n  var start = -(areaSize / 2) + boxSize / 2;\n  var end = areaSize / 2 + boxSize / 2;\n\n  for (var x = start; x <= end; x += boxSize + gapSize) {\n    for (var z = start; z <= end; z += boxSize + gapSize) {\n      var height = 1 + Math.random() * 199;\n      var geometry = new THREE.BoxGeometry(100, height, 100);\n      var material = new THREE.MeshLambertMaterial({\n        color: 0xffffff\n      });\n      var mesh = new THREE.Mesh(geometry, material);\n      mesh.position.set(x, height / 2, z);\n      scene.add(mesh);\n    }\n  }\n\n  ambientLight = new THREE.AmbientLight(0x444444);\n  scene.add(ambientLight);\n  light = new THREE.DirectionalLight(0xffffff, 1, 1000);\n  light.position.set(100, 300, 600);\n  scene.add(light);\n  camera = new THREE.OrthographicCamera(-(ASPECT_RATIO * VIEW_SIZE) / 2, ASPECT_RATIO * VIEW_SIZE / 2, VIEW_SIZE / 2, -(VIEW_SIZE / 2), -1000, 1000);\n  camera.position.set(300, 300, 300);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  controls.target.set(origin.x, origin.y, origin.z);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction update() {\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/orthographic-camera/index.js?");

/***/ })

/******/ });