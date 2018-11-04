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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/shadows-on-material/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/shadows-on-material/index.js":
/*!******************************************************!*\
  !*** ./src/experiments/shadows-on-material/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar box;\nvar floor;\nvar controls;\nvar redLight;\nvar blueLight;\nvar greenLight;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction init() {\n  //\n  //\n  // SCENE\n  //\n  //\n  scene = new THREE.Scene(); //\n  //\n  // GRID HELPER\n  //\n  //\n\n  gridHelper = new THREE.GridHelper(100, 10);\n  gridHelper.material.transparent = true;\n  gridHelper.material.opacity = 0.25;\n  scene.add(gridHelper); //\n  //\n  // AXIS HELPER\n  //\n  //\n\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper); //\n  //\n  // CAMERA\n  //\n  //\n\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(200, 200, 200);\n  camera.lookAt(origin); //\n  //\n  // FLOOR\n  //\n  //\n\n  var loader = new THREE.TextureLoader();\n  loader.load('../../assets/textures/misc/green-eye.png', function (texture) {\n    var floorGeometry = new THREE.PlaneGeometry(200, 200);\n    var floorMaterial = new THREE.MeshLambertMaterial({\n      side: THREE.DoubleSide,\n      map: texture,\n      transparent: true\n    });\n    floor = new THREE.Mesh(floorGeometry, floorMaterial);\n    floor.receiveShadow = true;\n    scene.add(floor);\n  }); //\n  //\n  // BOX\n  //\n  //\n\n  var boxGeometry = new THREE.BoxGeometry(20, 20, 20);\n  var boxMaterial = new THREE.MeshStandardMaterial();\n  box = new THREE.Mesh(boxGeometry, boxMaterial);\n  box.position.y = 40;\n  box.castShadow = true;\n  box.receiveShadow = false;\n  scene.add(box); //\n  //\n  // LIGHTS\n  //\n  //\n\n  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n  scene.add(ambientLight);\n  redLight = new THREE.PointLight(0xff0000, 2, 500);\n  redLight.castShadow = true;\n  redLight.position.set(-50, 100, 50);\n  scene.add(redLight);\n  blueLight = new THREE.PointLight(0x0000ff, 2, 500);\n  blueLight.castShadow = true;\n  blueLight.position.set(50, 100, -50);\n  scene.add(blueLight);\n  greenLight = new THREE.PointLight(0x00ff00, 1, 500);\n  greenLight.castShadow = true;\n  greenLight.position.set(50, 100, 50);\n  scene.add(greenLight); //\n  //\n  // HELPERS\n  //\n  //\n\n  var sphereSize = 4;\n  var redPointLightHelper = new THREE.PointLightHelper(redLight, sphereSize);\n  scene.add(redPointLightHelper);\n  var redLightShadowHelper = new THREE.CameraHelper(redLight.shadow.camera);\n  redLightShadowHelper.material.transparent = true;\n  redLightShadowHelper.material.opacity = 0.25;\n  scene.add(redLightShadowHelper);\n  var bluePointLightHelper = new THREE.PointLightHelper(blueLight, sphereSize);\n  scene.add(bluePointLightHelper);\n  var blueLightShadowHelper = new THREE.CameraHelper(blueLight.shadow.camera);\n  blueLightShadowHelper.material.transparent = true;\n  blueLightShadowHelper.material.opacity = 0.25;\n  scene.add(blueLightShadowHelper);\n  var greenPointLightHelper = new THREE.PointLightHelper(greenLight, sphereSize);\n  scene.add(greenPointLightHelper);\n  var greenLightShadowHelper = new THREE.CameraHelper(greenLight.shadow.camera);\n  greenLightShadowHelper.material.transparent = true;\n  greenLightShadowHelper.material.opacity = 0.25;\n  scene.add(greenLightShadowHelper); //\n  //\n  // RENDERER\n  //\n  //\n\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight); // Enable shadows\n\n  renderer.shadowMap.enabled = true; // Antialias the shadows\n\n  renderer.shadowMap.type = THREE.PCFSoftShadowMap; //\n  //\n  // ORBIT CONTROLS\n  //\n  //\n\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nvar radius = 0.25;\nvar angle = 0;\n\nfunction update() {\n  box.rotation.x += 0.01;\n  box.rotation.y += 0.01;\n  box.rotation.z += 0.01;\n\n  if (floor) {\n    angle += 0.01;\n    floor.rotation.x = Math.PI / 2 + radius * Math.cos(angle);\n    floor.rotation.y = radius * Math.sin(angle);\n    floor.rotation.z += 0.01;\n  }\n\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/shadows-on-material/index.js?");

/***/ })

/******/ });