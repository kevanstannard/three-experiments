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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/sun-earth-moon/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/sun-earth-moon/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/sun-earth-moon/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar controls;\nvar pointLight;\nvar ambientLight;\nvar sun;\nvar earth;\nvar moon;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction init() {\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper); // For each body we create\n  // 1) a Mesh\n  // 2) an Object3D\n  //\n  // The Object3D is the parent of the mesh\n  // The Object3D is the parent of other satellites\n  //\n  // When we rotate the Object3D it then rotates its satellites\n  //\n  // We can also undo the rotation on the mesh,\n  // (and give it an addtional rotattion)\n  // to prevent the mesh simply rotating with the Object3D\n\n  var sunGeometry = new THREE.SphereGeometry(30, 16, 16);\n  var sunMaterial = new THREE.MeshLambertMaterial({\n    color: 0xffff00,\n    wireframe: true\n  });\n  var sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);\n  sun = new THREE.Object3D();\n  sun.add(sunMesh);\n  scene.add(sun);\n  var earthGeometry = new THREE.SphereGeometry(10, 16, 16);\n  var earthMaterial = new THREE.MeshLambertMaterial({\n    color: 0x0000ff,\n    wireframe: true\n  });\n  var earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);\n  earth = new THREE.Object3D();\n  earth.add(earthMesh);\n  earth.position.x = 80;\n  sun.add(earth);\n  var moonGeometry = new THREE.SphereGeometry(3, 16, 16);\n  var moonMaterial = new THREE.MeshLambertMaterial({\n    color: 0x888888,\n    wireframe: true\n  });\n  var moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);\n  moon = new THREE.Object3D();\n  moon.add(moonMesh);\n  moon.position.x = 20;\n  earth.add(moon);\n  ambientLight = new THREE.AmbientLight(0x444444);\n  scene.add(ambientLight);\n  pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 50, 50);\n  scene.add(pointLight);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(200, 200, 200);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction update() {\n  sun.rotation.y += 0.01;\n  sun.children[0].rotation.y -= 0.01 + 0.001;\n  earth.rotation.y += 0.01;\n  earth.children[0].rotation.y -= 0.01 + 0.02;\n  moon.rotation.y += 0.01;\n  moon.children[0].rotation.y -= 0.01;\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/sun-earth-moon/index.js?");

/***/ })

/******/ });