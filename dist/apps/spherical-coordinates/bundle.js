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

	var _fonts = __webpack_require__(2);

	var _CircleLineGeometry = __webpack_require__(3);

	var _CircleLineGeometry2 = _interopRequireDefault(_CircleLineGeometry);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint no-prototype-builtins: "off" */

	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45;
	var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
	var NEAR = 1;
	var FAR = 10000;

	var scene = void 0;
	var camera = void 0;
	var renderer = void 0;
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	var fonts = void 0;

	var labels = [];
	var origin = new THREE.Vector3(0, 0, 0);

	function load() {
	  return (0, _fonts.loadFonts)().then(function (theFonts) {
	    fonts = theFonts;
	  });
	}

	function renderLabel(text, position) {
	  var props = { font: fonts.helvetiker_regular, size: 12, height: 1 };
	  var geometry = new THREE.TextGeometry(text, props);
	  var material = new THREE.MeshBasicMaterial();
	  var label = new THREE.Mesh(geometry, material);
	  label.position.set(position.x, position.y, position.z);
	  labels.push(label);
	  scene.add(label);
	}

	function renderGrid() {
	  var gridSize = 100;

	  var xzGrid = new THREE.GridHelper(gridSize, 10);
	  xzGrid.position.set(gridSize, 0, gridSize);
	  scene.add(xzGrid);

	  var xyGrid = new THREE.GridHelper(gridSize, 10);
	  xyGrid.rotation.x = Math.PI * (1 / 2);
	  xyGrid.position.set(gridSize, gridSize, 0);
	  scene.add(xyGrid);

	  var yzGrid = new THREE.GridHelper(gridSize, 10);
	  yzGrid.rotation.z = Math.PI * (1 / 2);
	  yzGrid.position.set(0, gridSize, gridSize);
	  scene.add(yzGrid);
	}

	function renderAxis(v, color, labelText) {
	  var axisLength = 250;
	  var labelDistance = axisLength * 1.1;

	  var dir = v.normalize();
	  var axis = new THREE.ArrowHelper(dir, origin, axisLength, color, 10, 5);
	  scene.add(axis);

	  renderLabel(labelText, new THREE.Vector3(dir.x * labelDistance, dir.y * labelDistance, dir.z * labelDistance));
	}

	function renderAxes() {
	  var xAxis = new THREE.Vector3(1, 0, 0);
	  renderAxis(xAxis, 0xff0000, 'x');

	  var yAxis = new THREE.Vector3(0, 1, 0);
	  renderAxis(yAxis, 0x00ff00, 'y');

	  var zAxis = new THREE.Vector3(0, 0, 1);
	  renderAxis(zAxis, 0x0000ff, 'z');
	}

	function renderVector(vector) {
	  var v = vector.clone();
	  var arrowLength = v.length();
	  var arrowDir = v.normalize();
	  var arrowColor = 0xffff00;
	  var headLength = 12;
	  var headWidth = 4;
	  var arrowHelper = new THREE.ArrowHelper(arrowDir, origin, arrowLength, arrowColor, headLength, headWidth);
	  scene.add(arrowHelper);
	}

	function renderLine(from, to) {
	  var material = new THREE.LineDashedMaterial({
	    color: 0xffffff,
	    linewidth: 2,
	    dashSize: 2,
	    gapSize: 3,
	    transparent: true,
	    opacity: 0.5
	  });

	  // Three JS dashed line material not showing
	  // http://stackoverflow.com/questions/35523961/three-js-dashed-line-material-not-showing
	  var geometry = new THREE.Geometry();
	  geometry.vertices.push(from, to);
	  geometry.computeLineDistances();

	  var line = new THREE.Line(geometry, material);

	  scene.add(line);
	}

	function renderCoordinate() {
	  var radius = 200;
	  var theta = Math.PI * (2 / 8); // Angle from x axis
	  var phi = Math.PI * (2 / 8); // Angle from z axis
	  var x = radius * Math.sin(phi) * Math.cos(theta);
	  var y = radius * Math.sin(phi) * Math.sin(theta);
	  var z = radius * Math.cos(phi);

	  var pointNormal = new THREE.Vector3(x, y, z).normalize();
	  var point = pointNormal.clone().setLength(radius);
	  renderVector(point);

	  var xyPoint = new THREE.Vector3(x, y, 0);
	  renderLine(origin, xyPoint);

	  renderLine(point, xyPoint);

	  var angleRadius = 40;

	  // theta angle line
	  var thetaAngleGeometry = new _CircleLineGeometry2.default(angleRadius, 32, 0, theta);
	  var thetaAngleMaterial = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 2 });
	  var thetaAngleLine = new THREE.Line(thetaAngleGeometry, thetaAngleMaterial);
	  scene.add(thetaAngleLine);
	}

	function init() {
	  scene = new THREE.Scene();

	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(300, 100, 300);
	  camera.lookAt(origin);

	  renderGrid();
	  renderAxes();
	  renderCoordinate();

	  ambientLight = new THREE.AmbientLight(0x444444);
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

	function animate() {
	  requestAnimationFrame(animate);
	  labels.forEach(function (label) {
	    label.lookAt(camera.position);
	  });
	  controls.update();
	  renderer.render(scene, camera);
	}

	load().then(function () {
	  init();
	  animate();
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loadFont = loadFont;
	exports.loadFonts = loadFonts;
	var fontLoader = new THREE.FontLoader();

	var fonts = ['gentilis_bold', 'gentilis_regular', 'helvetiker_bold', 'helvetiker_regular', 'optimer_bold', 'optimer_regular'];

	function loadFont(url) {
	  return new Promise(function (resolve) {
	    fontLoader.load(url, resolve);
	  });
	}

	function loadFonts() {
	  var promises = fonts.map(function (id) {
	    var url = '../../lib/fonts/fonts/' + id + '.typeface.json';
	    return loadFont(url).then(function (font) {
	      return { id: id, font: font };
	    });
	  });
	  return Promise.all(promises).then(function (results) {
	    var map = results.reduce(function (acc, result) {
	      acc[result.id] = result.font;
	      return acc;
	    }, {});
	    return map;
	  });
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (radius, segments, thetaStart, thetaLength) {
	  var args = {
	    radius: radius || 50,
	    segments: segments || 8,
	    thetaStart: thetaStart || 0,
	    thetaLength: thetaLength || 2 * Math.PI
	  };

	  var geometry = new THREE.Geometry();

	  var delta = (args.thetaStart + args.thetaLength - args.thetaStart) / args.segments;

	  for (var i = 0; i <= args.segments; i += 1) {
	    var angle = args.thetaStart + delta * i;
	    var x = args.radius * Math.cos(angle);
	    var y = args.radius * Math.sin(angle);
	    geometry.vertices.push(new THREE.Vector3(x, y, 0));
	  }

	  return geometry;
	};

/***/ }
/******/ ]);