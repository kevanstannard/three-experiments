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
/******/ 	return __webpack_require__(__webpack_require__.s = 88);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Orbit = function (_THREE$Object3D) {
  _inherits(Orbit, _THREE$Object3D);

  function Orbit(radius) {
    _classCallCheck(this, Orbit);

    var _this = _possibleConstructorReturn(this, (Orbit.__proto__ || Object.getPrototypeOf(Orbit)).call(this));

    var geometry = new THREE.CircleGeometry(radius, 1024);
    geometry.vertices.shift(); // Remove the line that goes from the center to the ring
    var material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2
    });
    var mesh = new THREE.Line(geometry, material);
    _this.add(mesh);
    return _this;
  }

  return Orbit;
}(THREE.Object3D);

exports.default = Orbit;

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = orbitPeriodScale;
function orbitPeriodScale(periodDays) {
  return periodDays / (365 * 24 * 6);
}

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _scaled = __webpack_require__(89);

var _scaled2 = _interopRequireDefault(_scaled);

var _factory = __webpack_require__(92);

var _factory2 = _interopRequireDefault(_factory);

var _solarSystem = __webpack_require__(96);

var _solarSystem2 = _interopRequireDefault(_solarSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45;
var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
var NEAR = 1;
var FAR = 5000000;

var prevTime = Date.now();
var scene = void 0;
var camera = void 0;
var renderer = void 0;
var orbitControls = void 0;
var stats = void 0;
var solarSystem = void 0;

var followObject = void 0;
var followObjectWorldPosition = new THREE.Vector3();

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function init() {
  scene = new THREE.Scene();

  var axisHelper = new THREE.AxisHelper(1000);
  scene.add(axisHelper);

  solarSystem = new _solarSystem2.default();

  var sol = (0, _factory2.default)(_scaled2.default);
  solarSystem.addBody(sol);

  scene.add(solarSystem);

  // console.log(sol.children);
  // followObject = sol.children[9];

  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  var pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, -100000, 100000);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  if (!followObject) {
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  }

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
}

function update() {
  var time = Date.now();
  var delta = time - prevTime;
  prevTime = time;
  solarSystem.update(delta);
  stats.update();
  if (!followObject) {
    orbitControls.update();
  } else {
    followObject.getWorldPosition(followObjectWorldPosition);
    camera.position.set(followObjectWorldPosition.x, followObjectWorldPosition.y, 5000);
    camera.lookAt(followObjectWorldPosition);
  }
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

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = __webpack_require__(90);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RADIUS_SCALE = 0.01;
var ORBIT_RADIUS_SCALE = 0.0001;

function scale(model) {
  var scaledModel = _extends({}, model);
  if (model.radius) {
    scaledModel.radius = model.radius * RADIUS_SCALE;
  }
  if (model.orbitRadius) {
    scaledModel.orbitRadius = model.orbitRadius * ORBIT_RADIUS_SCALE;
  }
  return scaledModel;
}

function scaleMoon(model) {
  var scaled = scale(model);
  return scaled;
}

function scalePlanet(model) {
  var scaled = scale(model);
  if (model.moons) {
    scaled.moons = model.moons.map(scaleMoon);
  }
  return scaled;
}

function scaleStar(model) {
  var scaled = scale(model);
  if (model.planets) {
    scaled.planets = model.planets.map(scalePlanet);
  }
  return scaled;
}

exports.default = scaleStar(_index2.default);

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(91);

exports.default = {
  name: 'sol',
  radius: 695700,
  color: 0xffff00,
  planets: [{
    name: 'mercury',
    color: 0xffffff,
    radius: 2440, // kms
    orbitRadius: 58000000, // kms
    orbitPeriod: 88 // days
  }, {
    name: 'venus',
    color: 0xd2691e,
    radius: 6052, // kms
    orbitRadius: 108000000, // kms
    orbitPeriod: 225 // days
  }, {
    name: 'earth',
    color: 0x0000ff,
    radius: 6371, // kms
    orbitRadius: 150000000, // kms
    orbitPeriod: 365, // days
    moons: [{
      name: 'moon',
      color: 0xffffff,
      radius: 1737, // kms
      orbitRadius: 384000, // kms
      orbitPeriod: 27 // days
    }]
  }, {
    name: 'mars',
    color: 0xff0000,
    radius: 3390, // kms
    orbitRadius: 230000000, // kms
    orbitPeriod: 687 // days
  }, {
    name: 'jupiter',
    color: 0xff6347,
    radius: 69911, // kms
    orbitRadius: 778 * _constants.ONE_MILLION, // kms
    orbitPeriod: 4329, // days
    moons: [{
      name: 'ganymede',
      color: 0xffffff,
      radius: 5262 / 2,
      orbitRadius: 1.07 * _constants.ONE_MILLION,
      orbitPeriod: 7
    }, {
      name: 'callisto',
      color: 0xffffff,
      radius: 4821 / 2,
      orbitRadius: 1.8827 * _constants.ONE_MILLION,
      orbitPeriod: 17
    }, {
      name: 'io',
      color: 0xffffff,
      radius: 3660 / 2,
      orbitRadius: 0.422 * _constants.ONE_MILLION,
      orbitPeriod: 1.7691
    }]
  }, {
    name: 'saturn',
    color: 0xffd700,
    radius: 58232, // kms
    orbitRadius: 1.4 * _constants.ONE_BILLION, // kms
    orbitPeriod: 10759 // days
  }, {
    name: 'uranus',
    color: 0xccffff,
    radius: 25362, // kms
    orbitRadius: 3 * _constants.ONE_BILLION, // kms
    orbitPeriod: 84 * 365 // days
  }, {
    name: 'neptune',
    color: 0x336699,
    radius: 24622, // kms
    orbitRadius: 4.5 * _constants.ONE_BILLION, // kms
    orbitPeriod: 165 * 365 // days
  }]
};

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ONE_MILLION = exports.ONE_MILLION = 1000000;
var ONE_BILLION = exports.ONE_BILLION = ONE_MILLION * 1000;

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _star = __webpack_require__(93);

var _star2 = _interopRequireDefault(_star);

var _planet = __webpack_require__(94);

var _planet2 = _interopRequireDefault(_planet);

var _moon = __webpack_require__(95);

var _moon2 = _interopRequireDefault(_moon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMoon(moonModel) {
  var moon = new _moon2.default(moonModel);
  return moon;
}

function createPlanet(planetModel) {
  var planet = new _planet2.default(planetModel);
  if (planetModel.moons) {
    planetModel.moons.forEach(function (moonModel) {
      var moon = createMoon(moonModel);
      planet.addMoon(moon);
    });
  }
  return planet;
}

function createStar(starModel) {
  var star = new _star2.default(starModel);
  if (starModel.planets) {
    starModel.planets.forEach(function (planetModel) {
      var planet = createPlanet(planetModel);
      star.addPlanet(planet);
    });
  }
  return star;
}

exports.default = createStar;

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _orbit = __webpack_require__(6);

var _orbit2 = _interopRequireDefault(_orbit);

var _orbitPeriodScale = __webpack_require__(7);

var _orbitPeriodScale2 = _interopRequireDefault(_orbitPeriodScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function daysToSeconds(days) {
  return days * 24 * 60 * 60;
}

var Star = function (_THREE$Object3D) {
  _inherits(Star, _THREE$Object3D);

  function Star(props) {
    _classCallCheck(this, Star);

    var _this = _possibleConstructorReturn(this, (Star.__proto__ || Object.getPrototypeOf(Star)).call(this));

    var name = props.name,
        radius = props.radius,
        color = props.color;

    var geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.25 });
    var mesh = new THREE.Mesh(geometry, material);
    _this.add(mesh);
    _this.name = name;
    _this.radius = radius;
    _this.satellites = [];
    _this.prevTime = 0;
    return _this;
  }

  _createClass(Star, [{
    key: 'addPlanet',
    value: function addPlanet(planet) {
      var satellite = {
        planet: planet,
        x: 0,
        y: 0,
        z: 0,
        angle: 0,
        orbitRadius: this.radius + planet.orbitRadius + planet.radius
      };
      this.satellites.push(satellite);
      this.add(planet);
      var orbit = new _orbit2.default(satellite.orbitRadius);
      this.add(orbit);
    }
  }, {
    key: 'update',
    value: function update(delta) {
      this.satellites.forEach(function (satellite) {
        var orbitPeriod = (0, _orbitPeriodScale2.default)(satellite.planet.orbitPeriod);
        var orbitAnglePerSecond = 2 * Math.PI / daysToSeconds(orbitPeriod);
        var deltaSeconds = delta / 1000;
        var angleDelta = orbitAnglePerSecond * deltaSeconds;
        satellite.angle += angleDelta;
        satellite.x = satellite.orbitRadius * Math.cos(satellite.angle);
        satellite.y = satellite.orbitRadius * Math.sin(satellite.angle);
        satellite.planet.position.set(satellite.x, satellite.y, satellite.z);
        satellite.planet.update(delta);
      });
    }
  }]);

  return Star;
}(THREE.Object3D);

exports.default = Star;

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _orbit = __webpack_require__(6);

var _orbit2 = _interopRequireDefault(_orbit);

var _orbitPeriodScale = __webpack_require__(7);

var _orbitPeriodScale2 = _interopRequireDefault(_orbitPeriodScale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function daysToSeconds(days) {
  return days * 24 * 60 * 60;
}

var Planet = function (_THREE$Object3D) {
  _inherits(Planet, _THREE$Object3D);

  function Planet(props) {
    _classCallCheck(this, Planet);

    var _this = _possibleConstructorReturn(this, (Planet.__proto__ || Object.getPrototypeOf(Planet)).call(this));

    var name = props.name,
        radius = props.radius,
        color = props.color,
        orbitRadius = props.orbitRadius,
        orbitPeriod = props.orbitPeriod;


    var geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: color });
    var mesh = new THREE.Mesh(geometry, material);
    _this.add(mesh);

    _this.name = name;
    _this.radius = radius;
    _this.orbitRadius = orbitRadius;
    _this.orbitPeriod = orbitPeriod;

    _this.satellites = [];

    _this.prev = 0;
    return _this;
  }

  _createClass(Planet, [{
    key: 'addMoon',
    value: function addMoon(moon) {
      var orbitPeriod = (0, _orbitPeriodScale2.default)(moon.orbitPeriod);
      var satellite = {
        moon: moon,
        x: 0,
        y: 0,
        z: 0,
        angle: 0,
        orbitRadius: this.radius + moon.orbitRadius + moon.radius,
        orbitPeriod: orbitPeriod,
        orbitAnglePerSecond: 2 * Math.PI / daysToSeconds(orbitPeriod)
      };
      this.satellites.push(satellite);
      this.add(moon);
      var orbit = new _orbit2.default(satellite.orbitRadius);
      orbit.name = moon.name + '-orbit';
      this.add(orbit);
    }
  }, {
    key: 'update',
    value: function update(delta) {
      this.satellites.forEach(function (satellite) {
        var deltaSeconds = delta / 1000;
        var angleDelta = satellite.orbitAnglePerSecond * deltaSeconds;
        satellite.angle += angleDelta;
        satellite.x = satellite.orbitRadius * Math.cos(satellite.angle);
        satellite.y = satellite.orbitRadius * Math.sin(satellite.angle);
        satellite.moon.position.set(satellite.x, satellite.y, satellite.z);
      });
    }
  }]);

  return Planet;
}(THREE.Object3D);

exports.default = Planet;

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Moon = function (_THREE$Object3D) {
  _inherits(Moon, _THREE$Object3D);

  function Moon(props) {
    _classCallCheck(this, Moon);

    var _this = _possibleConstructorReturn(this, (Moon.__proto__ || Object.getPrototypeOf(Moon)).call(this));

    var name = props.name,
        radius = props.radius,
        color = props.color,
        orbitRadius = props.orbitRadius,
        orbitPeriod = props.orbitPeriod;


    var geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: color });
    var mesh = new THREE.Mesh(geometry, material);
    _this.add(mesh);

    _this.name = name;
    _this.radius = radius;
    _this.orbitRadius = orbitRadius;
    _this.orbitPeriod = orbitPeriod;
    return _this;
  }

  return Moon;
}(THREE.Object3D);

exports.default = Moon;

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SolarSystem = function (_THREE$Object3D) {
  _inherits(SolarSystem, _THREE$Object3D);

  function SolarSystem() {
    _classCallCheck(this, SolarSystem);

    var _this = _possibleConstructorReturn(this, (SolarSystem.__proto__ || Object.getPrototypeOf(SolarSystem)).call(this));

    _this.bodies = [];
    return _this;
  }

  _createClass(SolarSystem, [{
    key: "addBody",
    value: function addBody(body) {
      this.bodies.push(body);
      this.add(body);
    }
  }, {
    key: "update",
    value: function update(delta) {
      this.bodies.forEach(function (body) {
        body.update(delta);
      });
    }
  }]);

  return SolarSystem;
}(THREE.Object3D);

exports.default = SolarSystem;

/***/ })

/******/ });