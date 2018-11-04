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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/multiple-objects-joined/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/multiple-objects-joined/index.js":
/*!**********************************************************!*\
  !*** ./src/experiments/multiple-objects-joined/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar thing;\nvar controls;\nvar pointLight;\nvar angle = 0;\nvar radius = 40;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction init() {\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(100, 100, 100);\n  camera.lookAt(origin);\n  var material = new THREE.MeshLambertMaterial({\n    wireframe: false\n  });\n  thing = new THREE.Object3D();\n  var largeSize = 20;\n  var smallSize = largeSize / 4;\n  var positions = [[0, 1], [1, 0], [0, -1], [-1, 0]];\n  positions.forEach(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2),\n        largePosX = _ref2[0],\n        largePosY = _ref2[1];\n\n    var largeX = largePosX * largeSize;\n    var largeY = largePosY * largeSize;\n    var largeGeometry = new THREE.BoxGeometry(largeSize, largeSize, largeSize);\n    var largeBox = new THREE.Mesh(largeGeometry, material);\n    largeBox.position.set(largeX, largeY, 0);\n    thing.add(largeBox);\n    positions.forEach(function (_ref3) {\n      var _ref4 = _slicedToArray(_ref3, 2),\n          smallPosX = _ref4[0],\n          smallPosY = _ref4[1];\n\n      var smallX = smallPosX * smallSize * 2.5;\n      var smallY = smallPosY * smallSize * 2.5;\n      var smallGeometry = new THREE.SphereGeometry(smallSize, 16, 16);\n      var smallBox = new THREE.Mesh(smallGeometry, material);\n      smallBox.position.set(smallX, smallY, 0);\n      largeBox.add(smallBox);\n    });\n  });\n  scene.add(thing);\n  pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(100, 100, 100);\n  scene.add(pointLight);\n  renderer = new THREE.WebGLRenderer();\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction update() {\n  angle += 0.005;\n  var x = radius * Math.cos(angle);\n  var y = radius * Math.sin(angle);\n  var z = 0;\n  thing.position.set(x, y, z);\n  thing.rotation.x += 0.005;\n  thing.rotation.y += 0.005;\n  thing.rotation.z += 0.005;\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/multiple-objects-joined/index.js?");

/***/ })

/******/ });