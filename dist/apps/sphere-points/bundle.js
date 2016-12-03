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
	
	  geometry = new THREE.SphereGeometry(1, 32, 32);
	  material = new THREE.MeshLambertMaterial({ color: 0xffffff });
	
	  // https://en.wikipedia.org/wiki/Spherical_coordinate_system
	  // http://stackoverflow.com/questions/969798/plotting-a-point-on-the-edge-of-a-sphere
	
	  var radius = 100;
	  var intervals = 10;
	
	  // phi is the angle on the xy plane
	  // [0, 2PI]
	  var phi0 = Math.PI * (0 / 4);
	  var phi1 = Math.PI * (2 / 4);
	  var phiDelta = (phi1 - phi0) / intervals;
	
	  // theta is the angle from the z axis
	  // [0, PI]
	  var theta0 = Math.PI * (0 / 2);
	  var theta1 = Math.PI * (2 / 4);
	  var thetaDelta = (theta1 - theta0) / intervals;
	
	  // let count = 0;
	  for (var phi = phi0; phi <= phi1; phi += phiDelta) {
	    for (var theta = theta0; theta <= theta1; theta += thetaDelta) {
	      // count += 1;
	      // console.log(count);
	      var x = radius * Math.sin(theta) * Math.cos(phi);
	      var y = radius * Math.sin(theta) * Math.sin(phi);
	      var z = radius * Math.cos(theta);
	      mesh = new THREE.Mesh(geometry, material);
	      mesh.position.set(x, y, z);
	      scene.add(mesh);
	    }
	  }
	
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
	  controls.update();
	  renderer.render(scene, camera);
	}
	
	init();
	animate();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDc/MWNkYSoqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcHMvc3BoZXJlLXBvaW50cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJTQ1JFRU5fV0lEVEgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiU0NSRUVOX0hFSUdIVCIsImlubmVySGVpZ2h0IiwiVklFV19BTkdMRSIsIkFTUEVDVCIsIk5FQVIiLCJGQVIiLCJzY2VuZSIsImNhbWVyYSIsInJlbmRlcmVyIiwiYXhpc0hlbHBlciIsImdyaWRIZWxwZXIiLCJnZW9tZXRyeSIsIm1hdGVyaWFsIiwibWVzaCIsImNvbnRyb2xzIiwicG9pbnRMaWdodCIsImFtYmllbnRMaWdodCIsIm9yaWdpbiIsIlRIUkVFIiwiVmVjdG9yMyIsImluaXQiLCJTY2VuZSIsIkdyaWRIZWxwZXIiLCJhZGQiLCJBeGlzSGVscGVyIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJwb3NpdGlvbiIsInNldCIsImxvb2tBdCIsIlNwaGVyZUdlb21ldHJ5IiwiTWVzaExhbWJlcnRNYXRlcmlhbCIsImNvbG9yIiwicmFkaXVzIiwiaW50ZXJ2YWxzIiwicGhpMCIsIk1hdGgiLCJQSSIsInBoaTEiLCJwaGlEZWx0YSIsInRoZXRhMCIsInRoZXRhMSIsInRoZXRhRGVsdGEiLCJwaGkiLCJ0aGV0YSIsIngiLCJzaW4iLCJjb3MiLCJ5IiwieiIsIk1lc2giLCJBbWJpZW50TGlnaHQiLCJQb2ludExpZ2h0IiwiV2ViR0xSZW5kZXJlciIsInNldFNpemUiLCJPcmJpdENvbnRyb2xzIiwiZG9tRWxlbWVudCIsIlRIUkVFeCIsIldpbmRvd1Jlc2l6ZSIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiYW5pbWF0ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInVwZGF0ZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFF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bnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDciLCJjb25zdCBTQ1JFRU5fV0lEVEggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNvbnN0IFNDUkVFTl9IRUlHSFQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5jb25zdCBWSUVXX0FOR0xFID0gNDU7XG5jb25zdCBBU1BFQ1QgPSBTQ1JFRU5fV0lEVEggLyBTQ1JFRU5fSEVJR0hUO1xuY29uc3QgTkVBUiA9IDE7XG5jb25zdCBGQVIgPSAxMDAwMDtcblxubGV0IHNjZW5lO1xubGV0IGNhbWVyYTtcbmxldCByZW5kZXJlcjtcbmxldCBheGlzSGVscGVyO1xubGV0IGdyaWRIZWxwZXI7XG5sZXQgZ2VvbWV0cnk7XG5sZXQgbWF0ZXJpYWw7XG5sZXQgbWVzaDtcbmxldCBjb250cm9scztcbmxldCBwb2ludExpZ2h0O1xubGV0IGFtYmllbnRMaWdodDtcblxuY29uc3Qgb3JpZ2luID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgZ3JpZEhlbHBlciA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKDEwMCwgMTApO1xuICBzY2VuZS5hZGQoZ3JpZEhlbHBlcik7XG5cbiAgYXhpc0hlbHBlciA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDEwMCk7XG4gIHNjZW5lLmFkZChheGlzSGVscGVyKTtcblxuICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoVklFV19BTkdMRSwgQVNQRUNULCBORUFSLCBGQVIpO1xuICBjYW1lcmEucG9zaXRpb24uc2V0KDIwMCwgMjAwLCAyMDApO1xuICBjYW1lcmEubG9va0F0KG9yaWdpbik7XG5cbiAgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMSwgMzIsIDMyKTtcbiAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcblxuICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TcGhlcmljYWxfY29vcmRpbmF0ZV9zeXN0ZW1cbiAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85Njk3OTgvcGxvdHRpbmctYS1wb2ludC1vbi10aGUtZWRnZS1vZi1hLXNwaGVyZVxuXG4gIGNvbnN0IHJhZGl1cyA9IDEwMDtcbiAgY29uc3QgaW50ZXJ2YWxzID0gMTA7XG5cbiAgLy8gcGhpIGlzIHRoZSBhbmdsZSBvbiB0aGUgeHkgcGxhbmVcbiAgLy8gWzAsIDJQSV1cbiAgY29uc3QgcGhpMCA9IE1hdGguUEkgKiAoMCAvIDQpO1xuICBjb25zdCBwaGkxID0gTWF0aC5QSSAqICgyIC8gNCk7XG4gIGNvbnN0IHBoaURlbHRhID0gKHBoaTEgLSBwaGkwKSAvIGludGVydmFscztcblxuICAvLyB0aGV0YSBpcyB0aGUgYW5nbGUgZnJvbSB0aGUgeiBheGlzXG4gIC8vIFswLCBQSV1cbiAgY29uc3QgdGhldGEwID0gTWF0aC5QSSAqICgwIC8gMik7XG4gIGNvbnN0IHRoZXRhMSA9IE1hdGguUEkgKiAoMiAvIDQpO1xuICBjb25zdCB0aGV0YURlbHRhID0gKHRoZXRhMSAtIHRoZXRhMCkgLyBpbnRlcnZhbHM7XG5cbiAgLy8gbGV0IGNvdW50ID0gMDtcbiAgZm9yIChsZXQgcGhpID0gcGhpMDsgcGhpIDw9IHBoaTE7IHBoaSArPSBwaGlEZWx0YSkge1xuICAgIGZvciAobGV0IHRoZXRhID0gdGhldGEwOyB0aGV0YSA8PSB0aGV0YTE7IHRoZXRhICs9IHRoZXRhRGVsdGEpIHtcbiAgICAgIC8vIGNvdW50ICs9IDE7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjb3VudCk7XG4gICAgICBjb25zdCB4ID0gcmFkaXVzICogTWF0aC5zaW4odGhldGEpICogTWF0aC5jb3MocGhpKTtcbiAgICAgIGNvbnN0IHkgPSByYWRpdXMgKiBNYXRoLnNpbih0aGV0YSkgKiBNYXRoLnNpbihwaGkpO1xuICAgICAgY29uc3QgeiA9IHJhZGl1cyAqIE1hdGguY29zKHRoZXRhKTtcbiAgICAgIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgbWVzaC5wb3NpdGlvbi5zZXQoeCwgeSwgeik7XG4gICAgICBzY2VuZS5hZGQobWVzaCk7XG4gICAgfVxuICB9XG5cbiAgYW1iaWVudExpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDQ0NDQ0NCk7XG4gIHNjZW5lLmFkZChhbWJpZW50TGlnaHQpO1xuXG4gIHBvaW50TGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGZmZmZmZiwgMSwgMTAwMCk7XG4gIHBvaW50TGlnaHQucG9zaXRpb24uc2V0KDUwLCA1MCwgNTApO1xuICBzY2VuZS5hZGQocG9pbnRMaWdodCk7XG5cbiAgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpO1xuICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gIGNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICBUSFJFRXguV2luZG93UmVzaXplKHJlbmRlcmVyLCBjYW1lcmEpO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgY29udHJvbHMudXBkYXRlKCk7XG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcbn1cblxuaW5pdCgpO1xuYW5pbWF0ZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcHMvc3BoZXJlLXBvaW50cy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=