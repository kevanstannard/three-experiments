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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/skeleton-disconnected-bones/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/skeleton-disconnected-bones/index.js":
/*!**************************************************************!*\
  !*** ./src/experiments/skeleton-disconnected-bones/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbit;\nvar stats;\nvar lights; // let helper;\n\nvar mesh;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(20, 30, 40);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  orbit = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats(); // const gridHelper = new THREE.GridHelper(40, 10);\n  // scene.add(gridHelper);\n  // const axisHelper = new THREE.AxisHelper(2);\n  // scene.add(axisHelper);\n\n  lights = [];\n  lights[0] = new THREE.PointLight(0xffffff, 1);\n  lights[1] = new THREE.PointLight(0xffffff, 1); // lights[2] = new THREE.PointLight(0xffffff, 1);\n\n  lights[0].position.set(200, 300, 400);\n  lights[1].position.set(-200, -300, -400); // lights[2].position.set(-400, -500, 500);\n\n  scene.add(lights[0]);\n  scene.add(lights[1]); // scene.add(lights[2]);\n\n  var bodyBone = new THREE.Bone();\n  var headBone = new THREE.Bone();\n  var leftArmBone = new THREE.Bone();\n  var rightArmBone = new THREE.Bone();\n  var leftLegBone = new THREE.Bone();\n  var rightLegBone = new THREE.Bone();\n  bodyBone.position.set(0, 0, 0);\n  headBone.position.set(0, 10, 0);\n  leftArmBone.position.set(6, 6, 0);\n  rightArmBone.position.set(-6, 6, 0);\n  leftLegBone.position.set(2, -6, 0);\n  rightLegBone.position.set(-2, -6, 0); // bodyBone.add(headBone);\n  // bodyBone.add(leftArmBone);\n  // bodyBone.add(rightArmBone);\n  // bodyBone.add(leftLegBone);\n  // bodyBone.add(rightLegBone);\n\n  var bones = [];\n  bones.push(bodyBone);\n  bones.push(headBone);\n  bones.push(leftArmBone);\n  bones.push(rightArmBone);\n  bones.push(leftLegBone);\n  bones.push(rightLegBone);\n  var skeleton = new THREE.Skeleton(bones);\n  var bodyGeometry = new THREE.BoxGeometry(8, 12, 4, 1, 1, 1);\n  var headGeometry = new THREE.BoxGeometry(8, 8, 8, 1, 1, 1);\n  var leftArmGeometry = new THREE.BoxGeometry(4, 12, 4, 1, 1, 1);\n  var rightArmGeometry = new THREE.BoxGeometry(4, 12, 4, 1, 1, 1);\n  var leftLegGeometry = new THREE.BoxGeometry(4, 12, 4, 1, 1, 1);\n  var rightLegGeometry = new THREE.BoxGeometry(4, 12, 4, 1, 1, 1);\n  headGeometry.translate(0, 10, 0);\n  leftArmGeometry.translate(6, 0, 0);\n  rightArmGeometry.translate(-6, 0, 0);\n  leftLegGeometry.translate(2, -12, 0);\n  rightLegGeometry.translate(-2, -12, 0);\n  var humanGeometry = new THREE.Geometry();\n  humanGeometry.merge(bodyGeometry);\n  humanGeometry.merge(headGeometry);\n  humanGeometry.merge(leftArmGeometry);\n  humanGeometry.merge(rightArmGeometry);\n  humanGeometry.merge(leftLegGeometry);\n  humanGeometry.merge(rightLegGeometry); // 6 geometries, 6 bones, 8 vertices per geometry\n\n  for (var boneIndex = 0; boneIndex < 6; boneIndex += 1) {\n    for (var vertexIndex = 0; vertexIndex < 8; vertexIndex += 1) {\n      humanGeometry.skinIndices.push(new THREE.Vector4(boneIndex, 0, 0, 0));\n      humanGeometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));\n    }\n  }\n\n  var material = new THREE.MeshBasicMaterial({\n    skinning: true,\n    wireframe: true\n  });\n  mesh = new THREE.SkinnedMesh(humanGeometry, material);\n  mesh.add(headBone);\n  mesh.add(bodyBone);\n  mesh.add(leftArmBone);\n  mesh.add(rightArmBone);\n  mesh.add(leftLegBone);\n  mesh.add(rightLegBone);\n  mesh.bind(skeleton);\n  scene.add(mesh); // helper = new THREE.SkeletonHelper(mesh);\n  // helper.material.linewidth = 4; // Not working ?\n  // scene.add(helper);\n}\n\nfunction update() {\n  var time = Date.now() * 0.004;\n  var angle = Math.sin(time);\n  var bones = mesh.skeleton.bones; // Head\n\n  bones[1].rotation.y = Math.PI * angle / 8; // Left arm\n\n  bones[2].rotation.x = Math.PI * angle / 4; // Right arm\n\n  bones[3].rotation.x = -(Math.PI * angle) / 4; // Left leg\n\n  bones[4].rotation.x = -(Math.PI * angle) / 4; // Right leg\n\n  bones[5].rotation.x = Math.PI * angle / 4; // helper.update();\n\n  stats.update();\n  orbit.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/skeleton-disconnected-bones/index.js?");

/***/ })

/******/ });