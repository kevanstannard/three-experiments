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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.loadFont = loadFont;
exports.loadFonts = loadFonts;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fontLoader = new THREE.FontLoader();

var fonts = ['gentilis_bold', 'gentilis_regular', 'helvetiker_bold', 'helvetiker_regular', 'optimer_bold', 'optimer_regular'];

function loadFont(url) {
  return new Promise(function (resolve) {
    fontLoader.load(url, resolve);
  });
}

function loadFonts() {
  var promises = fonts.map(function (id) {
    var url = '../../modules/fonts/fonts/' + id + '.typeface.json';
    return loadFont(url).then(function (font) {
      return { id: id, font: font };
    });
  });
  return Promise.all(promises).then(function (results) {
    var map = results.reduce(function (acc, result) {
      return _extends({}, acc, _defineProperty({}, result.id, result.font));
    }, {});
    return map;
  });
}

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fonts = __webpack_require__(1);

var SCREEN_WIDTH = window.innerWidth;
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
var fonts = void 0;
var box = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function load() {
  return (0, _fonts.loadFonts)().then(function (theFonts) {
    fonts = theFonts;
  });
}

function VerticesAnimation(geometry) {
  this.geometry = geometry;
  this.original = geometry.clone();
  this.vertexIndex = 0;
  this.theta = 0;
}

VerticesAnimation.prototype = {
  update: function update() {
    this.theta += 0.1;
    if (this.theta > Math.PI) {
      this.theta = 0;
      this.vertexIndex = (this.vertexIndex + 1) % this.geometry.vertices.length;
    }
    var orig = this.original.vertices[this.vertexIndex];
    var curr = this.geometry.vertices[this.vertexIndex];
    var delta = Math.sin(this.theta);
    curr.x = orig.x + orig.x * delta;
    curr.y = orig.y + orig.y * delta;
    curr.z = orig.z + orig.z * delta;
    this.geometry.verticesNeedUpdate = true;
  }
};

function AnimatedBoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
  THREE.BoxGeometry.call(this, width, height, depth, widthSegments, heightSegments, depthSegments);
  this.animation = new VerticesAnimation(this);
}

AnimatedBoxGeometry.prototype = Object.assign(Object.create(THREE.BoxGeometry.prototype), {

  constructor: AnimatedBoxGeometry,

  update: function update() {
    this.animation.update();
  }
});

function Label(text) {
  var params = {
    font: fonts.helvetiker_regular,
    size: 5,
    height: 1 // Thickness
  };
  var geometry = new THREE.TextGeometry(text, params);
  var material = new THREE.MeshNormalMaterial();
  THREE.Mesh.call(this, geometry, material);
}

Label.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
  constructor: Label
});

function AnimatedBox(size, _camera) {
  this.camera = _camera;
  this.geometry = new AnimatedBoxGeometry(size, size, size);
  this.material = new THREE.MeshNormalMaterial({ wireframe: true });
  THREE.Mesh.call(this, this.geometry, this.material);

  var vertices = this.geometry.vertices;

  this.labels = [];
  for (var i = 0; i < vertices.length; i += 1) {
    var label = new Label(String(i));
    label.position.copy(vertices[i]);
    this.labels.push(label);
    this.add(label);
  }
}

AnimatedBox.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {

  constructor: AnimatedBox,

  update: function update() {
    this.geometry.update();
    for (var i = 0; i < this.geometry.vertices.length; i += 1) {
      this.labels[i].position.copy(this.geometry.vertices[i]);
      this.labels[i].lookAt(this.camera.position);
    }
  }
});

function init() {
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(100, 120, 140);
  camera.lookAt(origin);

  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  box = new AnimatedBox(50, camera);
  scene.add(box);

  // vertices
  //
  // [
  //   {"x":5,"y":5,"z":5},       // 0
  //   {"x":5,"y":5,"z":-5},      // 1
  //   {"x":5,"y":-5,"z":5},      // 2
  //   {"x":5,"y":-5,"z":-5},     // 3
  //   {"x":-5,"y":5,"z":-5},     // 4
  //   {"x":-5,"y":5,"z":5},      // 5
  //   {"x":-5,"y":-5,"z":-5},    // 6
  //   {"x":-5,"y":-5,"z":5},     // 7
  // ]
  //
  // Faces
  //
  // [{
  //     "a": 0,                  // {"x":5,"y":5,"z":5}
  //     "b": 2,                  // {"x":5,"y":-5,"z":5}
  //     "c": 1,                  // {"x":5,"y":5,"z":-5}
  //     "normal": {
  //         "x": 1,
  //         "y": 0,
  //         "z": 0
  //     },
  //     "vertexNormals": [{
  //         "x": 1,
  //         "y": 0,
  //         "z": 0
  //      }, {
  //         "x": 1,
  //         "y": 0,
  //         "z": 0
  //     }, {
  //         "x": 1,
  //         "y": 0,
  //         "z": 0
  //     }],
  //     "color": 16777215,
  //     "vertexColors": [],
  //     "materialIndex": 0
  // }, {
  //     "a": 2,
  //     "b": 3,
  //     "c": 1,
  //     "normal": {
  //         "x": 1,
  //         "y": 0,
  //         "z": 0
  //     },
  //     "vertexNormals": [{
  //         "x": 1,
  //         "y": 0,
  //         "z": 0
  //     }, {
  //         "x": 1,
  //         "y": 0,
  //         "z": 0
  //     }, {
  //         "x": 1,
  //         "y": 0,
  //         "z": 0
  //     }],
  //     "color": 16777215,
  //     "vertexColors": [],
  //     "materialIndex": 0
  // }, {
  //     "a": 4,
  //     "b": 6,
  //     "c": 5,
  //     "normal": {
  //         "x": -1,
  //         "y": 0,
  //         "z": 0
  //     },
  //     "vertexNormals": [{
  //         "x": -1,
  //         "y": 0,
  //         "z": 0
  //     }, {
  //         "x": -1,
  //         "y": 0,
  //         "z": 0
  //     }, {
  //         "x": -1,
  //         "y": 0,
  //         "z": 0
  //     }],
  //     "color": 16777215,
  //     "vertexColors": [],
  //     "materialIndex": 1
  // }, {
  //     "a": 6,
  //     "b": 7,
  //     "c": 5,
  //     "normal": {
  //         "x": -1,
  //         "y": 0,
  //         "z": 0
  //     },
  //     "vertexNormals": [{
  //         "x": -1,
  //         "y": 0,
  //         "z": 0
  //     }, {
  //         "x": -1,
  //         "y": 0,
  //         "z": 0
  //     }, {
  //         "x": -1,
  //         "y": 0,
  //         "z": 0
  //     }],
  //     "color": 16777215,
  //     "vertexColors": [],
  //     "materialIndex": 1
  // }, {
  //     "a": 4,
  //     "b": 5,
  //     "c": 1,
  //     "normal": {
  //         "x": 0,
  //         "y": 1,
  //         "z": 0
  //     },
  //     "vertexNormals": [{
  //         "x": 0,
  //         "y": 1,
  //         "z": 0
  //     }, {
  //         "x": 0,
  //         "y": 1,
  //         "z": 0
  //     }, {
  //         "x": 0,
  //         "y": 1,
  //         "z": 0
  //     }],
  //     "color": 16777215,
  //     "vertexColors": [],
  //     "materialIndex": 2
  // }, {
  //     "a": 5,
  //     "b": 0,
  //     "c": 1,
  //     "normal": {
  //         "x": 0,
  //         "y": 1,
  //         "z": 0
  //     },
  //     "vertexNormals": [{
  //         "x": 0,
  //         "y": 1,
  //         "z": 0
  //     }, {
  //         "x": 0,
  //         "y": 1,
  //         "z": 0
  //     }, {
  //         "x": 0,
  //         "y": 1,
  //         "z": 0
  //     }],
  //     "color": 16777215,
  //     "vertexColors": [],
  //     "materialIndex": 2
  // }, {
  //     "a": 7,
  //     "b": 6,
  //     "c": 2,
  //     "normal": {
  //         "x": 0,
  //         "y": -1,
  //         "z": 0
  //     },
  //     "vertexNormals": [{
  //         "x": 0,
  //         "y": -1,
  //         "z": 0
  //     }, {
  //         "x": 0,
  //         "y": -1,
  //         "z": 0
  //     }, {
  //         "x": 0,
  //         "y": -1,
  //         "z": 0
  //     }],
  //     "color": 16777215,
  //     "vertexColors": [],
  //     "materialIndex": 3
  // }, {
  //     "a": 6,
  //     "b": 3,
  //     "c": 2,
  //     "normal": {
  //         "x": 0,
  //         "y": -1,
  //         "z": 0
  //     },
  //     "vertexNormals": [{
  //         "x": 0,
  //         "y": -1,
  //         "z": 0
  //     }, {
  //         "x": 0,
  //         "y": -1,
  //         "z": 0
  //     }, {
  //         "x": 0,
  //         "y": -1,
  //         "z": 0
  //     }],
  //     "color": 16777215,
  //     "vertexColors": [],
  //     "materialIndex": 3
  // }, {
  //     "a": 5,
  //     "b": 7,
  //     "c": 0,
  //     "normal": {
  //         "x": 0,
  //         "y": 0,
  //         "z": 1
  //     },
  //     "vertexNormals": [{
  //         "x": 0,
  //         "y": 0,
  //         "z": 1
  //     }, {
  //         "x": 0,
  //         "y": 0,
  //         "z": 1
  //     }, {
  //         "x": 0,
  //         "y": 0,
  //         "z": 1
  //     }],
  //     "color": 16777215,
  //     "vertexColors": [],
  //     "materialIndex": 4
  // }, {
  //     "a": 7,
  //     "b": 2,
  //     "c": 0,
  //     "normal": {
  //         "x": 0,
  //         "y": 0,
  //         "z": 1
  //     },
  //     "vertexNormals": [{
  //         "x": 0,
  //         "y": 0,
  //         "z": 1
  //     }, {
  //         "x": 0,
  //         "y": 0,
  //         "z": 1
  //     }, {
  //         "x": 0,
  //         "y": 0,
  //         "z": 1
  //     }],
  //     "color": 16777215,
  //     "vertexColors": [],
  //     "materialIndex": 4
  // }, {
  //     "a": 1,
  //     "b": 3,
  //     "c": 4,
  //     "normal": {
  //         "x": 0,
  //         "y": 0,
  //         "z": -1
  //     },
  //     "vertexNormals": [{
  //         "x": 0,
  //         "y": 0,
  //         "z": -1
  //     }, {
  //         "x": 0,
  //         "y": 0,
  //         "z": -1
  //     }, {
  //         "x": 0,
  //         "y": 0,
  //         "z": -1
  //     }],
  //     "color": 16777215,
  //     "vertexColors": [],
  //     "materialIndex": 5
  // }, {
  //     "a": 3,
  //     "b": 6,
  //     "c": 4,
  //     "normal": {
  //         "x": 0,
  //         "y": 0,
  //         "z": -1
  //     },
  //     "vertexNormals": [{
  //         "x": 0,
  //         "y": 0,
  //         "z": -1
  //     }, {
  //         "x": 0,
  //         "y": 0,
  //         "z": -1
  //     }, {
  //         "x": 0,
  //         "y": 0,
  //         "z": -1
  //     }],
  //     "color": 16777215,
  //     "vertexColors": [],
  //     "materialIndex": 5
  // }]
  //
  // faceVertexUvs
  //
  // [
  //     [
  //         [{
  //             "x": 0,
  //             "y": 1
  //         }, {
  //             "x": 0,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 1
  //         }],
  //         [{
  //             "x": 0,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 1
  //         }],
  //         [{
  //             "x": 0,
  //             "y": 1
  //         }, {
  //             "x": 0,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 1
  //         }],
  //         [{
  //             "x": 0,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 1
  //         }],
  //         [{
  //             "x": 0,
  //             "y": 1
  //         }, {
  //             "x": 0,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 1
  //         }],
  //         [{
  //             "x": 0,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 1
  //         }],
  //         [{
  //             "x": 0,
  //             "y": 1
  //         }, {
  //             "x": 0,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 1
  //         }],
  //         [{
  //             "x": 0,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 1
  //         }],
  //         [{
  //             "x": 0,
  //             "y": 1
  //         }, {
  //             "x": 0,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 1
  //         }],
  //         [{
  //             "x": 0,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 1
  //         }],
  //         [{
  //             "x": 0,
  //             "y": 1
  //         }, {
  //             "x": 0,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 1
  //         }],
  //         [{
  //             "x": 0,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 0
  //         }, {
  //             "x": 1,
  //             "y": 1
  //         }]
  //     ]
  // ]

  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  box.update();
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

load().then(function () {
  init();
  animate();
});

/***/ })

/******/ });