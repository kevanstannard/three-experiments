/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/experiments/arrow-helper/index.js":
/*!***********************************************!*\
  !*** ./src/experiments/arrow-helper/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var Stats = __webpack_require__(/*! libs/stats/r17/stats */ \"./src/libs/stats/r17/stats.js\");\nvar SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar orbitControls;\nvar stats;\nvar origin = new THREE.Vector3();\nfunction initStats() {\n    stats = new Stats(\"bottomLeft\");\n    stats.dom.style.position = \"absolute\";\n    stats.dom.style.left = \"0px\";\n    stats.dom.style.top = \"20px\";\n    stats.setMode(0); // 0: fps, 1: ms\n    document.getElementById(\"stats\").appendChild(stats.domElement);\n}\nfunction renderVectors(vectors) {\n    var prevVector = origin;\n    for(var i = 0; i < vectors.length; i += 1){\n        var currVector = vectors[i];\n        var currVectorNormal = currVector.clone().normalize();\n        var arrow = new THREE.ArrowHelper(currVectorNormal, prevVector, currVector.length());\n        scene.add(arrow);\n        prevVector.add(currVector);\n    }\n}\nfunction randomNumberInRange(min, max) {\n    var scale = max - min;\n    var offset = min;\n    return Math.random() * scale + offset;\n}\nfunction randomNumber() {\n    return randomNumberInRange(-20, 20);\n}\nfunction randomVector() {\n    return new THREE.Vector3(randomNumber(), randomNumber(), randomNumber());\n}\nfunction init() {\n    scene = new THREE.Scene();\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(200, 200, 200);\n    camera.lookAt(origin);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n    initStats();\n    var gridHelper = new THREE.GridHelper(200, 10);\n    scene.add(gridHelper);\n    var axisHelper = new THREE.AxisHelper(100);\n    scene.add(axisHelper);\n    var numberOfVectors = 50;\n    var vectors = [];\n    for(var n = 1; n <= numberOfVectors; n += 1){\n        var vector = randomVector();\n        vectors.push(vector);\n    }\n    renderVectors(vectors);\n}\nfunction update() {\n    stats.update();\n    orbitControls.update();\n}\nfunction render() {\n    renderer.render(scene, camera);\n}\nfunction tick() {\n    update();\n    render();\n    requestAnimationFrame(tick);\n}\ninit();\ntick();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/arrow-helper/index.js?");

/***/ }),

/***/ "./src/libs/stats/r17/stats.js":
/*!*************************************!*\
  !*** ./src/libs/stats/r17/stats.js ***!
  \*************************************/
/***/ (function(module) {

eval("(function(global, factory) {\n     true ? module.exports = factory() : 0;\n})(this, function() {\n    \"use strict\";\n    /**\n * @author mrdoob / http://mrdoob.com/\n */ var Stats = function() {\n        var addPanel = //\n        function addPanel(panel) {\n            container.appendChild(panel.dom);\n            return panel;\n        };\n        var showPanel = function showPanel(id) {\n            for(var i = 0; i < container.children.length; i++){\n                container.children[i].style.display = i === id ? \"block\" : \"none\";\n            }\n            mode = id;\n        };\n        var mode = 0;\n        var container = document.createElement(\"div\");\n        container.style.cssText = \"position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000\";\n        container.addEventListener(\"click\", function(event) {\n            event.preventDefault();\n            showPanel(++mode % container.children.length);\n        }, false);\n        //\n        var beginTime = (performance || Date).now(), prevTime = beginTime, frames = 0;\n        var fpsPanel = addPanel(new Stats.Panel(\"FPS\", \"#0ff\", \"#002\"));\n        var msPanel = addPanel(new Stats.Panel(\"MS\", \"#0f0\", \"#020\"));\n        if (self.performance && self.performance.memory) {\n            var memPanel = addPanel(new Stats.Panel(\"MB\", \"#f08\", \"#201\"));\n        }\n        showPanel(0);\n        return {\n            REVISION: 16,\n            dom: container,\n            addPanel: addPanel,\n            showPanel: showPanel,\n            begin: function begin() {\n                beginTime = (performance || Date).now();\n            },\n            end: function end() {\n                frames++;\n                var time = (performance || Date).now();\n                msPanel.update(time - beginTime, 200);\n                if (time > prevTime + 1000) {\n                    fpsPanel.update(frames * 1000 / (time - prevTime), 100);\n                    prevTime = time;\n                    frames = 0;\n                    if (memPanel) {\n                        var memory = performance.memory;\n                        memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);\n                    }\n                }\n                return time;\n            },\n            update: function update() {\n                beginTime = this.end();\n            },\n            // Backwards Compatibility\n            domElement: container,\n            setMode: showPanel\n        };\n    };\n    Stats.Panel = function(name, fg, bg) {\n        var min = Infinity, max = 0, round = Math.round;\n        var PR = round(window.devicePixelRatio || 1);\n        var WIDTH = 80 * PR, HEIGHT = 48 * PR, TEXT_X = 3 * PR, TEXT_Y = 2 * PR, GRAPH_X = 3 * PR, GRAPH_Y = 15 * PR, GRAPH_WIDTH = 74 * PR, GRAPH_HEIGHT = 30 * PR;\n        var canvas = document.createElement(\"canvas\");\n        canvas.width = WIDTH;\n        canvas.height = HEIGHT;\n        canvas.style.cssText = \"width:80px;height:48px\";\n        var context = canvas.getContext(\"2d\");\n        context.font = \"bold \" + 9 * PR + \"px Helvetica,Arial,sans-serif\";\n        context.textBaseline = \"top\";\n        context.fillStyle = bg;\n        context.fillRect(0, 0, WIDTH, HEIGHT);\n        context.fillStyle = fg;\n        context.fillText(name, TEXT_X, TEXT_Y);\n        context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);\n        context.fillStyle = bg;\n        context.globalAlpha = 0.9;\n        context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);\n        return {\n            dom: canvas,\n            update: function update(value, maxValue) {\n                min = Math.min(min, value);\n                max = Math.max(max, value);\n                context.fillStyle = bg;\n                context.globalAlpha = 1;\n                context.fillRect(0, 0, WIDTH, GRAPH_Y);\n                context.fillStyle = fg;\n                context.fillText(round(value) + \" \" + name + \" (\" + round(min) + \"-\" + round(max) + \")\", TEXT_X, TEXT_Y);\n                context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);\n                context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);\n                context.fillStyle = bg;\n                context.globalAlpha = 0.9;\n                context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - value / maxValue) * GRAPH_HEIGHT));\n            }\n        };\n    };\n    return Stats;\n});\n\n\n//# sourceURL=webpack://three-experiments/./src/libs/stats/r17/stats.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/experiments/arrow-helper/index.js");
/******/ 	
/******/ })()
;