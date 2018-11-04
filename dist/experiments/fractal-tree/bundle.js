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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/fractal-tree/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/fractal-tree/index.js":
/*!***********************************************!*\
  !*** ./src/experiments/fractal-tree/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* eslint-disable no-param-reassign */\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 1000;\nvar scene;\nvar camera;\nvar renderer;\nvar gridHelper;\nvar controls;\nvar tree;\n\nfunction Tree() {\n  var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;\n  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;\n  this.depth = depth;\n  this.size = size;\n  this.growth = 0;\n  this.hasBranches = this.depth > 1;\n  this.branches = null;\n  var geometry = new THREE.BoxGeometry(size / 8, size, size / 8); // Change the geometrys center position to be the base of the geometry\n\n  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, size / 2, 0));\n  var material = new THREE.MeshNormalMaterial({\n    wireframe: true\n  });\n  THREE.Mesh.call(this, geometry, material);\n}\n\nTree.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {\n  constructor: Tree,\n  addBranches: function addBranches() {\n    var top = new THREE.Vector3(0, this.size, 0);\n    var branchSize = this.size * 0.7;\n    var branchDepth = this.depth - 1;\n    this.branches = [];\n    var branch1 = new Tree(branchDepth, branchSize);\n    branch1.position.set(top.x, top.y, top.z);\n    branch1.rotateZ(Math.PI * (1 / 4));\n    branch1.rotation.y = 2 * Math.PI / 3 * 0;\n    this.add(branch1);\n    this.branches.push(branch1);\n    var branch2 = new Tree(branchDepth, branchSize);\n    branch2.position.set(top.x, top.y, top.z);\n    branch2.rotateZ(Math.PI * (1 / 4));\n    branch2.rotation.y = 2 * Math.PI / 3 * 1;\n    this.add(branch2);\n    this.branches.push(branch2);\n    var branch3 = new Tree(branchDepth, branchSize);\n    branch3.position.set(top.x, top.y, top.z);\n    branch3.rotateZ(Math.PI * (1 / 4));\n    branch3.rotation.y = 2 * Math.PI / 3 * 2;\n    this.add(branch3);\n    this.branches.push(branch3);\n  },\n  update: function update() {\n    if (this.growth < 1) {\n      this.growth += 0.005;\n      this.scale.y = this.growth;\n    } else if (this.hasBranches) {\n      if (!this.branches) {\n        this.addBranches();\n      }\n\n      this.branches.forEach(function (branch) {\n        branch.rotation.y += 0.005;\n        branch.update();\n      });\n    }\n  }\n});\n\nfunction init() {\n  scene = new THREE.Scene();\n  gridHelper = new THREE.GridHelper(100, 10);\n  scene.add(gridHelper);\n  tree = new Tree();\n  scene.add(tree); // ambientLight = new THREE.AmbientLight(0x000000);\n  // scene.add(ambientLight);\n  // pointLight = new THREE.PointLight(0xffffff, 2, 500);\n  // pointLight.position.set(80, 80, 80);\n  // scene.add(pointLight);\n\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(0, 400, 400);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(window.innerWidth, window.innerHeight);\n  controls = new THREE.OrbitControls(camera, renderer.domElement);\n  var withinTree = new THREE.Vector3(tree.position.x, tree.position.y + 100, tree.position.z);\n  controls.target.set(withinTree.x, withinTree.y, withinTree.z);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n}\n\nfunction update() {\n  tree.update();\n  tree.rotation.y -= 0.002;\n  controls.update();\n}\n\nfunction animate() {\n  requestAnimationFrame(animate);\n  update();\n  renderer.render(scene, camera);\n}\n\ninit();\nanimate();\n\n//# sourceURL=webpack:///./src/experiments/fractal-tree/index.js?");

/***/ })

/******/ });