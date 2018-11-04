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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/room-rect-light/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/room-rect-light/index.js":
/*!**************************************************!*\
  !*** ./src/experiments/room-rect-light/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar orbitControls; // let ambientLight;\n\nvar stats;\nvar rectLight;\nvar rectLightHelper;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction Wall(width, height) {\n  var material = new THREE.MeshStandardMaterial({\n    color: 0xffffff,\n    metalness: 0,\n    roughness: 1,\n    side: THREE.DoubleSide\n  });\n  var geometry = new THREE.PlaneBufferGeometry(width, height);\n  THREE.Mesh.call(this, geometry, material);\n}\n\nWall.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {\n  constructor: Wall\n});\n\nfunction Room(width, height, depth) {\n  THREE.Object3D.call(this);\n  var back = new Wall(width, height);\n  back.position.set(0, 0, -depth / 2);\n  this.add(back);\n  var right = new Wall(depth, height);\n  right.rotation.y = Math.PI / 2;\n  right.position.set(-width / 2, 0, 0);\n  this.add(right);\n  var left = new Wall(depth, height);\n  left.rotation.y = -Math.PI / 2;\n  left.position.set(width / 2, 0, 0);\n  this.add(left);\n  var bottom = new Wall(width, depth);\n  bottom.rotation.x = -Math.PI / 2;\n  bottom.position.set(0, -height / 2, 0);\n  this.add(bottom);\n  var top = new Wall(width, depth);\n  top.rotation.x = Math.PI / 2;\n  top.position.set(0, height / 2, 0);\n  this.add(top);\n}\n\nRoom.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {\n  constructor: Room\n});\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  axisHelper = new THREE.AxisHelper(50);\n  scene.add(axisHelper); // ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n  // scene.add(ambientLight);\n\n  var roomSize = 100;\n  var room = new Room(roomSize, roomSize, roomSize);\n  scene.add(room);\n  rectLight = new THREE.RectAreaLight(0xFFFFFF, 1000, 5, 20);\n  rectLight.matrixAutoUpdate = true;\n  rectLight.position.set(5, 5, 0);\n  rectLightHelper = new THREE.RectAreaLightHelper(rectLight);\n  rectLight.add(rectLightHelper);\n  scene.add(rectLight);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(0, 0, 200);\n  camera.lookAt(origin);\n  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats();\n}\n\nfunction update() {\n  var t = Date.now() / 1000;\n  var r = 15.0;\n  var lx = r * Math.cos(t);\n  var lz = r * Math.sin(t);\n  var ly = 5.0 + 5.0 * Math.sin(t / 3.0);\n  rectLight.position.set(lx, ly, lz);\n  rectLight.lookAt(origin);\n  rectLight.updateMatrixWorld();\n  rectLightHelper.update();\n  stats.update();\n  orbitControls.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/room-rect-light/index.js?");

/***/ })

/******/ });