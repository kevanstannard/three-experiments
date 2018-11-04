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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/euler-rotation/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/euler-rotation/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/euler-rotation/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar stats;\nvar labelEl;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  orbitControls.autoRotate = true;\n  orbitControls.autoRotateSpeed = -2.0;\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats();\n  var gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  var axisHelper = new THREE.AxisHelper(50);\n  scene.add(axisHelper);\n  camera.position.set(0, 50, 100);\n  camera.lookAt(origin);\n  labelEl = document.createElement('div');\n  labelEl.style.position = 'absolute';\n  labelEl.style.width = '50px';\n  labelEl.style.padding = '10px';\n  labelEl.style.backgroundColor = '#333333';\n  labelEl.style.color = 'white';\n  labelEl.style.top = '120px';\n  labelEl.style.left = '0px';\n  labelEl.style.textAlign = 'center';\n  document.body.appendChild(labelEl); // Ref:\n  // http://stackoverflow.com/questions/42089919/three-js-camera-rotation-y-to-360-degrees-conversion/42112495?noredirect=1#comment71441294_42112495\n  //\n  // If you set\n  //\n  // camera.rotation.order = \"YXZ\"\n  //\n  // ( the default is \"XYZ\" ) the Euler angles will make a lot more sense to you:\n  //\n  // rotation.y will be the camera heading in radians\n  //\n  // rotation.x will be the camera pitch in radians\n  //\n  // rotation.z will be the camera roll in radians\n  //\n  // The rotations will be applied in that order.\n  //\n  // For more information, see this stackoverflow answer.\n  //\n  // http://stackoverflow.com/questions/17517937/three-js-camera-tilt-up-or-down-and-keep-horizon-level/17518092#17518092\n\n  camera.rotation.order = 'YXZ';\n}\n\nfunction update() {\n  var heading = camera.rotation.y;\n  var radians = heading > 0 ? heading : 2 * Math.PI + heading;\n  var degrees = THREE.Math.radToDeg(radians);\n  labelEl.innerHTML = Math.floor(degrees);\n  stats.update();\n  orbitControls.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/euler-rotation/index.js?");

/***/ })

/******/ });