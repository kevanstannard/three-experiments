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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/slides/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/slides/index.js":
/*!*****************************************!*\
  !*** ./src/experiments/slides/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer; // let orbitControls;\n\nvar keyboard;\nvar axis;\nvar animateDirection = 0;\nvar animateRotation = 0;\nvar materialFront;\nvar materialRight;\nvar materialBack;\nvar materialLeft;\nvar SPEED = Math.PI / 2 / 60;\nvar PLANE_WIDTH = 180;\nvar PLANE_HEIGHT = 100;\nvar DISTANCE = 100;\nvar key = {\n  FORWARD: 'W',\n  BACKWARD: 'S',\n  LEFT: 'A',\n  RIGHT: 'D',\n  UP: 'space',\n  DOWN: 'shift'\n};\nvar slides = ['../../assets/textures/slides/broccoli.jpg', '../../assets/textures/slides/carrots.jpg', '../../assets/textures/slides/cauliflower.jpg', '../../assets/textures/slides/onions.jpg', '../../assets/textures/slides/pumpkin.jpg'];\nvar textureLoader = new THREE.TextureLoader();\nvar textures = slides.map(function (slide) {\n  return textureLoader.load(slide);\n});\nvar nextTexture = 0;\nvar currentTexture = 0;\n\nvar indexAt = function indexAt(index) {\n  if (index < 0) {\n    return (textures.length - -index % textures.length) % textures.length;\n  }\n\n  return index % textures.length;\n};\n\nvar textureAt = function textureAt(index) {\n  return textures[indexAt(index)];\n};\n\nfunction init() {\n  keyboard = new KeyboardState();\n  scene = new THREE.Scene();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(200, 200, 200);\n  camera.lookAt(new THREE.Vector3()); // camera.position.set(0, 0, DISTANCE - 10);\n\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT); // orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement); // const gridHelper = new THREE.GridHelper(100, 10);\n  // scene.add(gridHelper);\n  // const axisHelper = new THREE.AxisHelper(100);\n  // scene.add(axisHelper);\n  // const markerGeometry = new THREE.SphereGeometry(5);\n  // const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });\n  // const marker = new THREE.Mesh(markerGeometry, markerMaterial);\n  // marker.position.setY(60);\n\n  axis = new THREE.Object3D();\n  var geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);\n  var textureFront = textureAt(0);\n  materialFront = new THREE.MeshBasicMaterial({\n    map: textureFront,\n    side: THREE.DoubleSide\n  });\n  var planeFront = new THREE.Mesh(geometry, materialFront); // planeFront.add(marker);\n\n  planeFront.position.setZ(-DISTANCE);\n  axis.add(planeFront);\n  var textureRight = textureAt(1);\n  materialRight = new THREE.MeshBasicMaterial({\n    map: textureRight,\n    side: THREE.DoubleSide\n  });\n  var planeRight = new THREE.Mesh(geometry, materialRight);\n  planeRight.position.setX(DISTANCE);\n  planeRight.rotateY(-Math.PI / 2);\n  axis.add(planeRight);\n  var textureLeft = textureAt(-1);\n  materialLeft = new THREE.MeshBasicMaterial({\n    map: textureLeft,\n    side: THREE.DoubleSide\n  });\n  var planeLeft = new THREE.Mesh(geometry, materialLeft);\n  planeLeft.position.setX(-DISTANCE);\n  planeLeft.rotateY(Math.PI / 2);\n  axis.add(planeLeft);\n  var textureBack = null;\n  materialBack = new THREE.MeshBasicMaterial({\n    map: textureBack,\n    side: THREE.DoubleSide\n  });\n  var planeBack = new THREE.Mesh(geometry, materialBack);\n  planeBack.position.setZ(DISTANCE);\n  planeBack.rotateY(-Math.PI);\n  axis.add(planeBack);\n  scene.add(axis);\n  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n  scene.add(ambientLight);\n  var pointLight = new THREE.PointLight(0xffffff, 1, 1000);\n  pointLight.position.set(50, 200, -100);\n  scene.add(pointLight);\n}\n\nfunction update() {\n  keyboard.update();\n\n  if (animateDirection === 0) {\n    if (keyboard.pressed(key.LEFT)) {\n      animateDirection = -1;\n      nextTexture = indexAt(currentTexture - 1);\n      materialBack.map = textureAt(nextTexture - 1);\n      materialBack.needsUpdate = true;\n    }\n\n    if (keyboard.pressed(key.RIGHT)) {\n      animateDirection = 1;\n      nextTexture = indexAt(currentTexture + 1);\n      materialBack.map = textureAt(nextTexture + 1);\n      materialBack.needsUpdate = true;\n    }\n  } else {\n    var distance = SPEED * animateDirection;\n    animateRotation += distance;\n\n    if (animateRotation < -Math.PI / 2 || animateRotation > Math.PI / 2) {\n      animateDirection = 0;\n      animateRotation = 0;\n      currentTexture = nextTexture;\n      nextTexture = 0;\n      materialLeft.map = textureAt(currentTexture - 1);\n      materialLeft.needsUpdate = true;\n      materialFront.map = textureAt(currentTexture);\n      materialFront.needsUpdate = true;\n      materialRight.map = textureAt(currentTexture + 1);\n      materialRight.needsUpdate = true;\n      materialBack.map = null;\n      materialBack.needsUpdate = true;\n      axis.rotation.y = 0;\n    } else {\n      axis.rotation.y += distance;\n    }\n  } // orbitControls.update();\n\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/slides/index.js?");

/***/ })

/******/ });