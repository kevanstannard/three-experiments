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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDciLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcHMvb3JiaXQtY29udHJvbHMvaW5kZXguanMiXSwibmFtZXMiOlsiU0NSRUVOX1dJRFRIIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIlNDUkVFTl9IRUlHSFQiLCJpbm5lckhlaWdodCIsIlZJRVdfQU5HTEUiLCJBU1BFQ1QiLCJORUFSIiwiRkFSIiwic2NlbmUiLCJjYW1lcmEiLCJyZW5kZXJlciIsImNvbnRyb2xzIiwiYXhpc0hlbHBlciIsImdyaWRIZWxwZXIiLCJpbml0IiwiVEhSRUUiLCJTY2VuZSIsIkF4aXNIZWxwZXIiLCJhZGQiLCJHcmlkSGVscGVyIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJwb3NpdGlvbiIsInNldCIsImxvb2tBdCIsIlZlY3RvcjMiLCJXZWJHTFJlbmRlcmVyIiwic2V0U2l6ZSIsIk9yYml0Q29udHJvbHMiLCJkb21FbGVtZW50IiwiZG9jdW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJhbmltYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidXBkYXRlIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLEtBQU1BLGVBQWVDLE9BQU9DLFVBQTVCO0FBQ0EsS0FBTUMsZ0JBQWdCRixPQUFPRyxXQUE3QjtBQUNBLEtBQU1DLGFBQWEsRUFBbkI7QUFDQSxLQUFNQyxTQUFTTixlQUFlRyxhQUE5QjtBQUNBLEtBQU1JLE9BQU8sQ0FBYjtBQUNBLEtBQU1DLE1BQU0sS0FBWjs7QUFFQSxLQUFJQyxjQUFKO0FBQ0EsS0FBSUMsZUFBSjtBQUNBLEtBQUlDLGlCQUFKO0FBQ0EsS0FBSUMsaUJBQUo7QUFDQSxLQUFJQyxtQkFBSjtBQUNBLEtBQUlDLG1CQUFKOztBQUVBLFVBQVNDLElBQVQsR0FBZ0I7QUFDZE4sV0FBUSxJQUFJTyxNQUFNQyxLQUFWLEVBQVI7O0FBRUFKLGdCQUFhLElBQUlHLE1BQU1FLFVBQVYsQ0FBcUIsR0FBckIsQ0FBYjtBQUNBVCxTQUFNVSxHQUFOLENBQVVOLFVBQVY7O0FBRUFDLGdCQUFhLElBQUlFLE1BQU1JLFVBQVYsQ0FBcUIsR0FBckIsRUFBMEIsRUFBMUIsQ0FBYjtBQUNBWCxTQUFNVSxHQUFOLENBQVVMLFVBQVY7O0FBRUFKLFlBQVMsSUFBSU0sTUFBTUssaUJBQVYsQ0FBNEJoQixVQUE1QixFQUF3Q0MsTUFBeEMsRUFBZ0RDLElBQWhELEVBQXNEQyxHQUF0RCxDQUFUO0FBQ0FFLFVBQU9ZLFFBQVAsQ0FBZ0JDLEdBQWhCLENBQW9CLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCLEdBQTlCO0FBQ0FiLFVBQU9jLE1BQVAsQ0FBYyxJQUFJUixNQUFNUyxPQUFWLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLENBQWQ7O0FBRUFkLGNBQVcsSUFBSUssTUFBTVUsYUFBVixFQUFYO0FBQ0FmLFlBQVNnQixPQUFULENBQWlCMUIsT0FBT0MsVUFBeEIsRUFBb0NELE9BQU9HLFdBQTNDOztBQUVBUSxjQUFXLElBQUlJLE1BQU1ZLGFBQVYsQ0FBd0JsQixNQUF4QixFQUFnQ0MsU0FBU2tCLFVBQXpDLENBQVg7O0FBRUFDLFlBQVNDLElBQVQsQ0FBY0MsV0FBZCxDQUEwQnJCLFNBQVNrQixVQUFuQztBQUNEOztBQUVELFVBQVNJLE9BQVQsR0FBbUI7QUFDakJDLHlCQUFzQkQsT0FBdEI7QUFDQXJCLFlBQVN1QixNQUFUO0FBQ0F4QixZQUFTeUIsTUFBVCxDQUFnQjNCLEtBQWhCLEVBQXVCQyxNQUF2QjtBQUNEOztBQUVESztBQUNBa0IsVyIsImZpbGUiOiJkaXN0L2FwcHMvb3JiaXQtY29udHJvbHMvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDciLCJjb25zdCBTQ1JFRU5fV0lEVEggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNvbnN0IFNDUkVFTl9IRUlHSFQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5jb25zdCBWSUVXX0FOR0xFID0gNDU7XG5jb25zdCBBU1BFQ1QgPSBTQ1JFRU5fV0lEVEggLyBTQ1JFRU5fSEVJR0hUO1xuY29uc3QgTkVBUiA9IDE7XG5jb25zdCBGQVIgPSAxMDAwMDtcblxubGV0IHNjZW5lO1xubGV0IGNhbWVyYTtcbmxldCByZW5kZXJlcjtcbmxldCBjb250cm9scztcbmxldCBheGlzSGVscGVyO1xubGV0IGdyaWRIZWxwZXI7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgYXhpc0hlbHBlciA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDEwMCk7XG4gIHNjZW5lLmFkZChheGlzSGVscGVyKTtcblxuICBncmlkSGVscGVyID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoMTAwLCAxMCk7XG4gIHNjZW5lLmFkZChncmlkSGVscGVyKTtcblxuICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoVklFV19BTkdMRSwgQVNQRUNULCBORUFSLCBGQVIpO1xuICBjYW1lcmEucG9zaXRpb24uc2V0KDIwMCwgMjAwLCAyMDApO1xuICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcblxuICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgY29udHJvbHMudXBkYXRlKCk7XG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcbn1cblxuaW5pdCgpO1xuYW5pbWF0ZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcHMvb3JiaXQtY29udHJvbHMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9