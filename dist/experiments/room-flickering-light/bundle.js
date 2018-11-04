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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/room-flickering-light/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/room-flickering-light/Bug.js":
/*!******************************************************!*\
  !*** ./src/experiments/room-flickering-light/Bug.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction Bug() {\n  THREE.Object3D.call(this); // const geometry = new THREE.SphereGeometry(1, 2, 2, 0, Math.PI);\n\n  var geometry = new THREE.CircleBufferGeometry(0.5);\n  var material = new THREE.MeshBasicMaterial({\n    color: 0x000000\n  });\n  this.sphere = new THREE.Mesh(geometry, material);\n  this.sphere.castShadow = true;\n  this.sphere.receiveShadow = false;\n  this.add(this.sphere);\n}\n\nBug.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {\n  constructor: Bug,\n  update: function update() {\n    if (this.moveSteps) {\n      this.sphere.position.x += this.moveDelta.x;\n      this.sphere.position.y += this.moveDelta.y;\n      this.moveSteps -= 1;\n      return;\n    }\n\n    var wantsToMove = Math.random() > 0.9999;\n\n    if (wantsToMove) {\n      this.moveTarget = {\n        x: -20 + Math.random() * 40,\n        y: -20 + Math.random() * 40\n      };\n      this.moveSteps = 60 * 3;\n      this.moveDelta = {\n        x: this.moveTarget.x / this.moveSteps,\n        y: this.moveTarget.y / this.moveSteps\n      };\n    }\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bug);\n\n//# sourceURL=webpack:///./src/experiments/room-flickering-light/Bug.js?");

/***/ }),

/***/ "./src/experiments/room-flickering-light/index.js":
/*!********************************************************!*\
  !*** ./src/experiments/room-flickering-light/index.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Bug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bug */ \"./src/experiments/room-flickering-light/Bug.js\");\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer; // let axisHelper;\n\nvar orbitControls; // let ambientLight;\n\nvar stats; // let rectLight;\n// let rectLightHelper;\n\nvar lights = [];\nvar bugs = [];\nvar origin = new THREE.Vector3(0, 0, 0); // function Wall(width, height) {\n//   const material = new THREE.MeshStandardMaterial({\n//     color: 0xffffff,\n//     metalness: 0,\n//     roughness: 1,\n//     side: THREE.DoubleSide,\n//   });\n//   const geometry = new THREE.PlaneBufferGeometry(width, height);\n//   THREE.Mesh.call(this, geometry, material);\n//   this.receiveShadow = true;\n// }\n//\n// Wall.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {\n//   constructor: Wall,\n// });\n\nfunction Wall(width, height) {\n  THREE.Object3D.call(this);\n  var material = new THREE.MeshStandardMaterial({\n    color: 0xffffff,\n    metalness: 0,\n    roughness: 1,\n    side: THREE.DoubleSide\n  });\n  var geometry = new THREE.PlaneBufferGeometry(width, height);\n  this.wall = new THREE.Mesh(geometry, material);\n  this.add(this.wall);\n  var numStains = Math.floor(Math.random() * 5);\n\n  for (var i = 0; i < numStains; i += 1) {\n    var stainSize = 50 + Math.random() * 200;\n    var stainGeometry = new THREE.CircleBufferGeometry(stainSize);\n    var stainMaterial = new THREE.MeshStandardMaterial({\n      color: 0xdddddd,\n      metalness: 0,\n      roughness: 1\n    });\n    this.stain = new THREE.Mesh(stainGeometry, stainMaterial);\n    this.stain.position.z = 0.5;\n    this.stain.position.x = -100 + Math.random() * 200;\n    this.stain.position.y = -100 + Math.random() * 200;\n    this.add(this.stain);\n  } // this.mesh.receiveShadow = true;\n\n}\n\nWall.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {\n  constructor: Wall\n});\n\nfunction Room(width, height, depth) {\n  THREE.Object3D.call(this);\n  var back = new Wall(width, height);\n  back.position.set(0, 0, -depth / 2);\n  this.add(back);\n  var right = new Wall(depth, height);\n  right.rotation.y = Math.PI / 2;\n  right.position.set(-width / 2, 0, 0);\n  this.add(right);\n  var left = new Wall(depth, height);\n  left.rotation.y = -Math.PI / 2;\n  left.position.set(width / 2, 0, 0);\n  this.add(left);\n  var bottom = new Wall(width, depth);\n  bottom.rotation.x = -Math.PI / 2;\n  bottom.position.set(0, -height / 2, 0);\n  this.add(bottom);\n  var top = new Wall(width, depth);\n  top.rotation.x = Math.PI / 2;\n  top.position.set(0, height / 2, 0);\n  this.add(top);\n}\n\nRoom.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {\n  constructor: Room\n});\n\nfunction Light() {\n  THREE.RectAreaLight.call(this, 0xFFFFFF, 100, 5, 40); // this.castShadow = true;\n\n  this.helper = new THREE.RectAreaLightHelper(this);\n  this.add(this.helper); // console.log(this.helper);\n\n  this.ON = Symbol('On');\n  this.OFF = Symbol('Off');\n  this.DIM = Symbol('Dim');\n  this.modes = [this.ON, this.DIM, this.OFF];\n  this.nextMode();\n}\n\nLight.prototype = Object.assign(Object.create(THREE.RectAreaLight.prototype), {\n  constructor: Light,\n  nextMode: function nextMode() {\n    var nextMode;\n\n    if (this.currentMode) {\n      if (this.currentMode.mode === this.OFF) {\n        if (Math.random() > 0.2) {\n          nextMode = this.DIM;\n        }\n      } else if (this.currentMode.mode === this.DIM) {\n        if (Math.random() > 0.2) {\n          nextMode = this.OFF;\n        }\n      }\n    }\n\n    if (!nextMode) {\n      nextMode = this.modes[Math.floor(Math.random() * 2)];\n    }\n\n    switch (nextMode) {\n      case this.OFF:\n        {\n          var duration = Math.floor(Math.random() * 0.1 * 60); // 60 FPS\n\n          this.currentMode = {\n            mode: nextMode,\n            duration: duration\n          };\n          break;\n        }\n\n      case this.DIM:\n        {\n          var _duration = Math.floor(Math.random() * 0.1 * 60); // 60 FPS\n\n\n          var intensity = Math.random() / 4;\n          this.currentMode = {\n            mode: nextMode,\n            intensity: intensity,\n            duration: _duration\n          };\n          break;\n        }\n\n      default:\n        {\n          var _duration2 = Math.floor(Math.random() * 3 * 60); // 60 FPS\n\n\n          this.currentMode = {\n            mode: nextMode,\n            duration: _duration2\n          };\n        }\n    }\n  },\n  update: function update() {\n    switch (this.currentMode.mode) {\n      case this.OFF:\n        {\n          this.intensity = 0;\n          break;\n        }\n\n      case this.DIM:\n        {\n          this.intensity = this.currentMode.intensity;\n          break;\n        }\n\n      default:\n        {\n          this.intensity = 1000;\n        }\n    }\n\n    this.currentMode.duration = this.currentMode.duration - 1;\n    this.helper.update();\n\n    if (this.currentMode.duration <= 0) {\n      this.nextMode();\n    }\n  }\n});\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction init() {\n  scene = new THREE.Scene(); // axisHelper = new THREE.AxisHelper(50);\n  // scene.add(axisHelper);\n  // ambientLight = new THREE.AmbientLight(0x000000, 0.1);\n  // scene.add(ambientLight);\n\n  var roomWidth = 250;\n  var roomHeight = 100;\n  var roomDepth = 300;\n  var room = new Room(roomWidth, roomHeight, roomDepth);\n  scene.add(room);\n\n  for (var i = 0; i < 30; i += 1) {\n    var bug = new _Bug__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    var x = -roomWidth / 2 + 1;\n    var y = -20 + Math.random() * 40;\n    var z = -20 + Math.random() * 40;\n    bug.position.set(x, y, z);\n    bug.rotation.y = Math.PI / 2;\n    bugs.push(bug);\n    scene.add(bug);\n  }\n\n  var light1 = new Light();\n  var light1Pos = {\n    x: 0,\n    y: roomHeight / 2 - 1,\n    z: 0\n  };\n  light1.position.set(light1Pos.x, light1Pos.y, light1Pos.z);\n  light1.lookAt(new THREE.Vector3(light1Pos.x, light1Pos.y - 1, light1Pos.z));\n  lights.push(light1);\n  scene.add(light1);\n  var light2 = new Light();\n  var light2Pos = {\n    x: -roomWidth / 4,\n    y: roomHeight / 2 - 1,\n    z: 0\n  };\n  light2.position.set(light2Pos.x, light2Pos.y, light2Pos.z);\n  light2.lookAt(new THREE.Vector3(light2Pos.x, light2Pos.y - 1, light2Pos.z));\n  lights.push(light2);\n  scene.add(light2);\n  var light3 = new Light();\n  var light3Pos = {\n    x: roomWidth / 4,\n    y: roomHeight / 2 - 1,\n    z: 0\n  };\n  light3.position.set(light3Pos.x, light3Pos.y, light3Pos.z);\n  light3.lookAt(new THREE.Vector3(light3Pos.x, light3Pos.y - 1, light3Pos.z));\n  lights.push(light3);\n  scene.add(light3);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  renderer.shadowMap.enabled = true;\n  renderer.shadowMap.type = THREE.PCFSoftShadowMap;\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(75, 0, 150);\n  camera.lookAt(origin);\n  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats();\n}\n\nfunction update() {\n  lights.forEach(function (light) {\n    return light.update();\n  });\n  bugs.forEach(function (bug) {\n    return bug.update();\n  });\n  stats.update();\n  orbitControls.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/room-flickering-light/index.js?");

/***/ })

/******/ });