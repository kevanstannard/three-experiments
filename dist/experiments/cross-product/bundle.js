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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/cross-product/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/cross-product/index.js":
/*!************************************************!*\
  !*** ./src/experiments/cross-product/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar orbitControls;\nvar stats;\nvar clock;\nvar origin;\nvar direction1;\nvar direction1Arrow;\nvar direction2;\nvar direction2Arrow;\nvar direction3;\nvar direction3Arrow;\nvar line;\n\nfunction Line() {\n  this.start = new THREE.Vector3();\n  this.end = new THREE.Vector3();\n  var material = new THREE.LineBasicMaterial({\n    color: 0xffffff\n  });\n  var geometry = new THREE.Geometry();\n  geometry.vertices.push(this.start, this.end);\n  THREE.Line.call(this, geometry, material);\n}\n\nLine.prototype = Object.assign(Object.create(THREE.Line.prototype), {\n  constructor: Line,\n  set: function set(start, end) {\n    this.start.copy(start);\n    this.end.copy(end);\n  }\n});\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction init() {\n  clock = new THREE.Clock();\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(2, 4);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(2);\n  scene.add(axisHelper);\n  origin = new THREE.Vector3(0, 0, 0);\n  direction1 = new THREE.Vector3();\n  direction1Arrow = new THREE.ArrowHelper(direction1, origin, 1, 0xff0000);\n  scene.add(direction1Arrow);\n  direction2 = new THREE.Vector3();\n  direction2Arrow = new THREE.ArrowHelper(direction2, origin, 1, 0x00ff00);\n  scene.add(direction2Arrow);\n  direction3 = new THREE.Vector3();\n  direction3Arrow = new THREE.ArrowHelper(direction3, origin, 1, 0x0000ff);\n  scene.add(direction3Arrow);\n  line = new Line();\n  scene.add(line);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(3, 3, 3);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats();\n}\n\nfunction update() {\n  var t = clock.getElapsedTime();\n  var a = Math.sin(t / 10);\n  var b = Math.cos(t / 10);\n  direction1.set(a, 0, b).normalize();\n  direction2.set(a, b, 0).normalize();\n  direction3.crossVectors(direction1, direction2).normalize();\n  direction1Arrow.setDirection(direction1);\n  direction2Arrow.setDirection(direction2);\n  direction3Arrow.setDirection(direction3);\n  stats.update();\n  orbitControls.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/cross-product/index.js?");

/***/ })

/******/ });