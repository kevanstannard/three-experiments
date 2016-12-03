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
	
	var controls = void 0;
	var renderer = void 0;
	var scene = void 0;
	var camera = void 0;
	
	var origin = new THREE.Vector3(0, 0, 0);
	
	function renderGridHelper() {
	  var gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);
	}
	
	function renderAxisHelper() {
	  var axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);
	}
	
	function renderArrowHelper() {
	  var arrorDir = new THREE.Vector3(3, 2, 1).normalize();
	  var arrowLength = 100;
	  var arrowColor = 0xffff00;
	  var arrowHelper = new THREE.ArrowHelper(arrorDir, origin, arrowLength, arrowColor);
	  scene.add(arrowHelper);
	}
	
	function init() {
	  scene = new THREE.Scene();
	
	  renderGridHelper();
	  renderAxisHelper();
	  renderArrowHelper();
	
	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 200, 200);
	  camera.lookAt(origin);
	  scene.add(camera);
	
	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	
	  controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	  THREEx.WindowResize(renderer, camera);
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDc/MWNkYSoqIiwid2VicGFjazovLy8uL3NyYy9hcHBzL2hlbHBlcnMvaW5kZXguanMiXSwibmFtZXMiOlsiU0NSRUVOX1dJRFRIIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIlNDUkVFTl9IRUlHSFQiLCJpbm5lckhlaWdodCIsIlZJRVdfQU5HTEUiLCJBU1BFQ1QiLCJORUFSIiwiRkFSIiwiY29udHJvbHMiLCJyZW5kZXJlciIsInNjZW5lIiwiY2FtZXJhIiwib3JpZ2luIiwiVEhSRUUiLCJWZWN0b3IzIiwicmVuZGVyR3JpZEhlbHBlciIsImdyaWRIZWxwZXIiLCJHcmlkSGVscGVyIiwiYWRkIiwicmVuZGVyQXhpc0hlbHBlciIsImF4aXNIZWxwZXIiLCJBeGlzSGVscGVyIiwicmVuZGVyQXJyb3dIZWxwZXIiLCJhcnJvckRpciIsIm5vcm1hbGl6ZSIsImFycm93TGVuZ3RoIiwiYXJyb3dDb2xvciIsImFycm93SGVscGVyIiwiQXJyb3dIZWxwZXIiLCJpbml0IiwiU2NlbmUiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsInBvc2l0aW9uIiwic2V0IiwibG9va0F0IiwiV2ViR0xSZW5kZXJlciIsImFudGlhbGlhcyIsInNldFNpemUiLCJPcmJpdENvbnRyb2xzIiwiZG9tRWxlbWVudCIsIlRIUkVFeCIsIldpbmRvd1Jlc2l6ZSIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiYW5pbWF0ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInVwZGF0ZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxLQUFNQSxlQUFlQyxPQUFPQyxVQUE1QjtBQUNBLEtBQU1DLGdCQUFnQkYsT0FBT0csV0FBN0I7QUFDQSxLQUFNQyxhQUFhLEVBQW5CO0FBQ0EsS0FBTUMsU0FBU04sZUFBZUcsYUFBOUI7QUFDQSxLQUFNSSxPQUFPLEdBQWI7QUFDQSxLQUFNQyxNQUFNLEtBQVo7O0FBRUEsS0FBSUMsaUJBQUo7QUFDQSxLQUFJQyxpQkFBSjtBQUNBLEtBQUlDLGNBQUo7QUFDQSxLQUFJQyxlQUFKOztBQUVBLEtBQU1DLFNBQVMsSUFBSUMsTUFBTUMsT0FBVixDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QixDQUFmOztBQUVBLFVBQVNDLGdCQUFULEdBQTRCO0FBQzFCLE9BQU1DLGFBQWEsSUFBSUgsTUFBTUksVUFBVixDQUFxQixHQUFyQixFQUEwQixFQUExQixDQUFuQjtBQUNBUCxTQUFNUSxHQUFOLENBQVVGLFVBQVY7QUFDRDs7QUFFRCxVQUFTRyxnQkFBVCxHQUE0QjtBQUMxQixPQUFNQyxhQUFhLElBQUlQLE1BQU1RLFVBQVYsQ0FBcUIsR0FBckIsQ0FBbkI7QUFDQVgsU0FBTVEsR0FBTixDQUFVRSxVQUFWO0FBQ0Q7O0FBRUQsVUFBU0UsaUJBQVQsR0FBNkI7QUFDM0IsT0FBTUMsV0FBVyxJQUFJVixNQUFNQyxPQUFWLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCVSxTQUEzQixFQUFqQjtBQUNBLE9BQU1DLGNBQWMsR0FBcEI7QUFDQSxPQUFNQyxhQUFhLFFBQW5CO0FBQ0EsT0FBTUMsY0FBYyxJQUFJZCxNQUFNZSxXQUFWLENBQXNCTCxRQUF0QixFQUFnQ1gsTUFBaEMsRUFBd0NhLFdBQXhDLEVBQXFEQyxVQUFyRCxDQUFwQjtBQUNBaEIsU0FBTVEsR0FBTixDQUFVUyxXQUFWO0FBQ0Q7O0FBRUQsVUFBU0UsSUFBVCxHQUFnQjtBQUNkbkIsV0FBUSxJQUFJRyxNQUFNaUIsS0FBVixFQUFSOztBQUVBZjtBQUNBSTtBQUNBRzs7QUFFQVgsWUFBUyxJQUFJRSxNQUFNa0IsaUJBQVYsQ0FBNEIzQixVQUE1QixFQUF3Q0MsTUFBeEMsRUFBZ0RDLElBQWhELEVBQXNEQyxHQUF0RCxDQUFUO0FBQ0FJLFVBQU9xQixRQUFQLENBQWdCQyxHQUFoQixDQUFvQixHQUFwQixFQUF5QixHQUF6QixFQUE4QixHQUE5QjtBQUNBdEIsVUFBT3VCLE1BQVAsQ0FBY3RCLE1BQWQ7QUFDQUYsU0FBTVEsR0FBTixDQUFVUCxNQUFWOztBQUVBRixjQUFXLElBQUlJLE1BQU1zQixhQUFWLENBQXdCLEVBQUVDLFdBQVcsSUFBYixFQUF4QixDQUFYO0FBQ0EzQixZQUFTNEIsT0FBVCxDQUFpQnRDLFlBQWpCLEVBQStCRyxhQUEvQjs7QUFFQU0sY0FBVyxJQUFJSyxNQUFNeUIsYUFBVixDQUF3QjNCLE1BQXhCLEVBQWdDRixTQUFTOEIsVUFBekMsQ0FBWDs7QUFFQUMsVUFBT0MsWUFBUCxDQUFvQmhDLFFBQXBCLEVBQThCRSxNQUE5Qjs7QUFFQStCLFlBQVNDLElBQVQsQ0FBY0MsV0FBZCxDQUEwQm5DLFNBQVM4QixVQUFuQztBQUNEOztBQUVELFVBQVNNLE9BQVQsR0FBbUI7QUFDakJDLHlCQUFzQkQsT0FBdEI7QUFDQXJDLFlBQVN1QyxNQUFUO0FBQ0F0QyxZQUFTdUMsTUFBVCxDQUFnQnRDLEtBQWhCLEVBQXVCQyxNQUF2QjtBQUNEOztBQUVEa0I7QUFDQWdCLFciLCJmaWxlIjoiZGlzdC9hcHBzL2hlbHBlcnMvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDciLCJjb25zdCBTQ1JFRU5fV0lEVEggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNvbnN0IFNDUkVFTl9IRUlHSFQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5jb25zdCBWSUVXX0FOR0xFID0gNDU7XG5jb25zdCBBU1BFQ1QgPSBTQ1JFRU5fV0lEVEggLyBTQ1JFRU5fSEVJR0hUO1xuY29uc3QgTkVBUiA9IDAuMTtcbmNvbnN0IEZBUiA9IDIwMDAwO1xuXG5sZXQgY29udHJvbHM7XG5sZXQgcmVuZGVyZXI7XG5sZXQgc2NlbmU7XG5sZXQgY2FtZXJhO1xuXG5jb25zdCBvcmlnaW4gPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKTtcblxuZnVuY3Rpb24gcmVuZGVyR3JpZEhlbHBlcigpIHtcbiAgY29uc3QgZ3JpZEhlbHBlciA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKDEwMCwgMTApO1xuICBzY2VuZS5hZGQoZ3JpZEhlbHBlcik7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckF4aXNIZWxwZXIoKSB7XG4gIGNvbnN0IGF4aXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhpc0hlbHBlcigxMDApO1xuICBzY2VuZS5hZGQoYXhpc0hlbHBlcik7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckFycm93SGVscGVyKCkge1xuICBjb25zdCBhcnJvckRpciA9IG5ldyBUSFJFRS5WZWN0b3IzKDMsIDIsIDEpLm5vcm1hbGl6ZSgpO1xuICBjb25zdCBhcnJvd0xlbmd0aCA9IDEwMDtcbiAgY29uc3QgYXJyb3dDb2xvciA9IDB4ZmZmZjAwO1xuICBjb25zdCBhcnJvd0hlbHBlciA9IG5ldyBUSFJFRS5BcnJvd0hlbHBlcihhcnJvckRpciwgb3JpZ2luLCBhcnJvd0xlbmd0aCwgYXJyb3dDb2xvcik7XG4gIHNjZW5lLmFkZChhcnJvd0hlbHBlcik7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgcmVuZGVyR3JpZEhlbHBlcigpO1xuICByZW5kZXJBeGlzSGVscGVyKCk7XG4gIHJlbmRlckFycm93SGVscGVyKCk7XG5cbiAgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKFZJRVdfQU5HTEUsIEFTUEVDVCwgTkVBUiwgRkFSKTtcbiAgY2FtZXJhLnBvc2l0aW9uLnNldCgyMDAsIDIwMCwgMjAwKTtcbiAgY2FtZXJhLmxvb2tBdChvcmlnaW4pO1xuICBzY2VuZS5hZGQoY2FtZXJhKTtcblxuICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzOiB0cnVlIH0pO1xuICByZW5kZXJlci5zZXRTaXplKFNDUkVFTl9XSURUSCwgU0NSRUVOX0hFSUdIVCk7XG5cbiAgY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gIFRIUkVFeC5XaW5kb3dSZXNpemUocmVuZGVyZXIsIGNhbWVyYSk7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICBjb250cm9scy51cGRhdGUoKTtcbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xufVxuXG5pbml0KCk7XG5hbmltYXRlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwcy9oZWxwZXJzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==