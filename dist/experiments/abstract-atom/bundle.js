/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Atom = __webpack_require__(1);

	var _Atom2 = _interopRequireDefault(_Atom);

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
	var clock = void 0;
	var atom = void 0;

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
	  clock = new THREE.Clock();
	  clock.start();

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

	  var gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  var axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);

	  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	  scene.add(ambientLight);

	  var pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 200, -100);
	  scene.add(pointLight);

	  atom = new _Atom2.default({ protons: 6, neutrons: 6, electrons: 6 });
	  scene.add(atom);
	}

	function update() {
	  var delta = clock.getDelta();
	  atom.update(delta);
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Nucleus = __webpack_require__(2);

	var _Nucleus2 = _interopRequireDefault(_Nucleus);

	var _Electron = __webpack_require__(5);

	var _Electron2 = _interopRequireDefault(_Electron);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var electronVelocity = Math.PI * 2 / 60;

	// function rand() {
	//   return Math.floor(Math.random() * 100) - 50;
	// }

	function calculateShellNumber(electronIndex) {
	  var shellNumber = 1;
	  var prevElectronCount = 0;
	  var found = false;
	  while (!found) {
	    var shellCount = 2 * shellNumber * shellNumber;
	    var electronCount = shellCount + prevElectronCount;
	    if (electronIndex < electronCount) {
	      found = true;
	    } else {
	      prevElectronCount = electronCount;
	      shellNumber += 1;
	    }
	  }
	  return shellNumber;
	}

	function getShell() {}

	var Atom = function (_THREE$Object3D) {
	  _inherits(Atom, _THREE$Object3D);

	  function Atom(props) {
	    _classCallCheck(this, Atom);

	    var _this = _possibleConstructorReturn(this, (Atom.__proto__ || Object.getPrototypeOf(Atom)).call(this));

	    _this.time = 0;
	    _this.electrons = [];
	    var protons = props.protons,
	        neutrons = props.neutrons,
	        electrons = props.electrons;


	    var nucleus = new _Nucleus2.default({ protons: protons, neutrons: neutrons });
	    _this.add(nucleus);

	    _this.angleOffset = Math.PI * 2 / electrons;

	    for (var n = 0; n < electrons; n += 1) {
	      _this.addElectron();
	    }
	    return _this;
	  }

	  _createClass(Atom, [{
	    key: 'addElectron',
	    value: function addElectron() {
	      var electronIndex = this.electrons.length;
	      var electron = new _Electron2.default();
	      electron.shellNumber = calculateShellNumber(electronIndex);
	      this.electrons.push(electron);
	      this.add(electron);
	    }
	  }, {
	    key: 'update',
	    value: function update(delta) {
	      this.time += delta;
	      var commonAngle = this.time * electronVelocity;
	      for (var i = 0; i < this.electrons.length; i += 1) {
	        var electron = this.electrons[i];
	        var radius = electron.shellNumber * 50;
	        var angle = commonAngle + i * this.angleOffset;
	        var x = Math.sin(angle) * radius;
	        var y = Math.cos(angle) * radius;
	        electron.position.set(x, y, 0);
	      }
	    }
	  }]);

	  return Atom;
	}(THREE.Object3D);

	exports.default = Atom;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Proton = __webpack_require__(3);

	var _Proton2 = _interopRequireDefault(_Proton);

	var _Neutron = __webpack_require__(4);

	var _Neutron2 = _interopRequireDefault(_Neutron);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function rand() {
	  return Math.floor(Math.random() * 100) - 50;
	}

	var Nucleus = function (_THREE$Object3D) {
	  _inherits(Nucleus, _THREE$Object3D);

	  function Nucleus(props) {
	    _classCallCheck(this, Nucleus);

	    var _this = _possibleConstructorReturn(this, (Nucleus.__proto__ || Object.getPrototypeOf(Nucleus)).call(this));

	    var protonCount = props.protons;
	    var neutronCount = props.neutrons;

	    while (protonCount || neutronCount) {
	      if (protonCount) {
	        var proton = new _Proton2.default();
	        proton.position.set(rand(), rand(), 0);
	        _this.add(proton);
	        protonCount -= 1;
	      }
	      if (neutronCount) {
	        var neutron = new _Neutron2.default();
	        neutron.position.set(rand(), rand(), 0);
	        _this.add(neutron);
	        neutronCount -= 1;
	      }
	    }
	    return _this;
	  }

	  return Nucleus;
	}(THREE.Object3D);

	exports.default = Nucleus;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Proton = function (_THREE$Mesh) {
	  _inherits(Proton, _THREE$Mesh);

	  function Proton() {
	    _classCallCheck(this, Proton);

	    var geometry = new THREE.SphereGeometry(10, 4, 4);
	    var material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
	    return _possibleConstructorReturn(this, (Proton.__proto__ || Object.getPrototypeOf(Proton)).call(this, geometry, material));
	  }

	  return Proton;
	}(THREE.Mesh);

	exports.default = Proton;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Neutron = function (_THREE$Mesh) {
	  _inherits(Neutron, _THREE$Mesh);

	  function Neutron() {
	    _classCallCheck(this, Neutron);

	    var geometry = new THREE.SphereGeometry(10, 4, 4);
	    var material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
	    return _possibleConstructorReturn(this, (Neutron.__proto__ || Object.getPrototypeOf(Neutron)).call(this, geometry, material));
	  }

	  return Neutron;
	}(THREE.Mesh);

	exports.default = Neutron;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Electron = function (_THREE$Mesh) {
	  _inherits(Electron, _THREE$Mesh);

	  function Electron() {
	    _classCallCheck(this, Electron);

	    var geometry = new THREE.SphereGeometry(2, 4, 4);
	    var material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	    return _possibleConstructorReturn(this, (Electron.__proto__ || Object.getPrototypeOf(Electron)).call(this, geometry, material));
	  }

	  return Electron;
	}(THREE.Mesh);

	exports.default = Electron;

/***/ }
/******/ ]);