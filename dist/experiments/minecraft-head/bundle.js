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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ({

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _MinecraftHeadGeometry = __webpack_require__(33);

var _MinecraftHeadGeometry2 = _interopRequireDefault(_MinecraftHeadGeometry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCREEN_WIDTH = window.innerWidth; // Ref:
// https://solutiondesign.com/blog/-/blogs/webgl-and-three-js-texture-mappi-1

var SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45;
var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
var NEAR = 1;
var FAR = 10000;

var scene = void 0;
var camera = void 0;
var renderer = void 0;
var axisHelper = void 0;
var gridHelper = void 0;
var controls = void 0;
var pointLight = void 0;
var ambientLight = void 0;
var steve = void 0;
var alex = void 0;

var textureLoader = new THREE.TextureLoader();
var origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  var headGeometry = new _MinecraftHeadGeometry2.default(10);

  // Pixellated texture
  var steveTexture = textureLoader.load('../../assets/textures/minecraft/skins/steve.png');
  steveTexture.magFilter = THREE.NearestFilter;
  steveTexture.minFilter = THREE.LinearMipMapLinearFilter;

  var steveMaterial = new THREE.MeshLambertMaterial({
    map: steveTexture,
    side: THREE.DoubleSide
  });
  steve = new THREE.Mesh(headGeometry, steveMaterial);
  steve.position.set(-10, 5, 0);
  scene.add(steve);

  // Pixellated texture
  var alexTexture = textureLoader.load('../../assets/textures/minecraft/skins/alex.png');
  alexTexture.magFilter = THREE.NearestFilter;
  alexTexture.minFilter = THREE.LinearMipMapLinearFilter;

  var alexMaterial = new THREE.MeshLambertMaterial({
    map: alexTexture,
    side: THREE.DoubleSide
  });
  alex = new THREE.Mesh(headGeometry, alexMaterial);
  alex.position.set(10, 5, 0);
  scene.add(alex);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 20, 40);
  camera.lookAt(origin);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  steve.rotation.y += 0.01;
  alex.rotation.y -= 0.01;
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MinecraftHeadGeometry;
// UV Mapping
//
// UV mapping is the process of taking an image and assigning parts of that
// image to individual faces of our 3D object.
//
// UV vectors are used to specify parts of a texture that may be applied
// to faces in a geometry.
//
// UV coordinates of an image look like this:
//
//
//   (0,1)     (1,1)
//     +---------+
//     |         |
//   v |         |
//     |         |
//     +---------+
//   (0,0)  u  (1,0)
//
//
// Suppose our texture had 4 sub-images:
//
//
//   (0,1)        (1,1)
//     +------+-----+
//     |   A  |  B  |
//     |      |     |
//   v +------+-----+
//     |   C  |  D  |
//     |      |     |
//     +------+-----+
//   (0,0)    u   (1,0)
//
//
// The corners of the "A" image would be:
//   Top Left:     (0, 1)
//   Bottom Left:  (0, 0.5)
//   Bottom Right: (0.5, 0.5)
//   Top Right:    (0.5, 0)
//

// Default width and height of a Minecraft skin
var SKIN_WIDTH = 64;
var SKIN_HEIGHT = 64;

function faceVectors(x, y, w, h) {
  // Convert skin coordinates that have (0, 0) in the top left corner
  // into a UV orientation that has (0, 0) in the bottom left corner.
  var uvPix = {
    x: x,
    y: SKIN_HEIGHT - y,
    w: w,
    h: h
  };
  // Convert from pixel coordinates (e.g. 0 to 64)
  // into to UV coordinates (e.g. from 0 to 1)
  var uv = {
    x: uvPix.x / SKIN_WIDTH,
    y: uvPix.y / SKIN_HEIGHT,
    w: uvPix.w / SKIN_WIDTH,
    h: uvPix.h / SKIN_HEIGHT
  };
  // Convert to points
  var points = {
    p1: { x: uv.x, y: uv.y }, // Top left
    p2: { x: uv.x, y: uv.y - uv.h }, // Bottom left
    p3: { x: uv.x + uv.w, y: uv.y - uv.h }, // Bottom right
    p4: { x: uv.x + uv.w, y: uv.y } // Top right
  };
  // Create vectors
  var vectors = [new THREE.Vector2(points.p1.x, points.p1.y), new THREE.Vector2(points.p2.x, points.p2.y), new THREE.Vector2(points.p3.x, points.p3.y), new THREE.Vector2(points.p4.x, points.p4.y)];
  return vectors;
}

function MinecraftHeadGeometry(size) {
  var head = {
    front: faceVectors(8, 8, 8, 8),
    right: faceVectors(0, 8, 8, 8),
    left: faceVectors(16, 8, 8, 8),
    back: faceVectors(24, 8, 8, 8),
    top: faceVectors(8, 0, 8, 8),
    bottom: faceVectors(16, 0, 8, 8)
  };

  var geometry = new THREE.CubeGeometry(size, size, size);

  // Clear out any UV mapping that may have already existed on the cube
  geometry.faceVertexUvs[0] = [];

  geometry.faceVertexUvs[0][0] = [head.left[0], head.left[1], head.left[3]];
  geometry.faceVertexUvs[0][1] = [head.left[1], head.left[2], head.left[3]];

  geometry.faceVertexUvs[0][2] = [head.right[0], head.right[1], head.right[3]];
  geometry.faceVertexUvs[0][3] = [head.right[1], head.right[2], head.right[3]];

  geometry.faceVertexUvs[0][4] = [head.top[0], head.top[1], head.top[3]];
  geometry.faceVertexUvs[0][5] = [head.top[1], head.top[2], head.top[3]];

  geometry.faceVertexUvs[0][6] = [head.bottom[0], head.bottom[1], head.bottom[3]];
  geometry.faceVertexUvs[0][7] = [head.bottom[1], head.bottom[2], head.bottom[3]];

  geometry.faceVertexUvs[0][8] = [head.front[0], head.front[1], head.front[3]];
  geometry.faceVertexUvs[0][9] = [head.front[1], head.front[2], head.front[3]];

  geometry.faceVertexUvs[0][10] = [head.back[0], head.back[1], head.back[3]];
  geometry.faceVertexUvs[0][11] = [head.back[1], head.back[2], head.back[3]];

  return geometry;
}

/***/ })

/******/ });