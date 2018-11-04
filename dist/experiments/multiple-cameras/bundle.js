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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/multiple-cameras/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/multiple-cameras/index.js":
/*!***************************************************!*\
  !*** ./src/experiments/multiple-cameras/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / 2 / SCREEN_HEIGHT;\nvar scene;\nvar camera1;\nvar camera2;\nvar renderer1;\nvar renderer2;\nvar axisHelper;\nvar gridHelper;\nvar orbitControls1;\nvar orbitControls2;\nvar pointLight;\nvar ambientLight;\nvar mesh;\nvar controls;\nvar stats;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction initControls() {\n  controls = {\n    xRotation: 0,\n    yRotation: 0,\n    zRotation: 0\n  };\n  var gui = new dat.GUI();\n  gui.add(controls, 'xRotation', 0, Math.PI * 2);\n  gui.add(controls, 'yRotation', 0, Math.PI * 2);\n  gui.add(controls, 'zRotation', 0, Math.PI * 2);\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  var geometry = new THREE.BoxGeometry(50, 50, 50);\n  var material = new THREE.MeshLambertMaterial({\n    color: 0xff0000\n  });\n  mesh = new THREE.Mesh(geometry, material);\n  scene.add(mesh);\n  ambientLight = new THREE.AmbientLight(0xffffff, 0.25);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffff00, 2, 100);\n  scene.add(pointLight);\n  var pointLightHelper = new THREE.PointLightHelper(pointLight, 20);\n  scene.add(pointLightHelper);\n  camera1 = new THREE.PerspectiveCamera(30, ASPECT, 1, 1000);\n  camera1.position.set(200, 200, 200);\n  camera1.lookAt(origin);\n  var cameraHelper = new THREE.CameraHelper(camera1);\n  scene.add(cameraHelper);\n  camera2 = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, 1, 5000);\n  camera2.position.set(2000, 400, 200);\n  camera2.lookAt(origin);\n  renderer1 = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer1.setSize(SCREEN_WIDTH / 2, SCREEN_HEIGHT);\n  renderer2 = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer2.setSize(SCREEN_WIDTH / 2, SCREEN_HEIGHT);\n  orbitControls1 = new THREE.OrbitControls(camera1, renderer1.domElement);\n  orbitControls2 = new THREE.OrbitControls(camera2, renderer2.domElement);\n  THREEx.WindowResize(renderer1, camera1);\n  THREEx.WindowResize(renderer2, camera2);\n  var container1 = document.createElement('div');\n  var container2 = document.createElement('div');\n  container1.style.position = 'absolute';\n  container1.style.top = '0px';\n  container1.style.bottom = '0px';\n  container1.style.left = '0px';\n  container1.style.right = \"\".concat(SCREEN_WIDTH / 2 - 1, \"px\");\n  container2.style.position = 'absolute';\n  container2.style.top = '0px';\n  container2.style.bottom = '0px';\n  container2.style.left = \"\".concat(SCREEN_WIDTH / 2, \"px\");\n  container2.style.right = '0px';\n  document.body.appendChild(container1);\n  document.body.appendChild(container2);\n  container1.appendChild(renderer1.domElement);\n  container2.appendChild(renderer2.domElement);\n  initStats();\n  initControls();\n}\n\nfunction update() {\n  var t = new Date().getTime() / 1000;\n  pointLight.position.x = 100 * Math.sin(t);\n  pointLight.position.z = 100 * Math.cos(t);\n  mesh.rotation.set(mesh.rotation.x = controls.xRotation, mesh.rotation.y = controls.yRotation, mesh.rotation.z = controls.zRotation);\n  stats.update();\n  orbitControls1.update();\n  orbitControls2.update();\n}\n\nfunction render() {\n  renderer1.render(scene, camera1);\n  renderer2.render(scene, camera2);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/multiple-cameras/index.js?");

/***/ })

/******/ });