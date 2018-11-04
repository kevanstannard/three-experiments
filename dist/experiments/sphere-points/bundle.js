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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/sphere-points/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/sphere-points/index.js":
/*!************************************************!*\
  !*** ./src/experiments/sphere-points/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar geometry;\nvar material;\nvar mesh;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction init() {\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(200, 200, 200);\n  camera.lookAt(origin);\n  geometry = new THREE.SphereGeometry(1, 32, 32);\n  material = new THREE.MeshLambertMaterial({\n    color: 0xffffff\n  }); // https://en.wikipedia.org/wiki/Spherical_coordinate_system\n  // http://stackoverflow.com/questions/969798/plotting-a-point-on-the-edge-of-a-sphere\n\n  var radius = 100;\n  var intervals = 10; // phi is the angle on the xy plane\n  // [0, 2PI]\n\n  var phi0 = Math.PI * (0 / 4);\n  var phi1 = Math.PI * (2 / 4);\n  var phiDelta = (phi1 - phi0) / intervals; // theta is the angle from the z axis\n  // [0, PI]\n\n  var theta0 = Math.PI * (0 / 2);\n  var theta1 = Math.PI * (2 / 4);\n  var thetaDelta = (theta1 - theta0) / intervals; // let count = 0;\n\n  for (var phi = phi0; phi <= phi1; phi += phiDelta) {\n    for (var theta = theta0; theta <= theta1; theta += thetaDelta) {\n      // count += 1;\n      // console.log(count);\n      var x = radius * Math.sin(theta) * Math.cos(phi);\n      var y = radius * Math.sin(theta) * Math.sin(phi);\n      var z = radius * Math.cos(theta);\n      mesh = new THREE.Mesh(geometry, material);\n      mesh.position.set(x, y, z);\n      scene.add(mesh);\n    }\n  }\n\n  ambientLight = new THREE.AmbientLight(0x444444);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 50, 50);\n  scene.add(pointLight);\n  renderer = new THREE.WebGLRenderer();\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  controls.update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/sphere-points/index.js?");

/***/ })

/******/ });