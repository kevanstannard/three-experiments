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
/***/ function(module, exports) {

	'use strict';
	
	// References
	// https://github.com/mrdoob/three.js/tree/master/examples/fonts
	
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
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	
	var fonts = {};
	var origin = new THREE.Vector3(0, 0, 0);
	var fontLoader = new THREE.FontLoader();
	
	function loadFont(fontId) {
	  return new Promise(function (resolve) {
	    var fontUrl = '../../lib/fonts/fonts/' + fontId + '.typeface.json';
	    fontLoader.load(fontUrl, function (font) {
	      fonts[fontId] = font;
	      resolve();
	    });
	  });
	}
	
	function load() {
	  return loadFont('helvetiker_regular');
	}
	
	function init() {
	  scene = new THREE.Scene();
	
	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);
	
	  var params = {
	    font: fonts.helvetiker_regular,
	    size: 28,
	    height: 20 };
	  var textGeometry = new THREE.TextGeometry('three', params);
	  var textMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
	  var text = new THREE.Mesh(textGeometry, textMaterial);
	  scene.add(text);
	
	  ambientLight = new THREE.AmbientLight(0x888888);
	  scene.add(ambientLight);
	
	  pointLight = new THREE.PointLight(0xffffff, 2, 1000);
	  pointLight.position.set(100, 100, 100);
	  scene.add(pointLight);
	
	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 0, 200);
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDc/MWNkYSoqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwcy9zaW1wbGUtZm9udC9pbmRleC5qcyJdLCJuYW1lcyI6WyJTQ1JFRU5fV0lEVEgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiU0NSRUVOX0hFSUdIVCIsImlubmVySGVpZ2h0IiwiVklFV19BTkdMRSIsIkFTUEVDVCIsIk5FQVIiLCJGQVIiLCJzY2VuZSIsImNhbWVyYSIsInJlbmRlcmVyIiwiYXhpc0hlbHBlciIsImNvbnRyb2xzIiwicG9pbnRMaWdodCIsImFtYmllbnRMaWdodCIsImZvbnRzIiwib3JpZ2luIiwiVEhSRUUiLCJWZWN0b3IzIiwiZm9udExvYWRlciIsIkZvbnRMb2FkZXIiLCJsb2FkRm9udCIsImZvbnRJZCIsIlByb21pc2UiLCJyZXNvbHZlIiwiZm9udFVybCIsImxvYWQiLCJmb250IiwiaW5pdCIsIlNjZW5lIiwiQXhpc0hlbHBlciIsImFkZCIsInBhcmFtcyIsImhlbHZldGlrZXJfcmVndWxhciIsInNpemUiLCJoZWlnaHQiLCJ0ZXh0R2VvbWV0cnkiLCJUZXh0R2VvbWV0cnkiLCJ0ZXh0TWF0ZXJpYWwiLCJNZXNoTGFtYmVydE1hdGVyaWFsIiwiY29sb3IiLCJ0ZXh0IiwiTWVzaCIsIkFtYmllbnRMaWdodCIsIlBvaW50TGlnaHQiLCJwb3NpdGlvbiIsInNldCIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwibG9va0F0IiwiV2ViR0xSZW5kZXJlciIsImFudGlhbGlhcyIsInNldFNpemUiLCJPcmJpdENvbnRyb2xzIiwiZG9tRWxlbWVudCIsIlRIUkVFeCIsIldpbmRvd1Jlc2l6ZSIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiYW5pbWF0ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInVwZGF0ZSIsInJlbmRlciIsInRoZW4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztB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QUFYO0FBQ0F4QyxZQUFTeUMsT0FBVCxDQUFpQm5ELE9BQU9DLFVBQXhCLEVBQW9DRCxPQUFPRyxXQUEzQzs7QUFFQVMsY0FBVyxJQUFJSyxNQUFNbUMsYUFBVixDQUF3QjNDLE1BQXhCLEVBQWdDQyxTQUFTMkMsVUFBekMsQ0FBWDs7QUFFQUMsVUFBT0MsWUFBUCxDQUFvQjdDLFFBQXBCLEVBQThCRCxNQUE5Qjs7QUFFQStDLFlBQVNDLElBQVQsQ0FBY0MsV0FBZCxDQUEwQmhELFNBQVMyQyxVQUFuQztBQUNEOztBQUVELFVBQVNNLE9BQVQsR0FBbUI7QUFDakJDLHlCQUFzQkQsT0FBdEI7QUFDQS9DLFlBQVNpRCxNQUFUO0FBQ0FuRCxZQUFTb0QsTUFBVCxDQUFnQnRELEtBQWhCLEVBQXVCQyxNQUF2QjtBQUNEOztBQUVEaUIsUUFBT3FDLElBQVAsQ0FBWSxZQUFNO0FBQ2hCbkM7QUFDQStCO0FBQ0QsRUFIRCxFIiwiZmlsZSI6ImRpc3QvYXBwcy9zaW1wbGUtZm9udC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiOWQzNjk1MWQzMjc0MjE4OTNkNyIsIi8vIFJlZmVyZW5jZXNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmRvb2IvdGhyZWUuanMvdHJlZS9tYXN0ZXIvZXhhbXBsZXMvZm9udHNcblxuY29uc3QgU0NSRUVOX1dJRFRIID0gd2luZG93LmlubmVyV2lkdGg7XG5jb25zdCBTQ1JFRU5fSEVJR0hUID0gd2luZG93LmlubmVySGVpZ2h0O1xuY29uc3QgVklFV19BTkdMRSA9IDQ1O1xuY29uc3QgQVNQRUNUID0gU0NSRUVOX1dJRFRIIC8gU0NSRUVOX0hFSUdIVDtcbmNvbnN0IE5FQVIgPSAxO1xuY29uc3QgRkFSID0gMTAwMDA7XG5cbmxldCBzY2VuZTtcbmxldCBjYW1lcmE7XG5sZXQgcmVuZGVyZXI7XG5sZXQgYXhpc0hlbHBlcjtcbmxldCBjb250cm9scztcbmxldCBwb2ludExpZ2h0O1xubGV0IGFtYmllbnRMaWdodDtcblxuY29uc3QgZm9udHMgPSB7fTtcbmNvbnN0IG9yaWdpbiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApO1xuY29uc3QgZm9udExvYWRlciA9IG5ldyBUSFJFRS5Gb250TG9hZGVyKCk7XG5cbmZ1bmN0aW9uIGxvYWRGb250KGZvbnRJZCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBmb250VXJsID0gYC4uLy4uL2xpYi9mb250cy9mb250cy8ke2ZvbnRJZH0udHlwZWZhY2UuanNvbmA7XG4gICAgZm9udExvYWRlci5sb2FkKGZvbnRVcmwsIChmb250KSA9PiB7XG4gICAgICBmb250c1tmb250SWRdID0gZm9udDtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHJldHVybiBsb2FkRm9udCgnaGVsdmV0aWtlcl9yZWd1bGFyJyk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgYXhpc0hlbHBlciA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDEwMCk7XG4gIHNjZW5lLmFkZChheGlzSGVscGVyKTtcblxuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgZm9udDogZm9udHMuaGVsdmV0aWtlcl9yZWd1bGFyLFxuICAgIHNpemU6IDI4LFxuICAgIGhlaWdodDogMjAsIC8vIFRoaWNrbmVzc1xuICB9O1xuICBjb25zdCB0ZXh0R2VvbWV0cnkgPSBuZXcgVEhSRUUuVGV4dEdlb21ldHJ5KCd0aHJlZScsIHBhcmFtcyk7XG4gIGNvbnN0IHRleHRNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ODg4ODg4IH0pO1xuICBjb25zdCB0ZXh0ID0gbmV3IFRIUkVFLk1lc2godGV4dEdlb21ldHJ5LCB0ZXh0TWF0ZXJpYWwpO1xuICBzY2VuZS5hZGQodGV4dCk7XG5cbiAgYW1iaWVudExpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDg4ODg4OCk7XG4gIHNjZW5lLmFkZChhbWJpZW50TGlnaHQpO1xuXG4gIHBvaW50TGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGZmZmZmZiwgMiwgMTAwMCk7XG4gIHBvaW50TGlnaHQucG9zaXRpb24uc2V0KDEwMCwgMTAwLCAxMDApO1xuICBzY2VuZS5hZGQocG9pbnRMaWdodCk7XG5cbiAgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKFZJRVdfQU5HTEUsIEFTUEVDVCwgTkVBUiwgRkFSKTtcbiAgY2FtZXJhLnBvc2l0aW9uLnNldCgyMDAsIDAsIDIwMCk7XG4gIGNhbWVyYS5sb29rQXQob3JpZ2luKTtcblxuICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pO1xuICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gIGNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICBUSFJFRXguV2luZG93UmVzaXplKHJlbmRlcmVyLCBjYW1lcmEpO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgY29udHJvbHMudXBkYXRlKCk7XG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcbn1cblxubG9hZCgpLnRoZW4oKCkgPT4ge1xuICBpbml0KCk7XG4gIGFuaW1hdGUoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcHMvc2ltcGxlLWZvbnQvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9