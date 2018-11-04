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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/arrow-helper/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/arrow-helper/index.js":
/*!***********************************************!*\
  !*** ./src/experiments/arrow-helper/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stats = __webpack_require__(/*! libs/stats/r17/stats */ \"./src/libs/stats/r17/stats.js\");\n\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar stats;\nvar origin = new THREE.Vector3();\n\nfunction initStats() {\n  stats = new Stats('bottomLeft');\n  stats.dom.style.position = 'absolute';\n  stats.dom.style.left = '0px';\n  stats.dom.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction renderVectors(vectors) {\n  var prevVector = origin;\n\n  for (var i = 0; i < vectors.length; i += 1) {\n    var currVector = vectors[i];\n    var currVectorNormal = currVector.clone().normalize();\n    var arrow = new THREE.ArrowHelper(currVectorNormal, prevVector, currVector.length());\n    scene.add(arrow);\n    prevVector.add(currVector);\n  }\n}\n\nfunction randomNumberInRange(min, max) {\n  var scale = max - min;\n  var offset = min;\n  return Math.random() * scale + offset;\n}\n\nfunction randomNumber() {\n  return randomNumberInRange(-20, 20);\n}\n\nfunction randomVector() {\n  return new THREE.Vector3(randomNumber(), randomNumber(), randomNumber());\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(200, 200, 200);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats();\n  var gridHelper = new THREE.GridHelper(200, 10);\n  scene.add(gridHelper);\n  var axisHelper = new THREE.AxisHelper(100);\n  scene.add(axisHelper);\n  var numberOfVectors = 50;\n  var vectors = [];\n\n  for (var n = 1; n <= numberOfVectors; n += 1) {\n    var vector = randomVector();\n    vectors.push(vector);\n  }\n\n  renderVectors(vectors);\n}\n\nfunction update() {\n  stats.update();\n  orbitControls.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/arrow-helper/index.js?");

/***/ }),

/***/ "./src/libs/stats/r17/stats.js":
/*!*************************************!*\
  !*** ./src/libs/stats/r17/stats.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n(function (global, factory) {\n  ( false ? undefined : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;\n})(this, function () {\n  'use strict';\n  /**\n   * @author mrdoob / http://mrdoob.com/\n   */\n\n  var Stats = function Stats() {\n    var mode = 0;\n    var container = document.createElement('div');\n    container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';\n    container.addEventListener('click', function (event) {\n      event.preventDefault();\n      showPanel(++mode % container.children.length);\n    }, false); //\n\n    function addPanel(panel) {\n      container.appendChild(panel.dom);\n      return panel;\n    }\n\n    function showPanel(id) {\n      for (var i = 0; i < container.children.length; i++) {\n        container.children[i].style.display = i === id ? 'block' : 'none';\n      }\n\n      mode = id;\n    } //\n\n\n    var beginTime = (performance || Date).now(),\n        prevTime = beginTime,\n        frames = 0;\n    var fpsPanel = addPanel(new Stats.Panel('FPS', '#0ff', '#002'));\n    var msPanel = addPanel(new Stats.Panel('MS', '#0f0', '#020'));\n\n    if (self.performance && self.performance.memory) {\n      var memPanel = addPanel(new Stats.Panel('MB', '#f08', '#201'));\n    }\n\n    showPanel(0);\n    return {\n      REVISION: 16,\n      dom: container,\n      addPanel: addPanel,\n      showPanel: showPanel,\n      begin: function begin() {\n        beginTime = (performance || Date).now();\n      },\n      end: function end() {\n        frames++;\n        var time = (performance || Date).now();\n        msPanel.update(time - beginTime, 200);\n\n        if (time > prevTime + 1000) {\n          fpsPanel.update(frames * 1000 / (time - prevTime), 100);\n          prevTime = time;\n          frames = 0;\n\n          if (memPanel) {\n            var memory = performance.memory;\n            memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);\n          }\n        }\n\n        return time;\n      },\n      update: function update() {\n        beginTime = this.end();\n      },\n      // Backwards Compatibility\n      domElement: container,\n      setMode: showPanel\n    };\n  };\n\n  Stats.Panel = function (name, fg, bg) {\n    var min = Infinity,\n        max = 0,\n        round = Math.round;\n    var PR = round(window.devicePixelRatio || 1);\n    var WIDTH = 80 * PR,\n        HEIGHT = 48 * PR,\n        TEXT_X = 3 * PR,\n        TEXT_Y = 2 * PR,\n        GRAPH_X = 3 * PR,\n        GRAPH_Y = 15 * PR,\n        GRAPH_WIDTH = 74 * PR,\n        GRAPH_HEIGHT = 30 * PR;\n    var canvas = document.createElement('canvas');\n    canvas.width = WIDTH;\n    canvas.height = HEIGHT;\n    canvas.style.cssText = 'width:80px;height:48px';\n    var context = canvas.getContext('2d');\n    context.font = 'bold ' + 9 * PR + 'px Helvetica,Arial,sans-serif';\n    context.textBaseline = 'top';\n    context.fillStyle = bg;\n    context.fillRect(0, 0, WIDTH, HEIGHT);\n    context.fillStyle = fg;\n    context.fillText(name, TEXT_X, TEXT_Y);\n    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);\n    context.fillStyle = bg;\n    context.globalAlpha = 0.9;\n    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);\n    return {\n      dom: canvas,\n      update: function update(value, maxValue) {\n        min = Math.min(min, value);\n        max = Math.max(max, value);\n        context.fillStyle = bg;\n        context.globalAlpha = 1;\n        context.fillRect(0, 0, WIDTH, GRAPH_Y);\n        context.fillStyle = fg;\n        context.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);\n        context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);\n        context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);\n        context.fillStyle = bg;\n        context.globalAlpha = 0.9;\n        context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - value / maxValue) * GRAPH_HEIGHT));\n      }\n    };\n  };\n\n  return Stats;\n});\n\n//# sourceURL=webpack:///./src/libs/stats/r17/stats.js?");

/***/ })

/******/ });