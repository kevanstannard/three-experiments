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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/vector-projection/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/vector-projection/index.js":
/*!****************************************************!*\
  !*** ./src/experiments/vector-projection/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 100;\nvar scene;\nvar camera;\nvar renderer;\nvar gridHelper;\nvar orbitControls;\nvar stats;\nvar origin = new THREE.Vector3();\n\nfunction Vector3Helper(vector, color) {\n  THREE.AxisHelper.call(this, 2);\n  this.material.transparent = true;\n  this.material.opacity = 0.5; //\n\n  this.vector = vector;\n  this.length = vector.length();\n  this.vectorUnit = vector.clone().normalize();\n  var arrow = new THREE.ArrowHelper(this.vectorUnit, origin, this.length, color);\n  this.add(arrow);\n}\n\nVector3Helper.prototype = Object.assign(Object.create(THREE.AxisHelper.prototype), {\n  constructor: Vector3Helper\n});\n\nfunction Matrix3Helper(m) {\n  THREE.AxisHelper.call(this, 2);\n  this.material.transparent = true;\n  this.material.opacity = 0.5; //\n\n  var e = m.elements;\n  this.v1 = new THREE.Vector3(e[0], e[1], e[2]);\n  this.v2 = new THREE.Vector3(e[3], e[4], e[5]);\n  this.v3 = new THREE.Vector3(e[6], e[7], e[8]);\n  this.v1Normal = this.v1.clone().normalize();\n  this.v2Normal = this.v2.clone().normalize();\n  this.v3Normal = this.v3.clone().normalize();\n  this.v1Arrow = new THREE.ArrowHelper(this.v1Normal, this.position, this.v1.length(), 0xff0000);\n  this.v2Arrow = new THREE.ArrowHelper(this.v2Normal, this.position, this.v2.length(), 0x00ff00);\n  this.v3Arrow = new THREE.ArrowHelper(this.v3Normal, this.position, this.v3.length(), 0x0000ff);\n  this.add(this.v1Arrow);\n  this.add(this.v2Arrow);\n  this.add(this.v3Arrow);\n}\n\nMatrix3Helper.prototype = Object.assign(Object.create(THREE.AxisHelper.prototype), {\n  constructor: Matrix3Helper\n});\nvar a = new THREE.Vector3(1, 1, 1);\nvar aHelper = new Vector3Helper(a, 0xff00ff);\nvar b = new THREE.Vector3(2, 0, 2);\nvar bHelper = new Vector3Helper(b, 0xffff00);\nvar a2 = a.clone();\nvar b2 = b.clone(); // Project a onto b\n// METHOD 1\n// First we need a normal of the vector\n// we are projecting onto\n\nvar bNormal = b.clone().normalize(); // The dot product of the vector with the normal\n// gives us the magnitude of the projection\n\nvar dotProduct = bNormal.dot(a); // Then we can create the projection vector\n\nvar projection = bNormal.clone();\nprojection.multiplyScalar(dotProduct);\nvar projectionHelper = new Vector3Helper(projection, 0xffffff);\nconsole.log('Method 1', projection); // METHOD 2\n\na2.projectOnVector(b2);\nconsole.log('Method 2', a2); // RESULTS\n// Method 1 = {x: 0.9999999999999998, y: 0, z: 0.9999999999999998}\n// Method 2 = {x: 1, y: 0, z: 1}\n//\n// Method 2 is better here.\n//\n// Why? Not sure.\n//\n// Method 1 algorithm:\n//\n//  bNormal = b.normalize()\n//  scalar = bNormal.dot(a)\n//  projection = bNormal.multiplyScalar(scalar)\n//\n// Method 2 algorithm:\n//\n//  scalar = b.dot(a) / b.lengthSq()\n//  projection = b.multiplyScalar(scalar)\n//\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(0, 4, 4);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats();\n  gridHelper = new THREE.GridHelper(10, 10);\n  gridHelper.material.transparent = true;\n  gridHelper.material.opacity = 0.2;\n  scene.add(gridHelper);\n  scene.add(aHelper);\n  scene.add(bHelper);\n  scene.add(projectionHelper);\n}\n\nfunction update() {\n  stats.update();\n  orbitControls.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/vector-projection/index.js?");

/***/ })

/******/ });