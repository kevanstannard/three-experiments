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
/******/ 	return __webpack_require__(__webpack_require__.s = 93);
/******/ })
/************************************************************************/
/******/ ({

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _TetrahedronLattice = __webpack_require__(94);

var _TetrahedronLattice2 = _interopRequireDefault(_TetrahedronLattice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45;
var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
var NEAR = 1;
var FAR = 10000;

var scene = void 0;
var camera = void 0;
var renderer = void 0;
var orbitControls = void 0;
var stats = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function init() {
  var lattice = new _TetrahedronLattice2.default();
  console.log(lattice);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  var axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  var pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  var radius = 10;

  for (var i = -1; i <= 2; i += 1) {
    var gridHelperH = new THREE.GridHelper(radius * 6, 3);
    gridHelperH.position.set(radius, i * radius * 2, radius);
    scene.add(gridHelperH);
    var gridHelperV = new THREE.GridHelper(radius * 6, 3);
    gridHelperV.position.set(radius, radius, i * radius * 2);
    gridHelperV.rotation.set(Math.PI / 2, 0, 0);
    scene.add(gridHelperV);
  }

  // const geometry = new THREE.BoxGeometry(radius * 2, radius * 2, radius * 2);
  var geometry = new THREE.SphereGeometry(radius, 64, 64);
  var material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  function addSphere(x, y, z) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x * radius * 2, y * radius * 2, z * radius * 2);
    scene.add(mesh);
    // lattice.add(mesh);
  }

  addSphere(1, 0, 0);
  addSphere(-1, 0, 0);
  addSphere(0, 1, 0);
  addSphere(0, -1, 0);
  addSphere(0, 0, 1);
  addSphere(0, 0, -1);

  addSphere(1, -1, 0);
  addSphere(-1, 1, 0);

  addSphere(1, 0, -1);
  addSphere(-1, 0, 1);

  addSphere(0, 1, -1);
  addSphere(0, -1, 1);
}

function update() {
  stats.update();
  orbitControls.update();
}

function render() {
  renderer.render(scene, camera);
}

function tick() {
  update();
  render();
  requestAnimationFrame(tick);
}

init();
tick();

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Array3d = __webpack_require__(95);

var _Array3d2 = _interopRequireDefault(_Array3d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var size = 11;

// const vectors = [
//   [1, 0, 0],
//   [-1, 0, 0],
//   [0, 1, 0],
//   [0, -1, 0],
//   [0, 0, 1],
//   [0, 0, -1],
//   [1, -1, 0],
//   [-1, 1, 0],
//   [1, 0, -1],
//   [-1, 0, 1],
//   [0, 1, -1],
//   [0, -1, 1],
// ];

var vectors = [{ x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 }, { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 }, { x: 1, y: -1, z: 0 }, { x: -1, y: 1, z: 0 }, { x: 1, y: 0, z: -1 }, { x: -1, y: 0, z: 1 }, { x: 0, y: 1, z: -1 }, { x: 0, y: -1, z: 1 }];

function countNeighbours(array, node) {
  var count = 0;
  vectors.forEach(function (vector) {
    var value = array.get(node.x + vector.x, node.y + vector.y, node.z + vector.z);
    if (value) {
      count += 1;
    }
  });
  return count;
}

var TetrahedronLattice = function () {
  function TetrahedronLattice() {
    _classCallCheck(this, TetrahedronLattice);

    this.array = new _Array3d2.default(size, size, size);
    console.log(this.array);
  }

  // Find node with most neighbours and least distance


  _createClass(TetrahedronLattice, [{
    key: 'findEmpty',
    value: function findEmpty(node) {
      var currNode = node || _extends({}, this.array.origin);
      var currNodeValue = this.array.get(currNode.x, currNode.y, currNode.z);
      if (!currNodeValue) {
        var currNodeNeighbourCount = countNeighbours(this.array, currNode);
        var currNodeDistance = 0;
      }
    }

    // findEmpty(node = this.array.origin) {
    //   const a = this.array;
    //   const nodeValue = a.get(node.x, node.y, node.z);
    //   if (!nodeValue) {
    //     return node;
    //   }
    //   const allEmptyNodes = [];
    //   vectors.forEach((vector) => {
    //     const nextNode = {
    //       x: node.x + vector.x,
    //       y: node.y + vector.y,
    //       z: node.z + vector.z,
    //     };
    //     const vectorNodes = this.findEmpty(nextNode);
    //     allEmptyNodes.concat(vectorNodes);
    //   });
    //   return null;
    // }

    // add(mesh) {
    //   const node = this.findEmpty();
    //   this.array.set(node.x, node.y, node.z, mesh);
    // }

  }]);

  return TetrahedronLattice;
}();

exports.default = TetrahedronLattice;

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createArray(xSize, ySize, zSize) {
  var initial = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var xarr = [];
  for (var x = 0; x < xSize; x += 1) {
    var yarr = [];
    for (var y = 0; y < ySize; y += 1) {
      var zarr = [];
      for (var z = 0; z < zSize; z += 1) {
        zarr.push(initial);
      }
      yarr.push(zarr);
    }
    xarr.push(yarr);
  }
  return xarr;
}

var Array3d = function () {
  function Array3d(xSize, ySize, zSize) {
    _classCallCheck(this, Array3d);

    this.dimensions = [xSize, ySize, zSize];
    this.array = createArray(xSize, ySize, zSize);
    this.origin = {
      x: Math.floor(xSize / 2),
      y: Math.floor(ySize / 2),
      z: Math.floor(zSize / 2)
    };
  }

  _createClass(Array3d, [{
    key: "set",
    value: function set(x, y, z, value) {
      // TODO: If outside the bounds of the array then resize the array
      var o = this.origin;
      this.array[o.x + x][o.y + y][o.z + z] = value;
    }
  }, {
    key: "get",
    value: function get(x, y, z) {
      var o = this.origin;
      return this.array[o.x + x][o.y + y][o.z + z];
    }
  }]);

  return Array3d;
}();

exports.default = Array3d;

/***/ })

/******/ });