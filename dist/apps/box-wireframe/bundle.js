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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzlkNTg2NGI1YWFkNzBmNTRiOWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcHMvYm94LXdpcmVmcmFtZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJTQ1JFRU5fV0lEVEgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiU0NSRUVOX0hFSUdIVCIsImlubmVySGVpZ2h0IiwiVklFV19BTkdMRSIsIkFTUEVDVCIsIk5FQVIiLCJGQVIiLCJzY2VuZSIsImNhbWVyYSIsInJlbmRlcmVyIiwiZ2VvbWV0cnkiLCJtYXRlcmlhbCIsIm1lc2giLCJpbml0IiwiVEhSRUUiLCJTY2VuZSIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwicG9zaXRpb24iLCJ6IiwiQm94R2VvbWV0cnkiLCJNZXNoQmFzaWNNYXRlcmlhbCIsImNvbG9yIiwid2lyZWZyYW1lIiwiTWVzaCIsImFkZCIsIldlYkdMUmVuZGVyZXIiLCJzZXRTaXplIiwiZG9jdW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJkb21FbGVtZW50IiwiYW5pbWF0ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInJvdGF0aW9uIiwieCIsInkiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0EsS0FBTUEsZUFBZUMsT0FBT0MsVUFBNUI7QUFDQSxLQUFNQyxnQkFBZ0JGLE9BQU9HLFdBQTdCO0FBQ0EsS0FBTUMsYUFBYSxFQUFuQjtBQUNBLEtBQU1DLFNBQVNOLGVBQWVHLGFBQTlCO0FBQ0EsS0FBTUksT0FBTyxDQUFiO0FBQ0EsS0FBTUMsTUFBTSxLQUFaOztBQUVBLEtBQUlDLGNBQUo7QUFDQSxLQUFJQyxlQUFKO0FBQ0EsS0FBSUMsaUJBQUo7QUFDQSxLQUFJQyxpQkFBSjtBQUNBLEtBQUlDLGlCQUFKO0FBQ0EsS0FBSUMsYUFBSjs7QUFFQSxVQUFTQyxJQUFULEdBQWdCO0FBQ2ROLFdBQVEsSUFBSU8sTUFBTUMsS0FBVixFQUFSOztBQUVBUCxZQUFTLElBQUlNLE1BQU1FLGlCQUFWLENBQTRCYixVQUE1QixFQUF3Q0MsTUFBeEMsRUFBZ0RDLElBQWhELEVBQXNEQyxHQUF0RCxDQUFUO0FBQ0FFLFVBQU9TLFFBQVAsQ0FBZ0JDLENBQWhCLEdBQW9CLElBQXBCOztBQUVBUixjQUFXLElBQUlJLE1BQU1LLFdBQVYsQ0FBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsQ0FBWDtBQUNBUixjQUFXLElBQUlHLE1BQU1NLGlCQUFWLENBQTRCLEVBQUVDLE9BQU8sUUFBVCxFQUFtQkMsV0FBVyxJQUE5QixFQUE1QixDQUFYOztBQUVBVixVQUFPLElBQUlFLE1BQU1TLElBQVYsQ0FBZWIsUUFBZixFQUF5QkMsUUFBekIsQ0FBUDtBQUNBSixTQUFNaUIsR0FBTixDQUFVWixJQUFWOztBQUVBSCxjQUFXLElBQUlLLE1BQU1XLGFBQVYsRUFBWDtBQUNBaEIsWUFBU2lCLE9BQVQsQ0FBaUIzQixPQUFPQyxVQUF4QixFQUFvQ0QsT0FBT0csV0FBM0M7O0FBRUF5QixZQUFTQyxJQUFULENBQWNDLFdBQWQsQ0FBMEJwQixTQUFTcUIsVUFBbkM7QUFDRDs7QUFFRCxVQUFTQyxPQUFULEdBQW1CO0FBQ2pCQyx5QkFBc0JELE9BQXRCOztBQUVBbkIsUUFBS3FCLFFBQUwsQ0FBY0MsQ0FBZCxJQUFtQixJQUFuQjtBQUNBdEIsUUFBS3FCLFFBQUwsQ0FBY0UsQ0FBZCxJQUFtQixJQUFuQjs7QUFFQTFCLFlBQVMyQixNQUFULENBQWdCN0IsS0FBaEIsRUFBdUJDLE1BQXZCO0FBQ0Q7O0FBRURLO0FBQ0FrQixXIiwiZmlsZSI6ImRpc3QvYXBwcy9ib3gtd2lyZWZyYW1lL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGM5ZDU4NjRiNWFhZDcwZjU0YjljIiwiY29uc3QgU0NSRUVOX1dJRFRIID0gd2luZG93LmlubmVyV2lkdGg7XG5jb25zdCBTQ1JFRU5fSEVJR0hUID0gd2luZG93LmlubmVySGVpZ2h0O1xuY29uc3QgVklFV19BTkdMRSA9IDQ1O1xuY29uc3QgQVNQRUNUID0gU0NSRUVOX1dJRFRIIC8gU0NSRUVOX0hFSUdIVDtcbmNvbnN0IE5FQVIgPSAxO1xuY29uc3QgRkFSID0gMTAwMDA7XG5cbmxldCBzY2VuZTtcbmxldCBjYW1lcmE7XG5sZXQgcmVuZGVyZXI7XG5sZXQgZ2VvbWV0cnk7XG5sZXQgbWF0ZXJpYWw7XG5sZXQgbWVzaDtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoVklFV19BTkdMRSwgQVNQRUNULCBORUFSLCBGQVIpO1xuICBjYW1lcmEucG9zaXRpb24ueiA9IDEwMDA7XG5cbiAgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMjAwLCAyMDAsIDIwMCk7XG4gIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmYwMDAwLCB3aXJlZnJhbWU6IHRydWUgfSk7XG5cbiAgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gIHNjZW5lLmFkZChtZXNoKTtcblxuICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuXG4gIG1lc2gucm90YXRpb24ueCArPSAwLjAxO1xuICBtZXNoLnJvdGF0aW9uLnkgKz0gMC4wMjtcblxuICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG59XG5cbmluaXQoKTtcbmFuaW1hdGUoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHBzL2JveC13aXJlZnJhbWUvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9