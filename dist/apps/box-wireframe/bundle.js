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
	var geometry = void 0;
	var material = void 0;
	var mesh = void 0;
	
	function init() {
	  scene = new THREE.Scene();
	
	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.z = 1000;
	
	  geometry = new THREE.BoxGeometry(200, 200, 200);
	  material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
	
	  mesh = new THREE.Mesh(geometry, material);
	  scene.add(mesh);
	
	  renderer = new THREE.WebGLRenderer();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	
	  document.body.appendChild(renderer.domElement);
	}
	
	function animate() {
	  requestAnimationFrame(animate);
	
	  mesh.rotation.x += 0.01;
	  mesh.rotation.y += 0.02;
	
	  renderer.render(scene, camera);
	}
	
	init();
	animate();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDc/MWNkYSIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwcy9ib3gtd2lyZWZyYW1lL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNDUkVFTl9XSURUSCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJTQ1JFRU5fSEVJR0hUIiwiaW5uZXJIZWlnaHQiLCJWSUVXX0FOR0xFIiwiQVNQRUNUIiwiTkVBUiIsIkZBUiIsInNjZW5lIiwiY2FtZXJhIiwicmVuZGVyZXIiLCJnZW9tZXRyeSIsIm1hdGVyaWFsIiwibWVzaCIsImluaXQiLCJUSFJFRSIsIlNjZW5lIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJwb3NpdGlvbiIsInoiLCJCb3hHZW9tZXRyeSIsIk1lc2hCYXNpY01hdGVyaWFsIiwiY29sb3IiLCJ3aXJlZnJhbWUiLCJNZXNoIiwiYWRkIiwiV2ViR0xSZW5kZXJlciIsInNldFNpemUiLCJkb2N1bWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImRvbUVsZW1lbnQiLCJhbmltYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicm90YXRpb24iLCJ4IiwieSIsInJlbmRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxLQUFNQSxlQUFlQyxPQUFPQyxVQUE1QjtBQUNBLEtBQU1DLGdCQUFnQkYsT0FBT0csV0FBN0I7QUFDQSxLQUFNQyxhQUFhLEVBQW5CO0FBQ0EsS0FBTUMsU0FBU04sZUFBZUcsYUFBOUI7QUFDQSxLQUFNSSxPQUFPLENBQWI7QUFDQSxLQUFNQyxNQUFNLEtBQVo7O0FBRUEsS0FBSUMsY0FBSjtBQUNBLEtBQUlDLGVBQUo7QUFDQSxLQUFJQyxpQkFBSjtBQUNBLEtBQUlDLGlCQUFKO0FBQ0EsS0FBSUMsaUJBQUo7QUFDQSxLQUFJQyxhQUFKOztBQUVBLFVBQVNDLElBQVQsR0FBZ0I7QUFDZE4sV0FBUSxJQUFJTyxNQUFNQyxLQUFWLEVBQVI7O0FBRUFQLFlBQVMsSUFBSU0sTUFBTUUsaUJBQVYsQ0FBNEJiLFVBQTVCLEVBQXdDQyxNQUF4QyxFQUFnREMsSUFBaEQsRUFBc0RDLEdBQXRELENBQVQ7QUFDQUUsVUFBT1MsUUFBUCxDQUFnQkMsQ0FBaEIsR0FBb0IsSUFBcEI7O0FBRUFSLGNBQVcsSUFBSUksTUFBTUssV0FBVixDQUFzQixHQUF0QixFQUEyQixHQUEzQixFQUFnQyxHQUFoQyxDQUFYO0FBQ0FSLGNBQVcsSUFBSUcsTUFBTU0saUJBQVYsQ0FBNEIsRUFBRUMsT0FBTyxRQUFULEVBQW1CQyxXQUFXLElBQTlCLEVBQTVCLENBQVg7O0FBRUFWLFVBQU8sSUFBSUUsTUFBTVMsSUFBVixDQUFlYixRQUFmLEVBQXlCQyxRQUF6QixDQUFQO0FBQ0FKLFNBQU1pQixHQUFOLENBQVVaLElBQVY7O0FBRUFILGNBQVcsSUFBSUssTUFBTVcsYUFBVixFQUFYO0FBQ0FoQixZQUFTaUIsT0FBVCxDQUFpQjNCLE9BQU9DLFVBQXhCLEVBQW9DRCxPQUFPRyxXQUEzQzs7QUFFQXlCLFlBQVNDLElBQVQsQ0FBY0MsV0FBZCxDQUEwQnBCLFNBQVNxQixVQUFuQztBQUNEOztBQUVELFVBQVNDLE9BQVQsR0FBbUI7QUFDakJDLHlCQUFzQkQsT0FBdEI7O0FBRUFuQixRQUFLcUIsUUFBTCxDQUFjQyxDQUFkLElBQW1CLElBQW5CO0FBQ0F0QixRQUFLcUIsUUFBTCxDQUFjRSxDQUFkLElBQW1CLElBQW5COztBQUVBMUIsWUFBUzJCLE1BQVQsQ0FBZ0I3QixLQUFoQixFQUF1QkMsTUFBdkI7QUFDRDs7QUFFREs7QUFDQWtCLFciLCJmaWxlIjoiZGlzdC9hcHBzL2JveC13aXJlZnJhbWUvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDciLCJjb25zdCBTQ1JFRU5fV0lEVEggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNvbnN0IFNDUkVFTl9IRUlHSFQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5jb25zdCBWSUVXX0FOR0xFID0gNDU7XG5jb25zdCBBU1BFQ1QgPSBTQ1JFRU5fV0lEVEggLyBTQ1JFRU5fSEVJR0hUO1xuY29uc3QgTkVBUiA9IDE7XG5jb25zdCBGQVIgPSAxMDAwMDtcblxubGV0IHNjZW5lO1xubGV0IGNhbWVyYTtcbmxldCByZW5kZXJlcjtcbmxldCBnZW9tZXRyeTtcbmxldCBtYXRlcmlhbDtcbmxldCBtZXNoO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gIGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShWSUVXX0FOR0xFLCBBU1BFQ1QsIE5FQVIsIEZBUik7XG4gIGNhbWVyYS5wb3NpdGlvbi56ID0gMTAwMDtcblxuICBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgyMDAsIDIwMCwgMjAwKTtcbiAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogMHhmZjAwMDAsIHdpcmVmcmFtZTogdHJ1ZSB9KTtcblxuICBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgc2NlbmUuYWRkKG1lc2gpO1xuXG4gIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG5cbiAgbWVzaC5yb3RhdGlvbi54ICs9IDAuMDE7XG4gIG1lc2gucm90YXRpb24ueSArPSAwLjAyO1xuXG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcbn1cblxuaW5pdCgpO1xuYW5pbWF0ZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcHMvYm94LXdpcmVmcmFtZS9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=