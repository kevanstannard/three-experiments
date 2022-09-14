/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/experiments/room-flickering-light/Bug.js":
/*!******************************************************!*\
  !*** ./src/experiments/room-flickering-light/Bug.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction Bug() {\n    THREE.Object3D.call(this);\n    // const geometry = new THREE.SphereGeometry(1, 2, 2, 0, Math.PI);\n    var geometry = new THREE.CircleBufferGeometry(0.5);\n    var material = new THREE.MeshBasicMaterial({\n        color: 0x000000\n    });\n    this.sphere = new THREE.Mesh(geometry, material);\n    this.sphere.castShadow = true;\n    this.sphere.receiveShadow = false;\n    this.add(this.sphere);\n}\nBug.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {\n    constructor: Bug,\n    update: function update() {\n        if (this.moveSteps) {\n            this.sphere.position.x += this.moveDelta.x;\n            this.sphere.position.y += this.moveDelta.y;\n            this.moveSteps -= 1;\n            return;\n        }\n        var wantsToMove = Math.random() > 0.9999;\n        if (wantsToMove) {\n            this.moveTarget = {\n                x: -20 + Math.random() * 40,\n                y: -20 + Math.random() * 40\n            };\n            this.moveSteps = 60 * 3;\n            this.moveDelta = {\n                x: this.moveTarget.x / this.moveSteps,\n                y: this.moveTarget.y / this.moveSteps\n            };\n        }\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bug);\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/room-flickering-light/Bug.js?");

/***/ }),

/***/ "./src/experiments/room-flickering-light/index.js":
/*!********************************************************!*\
  !*** ./src/experiments/room-flickering-light/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Bug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bug */ \"./src/experiments/room-flickering-light/Bug.js\");\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\n// let axisHelper;\nvar orbitControls;\n// let ambientLight;\nvar stats;\n// let rectLight;\n// let rectLightHelper;\nvar lights = [];\nvar bugs = [];\nvar origin = new THREE.Vector3(0, 0, 0);\n// function Wall(width, height) {\n//   const material = new THREE.MeshStandardMaterial({\n//     color: 0xffffff,\n//     metalness: 0,\n//     roughness: 1,\n//     side: THREE.DoubleSide,\n//   });\n//   const geometry = new THREE.PlaneBufferGeometry(width, height);\n//   THREE.Mesh.call(this, geometry, material);\n//   this.receiveShadow = true;\n// }\n//\n// Wall.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {\n//   constructor: Wall,\n// });\nfunction Wall(width, height) {\n    THREE.Object3D.call(this);\n    var material = new THREE.MeshStandardMaterial({\n        color: 0xffffff,\n        metalness: 0,\n        roughness: 1,\n        side: THREE.DoubleSide\n    });\n    var geometry = new THREE.PlaneBufferGeometry(width, height);\n    this.wall = new THREE.Mesh(geometry, material);\n    this.add(this.wall);\n    var numStains = Math.floor(Math.random() * 5);\n    for(var i = 0; i < numStains; i += 1){\n        var stainSize = 50 + Math.random() * 200;\n        var stainGeometry = new THREE.CircleBufferGeometry(stainSize);\n        var stainMaterial = new THREE.MeshStandardMaterial({\n            color: 0xdddddd,\n            metalness: 0,\n            roughness: 1\n        });\n        this.stain = new THREE.Mesh(stainGeometry, stainMaterial);\n        this.stain.position.z = 0.5;\n        this.stain.position.x = -100 + Math.random() * 200;\n        this.stain.position.y = -100 + Math.random() * 200;\n        this.add(this.stain);\n    }\n// this.mesh.receiveShadow = true;\n}\nWall.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {\n    constructor: Wall\n});\nfunction Room(width, height, depth) {\n    THREE.Object3D.call(this);\n    var back = new Wall(width, height);\n    back.position.set(0, 0, -depth / 2);\n    this.add(back);\n    var right = new Wall(depth, height);\n    right.rotation.y = Math.PI / 2;\n    right.position.set(-width / 2, 0, 0);\n    this.add(right);\n    var left = new Wall(depth, height);\n    left.rotation.y = -Math.PI / 2;\n    left.position.set(width / 2, 0, 0);\n    this.add(left);\n    var bottom = new Wall(width, depth);\n    bottom.rotation.x = -Math.PI / 2;\n    bottom.position.set(0, -height / 2, 0);\n    this.add(bottom);\n    var top = new Wall(width, depth);\n    top.rotation.x = Math.PI / 2;\n    top.position.set(0, height / 2, 0);\n    this.add(top);\n}\nRoom.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {\n    constructor: Room\n});\nfunction Light() {\n    THREE.RectAreaLight.call(this, 0xFFFFFF, 100, 5, 40);\n    // this.castShadow = true;\n    this.helper = new THREE.RectAreaLightHelper(this);\n    this.add(this.helper);\n    // console.log(this.helper);\n    this.ON = Symbol(\"On\");\n    this.OFF = Symbol(\"Off\");\n    this.DIM = Symbol(\"Dim\");\n    this.modes = [\n        this.ON,\n        this.DIM,\n        this.OFF\n    ];\n    this.nextMode();\n}\nLight.prototype = Object.assign(Object.create(THREE.RectAreaLight.prototype), {\n    constructor: Light,\n    nextMode: function nextMode() {\n        var nextMode1;\n        if (this.currentMode) {\n            if (this.currentMode.mode === this.OFF) {\n                if (Math.random() > 0.2) {\n                    nextMode1 = this.DIM;\n                }\n            } else if (this.currentMode.mode === this.DIM) {\n                if (Math.random() > 0.2) {\n                    nextMode1 = this.OFF;\n                }\n            }\n        }\n        if (!nextMode1) {\n            nextMode1 = this.modes[Math.floor(Math.random() * 2)];\n        }\n        switch(nextMode1){\n            case this.OFF:\n                {\n                    var duration = Math.floor(Math.random() * 0.1 * 60); // 60 FPS\n                    this.currentMode = {\n                        mode: nextMode1,\n                        duration: duration\n                    };\n                    break;\n                }\n            case this.DIM:\n                {\n                    var duration1 = Math.floor(Math.random() * 0.1 * 60); // 60 FPS\n                    var intensity = Math.random() / 4;\n                    this.currentMode = {\n                        mode: nextMode1,\n                        intensity: intensity,\n                        duration: duration1\n                    };\n                    break;\n                }\n            default:\n                {\n                    var duration2 = Math.floor(Math.random() * 3 * 60); // 60 FPS\n                    this.currentMode = {\n                        mode: nextMode1,\n                        duration: duration2\n                    };\n                }\n        }\n    },\n    update: function update() {\n        switch(this.currentMode.mode){\n            case this.OFF:\n                {\n                    this.intensity = 0;\n                    break;\n                }\n            case this.DIM:\n                {\n                    this.intensity = this.currentMode.intensity;\n                    break;\n                }\n            default:\n                {\n                    this.intensity = 1000;\n                }\n        }\n        this.currentMode.duration = this.currentMode.duration - 1;\n        this.helper.update();\n        if (this.currentMode.duration <= 0) {\n            this.nextMode();\n        }\n    }\n});\nfunction initStats() {\n    stats = new Stats();\n    stats.domElement.style.position = \"absolute\";\n    stats.domElement.style.left = \"0px\";\n    stats.domElement.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction init() {\n    scene = new THREE.Scene();\n    // axisHelper = new THREE.AxisHelper(50);\n    // scene.add(axisHelper);\n    // ambientLight = new THREE.AmbientLight(0x000000, 0.1);\n    // scene.add(ambientLight);\n    var roomWidth = 250;\n    var roomHeight = 100;\n    var roomDepth = 300;\n    var room = new Room(roomWidth, roomHeight, roomDepth);\n    scene.add(room);\n    for(var i = 0; i < 30; i += 1){\n        var bug = new _Bug__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        var x = -roomWidth / 2 + 1;\n        var y = -20 + Math.random() * 40;\n        var z = -20 + Math.random() * 40;\n        bug.position.set(x, y, z);\n        bug.rotation.y = Math.PI / 2;\n        bugs.push(bug);\n        scene.add(bug);\n    }\n    var light1 = new Light();\n    var light1Pos = {\n        x: 0,\n        y: roomHeight / 2 - 1,\n        z: 0\n    };\n    light1.position.set(light1Pos.x, light1Pos.y, light1Pos.z);\n    light1.lookAt(new THREE.Vector3(light1Pos.x, light1Pos.y - 1, light1Pos.z));\n    lights.push(light1);\n    scene.add(light1);\n    var light2 = new Light();\n    var light2Pos = {\n        x: -roomWidth / 4,\n        y: roomHeight / 2 - 1,\n        z: 0\n    };\n    light2.position.set(light2Pos.x, light2Pos.y, light2Pos.z);\n    light2.lookAt(new THREE.Vector3(light2Pos.x, light2Pos.y - 1, light2Pos.z));\n    lights.push(light2);\n    scene.add(light2);\n    var light3 = new Light();\n    var light3Pos = {\n        x: roomWidth / 4,\n        y: roomHeight / 2 - 1,\n        z: 0\n    };\n    light3.position.set(light3Pos.x, light3Pos.y, light3Pos.z);\n    light3.lookAt(new THREE.Vector3(light3Pos.x, light3Pos.y - 1, light3Pos.z));\n    lights.push(light3);\n    scene.add(light3);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    renderer.shadowMap.enabled = true;\n    renderer.shadowMap.type = THREE.PCFSoftShadowMap;\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(75, 0, 150);\n    camera.lookAt(origin);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n}\nfunction update() {\n    lights.forEach(function(light) {\n        return light.update();\n    });\n    bugs.forEach(function(bug) {\n        return bug.update();\n    });\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/room-flickering-light/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/experiments/room-flickering-light/index.js");
/******/ 	
/******/ })()
;