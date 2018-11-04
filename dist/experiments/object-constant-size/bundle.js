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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/object-constant-size/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/object-constant-size/index.js":
/*!*******************************************************!*\
  !*** ./src/experiments/object-constant-size/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Reference:\n// http://stackoverflow.com/questions/15331358/three-js-get-object-size-with-respect-to-camera-and-object-position-on-screen\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar boxGeometry;\nvar boxMaterial;\nvar boxMesh;\nvar planeGeometry;\nvar planeMaterial;\nvar planeMesh;\nvar controls;\nvar ambientLight;\nvar origin = new THREE.Vector3(0, 0, 0);\nvar fov = VIEW_ANGLE * (Math.PI / 180);\nvar BOX_SIZE = 20;\nvar BOX_SCALE = 0.25;\nvar PLANE_SIZE = 20;\nvar PLANE_SCALE = 0.2;\n\nfunction init() {\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(50, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(50);\n  scene.add(axisHelper);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(100, 100, 100);\n  camera.lookAt(origin);\n  boxGeometry = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);\n  boxMaterial = new THREE.MeshNormalMaterial();\n  boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);\n  scene.add(boxMesh);\n  planeGeometry = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 32);\n  planeMaterial = new THREE.MeshNormalMaterial({\n    side: THREE.DoubleSide\n  });\n  planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);\n  planeMesh.position.set(-50, 0, -50);\n  scene.add(planeMesh);\n  ambientLight = new THREE.AmbientLight(0x444444);\n  scene.add(ambientLight);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction resetMeshSize(mesh, meshSize, meshScale) {\n  /*\n          Cam\n          | \\\n          |  \\\n          |   \\\n        Obj1   \\\n                \\\n                 \\\n                Obj2\n  \n    Obj1 size = 10\n    Obj2 size = 20\n  \n    Distance Cam to Obj1 = 30\n    Distance Cam to Obj2 = 60\n  \n    tan(theta/2) = radius / distance\n    radius = tan(theta/2) * distance\n    size = 2 * tan(theta/2) * distance\n  \n    Examples:\n  \n      View Angle = 45\n      FOV = 0.7853981634\n  \n      Mesh Size  10     20\n      Distance   30     60\n      Size       24.85  49.71\n      Scale      2.49   2.49\n  \n  */\n  // Determine the distance of the camera to the object\n  var distance = camera.position.distanceTo(mesh.position); // Calculate a stanard size based on the object distance.\n  // We want to scale all objects at this distance to this size.\n\n  var standardSize = 2 * Math.tan(fov / 2) * distance; // We want our object to remain the same size relative to the current\n  // standard size.\n  //\n  // For example:\n  //   Suppose the standard size is 100, and object size is 20\n  //   then the ratio (or scale) = 100 / 20 = 5.0\n  //\n  //   Suppose the standard size changes to 200 (due to the camera moving away),\n  //   and object size is 20, then the ratio (or scale) = 200 / 20 = 10.0\n  //\n  // But this scale value will just standardise the object size\n  // so that it fills the screen.\n  //\n  // For example:\n  //   With standard size 100, object size 20 then\n  //     scale = 100 / 20 = 5.0\n  //\n  //   When we scale our object, we get it's new size\n  //     size = 20 * 5.0 = 100\n  //\n  //   So our object is now the same size as the standard\n  //\n  // Lastly we need a scale value to convert the object back to a standard size.\n\n  var scale = standardSize / meshSize * meshScale;\n  mesh.scale.set(scale, scale, scale);\n}\n\nfunction update() {\n  planeMesh.rotation.x += 0.005;\n  planeMesh.rotation.y += 0.005;\n  resetMeshSize(boxMesh, BOX_SIZE, BOX_SCALE);\n  resetMeshSize(planeMesh, PLANE_SIZE, PLANE_SCALE);\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/object-constant-size/index.js?");

/***/ })

/******/ });