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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/simple-dark-fog/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/simple-dark-fog/index.js":
/*!**************************************************!*\
  !*** ./src/experiments/simple-dark-fog/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper; // let gridHelper;\n// let geometry;\n// let material;\n// let mesh;\n\nvar orbitControls;\nvar guiControls;\nvar pointLight;\nvar ambientLight;\nvar fog;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction initControls() {\n  guiControls = {\n    fogEnabled: true,\n    fogNear: 1,\n    fogFar: 1000\n  };\n  var gui = new dat.GUI();\n  gui.add(guiControls, 'fogEnabled');\n  gui.add(guiControls, 'fogNear', 1, 500);\n  gui.add(guiControls, 'fogFar', 501, 1500);\n}\n\nfunction init() {\n  scene = new THREE.Scene(); // gridHelper = new THREE.GridHelper(200, 10);\n  // scene.add(gridHelper);\n\n  axisHelper = new THREE.AxisHelper(200);\n  scene.add(axisHelper);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(500, 200, 500);\n  camera.lookAt(origin); // geometry = new THREE.BoxGeometry(50, 50, 50);\n  // material = new THREE.MeshLambertMaterial({ color: 0x888888 });\n  // mesh = new THREE.Mesh(geometry, material);\n  // scene.add(mesh);\n\n  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffffff, 1, 500);\n  pointLight.position.set(200, 200, 200);\n  scene.add(pointLight);\n  var boxSize = 50;\n  var gapSize = 40;\n  var gridSize = 9;\n  var areaSize = boxSize * gridSize + gapSize * (gridSize - 1);\n  var start = -(areaSize / 2) + boxSize / 2;\n  var end = areaSize / 2 + boxSize / 2;\n\n  for (var x = start; x <= end; x += boxSize + gapSize) {\n    for (var z = start; z <= end; z += boxSize + gapSize) {\n      var geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);\n      var material = new THREE.MeshLambertMaterial({\n        color: 0xffffff\n      });\n      var mesh = new THREE.Mesh(geometry, material);\n      mesh.position.set(x, 0, z);\n      scene.add(mesh);\n    }\n  } // const texture = new THREE.Texture();\n  // const textureLoader = new THREE.ImageLoader();\n  // textureLoader.load('../../assets/textures/misc/uv_grid_sm.jpg', (image) => {\n  //   texture.image = image;\n  //   texture.needsUpdate = true;\n  // });\n  // const loader = new THREE.OBJLoader();\n  // loader.load('../../assets/objects/minecraft-tree.obj', (object) => {\n  //   // object.traverse((child) => {\n  //   //   if (child instanceof THREE.Mesh) {\n  //   //     child.material.map = texture;\n  //   //   }\n  //   // });\n  //   object.position.set(0, 4, 0);\n  //   object.scale.set(0.01, 0.01, 0.01);\n  //   scene.add(object);\n  //   camera.lookAt(object.position);\n  // });\n\n\n  fog = new THREE.Fog(0x000000, 1, 2000);\n  scene.fog = fog;\n  renderer = new THREE.WebGLRenderer();\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initControls();\n}\n\nfunction update() {\n  orbitControls.update();\n\n  if (guiControls.fogEnabled) {\n    scene.fog = fog;\n    scene.fog.near = guiControls.fogNear;\n    scene.fog.far = guiControls.fogFar;\n  } else {\n    scene.fog = null;\n  }\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/simple-dark-fog/index.js?");

/***/ })

/******/ });