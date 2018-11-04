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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/raycaster/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/raycaster/index.js":
/*!********************************************!*\
  !*** ./src/experiments/raycaster/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar origin;\nvar direction;\nvar raycaster;\nvar controls;\nvar arrow;\nvar clock;\nvar planes = [];\n\nfunction createPlane(name, z) {\n  var geometry = new THREE.PlaneGeometry(10, 10);\n  var material = new THREE.MeshBasicMaterial({\n    side: THREE.DoubleSide\n  });\n  var mesh = new THREE.Mesh(geometry, material);\n  mesh.position.z = z;\n  mesh.name = name;\n  planes.push(mesh);\n  return mesh;\n}\n\nfunction init() {\n  clock = new THREE.Clock();\n  scene = new THREE.Scene();\n  var gridHelper = new THREE.GridHelper(20, 4);\n  scene.add(gridHelper);\n  var axisHelper = new THREE.AxisHelper(20);\n  scene.add(axisHelper);\n  origin = new THREE.Vector3();\n  direction = new THREE.Vector3();\n  arrow = new THREE.ArrowHelper(direction, origin, 20);\n  scene.add(arrow);\n  var plane1 = createPlane('Plane 1', 0);\n  scene.add(plane1);\n  var plane2 = createPlane('Plane 2', -10);\n  scene.add(plane2);\n  var plane3 = createPlane('Plane 3', -20);\n  scene.add(plane3);\n  raycaster = new THREE.Raycaster();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(50, 50, -30);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction updatePlanes() {\n  var t = clock.getElapsedTime();\n  var x = Math.sin(t);\n  var z = Math.cos(t);\n  direction.set(x, 0, z).normalize();\n  raycaster.set(origin, direction);\n  arrow.setDirection(direction);\n  planes.forEach(function (plane) {\n    return plane.material.color.set(0xffffff);\n  });\n  var intersections = raycaster.intersectObjects(planes);\n  intersections.forEach(function (intersection) {\n    intersection.object.material.color.set(0xff0000);\n  });\n}\n\nfunction update() {\n  controls.update();\n  updatePlanes();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/raycaster/index.js?");

/***/ })

/******/ });