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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/point-light-inside-box/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/point-light-inside-box/index.js":
/*!*********************************************************!*\
  !*** ./src/experiments/point-light-inside-box/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer; // let axisHelper;\n// let gridHelper;\n\nvar orbitControls;\nvar pointLight; // let ambientLight;\n// let mesh;\n// let controls;\n\nvar stats;\nvar boxWidth;\nvar boxHeight;\nvar boxDepth;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n} // function initControls() {\n//   controls = {\n//     xRotation: 0,\n//     yRotation: 0,\n//     zRotation: 0,\n//   };\n//   const gui = new dat.GUI();\n//   gui.add(controls, 'xRotation', 0, Math.PI * 2);\n//   gui.add(controls, 'yRotation', 0, Math.PI * 2);\n//   gui.add(controls, 'zRotation', 0, Math.PI * 2);\n// }\n\n\nfunction init() {\n  scene = new THREE.Scene(); // gridHelper = new THREE.GridHelper(100, 10);\n  // scene.add(gridHelper);\n  // axisHelper = new THREE.AxisHelper(10);\n  // scene.add(axisHelper);\n  // const backWallGeometry = new THREE.PlaneBufferGeometry(40, 40);\n  // const backWallMaterial = new THREE.MeshLambertMaterial({\n  //   color: 0xffffff,\n  //   side: THREE.DoubleSide,\n  // });\n  // const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);\n  // backWall.position.set(10, 10, -10);\n  // scene.add(backWall);\n  // const rightWallGeometry = new THREE.PlaneBufferGeometry(40, 40);\n  // const rightWallMaterial = new THREE.MeshLambertMaterial({\n  //   color: 0xffffff,\n  //   side: THREE.DoubleSide,\n  // });\n  // const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);\n  // rightWall.rotation.y = Math.PI / 2;\n  // rightWall.position.set(-10, 10, 10);\n  // scene.add(rightWall);\n  // const bottomWallGeometry = new THREE.PlaneBufferGeometry(40, 40);\n  // const bottomWallMaterial = new THREE.MeshLambertMaterial({\n  //   color: 0xffffff,\n  //   side: THREE.DoubleSide,\n  // });\n  // const bottomWall = new THREE.Mesh(bottomWallGeometry, bottomWallMaterial);\n  // bottomWall.rotation.x = -Math.PI / 2;\n  // bottomWall.position.set(10, -10, 10);\n  // scene.add(bottomWall);\n  // const geometry = new THREE.BoxGeometry(400, 400, 400);\n  // const material = new THREE.MeshLambertMaterial({\n  //   color: 0xffffff,\n  //   // side: THREE.DoubleSide,\n  // });\n  // const room = new THREE.Mesh(geometry, material);\n  // scene.add(room);\n  // ambientLight = new THREE.AmbientLight(0xffffff, 0.1);\n  // scene.add(ambientLight);\n\n  boxWidth = 400;\n  boxHeight = 200;\n  boxDepth = 400;\n  var geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);\n  var material = new THREE.MeshLambertMaterial({\n    color: 0xffffff,\n    side: THREE.DoubleSide\n  });\n  var mesh = new THREE.Mesh(geometry, material);\n  scene.add(mesh);\n  pointLight = new THREE.PointLight(0xffff00, 2, boxDepth); // pointLight.position.set(0, 180, 0);\n\n  scene.add(pointLight); // var pointLight = new THREE.PointLight( 0xff0000, 1, 100 );\n  // pointLight.position.set( 10, 10, 10 );\n  // scene.add( pointLight );\n\n  var sphereSize = 1;\n  var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);\n  scene.add(pointLightHelper);\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(0, 0, -boxDepth / 2); // camera.lookAt(origin);\n\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  orbitControls.target = origin;\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats(); // initControls();\n}\n\nvar angle = 0;\n\nfunction update() {\n  // mesh.rotation.set(\n  //   mesh.rotation.x = controls.xRotation,\n  //   mesh.rotation.y = controls.yRotation,\n  //   mesh.rotation.z = controls.zRotation,\n  // );\n  angle += 0.01;\n  var x = Math.sin(angle) * boxWidth / 3;\n  var z = Math.sin(angle) * boxDepth / 3;\n  pointLight.position.set(x, 0, z);\n  stats.update();\n  orbitControls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/point-light-inside-box/index.js?");

/***/ })

/******/ });