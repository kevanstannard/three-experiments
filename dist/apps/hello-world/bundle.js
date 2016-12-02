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
	var axisHelper = void 0;
	var gridHelper = void 0;
	var geometry = void 0;
	var material = void 0;
	var mesh = void 0;
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	
	var origin = new THREE.Vector3(0, 0, 0);
	
	function init() {
	  scene = new THREE.Scene();
	
	  gridHelper = new THREE.GridHelper(100, 10);
	  scene.add(gridHelper);
	
	  axisHelper = new THREE.AxisHelper(100);
	  scene.add(axisHelper);
	
	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(200, 200, 200);
	  camera.lookAt(origin);
	
	  geometry = new THREE.BoxGeometry(50, 50, 50);
	  material = new THREE.MeshLambertMaterial({ color: 0x888888 });
	
	  mesh = new THREE.Mesh(geometry, material);
	  scene.add(mesh);
	
	  ambientLight = new THREE.AmbientLight(0x444444);
	  scene.add(ambientLight);
	
	  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	  pointLight.position.set(50, 50, 50);
	  scene.add(pointLight);
	
	  renderer = new THREE.WebGLRenderer();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	
	  controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	  THREEx.WindowResize(renderer, camera);
	
	  document.body.appendChild(renderer.domElement);
	}
	
	function animate() {
	  requestAnimationFrame(animate);
	
	  mesh.rotation.x += 0.01;
	  mesh.rotation.y += 0.02;
	
	  controls.update();
	
	  renderer.render(scene, camera);
	}
	
	init();
	animate();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzlkNTg2NGI1YWFkNzBmNTRiOWM/ZDdhMyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwcy9oZWxsby13b3JsZC9pbmRleC5qcyJdLCJuYW1lcyI6WyJTQ1JFRU5fV0lEVEgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiU0NSRUVOX0hFSUdIVCIsImlubmVySGVpZ2h0IiwiVklFV19BTkdMRSIsIkFTUEVDVCIsIk5FQVIiLCJGQVIiLCJzY2VuZSIsImNhbWVyYSIsInJlbmRlcmVyIiwiYXhpc0hlbHBlciIsImdyaWRIZWxwZXIiLCJnZW9tZXRyeSIsIm1hdGVyaWFsIiwibWVzaCIsImNvbnRyb2xzIiwicG9pbnRMaWdodCIsImFtYmllbnRMaWdodCIsIm9yaWdpbiIsIlRIUkVFIiwiVmVjdG9yMyIsImluaXQiLCJTY2VuZSIsIkdyaWRIZWxwZXIiLCJhZGQiLCJBeGlzSGVscGVyIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJwb3NpdGlvbiIsInNldCIsImxvb2tBdCIsIkJveEdlb21ldHJ5IiwiTWVzaExhbWJlcnRNYXRlcmlhbCIsImNvbG9yIiwiTWVzaCIsIkFtYmllbnRMaWdodCIsIlBvaW50TGlnaHQiLCJXZWJHTFJlbmRlcmVyIiwic2V0U2l6ZSIsIk9yYml0Q29udHJvbHMiLCJkb21FbGVtZW50IiwiVEhSRUV4IiwiV2luZG93UmVzaXplIiwiZG9jdW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJhbmltYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicm90YXRpb24iLCJ4IiwieSIsInVwZGF0ZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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c3QvYXBwcy9oZWxsby13b3JsZC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjOWQ1ODY0YjVhYWQ3MGY1NGI5YyIsImNvbnN0IFNDUkVFTl9XSURUSCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY29uc3QgU0NSRUVOX0hFSUdIVCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmNvbnN0IFZJRVdfQU5HTEUgPSA0NTtcbmNvbnN0IEFTUEVDVCA9IFNDUkVFTl9XSURUSCAvIFNDUkVFTl9IRUlHSFQ7XG5jb25zdCBORUFSID0gMTtcbmNvbnN0IEZBUiA9IDEwMDAwO1xuXG5sZXQgc2NlbmU7XG5sZXQgY2FtZXJhO1xubGV0IHJlbmRlcmVyO1xubGV0IGF4aXNIZWxwZXI7XG5sZXQgZ3JpZEhlbHBlcjtcbmxldCBnZW9tZXRyeTtcbmxldCBtYXRlcmlhbDtcbmxldCBtZXNoO1xubGV0IGNvbnRyb2xzO1xubGV0IHBvaW50TGlnaHQ7XG5sZXQgYW1iaWVudExpZ2h0O1xuXG5jb25zdCBvcmlnaW4gPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICBncmlkSGVscGVyID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoMTAwLCAxMCk7XG4gIHNjZW5lLmFkZChncmlkSGVscGVyKTtcblxuICBheGlzSGVscGVyID0gbmV3IFRIUkVFLkF4aXNIZWxwZXIoMTAwKTtcbiAgc2NlbmUuYWRkKGF4aXNIZWxwZXIpO1xuXG4gIGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYShWSUVXX0FOR0xFLCBBU1BFQ1QsIE5FQVIsIEZBUik7XG4gIGNhbWVyYS5wb3NpdGlvbi5zZXQoMjAwLCAyMDAsIDIwMCk7XG4gIGNhbWVyYS5sb29rQXQob3JpZ2luKTtcblxuICBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSg1MCwgNTAsIDUwKTtcbiAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweDg4ODg4OCB9KTtcblxuICBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgc2NlbmUuYWRkKG1lc2gpO1xuXG4gIGFtYmllbnRMaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHg0NDQ0NDQpO1xuICBzY2VuZS5hZGQoYW1iaWVudExpZ2h0KTtcblxuICBwb2ludExpZ2h0ID0gbmV3IFRIUkVFLlBvaW50TGlnaHQoMHhmZmZmZmYsIDEsIDEwMDApO1xuICBwb2ludExpZ2h0LnBvc2l0aW9uLnNldCg1MCwgNTAsIDUwKTtcbiAgc2NlbmUuYWRkKHBvaW50TGlnaHQpO1xuXG4gIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICBjb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgVEhSRUV4LldpbmRvd1Jlc2l6ZShyZW5kZXJlciwgY2FtZXJhKTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG5cbiAgbWVzaC5yb3RhdGlvbi54ICs9IDAuMDE7XG4gIG1lc2gucm90YXRpb24ueSArPSAwLjAyO1xuXG4gIGNvbnRyb2xzLnVwZGF0ZSgpO1xuXG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcbn1cblxuaW5pdCgpO1xuYW5pbWF0ZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcHMvaGVsbG8td29ybGQvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9