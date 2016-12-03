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
	
	// See:
	// https://www.youtube.com/watch?v=k3adBAnDpos
	// http://stackoverflow.com/questions/17558085/three-js-orthographic-camera
	
	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	
	// View size is how much vertical space to fit in the view
	// This is in world coordinates
	var VIEW_SIZE = 600;
	
	// The aspect ratio provides information about how wide our view should
	// be compared to how tall it should be
	var ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
	
	var scene = void 0;
	var camera = void 0;
	var renderer = void 0;
	var axisHelper = void 0;
	var gridHelper = void 0;
	var controls = void 0;
	var ambientLight = void 0;
	var light = void 0;
	
	var origin = new THREE.Vector3(0, 0, 0);
	
	function init() {
	  scene = new THREE.Scene();
	
	  gridHelper = new THREE.GridHelper(230, 3);
	  scene.add(gridHelper);
	
	  axisHelper = new THREE.AxisHelper(230);
	  scene.add(axisHelper);
	
	  var boxSize = 100;
	  var gapSize = 50;
	  var gridSize = 3;
	
	  var areaSize = boxSize * gridSize + gapSize * (gridSize - 1);
	  var start = -(areaSize / 2) + boxSize / 2;
	  var end = areaSize / 2 + boxSize / 2;
	
	  for (var x = start; x <= end; x += boxSize + gapSize) {
	    for (var z = start; z <= end; z += boxSize + gapSize) {
	      var height = 1 + Math.random() * 199;
	      var geometry = new THREE.BoxGeometry(100, height, 100);
	      var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
	      var mesh = new THREE.Mesh(geometry, material);
	      mesh.position.set(x, height / 2, z);
	      scene.add(mesh);
	    }
	  }
	
	  ambientLight = new THREE.AmbientLight(0x444444);
	  scene.add(ambientLight);
	
	  light = new THREE.DirectionalLight(0xffffff, 1, 1000);
	  light.position.set(100, 300, 600);
	  scene.add(light);
	
	  camera = new THREE.OrthographicCamera(-(ASPECT_RATIO * VIEW_SIZE) / 2, ASPECT_RATIO * VIEW_SIZE / 2, VIEW_SIZE / 2, -(VIEW_SIZE / 2), -1000, 1000);
	
	  camera.position.set(300, 300, 300);
	
	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);
	
	  controls = new THREE.OrbitControls(camera, renderer.domElement);
	  controls.target.set(origin.x, origin.y, origin.z);
	
	  THREEx.WindowResize(renderer, camera);
	
	  document.body.appendChild(renderer.domElement);
	}
	
	function update() {
	  controls.update();
	}
	
	function animate() {
	  requestAnimationFrame(animate);
	  update();
	  renderer.render(scene, camera);
	}
	
	init();
	animate();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDc/MWNkYSoqKioqIiwid2VicGFjazovLy8uL3NyYy9hcHBzL29ydGhvZ3JhcGhpYy1jYW1lcmEvaW5kZXguanMiXSwibmFtZXMiOlsiU0NSRUVOX1dJRFRIIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIlNDUkVFTl9IRUlHSFQiLCJpbm5lckhlaWdodCIsIlZJRVdfU0laRSIsIkFTUEVDVF9SQVRJTyIsInNjZW5lIiwiY2FtZXJhIiwicmVuZGVyZXIiLCJheGlzSGVscGVyIiwiZ3JpZEhlbHBlciIsImNvbnRyb2xzIiwiYW1iaWVudExpZ2h0IiwibGlnaHQiLCJvcmlnaW4iLCJUSFJFRSIsIlZlY3RvcjMiLCJpbml0IiwiU2NlbmUiLCJHcmlkSGVscGVyIiwiYWRkIiwiQXhpc0hlbHBlciIsImJveFNpemUiLCJnYXBTaXplIiwiZ3JpZFNpemUiLCJhcmVhU2l6ZSIsInN0YXJ0IiwiZW5kIiwieCIsInoiLCJoZWlnaHQiLCJNYXRoIiwicmFuZG9tIiwiZ2VvbWV0cnkiLCJCb3hHZW9tZXRyeSIsIm1hdGVyaWFsIiwiTWVzaExhbWJlcnRNYXRlcmlhbCIsImNvbG9yIiwibWVzaCIsIk1lc2giLCJwb3NpdGlvbiIsInNldCIsIkFtYmllbnRMaWdodCIsIkRpcmVjdGlvbmFsTGlnaHQiLCJPcnRob2dyYXBoaWNDYW1lcmEiLCJXZWJHTFJlbmRlcmVyIiwiYW50aWFsaWFzIiwic2V0U2l6ZSIsIk9yYml0Q29udHJvbHMiLCJkb21FbGVtZW50IiwidGFyZ2V0IiwieSIsIlRIUkVFeCIsIldpbmRvd1Jlc2l6ZSIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwidXBkYXRlIiwiYW5pbWF0ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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LEVBQUVBLFlBQVksQ0FBZCxDQUZSLEVBR1AsQ0FBQyxJQUhNLEVBR0EsSUFIQSxDQUFUOztBQU1BRyxVQUFPaUMsUUFBUCxDQUFnQkMsR0FBaEIsQ0FBb0IsR0FBcEIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUI7O0FBRUFqQyxjQUFXLElBQUlPLE1BQU04QixhQUFWLENBQXdCLEVBQUVDLFdBQVcsSUFBYixFQUF4QixDQUFYO0FBQ0F0QyxZQUFTdUMsT0FBVCxDQUFpQi9DLE9BQU9DLFVBQXhCLEVBQW9DRCxPQUFPRyxXQUEzQzs7QUFFQVEsY0FBVyxJQUFJSSxNQUFNaUMsYUFBVixDQUF3QnpDLE1BQXhCLEVBQWdDQyxTQUFTeUMsVUFBekMsQ0FBWDtBQUNBdEMsWUFBU3VDLE1BQVQsQ0FBZ0JULEdBQWhCLENBQW9CM0IsT0FBT2MsQ0FBM0IsRUFBOEJkLE9BQU9xQyxDQUFyQyxFQUF3Q3JDLE9BQU9lLENBQS9DOztBQUVBdUIsVUFBT0MsWUFBUCxDQUFvQjdDLFFBQXBCLEVBQThCRCxNQUE5Qjs7QUFFQStDLFlBQVNDLElBQVQsQ0FBY0MsV0FBZCxDQUEwQmhELFNBQVN5QyxVQUFuQztBQUNEOztBQUVELFVBQVNRLE1BQVQsR0FBa0I7QUFDaEI5QyxZQUFTOEMsTUFBVDtBQUNEOztBQUVELFVBQVNDLE9BQVQsR0FBbUI7QUFDakJDLHlCQUFzQkQsT0FBdEI7QUFDQUQ7QUFDQWpELFlBQVNvRCxNQUFULENBQWdCdEQsS0FBaEIsRUFBdUJDLE1BQXZCO0FBQ0Q7O0FBRURVO0FBQ0F5QyxXIiwiZmlsZSI6ImRpc3QvYXBwcy9vcnRob2dyYXBoaWMtY2FtZXJhL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI5ZDM2OTUxZDMyNzQyMTg5M2Q3IiwiLy8gU2VlOlxuLy8gaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1rM2FkQkFuRHBvc1xuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNzU1ODA4NS90aHJlZS1qcy1vcnRob2dyYXBoaWMtY2FtZXJhXG5cbmNvbnN0IFNDUkVFTl9XSURUSCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY29uc3QgU0NSRUVOX0hFSUdIVCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuLy8gVmlldyBzaXplIGlzIGhvdyBtdWNoIHZlcnRpY2FsIHNwYWNlIHRvIGZpdCBpbiB0aGUgdmlld1xuLy8gVGhpcyBpcyBpbiB3b3JsZCBjb29yZGluYXRlc1xuY29uc3QgVklFV19TSVpFID0gNjAwO1xuXG4vLyBUaGUgYXNwZWN0IHJhdGlvIHByb3ZpZGVzIGluZm9ybWF0aW9uIGFib3V0IGhvdyB3aWRlIG91ciB2aWV3IHNob3VsZFxuLy8gYmUgY29tcGFyZWQgdG8gaG93IHRhbGwgaXQgc2hvdWxkIGJlXG5jb25zdCBBU1BFQ1RfUkFUSU8gPSBTQ1JFRU5fV0lEVEggLyBTQ1JFRU5fSEVJR0hUO1xuXG5sZXQgc2NlbmU7XG5sZXQgY2FtZXJhO1xubGV0IHJlbmRlcmVyO1xubGV0IGF4aXNIZWxwZXI7XG5sZXQgZ3JpZEhlbHBlcjtcbmxldCBjb250cm9scztcbmxldCBhbWJpZW50TGlnaHQ7XG5sZXQgbGlnaHQ7XG5cbmNvbnN0IG9yaWdpbiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gIGdyaWRIZWxwZXIgPSBuZXcgVEhSRUUuR3JpZEhlbHBlcigyMzAsIDMpO1xuICBzY2VuZS5hZGQoZ3JpZEhlbHBlcik7XG5cbiAgYXhpc0hlbHBlciA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDIzMCk7XG4gIHNjZW5lLmFkZChheGlzSGVscGVyKTtcblxuICBjb25zdCBib3hTaXplID0gMTAwO1xuICBjb25zdCBnYXBTaXplID0gNTA7XG4gIGNvbnN0IGdyaWRTaXplID0gMztcblxuICBjb25zdCBhcmVhU2l6ZSA9IChib3hTaXplICogZ3JpZFNpemUpICsgKGdhcFNpemUgKiAoZ3JpZFNpemUgLSAxKSk7XG4gIGNvbnN0IHN0YXJ0ID0gLShhcmVhU2l6ZSAvIDIpICsgKGJveFNpemUgLyAyKTtcbiAgY29uc3QgZW5kID0gKGFyZWFTaXplIC8gMikgKyAoYm94U2l6ZSAvIDIpO1xuXG4gIGZvciAobGV0IHggPSBzdGFydDsgeCA8PSBlbmQ7IHggKz0gKGJveFNpemUgKyBnYXBTaXplKSkge1xuICAgIGZvciAobGV0IHogPSBzdGFydDsgeiA8PSBlbmQ7IHogKz0gKGJveFNpemUgKyBnYXBTaXplKSkge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gMSArIChNYXRoLnJhbmRvbSgpICogMTk5KTtcbiAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDEwMCwgaGVpZ2h0LCAxMDApO1xuICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcbiAgICAgIGNvbnN0IG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgbWVzaC5wb3NpdGlvbi5zZXQoeCwgaGVpZ2h0IC8gMiwgeik7XG4gICAgICBzY2VuZS5hZGQobWVzaCk7XG4gICAgfVxuICB9XG5cbiAgYW1iaWVudExpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDQ0NDQ0NCk7XG4gIHNjZW5lLmFkZChhbWJpZW50TGlnaHQpO1xuXG4gIGxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDEsIDEwMDApO1xuICBsaWdodC5wb3NpdGlvbi5zZXQoMTAwLCAzMDAsIDYwMCk7XG4gIHNjZW5lLmFkZChsaWdodCk7XG5cbiAgY2FtZXJhID0gbmV3IFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYShcbiAgICAtKEFTUEVDVF9SQVRJTyAqIFZJRVdfU0laRSkgLyAyLCAoQVNQRUNUX1JBVElPICogVklFV19TSVpFKSAvIDIsXG4gICAgVklFV19TSVpFIC8gMiwgLShWSUVXX1NJWkUgLyAyKSxcbiAgICAtMTAwMCwgMTAwMCxcbiAgKTtcblxuICBjYW1lcmEucG9zaXRpb24uc2V0KDMwMCwgMzAwLCAzMDApO1xuXG4gIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSk7XG4gIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICBjb250cm9scy50YXJnZXQuc2V0KG9yaWdpbi54LCBvcmlnaW4ueSwgb3JpZ2luLnopO1xuXG4gIFRIUkVFeC5XaW5kb3dSZXNpemUocmVuZGVyZXIsIGNhbWVyYSk7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlKCkge1xuICBjb250cm9scy51cGRhdGUoKTtcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICB1cGRhdGUoKTtcbiAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xufVxuXG5pbml0KCk7XG5hbmltYXRlKCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwcy9vcnRob2dyYXBoaWMtY2FtZXJhL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==