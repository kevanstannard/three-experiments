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

	"use strict";
	
	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45;
	var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
	var NEAR = 0.1;
	var FAR = 20000;
	
	var origin = new THREE.Vector3(0, 0, 0);
	
	var scene = new THREE.Scene();
	
	var gridHelper = new THREE.GridHelper(100, 10);
	scene.add(gridHelper);
	
	var axisHelper = new THREE.AxisHelper(100);
	scene.add(axisHelper);
	
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.set(200, 200, 200);
	camera.lookAt(origin);
	scene.add(camera);
	
	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	
	renderer.render(scene, camera);
	
	document.body.appendChild(renderer.domElement);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzlkNTg2NGI1YWFkNzBmNTRiOWM/ZDdhMyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcHMvaGVscGVycy9pbmRleC5qcyJdLCJuYW1lcyI6WyJTQ1JFRU5fV0lEVEgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiU0NSRUVOX0hFSUdIVCIsImlubmVySGVpZ2h0IiwiVklFV19BTkdMRSIsIkFTUEVDVCIsIk5FQVIiLCJGQVIiLCJvcmlnaW4iLCJUSFJFRSIsIlZlY3RvcjMiLCJzY2VuZSIsIlNjZW5lIiwiZ3JpZEhlbHBlciIsIkdyaWRIZWxwZXIiLCJhZGQiLCJheGlzSGVscGVyIiwiQXhpc0hlbHBlciIsImNhbWVyYSIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwicG9zaXRpb24iLCJzZXQiLCJsb29rQXQiLCJyZW5kZXJlciIsIldlYkdMUmVuZGVyZXIiLCJhbnRpYWxpYXMiLCJzZXRTaXplIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJkb21FbGVtZW50Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLEtBQU1BLGVBQWVDLE9BQU9DLFVBQTVCO0FBQ0EsS0FBTUMsZ0JBQWdCRixPQUFPRyxXQUE3QjtBQUNBLEtBQU1DLGFBQWEsRUFBbkI7QUFDQSxLQUFNQyxTQUFTTixlQUFlRyxhQUE5QjtBQUNBLEtBQU1JLE9BQU8sR0FBYjtBQUNBLEtBQU1DLE1BQU0sS0FBWjs7QUFFQSxLQUFNQyxTQUFTLElBQUlDLE1BQU1DLE9BQVYsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsQ0FBZjs7QUFFQSxLQUFNQyxRQUFRLElBQUlGLE1BQU1HLEtBQVYsRUFBZDs7QUFFQSxLQUFNQyxhQUFhLElBQUlKLE1BQU1LLFVBQVYsQ0FBcUIsR0FBckIsRUFBMEIsRUFBMUIsQ0FBbkI7QUFDQUgsT0FBTUksR0FBTixDQUFVRixVQUFWOztBQUVBLEtBQU1HLGFBQWEsSUFBSVAsTUFBTVEsVUFBVixDQUFxQixHQUFyQixDQUFuQjtBQUNBTixPQUFNSSxHQUFOLENBQVVDLFVBQVY7O0FBRUEsS0FBTUUsU0FBUyxJQUFJVCxNQUFNVSxpQkFBVixDQUE0QmYsVUFBNUIsRUFBd0NDLE1BQXhDLEVBQWdEQyxJQUFoRCxFQUFzREMsR0FBdEQsQ0FBZjtBQUNBVyxRQUFPRSxRQUFQLENBQWdCQyxHQUFoQixDQUFvQixHQUFwQixFQUF5QixHQUF6QixFQUE4QixHQUE5QjtBQUNBSCxRQUFPSSxNQUFQLENBQWNkLE1BQWQ7QUFDQUcsT0FBTUksR0FBTixDQUFVRyxNQUFWOztBQUVBLEtBQU1LLFdBQVcsSUFBSWQsTUFBTWUsYUFBVixDQUF3QixFQUFFQyxXQUFXLElBQWIsRUFBeEIsQ0FBakI7QUFDQUYsVUFBU0csT0FBVCxDQUFpQjNCLFlBQWpCLEVBQStCRyxhQUEvQjs7QUFFQXFCLFVBQVNJLE1BQVQsQ0FBZ0JoQixLQUFoQixFQUF1Qk8sTUFBdkI7O0FBRUFVLFVBQVNDLElBQVQsQ0FBY0MsV0FBZCxDQUEwQlAsU0FBU1EsVUFBbkMsRSIsImZpbGUiOiJkaXN0L2FwcHMvaGVscGVycy9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjOWQ1ODY0YjVhYWQ3MGY1NGI5YyIsImNvbnN0IFNDUkVFTl9XSURUSCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY29uc3QgU0NSRUVOX0hFSUdIVCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmNvbnN0IFZJRVdfQU5HTEUgPSA0NTtcbmNvbnN0IEFTUEVDVCA9IFNDUkVFTl9XSURUSCAvIFNDUkVFTl9IRUlHSFQ7XG5jb25zdCBORUFSID0gMC4xO1xuY29uc3QgRkFSID0gMjAwMDA7XG5cbmNvbnN0IG9yaWdpbiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApO1xuXG5jb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG5jb25zdCBncmlkSGVscGVyID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoMTAwLCAxMCk7XG5zY2VuZS5hZGQoZ3JpZEhlbHBlcik7XG5cbmNvbnN0IGF4aXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhpc0hlbHBlcigxMDApO1xuc2NlbmUuYWRkKGF4aXNIZWxwZXIpO1xuXG5jb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoVklFV19BTkdMRSwgQVNQRUNULCBORUFSLCBGQVIpO1xuY2FtZXJhLnBvc2l0aW9uLnNldCgyMDAsIDIwMCwgMjAwKTtcbmNhbWVyYS5sb29rQXQob3JpZ2luKTtcbnNjZW5lLmFkZChjYW1lcmEpO1xuXG5jb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pO1xucmVuZGVyZXIuc2V0U2l6ZShTQ1JFRU5fV0lEVEgsIFNDUkVFTl9IRUlHSFQpO1xuXG5yZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwcy9oZWxwZXJzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==