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

	var _Body = __webpack_require__(6);

	var _Body2 = _interopRequireDefault(_Body);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// function Body(name, radius, color) {
	//   THREE.Object3D.call(this);
	//   const geometry = new THREE.SphereGeometry(radius, 8, 8);
	//   const material = new THREE.MeshLambertMaterial({ color, wireframe: true });
	//   const mesh = new THREE.Mesh(geometry, material);
	//   this.name = name;
	//   this.add(mesh);
	//   this.satellites = [];
	// }
	//
	// Body.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
	//
	//   constructor: Body,
	//
	//   addBody(body, radius) {
	//     const satellite = {
	//       body,
	//       radius,
	//       angle: 0,
	//     };
	//     this.satellites.push(satellite);
	//     this.add(body);
	//     body.position.x = radius;
	//   },
	//
	//   update() {
	//     this.rotation.y += 0.005;
	//     this.satellites.forEach((satellite) => {
	//       satellite.body.update();
	//     });
	//   },
	//
	// });

	var SCREEN_WIDTH = window.innerWidth; /* eslint-disable no-param-reassign */

	// Ref
	// http://stackoverflow.com/questions/15214582/how-do-i-rotate-some-moons-around-a-planet-with-three-js

	// import Body from './Body';

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
	var sun = void 0;

	// const sunDef = {
	//   name: 'Sun',
	//   radius: 695700,
	//   color: 0xffff00,
	//   children: [
	//     { name: 'Mercury', radius: 4800 / 2, orbitRadius: 57910000 },
	//     { name: 'Venus', radius: 12100 / 2, orbitRadius: 108200000 },
	//     { name: 'Earth', radius: 12750 / 2, orbitRadius: 149600000 },
	//     { name: 'Mars', radius: 6800 / 2, orbitRadius: 227940000 },
	//     { name: 'Jupiter', radius: 142800 / 2, orbitRadius: 778330000 },
	//     { name: 'Saturn', radius: 120660 / 2, orbitRadius: 1424600000 },
	//     { name: 'Uranus', radius: 51800 / 2, orbitRadius: 2873550000 },
	//     { name: 'Neptune', radius: 49500 / 2, orbitRadius: 4501000000 },
	//     { name: 'Pluto', radius: 3300 / 2, orbitRadius: 5945900000 },
	//   ],
	// };

	var origin = new THREE.Vector3(0, 0, 0);

	// function createBody(def) {
	//   const body = new Body(def.name, def.radius / 2000, def.color || 0xffffff);
	//   if (def.children) {
	//     def.children.forEach((childDef) => {
	//       const childBody = createBody(childDef);
	//       body.addBody(childBody, childDef.orbitRadius / 1000000);
	//     });
	//   }
	//   return body;
	// }

	function init() {
	  scene = new THREE.Scene();

	  var gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);

	  var axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);

	  // sun = createBody(sunDef);
	  // sun.position.y = 40;
	  // scene.add(sun);

	  sun = new _Body2.default('Sun', 40, 0xffff00);
	  // const earth = new Body('Earth', 13, 0x0000ff);
	  // const moon = new Body('Moon', 4, 0x888888);

	  // sun.addBody(earth);
	  // earth.addBody(moon);
	  scene.add(sun);

	  // sun = new Body('Sun', 40, 0xffff00);
	  // sun.position.y = 40;
	  // scene.add(sun);

	  // const mercury = new Body(5, 0xffffff);
	  // sun.addBody(mer, 57);

	  // const ven = new Body(12, 0xffffff);
	  // sun.addBody(ven, 108);

	  // const earth = new Body('Earth', 13, 0xffffff);
	  // sun.addBody(earth, 150);

	  // const moon = new Body('Moon', 4, 0xffffff);
	  // earth.addBody(moon, 26);

	  // sun.addToScene(scene);

	  ambientLight = new THREE.AmbientLight(0x444444);
	  scene.add(ambientLight);

	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 50, 50);
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

	function update() {
	  // sun.update();
	  controls.update();
	}

	function animate() {
	  requestAnimationFrame(animate);
	  update();
	  renderer.render(scene, camera);
	}

	init();
	animate();

/***/ },

/***/ 6:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function Body(name, radius) {
	  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0xffffff;

	  var geometry = new THREE.SphereGeometry(radius, 16, 16);
	  var material = new THREE.MeshBasicMaterial({ color: color, wireframe: true });
	  THREE.Mesh.call(this, geometry, material);
	  this.name = name;
	}

	Body.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
	  constructor: Body
	});

	exports.default = Body;

/***/ }

/******/ });