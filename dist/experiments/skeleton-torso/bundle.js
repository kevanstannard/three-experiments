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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/skeleton-torso/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/skeleton-torso/index.js":
/*!*************************************************!*\
  !*** ./src/experiments/skeleton-torso/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbit;\nvar stats;\nvar lights;\nvar helper;\nvar mesh;\nvar bones;\nvar boneIndexes;\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(10, 10, 20);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  orbit = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats(); // const gridHelper = new THREE.GridHelper(40, 10);\n  // scene.add(gridHelper);\n\n  var axisHelper = new THREE.AxisHelper(2);\n  scene.add(axisHelper);\n  lights = [];\n  lights[0] = new THREE.PointLight(0xffffff, 1);\n  lights[1] = new THREE.PointLight(0xffffff, 1); // lights[2] = new THREE.PointLight(0xffffff, 1);\n\n  lights[0].position.set(200, 300, 400);\n  lights[1].position.set(-200, -300, -400); // lights[2].position.set(-400, 500, 500);\n\n  scene.add(lights[0]);\n  scene.add(lights[1]); // scene.add(lights[2]);\n\n  var bodyBone = new THREE.Bone();\n  var chestBone = new THREE.Bone();\n  var hipBone = new THREE.Bone();\n  bodyBone.add(chestBone);\n  bodyBone.add(hipBone);\n  chestBone.position.set(0, 4, 0);\n  hipBone.position.set(0, -4, 0);\n  bones = [];\n  bones.push(bodyBone);\n  bones.push(chestBone);\n  bones.push(hipBone);\n  boneIndexes = {\n    BODY_BONE: 0,\n    CHEST_BONE: 1,\n    HIP_BONE: 2\n  };\n  var skeleton = new THREE.Skeleton(bones);\n  var params = {\n    width: 8,\n    height: 12,\n    depth: 4,\n    widthSegments: 1,\n    heightSegments: 1,\n    depthSegments: 1\n  };\n  var geometry = new THREE.BoxGeometry(params.width, params.height, params.depth, params.widthSegments, params.heightSegments, params.depthSegments);\n  var shoulderPos = params.height / 2;\n  var waistPos = -params.height / 2;\n  geometry.vertices.forEach(function (vertex) {\n    if (vertex.y === shoulderPos) {\n      // Shoulder\n      geometry.skinIndices.push(new THREE.Vector4(boneIndexes.CHEST_BONE, 0, 0, 0));\n      geometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));\n    } else if (vertex.y === waistPos) {\n      // Waist\n      geometry.skinIndices.push(new THREE.Vector4(boneIndexes.HIP_BONE, 0, 0, 0));\n      geometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));\n    } else {\n      geometry.skinIndices.push(new THREE.Vector4(boneIndexes.CHEST_BONE, boneIndexes.HIP_BONE, 0, 0));\n      geometry.skinWeights.push(new THREE.Vector4(0.5, 0.5, 0, 0));\n    }\n  });\n  var material = new THREE.MeshStandardMaterial({\n    skinning: true,\n    // wireframe: true,\n    color: 0x0088ff,\n    metalness: 0,\n    roughness: 1\n  });\n  mesh = new THREE.SkinnedMesh(geometry, material);\n  mesh.add(bodyBone);\n  mesh.bind(skeleton);\n  scene.add(mesh);\n  helper = new THREE.SkeletonHelper(mesh);\n  scene.add(helper);\n}\n\nfunction update() {\n  var time = Date.now() * 0.001;\n  var angle = Math.sin(time);\n  var skeletonBones = mesh.skeleton.bones;\n  skeletonBones[boneIndexes.CHEST_BONE].rotation.y = Math.PI * angle / 8;\n  skeletonBones[boneIndexes.HIP_BONE].rotation.y = -(Math.PI * angle) / 8;\n  helper.update();\n  stats.update();\n  orbit.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/skeleton-torso/index.js?");

/***/ })

/******/ });