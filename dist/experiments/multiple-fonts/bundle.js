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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fonts = __webpack_require__(7);

	var SCREEN_WIDTH = window.innerWidth; // References
	// https://github.com/mrdoob/three.js/tree/master/examples/fonts

	var SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45;
	var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
	var NEAR = 1;
	var FAR = 10000;

	var scene = void 0;
	var camera = void 0;
	var renderer = void 0;
	var axisHelper = void 0;
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	var fonts = void 0;

	var origin = new THREE.Vector3(0, 0, 0);

	var FONT_SIZE = 36;

	// ES5 alternative to load the fonts
	// https://github.com/kevanstannard/three/issues/1

	// var fontLoader = new THREE.FontLoader();
	//
	// var fonts = {};
	//
	// function loadFont(name) {
	//   var url = '../../modules/fonts/fonts/' + name + '.typeface.json';
	//   return new Promise(function(resolve) {
	//     fontLoader.load(url, function(font) {
	//       fonts[name] = font;
	//       resolve();
	//     });
	//   });
	// }
	//
	// function loadFonts() {
	//   var promises = [
	//     loadFont('gentilis_regular'),
	//     loadFont('helvetiker_regular'),
	//     loadFont('optimer_regular'),
	//   ];
	//   return Promise.all(promises);
	// }

	function createText(text, fontId) {
	  var params = {
	    font: fonts[fontId],
	    size: FONT_SIZE,
	    height: 1 };
	  var geometry = new THREE.TextGeometry(text, params);
	  var material = new THREE.MeshLambertMaterial({ color: 0x888888 });
	  var mesh = new THREE.Mesh(geometry, material);
	  return mesh;
	}

	function load() {
	  return (0, _fonts.loadFonts)().then(function (theFonts) {
	    fonts = theFonts;
	  });
	}

	function init() {
	  scene = new THREE.Scene();

	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);

	  var lineHeight = FONT_SIZE;

	  var one = createText('one', 'gentilis_regular', 0xff0000);
	  one.position.y = lineHeight * 2;
	  scene.add(one);

	  var two = createText('two', 'helvetiker_regular', 0x00ff00);
	  two.position.y = lineHeight * 1;
	  scene.add(two);

	  var three = createText('three', 'optimer_regular', 0x0000ff);
	  three.position.y = lineHeight * 0;
	  scene.add(three);

	  ambientLight = new THREE.AmbientLight(0x888888);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffffff, 2, 1000);
	  pointLight.position.set(100, 100, 100);
	  scene.add(pointLight);

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 200, 200);
	  camera.lookAt(origin);

	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);

	  controls = new THREE.OrbitControls(camera, renderer.domElement);

	  THREEx.WindowResize(renderer, camera);

	  document.body.appendChild(renderer.domElement);
	}

	function animate() {
	  requestAnimationFrame(animate);
	  controls.update();
	  renderer.render(scene, camera);
	}

	load().then(function () {
	  init();
	  animate();
	});

/***/ },

/***/ 7:
/***/ function(module, exports) {

	'use strict';

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

/***/ }

/******/ });