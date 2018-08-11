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
/******/ 	return __webpack_require__(__webpack_require__.s = 51);
/******/ })
/************************************************************************/
/******/ ({

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bot = __webpack_require__(52);

var _bot2 = _interopRequireDefault(_bot);

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
var bot = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  var gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  var axisHelper = new THREE.AxesHelper(100);
  scene.add(axisHelper);

  bot = new _bot2.default();
  scene.add(bot);

  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  var pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);
}

function update() {
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

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bot = function (_THREE$Object3D) {
  _inherits(Bot, _THREE$Object3D);

  function Bot() {
    _classCallCheck(this, Bot);

    var _this = _possibleConstructorReturn(this, (Bot.__proto__ || Object.getPrototypeOf(Bot)).call(this));

    var headSize = new THREE.Vector3(32, 16, 32);
    var bodySize = new THREE.Vector3(headSize.x, headSize.y * 1.5, headSize.z);
    var armSize = new THREE.Vector3(headSize.x, bodySize.y / 2, headSize.z / 2);
    var legSize = new THREE.Vector3(headSize.x / 2 - 2, bodySize.y, headSize.z);

    var headJointPosition = new THREE.Vector3(0, bodySize.y / 2 + headSize.y / 2 + 1, 0);

    var leftArmJointPosition = new THREE.Vector3(bodySize.x / 2 + armSize.x / 2 + 1, -armSize.y / 2, 0);

    var rightArmJointPosition = new THREE.Vector3(-(bodySize.x / 2 + armSize.x / 2 + 1), -armSize.y / 2, 0);

    var armPosition = new THREE.Vector3(0, armSize.y / 2, 0);

    var leftLegJointPosition = new THREE.Vector3(bodySize.x / 4, -(bodySize.y / 2 + 1), 0);

    var rightLegJointPosition = new THREE.Vector3(-(bodySize.x / 4), -(bodySize.y / 2 + 1), 0);

    var legPosition = new THREE.Vector3(0, -legSize.y / 2, 0);

    var jointGeometry = new THREE.SphereGeometry(headSize.x / 2);
    var jointMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });

    var material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

    var bodyGeometry = new THREE.BoxGeometry(bodySize.x, bodySize.y, bodySize.z);
    var body = new THREE.Mesh(bodyGeometry, material);

    var headJoint = new THREE.Mesh(jointGeometry, jointMaterial);
    var headGeometry = new THREE.BoxGeometry(headSize.x, headSize.y, headSize.z);
    var head = new THREE.Mesh(headGeometry, material);
    headJoint.add(head);
    headJoint.position.copy(headJointPosition);

    var armGeometry = new THREE.BoxGeometry(armSize.x, armSize.y, armSize.z);

    var rightArmJoint = new THREE.Object3D();
    var rightArm = new THREE.Mesh(armGeometry, material);
    rightArmJoint.add(rightArm);
    rightArm.position.copy(armPosition);
    rightArmJoint.position.copy(leftArmJointPosition);

    var leftArmJoint = new THREE.Object3D();
    var leftArm = new THREE.Mesh(armGeometry, material);
    leftArmJoint.add(leftArm);
    leftArm.position.copy(armPosition);
    leftArmJoint.position.copy(rightArmJointPosition);

    var legGeometry = new THREE.BoxGeometry(legSize.x, legSize.y, legSize.z);

    var rightLegJoint = new THREE.Object3D();
    var rightLeg = new THREE.Mesh(legGeometry, material);
    rightLegJoint.add(rightLeg);
    rightLeg.position.copy(legPosition);
    rightLegJoint.position.copy(rightLegJointPosition);

    var leftLegJoint = new THREE.Object3D();
    var leftLeg = new THREE.Mesh(legGeometry, material);
    leftLegJoint.add(leftLeg);
    leftLeg.position.copy(legPosition);
    leftLegJoint.position.copy(leftLegJointPosition);

    _this.add(headJoint);
    _this.add(body);
    _this.add(rightArmJoint);
    _this.add(leftArmJoint);
    _this.add(rightLegJoint);
    _this.add(leftLegJoint);
    return _this;
  }

  return Bot;
}(THREE.Object3D);

exports.default = Bot;

/***/ })

/******/ });