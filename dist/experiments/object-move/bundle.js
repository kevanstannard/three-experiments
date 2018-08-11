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
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Car = function (_THREE$Object3D) {
  _inherits(Car, _THREE$Object3D);

  function Car(props) {
    _classCallCheck(this, Car);

    var _this = _possibleConstructorReturn(this, (Car.__proto__ || Object.getPrototypeOf(Car)).call(this));

    var name = props.name,
        color = props.color,
        size = props.size;


    var bodyGeometry = new THREE.BoxGeometry(size, size, size);
    var bodyMaterial = new THREE.MeshLambertMaterial({ color: color });
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, size / 2, 0);

    var arrowDirection = new THREE.Vector3(0, 0, 1).normalize();
    var arrowLength = size;
    var arrowColor = 0xffffff;
    var arrowPosition = new THREE.Vector3(0, 0, 0);
    var arrow = new THREE.ArrowHelper(arrowDirection, arrowPosition, arrowLength, arrowColor);
    body.add(arrow);

    _this.add(body);

    _this.name = name;

    var speedScale = 50 / size;
    _this.moveSpeed = 50 * speedScale; // units per second
    _this.rotationSpeed = Math.PI / 180 * 50 * speedScale; // radians per second
    return _this;
  }

  _createClass(Car, [{
    key: "rotateLeft",
    value: function rotateLeft(delta) {
      var rotationAngle = this.rotationSpeed * delta;
      this.rotateY(rotationAngle);
    }
  }, {
    key: "rotateRight",
    value: function rotateRight(delta) {
      var rotationAngle = this.rotationSpeed * delta;
      this.rotateY(-rotationAngle);
    }
  }, {
    key: "moveForward",
    value: function moveForward(delta) {
      var distance = this.moveSpeed * delta;
      var forwardDirection = this.getWorldDirection(); // Note: This is a unit vector
      forwardDirection.multiplyScalar(distance);
      this.position.add(forwardDirection);
    }
  }, {
    key: "moveBackward",
    value: function moveBackward(delta) {
      var distance = this.moveSpeed * delta;
      var backwardDirection = this.getWorldDirection().negate();
      backwardDirection.multiplyScalar(distance);
      this.position.add(backwardDirection);
    }
  }]);

  return Car;
}(THREE.Object3D);

exports.default = Car;

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _car = __webpack_require__(5);

var _car2 = _interopRequireDefault(_car);

var _botCar = __webpack_require__(61);

var _botCar2 = _interopRequireDefault(_botCar);

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
var axisHelper = void 0;
var gridHelper = void 0;
var pointLight = void 0;
var ambientLight = void 0;
var keyboard = void 0;
var car = void 0;
var botCars = void 0;
var clock = void 0;

var botCarCount = 3;

var key = {
  FORWARD: 'W',
  BACKWARD: 'S',
  LEFT: 'A',
  RIGHT: 'D',
  UP: 'space',
  DOWN: 'shift'
};

function init() {
  clock = new THREE.Clock();
  clock.start();

  keyboard = new KeyboardState();

  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(1000, 50);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  car = new _car2.default({
    name: 'Player',
    color: 0x888888,
    size: 20
  });

  scene.add(car);

  botCars = [];
  for (var i = 0; i < botCarCount; i += 1) {
    var botCar = new _botCar2.default({
      name: 'Bot',
      color: 0xff8888,
      size: 20
    });
    botCars.push(botCar);
    scene.add(botCar);
  }

  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 200, -200);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function updateCamera() {
  var carDirection = car.getWorldDirection(); // Unit vector
  var reverseDirection = carDirection.negate();
  var heightVector = new THREE.Vector3(0, 400, 0);
  var cameraVector = reverseDirection.multiplyScalar(600).add(heightVector);
  var cameraPosition = car.position.clone().add(cameraVector);
  camera.position.copy(cameraPosition);
  camera.lookAt(car.position);
}

function update() {
  var delta = clock.getDelta();

  keyboard.update();
  if (keyboard.pressed(key.LEFT)) {
    car.rotateLeft(delta);
  }
  if (keyboard.pressed(key.RIGHT)) {
    car.rotateRight(delta);
  }
  if (keyboard.pressed(key.FORWARD)) {
    car.moveForward(delta);
  }
  if (keyboard.pressed(key.BACKWARD)) {
    car.moveBackward(delta);
  }

  updateCamera();

  botCars.forEach(function (botCar) {
    return botCar.update(delta);
  });
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _car = __webpack_require__(5);

var _car2 = _interopRequireDefault(_car);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ACTION_FORWARD = -1;
var ACTION_LEFT = 0;
var ACTION_RIGHT = 1;

var shouldTurn = function shouldTurn() {
  return Math.random() < 0.5;
};
var whichTurn = function whichTurn() {
  return Math.floor(Math.random() * 2);
};

var BotCar = function (_Car) {
  _inherits(BotCar, _Car);

  function BotCar(props) {
    _classCallCheck(this, BotCar);

    var _this = _possibleConstructorReturn(this, (BotCar.__proto__ || Object.getPrototypeOf(BotCar)).call(this, props));

    _this.currentAction = ACTION_FORWARD;
    _this.timeRemaining = 0;
    return _this;
  }

  _createClass(BotCar, [{
    key: 'update',
    value: function update(delta) {
      this.timeRemaining -= delta;
      if (this.timeRemaining <= 0) {
        if (shouldTurn()) {
          this.currentAction = whichTurn();
        } else {
          this.currentAction = ACTION_FORWARD;
        }
        this.timeRemaining = 1;
      }
      switch (this.currentAction) {
        case ACTION_LEFT:
          {
            this.rotateLeft(delta);
            break;
          }
        case ACTION_RIGHT:
          {
            this.rotateRight(delta);
            break;
          }
        default:
          {
            // No default
          }
      }
      this.moveForward(delta);
    }
  }]);

  return BotCar;
}(_car2.default);

exports.default = BotCar;

/***/ })

/******/ });