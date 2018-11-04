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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/skeleton-helper/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/skeleton-helper/index.js":
/*!**************************************************!*\
  !*** ./src/experiments/skeleton-helper/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbit;\nvar stats;\nvar lights;\nvar helper;\nvar bones; // let skeleton;\n\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(20, 30, 40);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  orbit = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats(); // const gridHelper = new THREE.GridHelper(40, 10);\n  // scene.add(gridHelper);\n  // const axisHelper = new THREE.AxisHelper(2);\n  // scene.add(axisHelper);\n\n  lights = [];\n  lights[0] = new THREE.PointLight(0xffffff, 1);\n  lights[1] = new THREE.PointLight(0xffffff, 1); // lights[2] = new THREE.PointLight(0xffffff, 1);\n\n  lights[0].position.set(200, 300, 400);\n  lights[1].position.set(-200, -300, -400); // lights[2].position.set(-400, -500, 500);\n\n  scene.add(lights[0]);\n  scene.add(lights[1]); // scene.add(lights[2]);\n\n  var bodyBone = new THREE.Bone();\n  var headBone = new THREE.Bone();\n  var leftShoulderBone = new THREE.Bone();\n  var leftHandBone = new THREE.Bone();\n  var rightShoulderBone = new THREE.Bone();\n  var rightHandBone = new THREE.Bone();\n  var leftHipBone = new THREE.Bone();\n  var leftFootBone = new THREE.Bone();\n  var rightHipBone = new THREE.Bone();\n  var rightFootBone = new THREE.Bone();\n  bodyBone.position.set(0, 0, 0);\n  headBone.position.set(0, 10, 0);\n  leftShoulderBone.position.set(6, 6, 0);\n  leftHandBone.position.set(0, -6, 0);\n  rightShoulderBone.position.set(-6, 6, 0);\n  rightHandBone.position.set(0, -6, 0);\n  leftHipBone.position.set(2, -6, 0);\n  leftFootBone.position.set(0, -6, 0);\n  rightHipBone.position.set(-2, -6, 0);\n  rightFootBone.position.set(0, -6, 0);\n  bodyBone.add(headBone);\n  bodyBone.add(leftShoulderBone);\n  leftShoulderBone.add(leftHandBone);\n  bodyBone.add(rightShoulderBone);\n  rightShoulderBone.add(rightHandBone);\n  bodyBone.add(leftHipBone);\n  leftHipBone.add(leftFootBone);\n  bodyBone.add(rightHipBone);\n  rightHipBone.add(rightFootBone);\n  bones = [];\n  bones.push(bodyBone);\n  bones.push(headBone);\n  bones.push(leftShoulderBone);\n  bones.push(leftHandBone);\n  bones.push(rightShoulderBone);\n  bones.push(rightHandBone);\n  bones.push(leftHipBone);\n  bones.push(leftFootBone);\n  bones.push(rightHipBone);\n  bones.push(rightFootBone); // Interesting, we don't actually need a skeleton ???\n  // skeleton = new THREE.Skeleton(bones);\n\n  helper = new THREE.SkeletonHelper(bodyBone);\n  scene.add(helper);\n  scene.add(bodyBone);\n}\n\nfunction update() {\n  var time = Date.now() * 0.001;\n  var angle = Math.sin(time);\n  bones[1].rotation.y = Math.PI * angle / 8; // Head\n\n  bones[2].rotation.x = Math.PI * angle / 4; // Left shoulder\n\n  bones[4].rotation.x = -(Math.PI * angle) / 4; // Right shoulder\n\n  bones[6].rotation.x = -(Math.PI * angle) / 4; // Left hip\n\n  bones[8].rotation.x = Math.PI * angle / 4; // Right hip\n\n  helper.update();\n  stats.update();\n  orbit.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/skeleton-helper/index.js?");

/***/ })

/******/ });