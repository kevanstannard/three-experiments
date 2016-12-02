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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzlkNTg2NGI1YWFkNzBmNTRiOWM/ZDdhMyoqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcHMvb3J0aG9ncmFwaGljLWNhbWVyYS9pbmRleC5qcyJdLCJuYW1lcyI6WyJTQ1JFRU5fV0lEVEgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiU0NSRUVOX0hFSUdIVCIsImlubmVySGVpZ2h0IiwiVklFV19TSVpFIiwiQVNQRUNUX1JBVElPIiwic2NlbmUiLCJjYW1lcmEiLCJyZW5kZXJlciIsImF4aXNIZWxwZXIiLCJncmlkSGVscGVyIiwiY29udHJvbHMiLCJhbWJpZW50TGlnaHQiLCJsaWdodCIsIm9yaWdpbiIsIlRIUkVFIiwiVmVjdG9yMyIsImluaXQiLCJTY2VuZSIsIkdyaWRIZWxwZXIiLCJhZGQiLCJBeGlzSGVscGVyIiwiYm94U2l6ZSIsImdhcFNpemUiLCJncmlkU2l6ZSIsImFyZWFTaXplIiwic3RhcnQiLCJlbmQiLCJ4IiwieiIsImhlaWdodCIsIk1hdGgiLCJyYW5kb20iLCJnZW9tZXRyeSIsIkJveEdlb21ldHJ5IiwibWF0ZXJpYWwiLCJNZXNoTGFtYmVydE1hdGVyaWFsIiwiY29sb3IiLCJtZXNoIiwiTWVzaCIsInBvc2l0aW9uIiwic2V0IiwiQW1iaWVudExpZ2h0IiwiRGlyZWN0aW9uYWxMaWdodCIsIk9ydGhvZ3JhcGhpY0NhbWVyYSIsIldlYkdMUmVuZGVyZXIiLCJhbnRpYWxpYXMiLCJzZXRTaXplIiwiT3JiaXRDb250cm9scyIsImRvbUVsZW1lbnQiLCJ0YXJnZXQiLCJ5IiwiVEhSRUV4IiwiV2luZG93UmVzaXplIiwiZG9jdW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJ1cGRhdGUiLCJhbmltYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Es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RUFBRUEsWUFBWSxDQUFkLENBRlIsRUFHUCxDQUFDLElBSE0sRUFHQSxJQUhBLENBQVQ7O0FBTUFHLFVBQU9pQyxRQUFQLENBQWdCQyxHQUFoQixDQUFvQixHQUFwQixFQUF5QixHQUF6QixFQUE4QixHQUE5Qjs7QUFFQWpDLGNBQVcsSUFBSU8sTUFBTThCLGFBQVYsQ0FBd0IsRUFBRUMsV0FBVyxJQUFiLEVBQXhCLENBQVg7QUFDQXRDLFlBQVN1QyxPQUFULENBQWlCL0MsT0FBT0MsVUFBeEIsRUFBb0NELE9BQU9HLFdBQTNDOztBQUVBUSxjQUFXLElBQUlJLE1BQU1pQyxhQUFWLENBQXdCekMsTUFBeEIsRUFBZ0NDLFNBQVN5QyxVQUF6QyxDQUFYO0FBQ0F0QyxZQUFTdUMsTUFBVCxDQUFnQlQsR0FBaEIsQ0FBb0IzQixPQUFPYyxDQUEzQixFQUE4QmQsT0FBT3FDLENBQXJDLEVBQXdDckMsT0FBT2UsQ0FBL0M7O0FBRUF1QixVQUFPQyxZQUFQLENBQW9CN0MsUUFBcEIsRUFBOEJELE1BQTlCOztBQUVBK0MsWUFBU0MsSUFBVCxDQUFjQyxXQUFkLENBQTBCaEQsU0FBU3lDLFVBQW5DO0FBQ0Q7O0FBRUQsVUFBU1EsTUFBVCxHQUFrQjtBQUNoQjlDLFlBQVM4QyxNQUFUO0FBQ0Q7O0FBRUQsVUFBU0MsT0FBVCxHQUFtQjtBQUNqQkMseUJBQXNCRCxPQUF0QjtBQUNBRDtBQUNBakQsWUFBU29ELE1BQVQsQ0FBZ0J0RCxLQUFoQixFQUF1QkMsTUFBdkI7QUFDRDs7QUFFRFU7QUFDQXlDLFciLCJmaWxlIjoiZGlzdC9hcHBzL29ydGhvZ3JhcGhpYy1jYW1lcmEvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzlkNTg2NGI1YWFkNzBmNTRiOWMiLCIvLyBTZWU6XG4vLyBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PWszYWRCQW5EcG9zXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE3NTU4MDg1L3RocmVlLWpzLW9ydGhvZ3JhcGhpYy1jYW1lcmFcblxuY29uc3QgU0NSRUVOX1dJRFRIID0gd2luZG93LmlubmVyV2lkdGg7XG5jb25zdCBTQ1JFRU5fSEVJR0hUID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4vLyBWaWV3IHNpemUgaXMgaG93IG11Y2ggdmVydGljYWwgc3BhY2UgdG8gZml0IGluIHRoZSB2aWV3XG4vLyBUaGlzIGlzIGluIHdvcmxkIGNvb3JkaW5hdGVzXG5jb25zdCBWSUVXX1NJWkUgPSA2MDA7XG5cbi8vIFRoZSBhc3BlY3QgcmF0aW8gcHJvdmlkZXMgaW5mb3JtYXRpb24gYWJvdXQgaG93IHdpZGUgb3VyIHZpZXcgc2hvdWxkXG4vLyBiZSBjb21wYXJlZCB0byBob3cgdGFsbCBpdCBzaG91bGQgYmVcbmNvbnN0IEFTUEVDVF9SQVRJTyA9IFNDUkVFTl9XSURUSCAvIFNDUkVFTl9IRUlHSFQ7XG5cbmxldCBzY2VuZTtcbmxldCBjYW1lcmE7XG5sZXQgcmVuZGVyZXI7XG5sZXQgYXhpc0hlbHBlcjtcbmxldCBncmlkSGVscGVyO1xubGV0IGNvbnRyb2xzO1xubGV0IGFtYmllbnRMaWdodDtcbmxldCBsaWdodDtcblxuY29uc3Qgb3JpZ2luID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgZ3JpZEhlbHBlciA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKDIzMCwgMyk7XG4gIHNjZW5lLmFkZChncmlkSGVscGVyKTtcblxuICBheGlzSGVscGVyID0gbmV3IFRIUkVFLkF4aXNIZWxwZXIoMjMwKTtcbiAgc2NlbmUuYWRkKGF4aXNIZWxwZXIpO1xuXG4gIGNvbnN0IGJveFNpemUgPSAxMDA7XG4gIGNvbnN0IGdhcFNpemUgPSA1MDtcbiAgY29uc3QgZ3JpZFNpemUgPSAzO1xuXG4gIGNvbnN0IGFyZWFTaXplID0gKGJveFNpemUgKiBncmlkU2l6ZSkgKyAoZ2FwU2l6ZSAqIChncmlkU2l6ZSAtIDEpKTtcbiAgY29uc3Qgc3RhcnQgPSAtKGFyZWFTaXplIC8gMikgKyAoYm94U2l6ZSAvIDIpO1xuICBjb25zdCBlbmQgPSAoYXJlYVNpemUgLyAyKSArIChib3hTaXplIC8gMik7XG5cbiAgZm9yIChsZXQgeCA9IHN0YXJ0OyB4IDw9IGVuZDsgeCArPSAoYm94U2l6ZSArIGdhcFNpemUpKSB7XG4gICAgZm9yIChsZXQgeiA9IHN0YXJ0OyB6IDw9IGVuZDsgeiArPSAoYm94U2l6ZSArIGdhcFNpemUpKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSAxICsgKE1hdGgucmFuZG9tKCkgKiAxOTkpO1xuICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMTAwLCBoZWlnaHQsIDEwMCk7XG4gICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmIH0pO1xuICAgICAgY29uc3QgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICBtZXNoLnBvc2l0aW9uLnNldCh4LCBoZWlnaHQgLyAyLCB6KTtcbiAgICAgIHNjZW5lLmFkZChtZXNoKTtcbiAgICB9XG4gIH1cblxuICBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NDQ0NDQ0KTtcbiAgc2NlbmUuYWRkKGFtYmllbnRMaWdodCk7XG5cbiAgbGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMSwgMTAwMCk7XG4gIGxpZ2h0LnBvc2l0aW9uLnNldCgxMDAsIDMwMCwgNjAwKTtcbiAgc2NlbmUuYWRkKGxpZ2h0KTtcblxuICBjYW1lcmEgPSBuZXcgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhKFxuICAgIC0oQVNQRUNUX1JBVElPICogVklFV19TSVpFKSAvIDIsIChBU1BFQ1RfUkFUSU8gKiBWSUVXX1NJWkUpIC8gMixcbiAgICBWSUVXX1NJWkUgLyAyLCAtKFZJRVdfU0laRSAvIDIpLFxuICAgIC0xMDAwLCAxMDAwLFxuICApO1xuXG4gIGNhbWVyYS5wb3NpdGlvbi5zZXQoMzAwLCAzMDAsIDMwMCk7XG5cbiAgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KTtcbiAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICBjb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gIGNvbnRyb2xzLnRhcmdldC5zZXQob3JpZ2luLngsIG9yaWdpbi55LCBvcmlnaW4ueik7XG5cbiAgVEhSRUV4LldpbmRvd1Jlc2l6ZShyZW5kZXJlciwgY2FtZXJhKTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gIGNvbnRyb2xzLnVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gIHVwZGF0ZSgpO1xuICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG59XG5cbmluaXQoKTtcbmFuaW1hdGUoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHBzL29ydGhvZ3JhcGhpYy1jYW1lcmEvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9