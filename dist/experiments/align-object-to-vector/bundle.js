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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/align-object-to-vector/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/align-object-to-vector/index.js":
/*!*********************************************************!*\
  !*** ./src/experiments/align-object-to-vector/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar directionVectorAngle = 0;\nvar directionVectorHelper;\nvar directionVectorRadius = 50;\nvar directionVector = new THREE.Vector3(1, 1, 1).normalize();\nvar box1;\nvar box2;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction Box(size) {\n  var geometry = new THREE.BoxGeometry(size, size, size);\n  var material = new THREE.MeshLambertMaterial({\n    color: 0xffffff,\n    wireframe: true\n  });\n  THREE.Mesh.call(this, geometry, material); // Define a vector in world coordinates for this box to look at\n\n  this.lookAtVector = new THREE.Vector3(); // Set the initial direction of the arrow\n  // This MUST have the  correct orientation for the initial box\n  // so that when the box is rotated, then this arrow will rotate with it\n\n  var direction = new THREE.Vector3(0, 0, 1); // Create a vector to hold the arrows position\n\n  var position = new THREE.Vector3(); // Create the arrow\n\n  this.arrow = new THREE.ArrowHelper(direction, position, size, 0xffffff); // And make it a child of the box\n\n  this.add(this.arrow);\n}\n\nBox.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {\n  constructor: Box,\n  setDirection: function setDirection(vector) {\n    this.lookAtVector.set(this.position.x + vector.x, this.position.y + vector.y, this.position.z + vector.z);\n    this.lookAt(this.lookAtVector);\n  }\n});\n\nfunction init() {\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  directionVectorHelper = new THREE.ArrowHelper(directionVector, origin, 50);\n  scene.add(directionVectorHelper);\n  box1 = new Box(20);\n  box1.position.set(50, 50, 0);\n  scene.add(box1);\n  box2 = new Box(30);\n  box2.position.set(0, 50, 50);\n  scene.add(box2);\n  ambientLight = new THREE.AmbientLight(0x444444);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 50, 50);\n  scene.add(pointLight);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(150, 150, 150);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction updateBoxes() {\n  box1.setDirection(directionVector);\n  box2.setDirection(directionVector);\n}\n\nfunction updateDirectionVector() {\n  directionVectorAngle += 0.01;\n  var x = directionVectorRadius * Math.cos(directionVectorAngle);\n  var y = directionVectorRadius * Math.sin(directionVectorAngle);\n  var z = directionVectorRadius * Math.sin(directionVectorAngle) * Math.cos(directionVectorAngle);\n  directionVector.set(x, y, z).normalize();\n  directionVectorHelper.setDirection(directionVector);\n}\n\nfunction update() {\n  updateDirectionVector();\n  updateBoxes();\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/align-object-to-vector/index.js?");

/***/ })

/******/ });