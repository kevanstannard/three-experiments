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
	
	// Reference:
	// http://stackoverflow.com/questions/15331358/three-js-get-object-size-with-respect-to-camera-and-object-position-on-screen
	
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
	var boxGeometry = void 0;
	var boxMaterial = void 0;
	var boxMesh = void 0;
	var planeGeometry = void 0;
	var planeMaterial = void 0;
	var planeMesh = void 0;
	var controls = void 0;
	var ambientLight = void 0;
	
	var origin = new THREE.Vector3(0, 0, 0);
	var fov = VIEW_ANGLE * (Math.PI / 180);
	
	var BOX_SIZE = 20;
	var BOX_SCALE = 0.25;
	
	var PLANE_SIZE = 20;
	var PLANE_SCALE = 0.2;
	
	function init() {
	  scene = new THREE.Scene();
	
	  gridHelper = new THREE.GridHelper(50, 10);
	  scene.add(gridHelper);
	
	  axisHelper = new THREE.AxisHelper(50);
	  scene.add(axisHelper);
	
	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(100, 100, 100);
	  camera.lookAt(origin);
	
	  boxGeometry = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
	  boxMaterial = new THREE.MeshNormalMaterial();
	  boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
	  scene.add(boxMesh);
	
	  planeGeometry = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 32);
	  planeMaterial = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
	  planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
	  planeMesh.position.set(-50, 0, -50);
	  scene.add(planeMesh);
	
	  ambientLight = new THREE.AmbientLight(0x444444);
	  scene.add(ambientLight);
	
	  renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(window.innerWidth, window.innerHeight);
	
	  controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	  THREEx.WindowResize(renderer, camera);
	
	  document.body.appendChild(renderer.domElement);
	}
	
	function resetMeshSize(mesh, meshSize, meshScale) {
	  // Determine the distance of the camera to the object
	  var distance = camera.position.distanceTo(mesh.position);
	
	  // Calculate what the current frustrum radius/size.
	  var frustrumRadius = 2 * Math.tan(fov / 2) * distance;
	
	  // We want our object to remain the same size relative to the current
	  // frustrum size.
	  //
	  // For example:
	  //   Suppose frustrum size is 100, and object size is 20
	  //   then ratio (or scale) = 100 / 20 = 5.0
	  //
	  //   Suppose frustrum size changes to 200, and object size is 20
	  //   then ratio (or scale) = 200 / 20 = 10.0
	  //
	  // But this scale value alone will cause the object to fill
	  // the screen, so we need a scale value to get it back to a
	  // more useful size.
	  var scale = frustrumRadius / meshSize * meshScale;
	  mesh.scale.set(scale, scale, scale);
	}
	
	function update() {
	  planeMesh.rotation.x += 0.005;
	  planeMesh.rotation.y += 0.005;
	
	  resetMeshSize(boxMesh, BOX_SIZE, BOX_SCALE);
	  resetMeshSize(planeMesh, PLANE_SIZE, PLANE_SCALE);
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzlkNTg2NGI1YWFkNzBmNTRiOWM/ZDdhMyoqIiwid2VicGFjazovLy8uL3NyYy9hcHBzL29iamVjdC1jb25zdGFudC1zaXplL2luZGV4LmpzIl0sIm5hbWVzIjpbIlNDUkVFTl9XSURUSCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJTQ1JFRU5fSEVJR0hUIiwiaW5uZXJIZWlnaHQiLCJWSUVXX0FOR0xFIiwiQVNQRUNUIiwiTkVBUiIsIkZBUiIsInNjZW5lIiwiY2FtZXJhIiwicmVuZGVyZXIiLCJheGlzSGVscGVyIiwiZ3JpZEhlbHBlciIsImJveEdlb21ldHJ5IiwiYm94TWF0ZXJpYWwiLCJib3hNZXNoIiwicGxhbmVHZW9tZXRyeSIsInBsYW5lTWF0ZXJpYWwiLCJwbGFuZU1lc2giLCJjb250cm9scyIsImFtYmllbnRMaWdodCIsIm9yaWdpbiIsIlRIUkVFIiwiVmVjdG9yMyIsImZvdiIsIk1hdGgiLCJQSSIsIkJPWF9TSVpFIiwiQk9YX1NDQUxFIiwiUExBTkVfU0laRSIsIlBMQU5FX1NDQUxFIiwiaW5pdCIsIlNjZW5lIiwiR3JpZEhlbHBlciIsImFkZCIsIkF4aXNIZWxwZXIiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsInBvc2l0aW9uIiwic2V0IiwibG9va0F0IiwiQm94R2VvbWV0cnkiLCJNZXNoTm9ybWFsTWF0ZXJpYWwiLCJNZXNoIiwiUGxhbmVHZW9tZXRyeSIsInNpZGUiLCJEb3VibGVTaWRlIiwiQW1iaWVudExpZ2h0IiwiV2ViR0xSZW5kZXJlciIsImFudGlhbGlhcyIsInNldFNpemUiLCJPcmJpdENvbnRyb2xzIiwiZG9tRWxlbWVudCIsIlRIUkVFeCIsIldpbmRvd1Jlc2l6ZSIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwicmVzZXRNZXNoU2l6ZSIsIm1lc2giLCJtZXNoU2l6ZSIsIm1lc2hTY2FsZSIsImRpc3RhbmNlIiwiZGlzdGFuY2VUbyIsImZydXN0cnVtUmFkaXVzIiwidGFuIiwic2NhbGUiLCJ1cGRhdGUiLCJyb3RhdGlvbiIsIngiLCJ5IiwiYW5pbWF0ZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBOztBQUVBLEtBQU1BLGVBQWVDLE9BQU9DLFVBQTVCO0FBQ0EsS0FBTUMsZ0JBQWdCRixPQUFPRyxXQUE3QjtBQUNBLEtBQU1DLGFBQWEsRUFBbkI7QUFDQSxLQUFNQyxTQUFTTixlQUFlRyxhQUE5QjtBQUNBLEtBQU1JLE9BQU8sQ0FBYjtBQUNBLEtBQU1DLE1BQU0sS0FBWjs7QUFFQSxLQUFJQyxjQUFKO0FBQ0EsS0FBSUMsZUFBSjtBQUNBLEtBQUlDLGlCQUFKO0FBQ0EsS0FBSUMsbUJBQUo7QUFDQSxLQUFJQyxtQkFBSjtBQUNBLEtBQUlDLG9CQUFKO0FBQ0EsS0FBSUMsb0JBQUo7QUFDQSxLQUFJQyxnQkFBSjtBQUNBLEtBQUlDLHNCQUFKO0FBQ0EsS0FBSUMsc0JBQUo7QUFDQSxLQUFJQyxrQkFBSjtBQUNBLEtBQUlDLGlCQUFKO0FBQ0EsS0FBSUMscUJBQUo7O0FBRUEsS0FBTUMsU0FBUyxJQUFJQyxNQUFNQyxPQUFWLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLENBQWY7QUFDQSxLQUFNQyxNQUFNcEIsY0FBY3FCLEtBQUtDLEVBQUwsR0FBVSxHQUF4QixDQUFaOztBQUVBLEtBQU1DLFdBQVcsRUFBakI7QUFDQSxLQUFNQyxZQUFZLElBQWxCOztBQUVBLEtBQU1DLGFBQWEsRUFBbkI7QUFDQSxLQUFNQyxjQUFjLEdBQXBCOztBQUVBLFVBQVNDLElBQVQsR0FBZ0I7QUFDZHZCLFdB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ZCxFQUF1QlksUUFBdkIsRUFBaUNDLFNBQWpDO0FBQ0E2QixpQkFBY3ZDLFNBQWQsRUFBeUJXLFVBQXpCLEVBQXFDQyxXQUFyQzs7QUFFQVgsWUFBUytDLE1BQVQ7QUFDRDs7QUFFRCxVQUFTSSxPQUFULEdBQW1CO0FBQ2pCQyx5QkFBc0JELE9BQXRCO0FBQ0FKO0FBQ0F4RCxZQUFTOEQsTUFBVCxDQUFnQmhFLEtBQWhCLEVBQXVCQyxNQUF2QjtBQUNEOztBQUVEc0I7QUFDQXVDLFciLCJmaWxlIjoiZGlzdC9hcHBzL29iamVjdC1jb25zdGFudC1zaXplL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGM5ZDU4NjRiNWFhZDcwZjU0YjljIiwiLy8gUmVmZXJlbmNlOlxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNTMzMTM1OC90aHJlZS1qcy1nZXQtb2JqZWN0LXNpemUtd2l0aC1yZXNwZWN0LXRvLWNhbWVyYS1hbmQtb2JqZWN0LXBvc2l0aW9uLW9uLXNjcmVlblxuXG5jb25zdCBTQ1JFRU5fV0lEVEggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNvbnN0IFNDUkVFTl9IRUlHSFQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5jb25zdCBWSUVXX0FOR0xFID0gNDU7XG5jb25zdCBBU1BFQ1QgPSBTQ1JFRU5fV0lEVEggLyBTQ1JFRU5fSEVJR0hUO1xuY29uc3QgTkVBUiA9IDE7XG5jb25zdCBGQVIgPSAxMDAwMDtcblxubGV0IHNjZW5lO1xubGV0IGNhbWVyYTtcbmxldCByZW5kZXJlcjtcbmxldCBheGlzSGVscGVyO1xubGV0IGdyaWRIZWxwZXI7XG5sZXQgYm94R2VvbWV0cnk7XG5sZXQgYm94TWF0ZXJpYWw7XG5sZXQgYm94TWVzaDtcbmxldCBwbGFuZUdlb21ldHJ5O1xubGV0IHBsYW5lTWF0ZXJpYWw7XG5sZXQgcGxhbmVNZXNoO1xubGV0IGNvbnRyb2xzO1xubGV0IGFtYmllbnRMaWdodDtcblxuY29uc3Qgb3JpZ2luID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCk7XG5jb25zdCBmb3YgPSBWSUVXX0FOR0xFICogKE1hdGguUEkgLyAxODApO1xuXG5jb25zdCBCT1hfU0laRSA9IDIwO1xuY29uc3QgQk9YX1NDQUxFID0gMC4yNTtcblxuY29uc3QgUExBTkVfU0laRSA9IDIwO1xuY29uc3QgUExBTkVfU0NBTEUgPSAwLjI7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgZ3JpZEhlbHBlciA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKDUwLCAxMCk7XG4gIHNjZW5lLmFkZChncmlkSGVscGVyKTtcblxuICBheGlzSGVscGVyID0gbmV3IFRIUkVFLkF4aXNIZWxwZXIoNTApO1xuICBzY2VuZS5hZGQoYXhpc0hlbHBlcik7XG5cbiAgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKFZJRVdfQU5HTEUsIEFTUEVDVCwgTkVBUiwgRkFSKTtcbiAgY2FtZXJhLnBvc2l0aW9uLnNldCgxMDAsIDEwMCwgMTAwKTtcbiAgY2FtZXJhLmxvb2tBdChvcmlnaW4pO1xuXG4gIGJveEdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KEJPWF9TSVpFLCBCT1hfU0laRSwgQk9YX1NJWkUpO1xuICBib3hNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTm9ybWFsTWF0ZXJpYWwoKTtcbiAgYm94TWVzaCA9IG5ldyBUSFJFRS5NZXNoKGJveEdlb21ldHJ5LCBib3hNYXRlcmlhbCk7XG4gIHNjZW5lLmFkZChib3hNZXNoKTtcblxuICBwbGFuZUdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoUExBTkVfU0laRSwgUExBTkVfU0laRSwgMzIpO1xuICBwbGFuZU1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCh7IHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUgfSk7XG4gIHBsYW5lTWVzaCA9IG5ldyBUSFJFRS5NZXNoKHBsYW5lR2VvbWV0cnksIHBsYW5lTWF0ZXJpYWwpO1xuICBwbGFuZU1lc2gucG9zaXRpb24uc2V0KC01MCwgMCwgLTUwKTtcbiAgc2NlbmUuYWRkKHBsYW5lTWVzaCk7XG5cbiAgYW1iaWVudExpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDQ0NDQ0NCk7XG4gIHNjZW5lLmFkZChhbWJpZW50TGlnaHQpO1xuXG4gIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXM6IHRydWUgfSk7XG4gIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgY29udHJvbHMgPSBuZXcgVEhSRUUuT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gIFRIUkVFeC5XaW5kb3dSZXNpemUocmVuZGVyZXIsIGNhbWVyYSk7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gcmVzZXRNZXNoU2l6ZShtZXNoLCBtZXNoU2l6ZSwgbWVzaFNjYWxlKSB7XG4gIC8vIERldGVybWluZSB0aGUgZGlzdGFuY2Ugb2YgdGhlIGNhbWVyYSB0byB0aGUgb2JqZWN0XG4gIGNvbnN0IGRpc3RhbmNlID0gY2FtZXJhLnBvc2l0aW9uLmRpc3RhbmNlVG8obWVzaC5wb3NpdGlvbik7XG5cbiAgLy8gQ2FsY3VsYXRlIHdoYXQgdGhlIGN1cnJlbnQgZnJ1c3RydW0gcmFkaXVzL3NpemUuXG4gIGNvbnN0IGZydXN0cnVtUmFkaXVzID0gMiAqIE1hdGgudGFuKGZvdiAvIDIpICogZGlzdGFuY2U7XG5cbiAgLy8gV2Ugd2FudCBvdXIgb2JqZWN0IHRvIHJlbWFpbiB0aGUgc2FtZSBzaXplIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50XG4gIC8vIGZydXN0cnVtIHNpemUuXG4gIC8vXG4gIC8vIEZvciBleGFtcGxlOlxuICAvLyAgIFN1cHBvc2UgZnJ1c3RydW0gc2l6ZSBpcyAxMDAsIGFuZCBvYmplY3Qgc2l6ZSBpcyAyMFxuICAvLyAgIHRoZW4gcmF0aW8gKG9yIHNjYWxlKSA9IDEwMCAvIDIwID0gNS4wXG4gIC8vXG4gIC8vICAgU3VwcG9zZSBmcnVzdHJ1bSBzaXplIGNoYW5nZXMgdG8gMjAwLCBhbmQgb2JqZWN0IHNpemUgaXMgMjBcbiAgLy8gICB0aGVuIHJhdGlvIChvciBzY2FsZSkgPSAyMDAgLyAyMCA9IDEwLjBcbiAgLy9cbiAgLy8gQnV0IHRoaXMgc2NhbGUgdmFsdWUgYWxvbmUgd2lsbCBjYXVzZSB0aGUgb2JqZWN0IHRvIGZpbGxcbiAgLy8gdGhlIHNjcmVlbiwgc28gd2UgbmVlZCBhIHNjYWxlIHZhbHVlIHRvIGdldCBpdCBiYWNrIHRvIGFcbiAgLy8gbW9yZSB1c2VmdWwgc2l6ZS5cbiAgY29uc3Qgc2NhbGUgPSAoZnJ1c3RydW1SYWRpdXMgLyBtZXNoU2l6ZSkgKiBtZXNoU2NhbGU7XG4gIG1lc2guc2NhbGUuc2V0KHNjYWxlLCBzY2FsZSwgc2NhbGUpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gIHBsYW5lTWVzaC5yb3RhdGlvbi54ICs9IDAuMDA1O1xuICBwbGFuZU1lc2gucm90YXRpb24ueSArPSAwLjAwNTtcblxuICByZXNldE1lc2hTaXplKGJveE1lc2gsIEJPWF9TSVpFLCBCT1hfU0NBTEUpO1xuICByZXNldE1lc2hTaXplKHBsYW5lTWVzaCwgUExBTkVfU0laRSwgUExBTkVfU0NBTEUpO1xuXG4gIGNvbnRyb2xzLnVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlKCkge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gIHVwZGF0ZSgpO1xuICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG59XG5cbmluaXQoKTtcbmFuaW1hdGUoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHBzL29iamVjdC1jb25zdGFudC1zaXplL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==