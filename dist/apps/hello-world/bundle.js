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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDdhMjU4YWNiM2QzZjdhY2U5OWI/NTA1YyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcHMvaGVsbG8td29ybGQvaW5kZXguanMiXSwibmFtZXMiOlsiU0NSRUVOX1dJRFRIIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIlNDUkVFTl9IRUlHSFQiLCJpbm5lckhlaWdodCIsIlZJRVdfQU5HTEUiLCJBU1BFQ1QiLCJORUFSIiwiRkFSIiwic2NlbmUiLCJjYW1lcmEiLCJyZW5kZXJlciIsImF4aXNIZWxwZXIiLCJncmlkSGVscGVyIiwiZ2VvbWV0cnkiLCJtYXRlcmlhbCIsIm1lc2giLCJjb250cm9scyIsInBvaW50TGlnaHQiLCJhbWJpZW50TGlnaHQiLCJvcmlnaW4iLCJUSFJFRSIsIlZlY3RvcjMiLCJpbml0IiwiU2NlbmUiLCJHcmlkSGVscGVyIiwiYWRkIiwiQXhpc0hlbHBlciIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwicG9zaXRpb24iLCJzZXQiLCJsb29rQXQiLCJCb3hHZW9tZXRyeSIsIk1lc2hMYW1iZXJ0TWF0ZXJpYWwiLCJjb2xvciIsIk1lc2giLCJBbWJpZW50TGlnaHQiLCJQb2ludExpZ2h0IiwiV2ViR0xSZW5kZXJlciIsInNldFNpemUiLCJPcmJpdENvbnRyb2xzIiwiZG9tRWxlbWVudCIsIlRIUkVFeCIsIldpbmRvd1Jlc2l6ZSIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiYW5pbWF0ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInJvdGF0aW9uIiwieCIsInkiLCJ1cGRhdGUiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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aXN0L2FwcHMvaGVsbG8td29ybGQvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDdhMjU4YWNiM2QzZjdhY2U5OWIiLCJjb25zdCBTQ1JFRU5fV0lEVEggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNvbnN0IFNDUkVFTl9IRUlHSFQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5jb25zdCBWSUVXX0FOR0xFID0gNDU7XG5jb25zdCBBU1BFQ1QgPSBTQ1JFRU5fV0lEVEggLyBTQ1JFRU5fSEVJR0hUO1xuY29uc3QgTkVBUiA9IDE7XG5jb25zdCBGQVIgPSAxMDAwMDtcblxubGV0IHNjZW5lO1xubGV0IGNhbWVyYTtcbmxldCByZW5kZXJlcjtcbmxldCBheGlzSGVscGVyO1xubGV0IGdyaWRIZWxwZXI7XG5sZXQgZ2VvbWV0cnk7XG5sZXQgbWF0ZXJpYWw7XG5sZXQgbWVzaDtcbmxldCBjb250cm9scztcbmxldCBwb2ludExpZ2h0O1xubGV0IGFtYmllbnRMaWdodDtcblxuY29uc3Qgb3JpZ2luID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgZ3JpZEhlbHBlciA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKDEwMCwgMTApO1xuICBzY2VuZS5hZGQoZ3JpZEhlbHBlcik7XG5cbiAgYXhpc0hlbHBlciA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDEwMCk7XG4gIHNjZW5lLmFkZChheGlzSGVscGVyKTtcblxuICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoVklFV19BTkdMRSwgQVNQRUNULCBORUFSLCBGQVIpO1xuICBjYW1lcmEucG9zaXRpb24uc2V0KDIwMCwgMjAwLCAyMDApO1xuICBjYW1lcmEubG9va0F0KG9yaWdpbik7XG5cbiAgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoNTAsIDUwLCA1MCk7XG4gIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoeyBjb2xvcjogMHg4ODg4ODggfSk7XG5cbiAgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gIHNjZW5lLmFkZChtZXNoKTtcblxuICBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NDQ0NDQ0KTtcbiAgc2NlbmUuYWRkKGFtYmllbnRMaWdodCk7XG5cbiAgcG9pbnRMaWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZmZmZmZmLCAxLCAxMDAwKTtcbiAgcG9pbnRMaWdodC5wb3NpdGlvbi5zZXQoNTAsIDUwLCA1MCk7XG4gIHNjZW5lLmFkZChwb2ludExpZ2h0KTtcblxuICByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gIFRIUkVFeC5XaW5kb3dSZXNpemUocmVuZGVyZXIsIGNhbWVyYSk7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuXG4gIG1lc2gucm90YXRpb24ueCArPSAwLjAxO1xuICBtZXNoLnJvdGF0aW9uLnkgKz0gMC4wMjtcblxuICBjb250cm9scy51cGRhdGUoKTtcblxuICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG59XG5cbmluaXQoKTtcbmFuaW1hdGUoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHBzL2hlbGxvLXdvcmxkL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==