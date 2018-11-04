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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/interactive-cubes/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/interactive-cubes/index.js":
/*!****************************************************!*\
  !*** ./src/experiments/interactive-cubes/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar primaryLight;\nvar stats;\nvar raycaster;\nvar currentObject;\nvar mouse = new THREE.Vector2();\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction onDocumentMouseMove(event) {\n  event.preventDefault();\n  mouse.x = event.clientX / window.innerWidth * 2 - 1;\n  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;\n}\n\nfunction onDocumentClick() {\n  if (currentObject) {\n    currentObject.animate = {\n      radius: 40,\n      angle: 0\n    };\n  }\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  var cubeSize = 40;\n\n  for (var x = 0; x < 3; x += 1) {\n    for (var y = 0; y < 3; y += 1) {\n      var geometry = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);\n      var material = new THREE.MeshLambertMaterial({\n        color: 0xff0000\n      });\n      var mesh = new THREE.Mesh(geometry, material);\n      mesh.position.set((x - 1) * 60, (y - 1) * 60, 0);\n      scene.add(mesh);\n    }\n  }\n\n  primaryLight = new THREE.DirectionalLight(0xffffff);\n  primaryLight.position.set(500, 200, 100);\n  scene.add(primaryLight);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(200, 200, 200);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  raycaster = new THREE.Raycaster();\n  THREEx.WindowResize(renderer, camera);\n  document.addEventListener('mousemove', onDocumentMouseMove, false);\n  document.addEventListener('click', onDocumentClick, false);\n  document.body.appendChild(renderer.domElement);\n  initStats();\n}\n\nfunction update() {\n  raycaster.setFromCamera(mouse, camera);\n  var intersects = raycaster.intersectObjects(scene.children);\n\n  if (intersects.length > 0) {\n    if (currentObject !== intersects[0].object) {\n      if (currentObject) {\n        currentObject.material.emissive.setHex(currentObject.currentHex);\n      }\n\n      currentObject = intersects[0].object;\n      currentObject.currentHex = currentObject.material.emissive.getHex();\n      currentObject.material.emissive.setHex(0x444444);\n    }\n  } else {\n    if (currentObject) {\n      currentObject.material.emissive.setHex(currentObject.currentHex);\n    }\n\n    currentObject = null;\n  }\n\n  scene.children.forEach(function (object) {\n    if (object.animate) {\n      object.position.z = Math.sin(object.animate.angle) * object.animate.radius;\n      object.animate.radius -= 0.05;\n      object.animate.angle += 0.1;\n\n      if (object.animate.radius < 0) {\n        object.animate = null;\n      }\n    }\n  });\n  stats.update();\n  orbitControls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/interactive-cubes/index.js?");

/***/ })

/******/ });