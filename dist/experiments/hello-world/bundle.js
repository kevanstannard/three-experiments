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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stats = __webpack_require__(22);

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
var mesh = void 0;
var controls = void 0;
var stats = void 0;

var origin = new THREE.Vector3(0, 0, 0);

function initStats() {
  stats = new Stats();
  stats.dom.style.position = 'absolute';
  stats.dom.style.left = '0px';
  stats.dom.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function initControls() {
  controls = {
    xRotation: 0,
    yRotation: 0,
    zRotation: 0
  };
  var gui = new dat.GUI();
  gui.domElement.parentElement.style.zIndex = 2;
  gui.add(controls, 'xRotation', 0, Math.PI * 2);
  gui.add(controls, 'yRotation', 0, Math.PI * 2);
  gui.add(controls, 'zRotation', 0, Math.PI * 2);
}

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

  initStats();
  initControls();

  var gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  var axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  var geometry = new THREE.BoxGeometry(50, 50, 50);
  var material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  var pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);
}

function update() {
  mesh.rotation.set(mesh.rotation.x = controls.xRotation, mesh.rotation.y = controls.yRotation, mesh.rotation.z = controls.zRotation);
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

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Stats = factory();
})(undefined, function () {
	'use strict';

	/**
  * @author mrdoob / http://mrdoob.com/
  */

	var Stats = function Stats() {

		var mode = 0;

		var container = document.createElement('div');
		container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
		container.addEventListener('click', function (event) {

			event.preventDefault();
			showPanel(++mode % container.children.length);
		}, false);

		//

		function addPanel(panel) {

			container.appendChild(panel.dom);
			return panel;
		}

		function showPanel(id) {

			for (var i = 0; i < container.children.length; i++) {

				container.children[i].style.display = i === id ? 'block' : 'none';
			}

			mode = id;
		}

		//

		var beginTime = (performance || Date).now(),
		    prevTime = beginTime,
		    frames = 0;

		var fpsPanel = addPanel(new Stats.Panel('FPS', '#0ff', '#002'));
		var msPanel = addPanel(new Stats.Panel('MS', '#0f0', '#020'));

		if (self.performance && self.performance.memory) {

			var memPanel = addPanel(new Stats.Panel('MB', '#f08', '#201'));
		}

		showPanel(0);

		return {

			REVISION: 16,

			dom: container,

			addPanel: addPanel,
			showPanel: showPanel,

			begin: function begin() {

				beginTime = (performance || Date).now();
			},

			end: function end() {

				frames++;

				var time = (performance || Date).now();

				msPanel.update(time - beginTime, 200);

				if (time > prevTime + 1000) {

					fpsPanel.update(frames * 1000 / (time - prevTime), 100);

					prevTime = time;
					frames = 0;

					if (memPanel) {

						var memory = performance.memory;
						memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
					}
				}

				return time;
			},

			update: function update() {

				beginTime = this.end();
			},

			// Backwards Compatibility

			domElement: container,
			setMode: showPanel

		};
	};

	Stats.Panel = function (name, fg, bg) {

		var min = Infinity,
		    max = 0,
		    round = Math.round;
		var PR = round(window.devicePixelRatio || 1);

		var WIDTH = 80 * PR,
		    HEIGHT = 48 * PR,
		    TEXT_X = 3 * PR,
		    TEXT_Y = 2 * PR,
		    GRAPH_X = 3 * PR,
		    GRAPH_Y = 15 * PR,
		    GRAPH_WIDTH = 74 * PR,
		    GRAPH_HEIGHT = 30 * PR;

		var canvas = document.createElement('canvas');
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		canvas.style.cssText = 'width:80px;height:48px';

		var context = canvas.getContext('2d');
		context.font = 'bold ' + 9 * PR + 'px Helvetica,Arial,sans-serif';
		context.textBaseline = 'top';

		context.fillStyle = bg;
		context.fillRect(0, 0, WIDTH, HEIGHT);

		context.fillStyle = fg;
		context.fillText(name, TEXT_X, TEXT_Y);
		context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

		context.fillStyle = bg;
		context.globalAlpha = 0.9;
		context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

		return {

			dom: canvas,

			update: function update(value, maxValue) {

				min = Math.min(min, value);
				max = Math.max(max, value);

				context.fillStyle = bg;
				context.globalAlpha = 1;
				context.fillRect(0, 0, WIDTH, GRAPH_Y);
				context.fillStyle = fg;
				context.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);

				context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);

				context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);

				context.fillStyle = bg;
				context.globalAlpha = 0.9;
				context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - value / maxValue) * GRAPH_HEIGHT));
			}

		};
	};

	return Stats;
});

/***/ })

/******/ });