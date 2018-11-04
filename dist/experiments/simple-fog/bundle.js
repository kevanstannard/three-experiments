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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/simple-fog/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/simple-fog/index.js":
/*!*********************************************!*\
  !*** ./src/experiments/simple-fog/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar guiControls;\nvar pointLight;\nvar fog;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction initControls() {\n  guiControls = {\n    fogEnabled: true,\n    fogNear: 1,\n    fogFar: 500\n  };\n  var gui = new dat.GUI();\n  gui.add(guiControls, 'fogEnabled');\n  gui.add(guiControls, 'fogNear', 1, 500);\n  gui.add(guiControls, 'fogFar', 1, 500);\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  scene.background = new THREE.Color(0xffffff);\n  gridHelper = new THREE.GridHelper(500, 20);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(500);\n  scene.add(axisHelper);\n  pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(100, 100, 100);\n  scene.add(pointLight);\n  var texture = new THREE.Texture();\n  var textureLoader = new THREE.ImageLoader();\n  textureLoader.load('../../assets/textures/misc/uv_grid_sm.jpg', function (image) {\n    texture.image = image;\n    texture.needsUpdate = true;\n  });\n  var numBoxes = 10;\n  var boxSize = 40;\n  var delta = Math.PI * 2 / numBoxes;\n  var lastBox;\n\n  for (var count = 0; count < 5; count += 1) {\n    var radius = (count + 1) * 100;\n\n    for (var angle = 0; angle < Math.PI * 2; angle += delta) {\n      var x = radius * Math.cos(angle);\n      var z = radius * Math.sin(angle);\n      var y = 0;\n      var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);\n      var material = new THREE.MeshLambertMaterial({\n        map: texture\n      });\n      var mesh = new THREE.Mesh(geometry, material);\n      mesh.position.set(x, y, z);\n      mesh.lookAt(origin);\n      scene.add(mesh);\n      lastBox = mesh;\n    }\n  }\n\n  var cameraHeight = boxSize;\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(0, cameraHeight, 0);\n  camera.lookAt(new THREE.Vector3(lastBox.position.x, cameraHeight, lastBox.position.z));\n  fog = new THREE.Fog(0xffffff, 1, 300);\n  scene.fog = fog;\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initControls();\n}\n\nfunction update() {\n  camera.rotation.y += 0.001; // orbitControls.update();\n\n  if (guiControls.fogEnabled) {\n    scene.fog = fog;\n    scene.fog.near = guiControls.fogNear;\n    scene.fog.far = guiControls.fogFar;\n  } else {\n    scene.fog = null;\n  }\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/simple-fog/index.js?");

/***/ })

/******/ });