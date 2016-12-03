/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _fonts = __webpack_require__(1);
	
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
/* 1 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDc/MWNkYSoqKiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwcy9tdWx0aXBsZS1mb250cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2ZvbnRzL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNDUkVFTl9XSURUSCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJTQ1JFRU5fSEVJR0hUIiwiaW5uZXJIZWlnaHQiLCJWSUVXX0FOR0xFIiwiQVNQRUNUIiwiTkVBUiIsIkZBUiIsInNjZW5lIiwiY2FtZXJhIiwicmVuZGVyZXIiLCJheGlzSGVscGVyIiwiY29udHJvbHMiLCJwb2ludExpZ2h0IiwiYW1iaWVudExpZ2h0IiwiZm9udHMiLCJvcmlnaW4iLCJUSFJFRSIsIlZlY3RvcjMiLCJGT05UX1NJWkUiLCJjcmVhdGVUZXh0IiwidGV4dCIsImZvbnRJZCIsInBhcmFtcyIsImZvbnQiLCJzaXplIiwiaGVpZ2h0IiwiZ2VvbWV0cnkiLCJUZXh0R2VvbWV0cnkiLCJtYXRlcmlhbCIsIk1lc2hMYW1iZXJ0TWF0ZXJpYWwiLCJjb2xvciIsIm1lc2giLCJNZXNoIiwibG9hZCIsInRoZW4iLCJ0aGVGb250cyIsImluaXQiLCJTY2VuZSIsIkF4aXNIZWxwZXIiLCJhZGQiLCJsaW5lSGVpZ2h0Iiwib25lIiwicG9zaXRpb24iLCJ5IiwidHdvIiwidGhyZWUiLCJBbWJpZW50TGlnaHQiLCJQb2ludExpZ2h0Iiwic2V0IiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJsb29rQXQiLCJXZWJHTFJlbmRlcmVyIiwiYW50aWFsaWFzIiwic2V0U2l6ZSIsIk9yYml0Q29udHJvbHMiLCJkb21FbGVtZW50IiwiVEhSRUV4IiwiV2luZG93UmVzaXplIiwiZG9jdW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJhbmltYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidXBkYXRlIiwicmVuZGVyIiwibG9hZEZvbnQiLCJsb2FkRm9udHMiLCJmb250TG9hZGVyIiwiRm9udExvYWRlciIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicHJvbWlzZXMiLCJtYXAiLCJpZCIsImFsbCIsInJlc3VsdHMiLCJyZWR1Y2UiLCJhY2MiLCJyZXN1bHQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNuQ0E7O0FBRUEsS0FBTUEsZUFBZUMsT0FBT0MsVUFBNUIsQyxDQUxBO0FBQ0E7O0FBS0EsS0FBTUMsZ0JBQWdCRixPQUFPRyxXQUE3QjtBQUNBLEtBQU1DLGFBQWEsRUFBbkI7QUFDQSxLQUFNQyxTQUFTTixlQUFlRyxhQUE5QjtBQUNBLEtBQU1JLE9BQU8sQ0FBYjtBQUNBLEtBQU1DLE1BQU0sS0FBWjs7QUFFQSxLQUFJQyxjQUFKO0FBQ0EsS0FBSUMsZUFBSjtBQUNBLEtBQUlDLGlCQUFKO0FBQ0EsS0FBSUMsbUJBQUo7QUFDQSxLQUFJQyxpQkFBSjtBQUNBLEtBQUlDLG1CQUFKO0FBQ0EsS0FBSUMscUJBQUo7QUFDQSxLQUFJQyxjQUFKOztBQUVBLEtBQU1DLFNBQVMsSUFBSUMsTUFBTUMsT0FBVixDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QixDQUFmOztBQUVBLEtBQU1DLFlBQVksRUFBbEI7O0FBRUEsVUFBU0MsVUFBVCxDQUFvQkMsSUFBcEIsRUFBMEJDLE1BQTFCLEVBQWtDO0FBQ2hDLE9BQU1DLFNBQVM7QUFDYkMsV0FBTVQsTUFBTU8sTUFBTixDQURPO0FBRWJHLFdBQU1OLFNBRk87QUFHYk8sYUFBUSxDQUhLLEVBQWY7QUFLQSxPQUFNQyxXQUFXLElBQUlWLE1BQU1XLFlBQVYsQ0FBdUJQLElBQXZCLEVBQTZC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YUFBYSxJQUFJbkQsTUFBTW9ELFVBQVYsRUFBbkI7O0FBRUEsS0FBTXRELFFBQVEsQ0FDWixlQURZLEVBRVosa0JBRlksRUFHWixpQkFIWSxFQUlaLG9CQUpZLEVBS1osY0FMWSxFQU1aLGlCQU5ZLENBQWQ7O0FBU08sVUFBU21ELFFBQVQsQ0FBa0JJLEdBQWxCLEVBQXVCO0FBQzVCLFVBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBYTtBQUM5QkosZ0JBQVdsQyxJQUFYLENBQWdCb0MsR0FBaEIsRUFBcUJFLE9BQXJCO0FBQ0QsSUFGTSxDQUFQO0FBR0Q7O0FBRU0sVUFBU0wsU0FBVCxHQUFxQjtBQUMxQixPQUFNTSxXQUFXMUQsTUFBTTJELEdBQU4sQ0FBVSxVQUFDQyxFQUFELEVBQVE7QUFDakMsU0FBTUwsaUNBQStCSyxFQUEvQixtQkFBTjtBQUNBLFlBQU9ULFNBQVNJLEdBQVQsRUFBY25DLElBQWQsQ0FBbUIsVUFBQ1gsSUFBRCxFQUFVO0FBQ2xDLGNBQU8sRUFBRW1ELE1BQUYsRUFBTW5ELFVBQU4sRUFBUDtBQUNELE1BRk0sQ0FBUDtBQUdELElBTGdCLENBQWpCO0FBTUEsVUFBTytDLFFBQ0pLLEdBREksQ0FDQUgsUUFEQSxFQUVKdEMsSUFGSSxDQUVDLFVBQUMwQyxPQUFELEVBQWE7QUFDakIsU0FBTUgsTUFBTUcsUUFBUUMsTUFBUixDQUFlLFVBQUNDLEdBQUQsRUFBTUMsTUFBTixFQUFpQjtBQUMxQ0QsV0FBSUMsT0FBT0wsRUFBWCxJQUFpQkssT0FBT3hELElBQXhCO0FBQ0EsY0FBT3VELEdBQVA7QUFDRCxNQUhXLEVBR1QsRUFIUyxDQUFaO0FBSUEsWUFBT0wsR0FBUDtBQUNELElBUkksQ0FBUDtBQVNELEUiLCJmaWxlIjoiZGlzdC9hcHBzL211bHRpcGxlLWZvbnRzL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI5ZDM2OTUxZDMyNzQyMTg5M2Q3IiwiLy8gUmVmZXJlbmNlc1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy90cmVlL21hc3Rlci9leGFtcGxlcy9mb250c1xuXG5pbXBvcnQgeyBsb2FkRm9udHMgfSBmcm9tICcuLi8uLi9saWIvZm9udHMnO1xuXG5jb25zdCBTQ1JFRU5fV0lEVEggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNvbnN0IFNDUkVFTl9IRUlHSFQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5jb25zdCBWSUVXX0FOR0xFID0gNDU7XG5jb25zdCBBU1BFQ1QgPSBTQ1JFRU5fV0lEVEggLyBTQ1JFRU5fSEVJR0hUO1xuY29uc3QgTkVBUiA9IDE7XG5jb25zdCBGQVIgPSAxMDAwMDtcblxubGV0IHNjZW5lO1xubGV0IGNhbWVyYTtcbmxldCByZW5kZXJlcjtcbmxldCBheGlzSGVscGVyO1xubGV0IGNvbnRyb2xzO1xubGV0IHBvaW50TGlnaHQ7XG5sZXQgYW1iaWVudExpZ2h0O1xubGV0IGZvbnRzO1xuXG5jb25zdCBvcmlnaW4gPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKTtcblxuY29uc3QgRk9OVF9TSVpFID0gMzY7XG5cbmZ1bmN0aW9uIGNyZWF0ZVRleHQodGV4dCwgZm9udElkKSB7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBmb250OiBmb250c1tmb250SWRdLFxuICAgIHNpemU6IEZPTlRfU0laRSxcbiAgICBoZWlnaHQ6IDEsIC8vIFRoaWNrbmVzc1xuICB9O1xuICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5UZXh0R2VvbWV0cnkodGV4dCwgcGFyYW1zKTtcbiAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDg4ODg4OCB9KTtcbiAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gIHJldHVybiBtZXNoO1xufVxuXG5mdW5jdGlvbiBsb2FkKCkge1xuICByZXR1cm4gbG9hZEZvbnRzKClcbiAgICAudGhlbigodGhlRm9udHMpID0+IHtcbiAgICAgIGZvbnRzID0gdGhlRm9udHM7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgYXhpc0hlbHBlciA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDEwMCk7XG4gIHNjZW5lLmFkZChheGlzSGVscGVyKTtcblxuICBjb25zdCBsaW5lSGVpZ2h0ID0gRk9OVF9TSVpFO1xuXG4gIGNvbnN0IG9uZSA9IGNyZWF0ZVRleHQoJ29uZScsICdnZW50aWxpc19yZWd1bGFyJywgMHhmZjAwMDApO1xuICBvbmUucG9zaXRpb24ueSA9IGxpbmVIZWlnaHQgKiAyO1xuICBzY2VuZS5hZGQob25lKTtcblxuICBjb25zdCB0d28gPSBjcmVhdGVUZXh0KCd0d28nLCAnaGVsdmV0aWtlcl9yZWd1bGFyJywgMHgwMGZmMDApO1xuICB0d28ucG9zaXRpb24ueSA9IGxpbmVIZWlnaHQgKiAxO1xuICBzY2VuZS5hZGQodHdvKTtcblxuICBjb25zdCB0aHJlZSA9IGNyZWF0ZVRleHQoJ3RocmVlJywgJ29wdGltZXJfcmVndWxhcicsIDB4MDAwMGZmKTtcbiAgdGhyZWUucG9zaXRpb24ueSA9IGxpbmVIZWlnaHQgKiAwO1xuICBzY2VuZS5hZGQodGhyZWUpO1xuXG4gIGFtYmllbnRMaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHg4ODg4ODgpO1xuICBzY2VuZS5hZGQoYW1iaWVudExpZ2h0KTtcblxuICBwb2ludExpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHhmZmZmZmYsIDIsIDEwMDApO1xuICBwb2ludExpZ2h0LnBvc2l0aW9uLnNldCgxMDAsIDEwMCwgMTAwKTtcbiAgc2NlbmUuYWRkKHBvaW50TGlnaHQpO1xuXG4gIGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShWSUVXX0FOR0xFLCBBU1BFQ1QsIE5FQVIsIEZBUik7XG4gIGNhbWVyYS5wb3NpdGlvbi5zZXQoMjAwLCAyMDAsIDIwMCk7XG4gIGNhbWVyYS5sb29rQXQob3JpZ2luKTtcblxuICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pO1xuICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gIGNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICBUSFJFRXguV2luZG93UmVzaXplKHJlbmRlcmVyLCBjYW1lcmEpO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgY29udHJvbHMudXBkYXRlKCk7XG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcbn1cblxubG9hZCgpLnRoZW4oKCkgPT4ge1xuICBpbml0KCk7XG4gIGFuaW1hdGUoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcHMvbXVsdGlwbGUtZm9udHMvaW5kZXguanMiLCJjb25zdCBmb250TG9hZGVyID0gbmV3IFRIUkVFLkZvbnRMb2FkZXIoKTtcblxuY29uc3QgZm9udHMgPSBbXG4gICdnZW50aWxpc19ib2xkJyxcbiAgJ2dlbnRpbGlzX3JlZ3VsYXInLFxuICAnaGVsdmV0aWtlcl9ib2xkJyxcbiAgJ2hlbHZldGlrZXJfcmVndWxhcicsXG4gICdvcHRpbWVyX2JvbGQnLFxuICAnb3B0aW1lcl9yZWd1bGFyJyxcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRm9udCh1cmwpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgZm9udExvYWRlci5sb2FkKHVybCwgcmVzb2x2ZSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEZvbnRzKCkge1xuICBjb25zdCBwcm9taXNlcyA9IGZvbnRzLm1hcCgoaWQpID0+IHtcbiAgICBjb25zdCB1cmwgPSBgLi4vLi4vbGliL2ZvbnRzL2ZvbnRzLyR7aWR9LnR5cGVmYWNlLmpzb25gO1xuICAgIHJldHVybiBsb2FkRm9udCh1cmwpLnRoZW4oKGZvbnQpID0+IHtcbiAgICAgIHJldHVybiB7IGlkLCBmb250IH07XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gUHJvbWlzZVxuICAgIC5hbGwocHJvbWlzZXMpXG4gICAgLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgIGNvbnN0IG1hcCA9IHJlc3VsdHMucmVkdWNlKChhY2MsIHJlc3VsdCkgPT4ge1xuICAgICAgICBhY2NbcmVzdWx0LmlkXSA9IHJlc3VsdC5mb250O1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saWIvZm9udHMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9