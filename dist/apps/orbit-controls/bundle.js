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
	var NEAR = 1;
	var FAR = 10000;
	
	var scene = void 0;
	var camera = void 0;
	var renderer = void 0;
	var controls = void 0;
	var axisHelper = void 0;
	var gridHelper = void 0;
	
	function init() {
	  scene = new THREE.Scene();
	
	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);
	
	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);
	
	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 200, 200);
	  camera.lookAt(new THREE.Vector3(0, 0, 0));
	
	  renderer = new THREE.WebGLRenderer();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	
	  controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	  document.body.appendChild(renderer.domElement);
	}
	
	function animate() {
	  requestAnimationFrame(animate);
	  controls.update();
	  renderer.render(scene, camera);
	}
	
	init();
	animate();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzlkNTg2NGI1YWFkNzBmNTRiOWM/ZDdhMyoqKiIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwcy9vcmJpdC1jb250cm9scy9pbmRleC5qcyJdLCJuYW1lcyI6WyJTQ1JFRU5fV0lEVEgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiU0NSRUVOX0hFSUdIVCIsImlubmVySGVpZ2h0IiwiVklFV19BTkdMRSIsIkFTUEVDVCIsIk5FQVIiLCJGQVIiLCJzY2VuZSIsImNhbWVyYSIsInJlbmRlcmVyIiwiY29udHJvbHMiLCJheGlzSGVscGVyIiwiZ3JpZEhlbHBlciIsImluaXQiLCJUSFJFRSIsIlNjZW5lIiwiQXhpc0hlbHBlciIsImFkZCIsIkdyaWRIZWxwZXIiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsInBvc2l0aW9uIiwic2V0IiwibG9va0F0IiwiVmVjdG9yMyIsIldlYkdMUmVuZGVyZXIiLCJzZXRTaXplIiwiT3JiaXRDb250cm9scyIsImRvbUVsZW1lbnQiLCJkb2N1bWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImFuaW1hdGUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ1cGRhdGUiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FBTUEsZUFBZUMsT0FBT0MsVUFBNUI7QUFDQSxLQUFNQyxnQkFBZ0JGLE9BQU9HLFdBQTdCO0FBQ0EsS0FBTUMsYUFBYSxFQUFuQjtBQUNBLEtBQU1DLFNBQVNOLGVBQWVHLGFBQTlCO0FBQ0EsS0FBTUksT0FBTyxDQUFiO0FBQ0EsS0FBTUMsTUFBTSxLQUFaOztBQUVBLEtBQUlDLGNBQUo7QUFDQSxLQUFJQyxlQUFKO0FBQ0EsS0FBSUMsaUJBQUo7QUFDQSxLQUFJQyxpQkFBSjtBQUNBLEtBQUlDLG1CQUFKO0FBQ0EsS0FBSUMsbUJBQUo7O0FBRUEsVUFBU0MsSUFBVCxHQUFnQjtBQUNkTixXQUFRLElBQUlPLE1BQU1DLEtBQVYsRUFBUjs7QUFFQUosZ0JBQWEsSUFBSUcsTUFBTUUsVUFBVixDQUFxQixHQUFyQixDQUFiO0FBQ0FULFNBQU1VLEdBQU4sQ0FBVU4sVUFBVjs7QUFFQUMsZ0JBQWEsSUFBSUUsTUFBTUksVUFBVixDQUFxQixHQUFyQixFQUEwQixFQUExQixDQUFiO0FBQ0FYLFNBQU1VLEdBQU4sQ0FBVUwsVUFBVjs7QUFFQUosWUFBUyxJQUFJTSxNQUFNSyxpQkFBVixDQUE0QmhCLFVBQTVCLEVBQXdDQyxNQUF4QyxFQUFnREMsSUFBaEQsRUFBc0RDLEdBQXRELENBQVQ7QUFDQUUsVUFBT1ksUUFBUCxDQUFnQkMsR0FBaEIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUI7QUFDQWIsVUFBT2MsTUFBUCxDQUFjLElBQUlSLE1BQU1TLE9BQVYsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsQ0FBZDs7QUFFQWQsY0FBVyxJQUFJSyxNQUFNVSxhQUFWLEVBQVg7QUFDQWYsWUFBU2dCLE9BQVQsQ0FBaUIxQixPQUFPQyxVQUF4QixFQUFvQ0QsT0FBT0csV0FBM0M7O0FBRUFRLGNBQVcsSUFBSUksTUFBTVksYUFBVixDQUF3QmxCLE1BQXhCLEVBQWdDQyxTQUFTa0IsVUFBekMsQ0FBWDs7QUFFQUMsWUFBU0MsSUFBVCxDQUFjQyxXQUFkLENBQTBCckIsU0FBU2tCLFVBQW5DO0FBQ0Q7O0FBRUQsVUFBU0ksT0FBVCxHQUFtQjtBQUNqQkMseUJBQXNCRCxPQUF0QjtBQUNBckIsWUFBU3VCLE1BQVQ7QUFDQXhCLFlBQVN5QixNQUFULENBQWdCM0IsS0FBaEIsRUFBdUJDLE1BQXZCO0FBQ0Q7O0FBRURLO0FBQ0FrQixXIiwiZmlsZSI6ImRpc3QvYXBwcy9vcmJpdC1jb250cm9scy9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjOWQ1ODY0YjVhYWQ3MGY1NGI5YyIsImNvbnN0IFNDUkVFTl9XSURUSCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY29uc3QgU0NSRUVOX0hFSUdIVCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmNvbnN0IFZJRVdfQU5HTEUgPSA0NTtcbmNvbnN0IEFTUEVDVCA9IFNDUkVFTl9XSURUSCAvIFNDUkVFTl9IRUlHSFQ7XG5jb25zdCBORUFSID0gMTtcbmNvbnN0IEZBUiA9IDEwMDAwO1xuXG5sZXQgc2NlbmU7XG5sZXQgY2FtZXJhO1xubGV0IHJlbmRlcmVyO1xubGV0IGNvbnRyb2xzO1xubGV0IGF4aXNIZWxwZXI7XG5sZXQgZ3JpZEhlbHBlcjtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICBheGlzSGVscGVyID0gbmV3IFRIUkVFLkF4aXNIZWxwZXIoMTAwKTtcbiAgc2NlbmUuYWRkKGF4aXNIZWxwZXIpO1xuXG4gIGdyaWRIZWxwZXIgPSBuZXcgVEhSRUUuR3JpZEhlbHBlcigxMDAsIDEwKTtcbiAgc2NlbmUuYWRkKGdyaWRIZWxwZXIpO1xuXG4gIGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShWSUVXX0FOR0xFLCBBU1BFQ1QsIE5FQVIsIEZBUik7XG4gIGNhbWVyYS5wb3NpdGlvbi5zZXQoMjAwLCAyMDAsIDIwMCk7XG4gIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICBjb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICBjb250cm9scy51cGRhdGUoKTtcbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xufVxuXG5pbml0KCk7XG5hbmltYXRlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwcy9vcmJpdC1jb250cm9scy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=