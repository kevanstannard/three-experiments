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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/simple-shadows/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/simple-shadows/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/simple-shadows/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar box;\nvar controls;\nvar redLight;\nvar blueLight;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction init() {\n  //\n  //\n  // SCENE\n  //\n  //\n  scene = new THREE.Scene(); //\n  //\n  // GRID HELPER\n  //\n  //\n\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper); //\n  //\n  // AXIS HELPER\n  //\n  //\n\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper); //\n  //\n  // CAMERA\n  //\n  //\n\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(200, 200, 200);\n  camera.lookAt(origin); //\n  //\n  // FLOOR\n  //\n  //\n\n  var floorGeometry = new THREE.PlaneGeometry(200, 200);\n  var floorMaterial = new THREE.MeshLambertMaterial({\n    side: THREE.DoubleSide\n  });\n  var floor = new THREE.Mesh(floorGeometry, floorMaterial);\n  floor.position.y = -0.1;\n  floor.rotation.x = -Math.PI / 2; // Indicate which objects can receive shadows\n\n  floor.receiveShadow = true;\n  scene.add(floor); //\n  //\n  // BOX\n  //\n  //\n\n  var boxGeometry = new THREE.BoxGeometry(20, 20, 20);\n  var boxMaterial = new THREE.MeshLambertMaterial();\n  box = new THREE.Mesh(boxGeometry, boxMaterial);\n  box.position.y = 40; // Indicate which objects can cast shadows\n\n  box.castShadow = true;\n  box.receiveShadow = false;\n  scene.add(box); //\n  //\n  // LIGHTS\n  //\n  //\n  // Indicate the lights that can cast shadows\n\n  redLight = new THREE.PointLight(0xff0000, 1, 500);\n  redLight.castShadow = true;\n  redLight.position.set(-50, 100, 50);\n  scene.add(redLight);\n  blueLight = new THREE.PointLight(0x0000ff, 1, 500);\n  blueLight.castShadow = true;\n  blueLight.position.set(50, 100, -50);\n  scene.add(blueLight); //\n  //\n  // HELPERS\n  //\n  //\n\n  var sphereSize = 4;\n  var redPointLightHelper = new THREE.PointLightHelper(redLight, sphereSize);\n  scene.add(redPointLightHelper);\n  var bluePointLightHelper = new THREE.PointLightHelper(blueLight, sphereSize);\n  scene.add(bluePointLightHelper);\n  var redLightShadowHelper = new THREE.CameraHelper(redLight.shadow.camera);\n  scene.add(redLightShadowHelper);\n  var blueLightShadowHelper = new THREE.CameraHelper(blueLight.shadow.camera);\n  scene.add(blueLightShadowHelper); //\n  //\n  // RENDERER\n  //\n  //\n\n  renderer = new THREE.WebGLRenderer();\n  renderer.setSize(window.innerWidth, window.innerHeight); // Enable shadows\n\n  renderer.shadowMap.enabled = true; // Antialias the shadows\n\n  renderer.shadowMap.type = THREE.PCFSoftShadowMap; //\n  //\n  // ORBIT CONTROLS\n  //\n  //\n\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction update() {\n  box.rotation.x += 0.01;\n  box.rotation.y += 0.01;\n  box.rotation.z += 0.01;\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/simple-shadows/index.js?");

/***/ })

/******/ });