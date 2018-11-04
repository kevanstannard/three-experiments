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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/multi-material-loader/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/multi-material-loader/index.js":
/*!********************************************************!*\
  !*** ./src/experiments/multi-material-loader/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar orbitControls;\nvar pointLight;\nvar ambientLight;\nvar stats;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction loadTextures(urls, callback) {\n  var textures = [];\n\n  var onLoad = function onLoad() {\n    callback(null, textures);\n  };\n\n  var onProgress = function onProgress() {};\n\n  var onError = function onError(url) {\n    callback(new Error(\"Cannot load\".concat(url)));\n  };\n\n  var manager = new THREE.LoadingManager(onLoad, onProgress, onError);\n  var loader = new THREE.TextureLoader(manager);\n\n  for (var i = 0; i < urls.length; i += 1) {\n    textures.push(loader.load(urls[i]));\n  }\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(5, 5, 5);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats();\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 200, -100);\n  scene.add(pointLight);\n  var urls = ['../../assets/textures/misc/free.jpg', '../../assets/textures/misc/uv_grid_sm.jpg'];\n  loadTextures(urls, function (error, textures) {\n    if (error) {\n      console.log(error);\n      return;\n    }\n\n    var geometry = new THREE.BoxGeometry(3, 3, 3);\n    geometry.faces.forEach(function (face) {\n      face.materialIndex %= 2;\n    });\n    var mat1 = new THREE.MeshLambertMaterial({\n      map: textures[0]\n    });\n    var mat2 = new THREE.MeshLambertMaterial({\n      map: textures[1]\n    });\n    var materials = [mat1, mat2];\n    var mats = new THREE.MultiMaterial(materials);\n    var cube = new THREE.Mesh(geometry, mats);\n    scene.add(cube);\n  });\n}\n\nfunction update() {\n  stats.update();\n  orbitControls.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/multi-material-loader/index.js?");

/***/ })

/******/ });