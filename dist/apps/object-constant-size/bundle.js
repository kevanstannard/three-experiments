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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDc/MWNkYSoqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcHMvb2JqZWN0LWNvbnN0YW50LXNpemUvaW5kZXguanMiXSwibmFtZXMiOlsiU0NSRUVOX1dJRFRIIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIlNDUkVFTl9IRUlHSFQiLCJpbm5lckhlaWdodCIsIlZJRVdfQU5HTEUiLCJBU1BFQ1QiLCJORUFSIiwiRkFSIiwic2NlbmUiLCJjYW1lcmEiLCJyZW5kZXJlciIsImF4aXNIZWxwZXIiLCJncmlkSGVscGVyIiwiYm94R2VvbWV0cnkiLCJib3hNYXRlcmlhbCIsImJveE1lc2giLCJwbGFuZUdlb21ldHJ5IiwicGxhbmVNYXRlcmlhbCIsInBsYW5lTWVzaCIsImNvbnRyb2xzIiwiYW1iaWVudExpZ2h0Iiwib3JpZ2luIiwiVEhSRUUiLCJWZWN0b3IzIiwiZm92IiwiTWF0aCIsIlBJIiwiQk9YX1NJWkUiLCJCT1hfU0NBTEUiLCJQTEFORV9TSVpFIiwiUExBTkVfU0NBTEUiLCJpbml0IiwiU2NlbmUiLCJHcmlkSGVscGVyIiwiYWRkIiwiQXhpc0hlbHBlciIsIlBlcnNwZWN0aXZlQ2FtZXJhIiwicG9zaXRpb24iLCJzZXQiLCJsb29rQXQiLCJCb3hHZW9tZXRyeSIsIk1lc2hOb3JtYWxNYXRlcmlhbCIsIk1lc2giLCJQbGFuZUdlb21ldHJ5Iiwic2lkZSIsIkRvdWJsZVNpZGUiLCJBbWJpZW50TGlnaHQiLCJXZWJHTFJlbmRlcmVyIiwiYW50aWFsaWFzIiwic2V0U2l6ZSIsIk9yYml0Q29udHJvbHMiLCJkb21FbGVtZW50IiwiVEhSRUV4IiwiV2luZG93UmVzaXplIiwiZG9jdW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJyZXNldE1lc2hTaXplIiwibWVzaCIsIm1lc2hTaXplIiwibWVzaFNjYWxlIiwiZGlzdGFuY2UiLCJkaXN0YW5jZVRvIiwiZnJ1c3RydW1SYWRpdXMiLCJ0YW4iLCJzY2FsZSIsInVwZGF0ZSIsInJvdGF0aW9uIiwieCIsInkiLCJhbmltYXRlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBO0FBQ0E7O0FBRUEsS0FBTUEsZUFBZUMsT0FBT0MsVUFBNUI7QUFDQSxLQUFNQyxnQkFBZ0JGLE9BQU9HLFdBQTdCO0FBQ0EsS0FBTUMsYUFBYSxFQUFuQjtBQUNBLEtBQU1DLFNBQVNOLGVBQWVHLGFBQTlCO0FBQ0EsS0FBTUksT0FBTyxDQUFiO0FBQ0EsS0FBTUMsTUFBTSxLQUFaOztBQUVBLEtBQUlDLGNBQUo7QUFDQSxLQUFJQyxlQUFKO0FBQ0EsS0FBSUMsaUJBQUo7QUFDQSxLQUFJQyxtQkFBSjtBQUNBLEtBQUlDLG1CQUFKO0FBQ0EsS0FBSUMsb0JBQUo7QUFDQSxLQUFJQyxvQkFBSjtBQUNBLEtBQUlDLGdCQUFKO0FBQ0EsS0FBSUMsc0JBQUo7QUFDQSxLQUFJQyxzQkFBSjtBQUNBLEtBQUlDLGtCQUFKO0FBQ0EsS0FBSUMsaUJBQUo7QUFDQSxLQUFJQyxxQkFBSjs7QUFFQSxLQUFNQyxTQUFTLElBQUlDLE1BQU1DLE9BQVYsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsQ0FBZjtBQUNBLEtBQU1DLE1BQU1wQixjQUFjcUIsS0FBS0MsRUFBTCxHQUFVLEdBQXhCLENBQVo7O0FBRUEsS0FBTUMsV0FBVyxFQUFqQjtBQUNBLEtBQU1DLFlBQVksSUFBbEI7O0FBRUEsS0FBTUMsYUFBYSxFQUFuQjtBQUNBLEtBQU1DLGNBQWMsR0FBcEI7O0FBRUEsVUFBU0MsSUFBVCxHQUFnQjtBQUNkdkIs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QUFkLEVBQXVCWSxRQUF2QixFQUFpQ0MsU0FBakM7QUFDQTZCLGlCQUFjdkMsU0FBZCxFQUF5QlcsVUFBekIsRUFBcUNDLFdBQXJDOztBQUVBWCxZQUFTK0MsTUFBVDtBQUNEOztBQUVELFVBQVNJLE9BQVQsR0FBbUI7QUFDakJDLHlCQUFzQkQsT0FBdEI7QUFDQUo7QUFDQXhELFlBQVM4RCxNQUFULENBQWdCaEUsS0FBaEIsRUFBdUJDLE1BQXZCO0FBQ0Q7O0FBRURzQjtBQUNBdUMsVyIsImZpbGUiOiJkaXN0L2FwcHMvb2JqZWN0LWNvbnN0YW50LXNpemUvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjlkMzY5NTFkMzI3NDIxODkzZDciLCIvLyBSZWZlcmVuY2U6XG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE1MzMxMzU4L3RocmVlLWpzLWdldC1vYmplY3Qtc2l6ZS13aXRoLXJlc3BlY3QtdG8tY2FtZXJhLWFuZC1vYmplY3QtcG9zaXRpb24tb24tc2NyZWVuXG5cbmNvbnN0IFNDUkVFTl9XSURUSCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY29uc3QgU0NSRUVOX0hFSUdIVCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmNvbnN0IFZJRVdfQU5HTEUgPSA0NTtcbmNvbnN0IEFTUEVDVCA9IFNDUkVFTl9XSURUSCAvIFNDUkVFTl9IRUlHSFQ7XG5jb25zdCBORUFSID0gMTtcbmNvbnN0IEZBUiA9IDEwMDAwO1xuXG5sZXQgc2NlbmU7XG5sZXQgY2FtZXJhO1xubGV0IHJlbmRlcmVyO1xubGV0IGF4aXNIZWxwZXI7XG5sZXQgZ3JpZEhlbHBlcjtcbmxldCBib3hHZW9tZXRyeTtcbmxldCBib3hNYXRlcmlhbDtcbmxldCBib3hNZXNoO1xubGV0IHBsYW5lR2VvbWV0cnk7XG5sZXQgcGxhbmVNYXRlcmlhbDtcbmxldCBwbGFuZU1lc2g7XG5sZXQgY29udHJvbHM7XG5sZXQgYW1iaWVudExpZ2h0O1xuXG5jb25zdCBvcmlnaW4gPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKTtcbmNvbnN0IGZvdiA9IFZJRVdfQU5HTEUgKiAoTWF0aC5QSSAvIDE4MCk7XG5cbmNvbnN0IEJPWF9TSVpFID0gMjA7XG5jb25zdCBCT1hfU0NBTEUgPSAwLjI1O1xuXG5jb25zdCBQTEFORV9TSVpFID0gMjA7XG5jb25zdCBQTEFORV9TQ0FMRSA9IDAuMjtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICBncmlkSGVscGVyID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoNTAsIDEwKTtcbiAgc2NlbmUuYWRkKGdyaWRIZWxwZXIpO1xuXG4gIGF4aXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhpc0hlbHBlcig1MCk7XG4gIHNjZW5lLmFkZChheGlzSGVscGVyKTtcblxuICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoVklFV19BTkdMRSwgQVNQRUNULCBORUFSLCBGQVIpO1xuICBjYW1lcmEucG9zaXRpb24uc2V0KDEwMCwgMTAwLCAxMDApO1xuICBjYW1lcmEubG9va0F0KG9yaWdpbik7XG5cbiAgYm94R2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoQk9YX1NJWkUsIEJPWF9TSVpFLCBCT1hfU0laRSk7XG4gIGJveE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCgpO1xuICBib3hNZXNoID0gbmV3IFRIUkVFLk1lc2goYm94R2VvbWV0cnksIGJveE1hdGVyaWFsKTtcbiAgc2NlbmUuYWRkKGJveE1lc2gpO1xuXG4gIHBsYW5lR2VvbWV0cnkgPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeShQTEFORV9TSVpFLCBQTEFORV9TSVpFLCAzMik7XG4gIHBsYW5lTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaE5vcm1hbE1hdGVyaWFsKHsgc2lkZTogVEhSRUUuRG91YmxlU2lkZSB9KTtcbiAgcGxhbmVNZXNoID0gbmV3IFRIUkVFLk1lc2gocGxhbmVHZW9tZXRyeSwgcGxhbmVNYXRlcmlhbCk7XG4gIHBsYW5lTWVzaC5wb3NpdGlvbi5zZXQoLTUwLCAwLCAtNTApO1xuICBzY2VuZS5hZGQocGxhbmVNZXNoKTtcblxuICBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4NDQ0NDQ0KTtcbiAgc2NlbmUuYWRkKGFtYmllbnRMaWdodCk7XG5cbiAgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhczogdHJ1ZSB9KTtcbiAgcmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICBjb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKGNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgVEhSRUV4LldpbmRvd1Jlc2l6ZShyZW5kZXJlciwgY2FtZXJhKTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiByZXNldE1lc2hTaXplKG1lc2gsIG1lc2hTaXplLCBtZXNoU2NhbGUpIHtcbiAgLy8gRGV0ZXJtaW5lIHRoZSBkaXN0YW5jZSBvZiB0aGUgY2FtZXJhIHRvIHRoZSBvYmplY3RcbiAgY29uc3QgZGlzdGFuY2UgPSBjYW1lcmEucG9zaXRpb24uZGlzdGFuY2VUbyhtZXNoLnBvc2l0aW9uKTtcblxuICAvLyBDYWxjdWxhdGUgd2hhdCB0aGUgY3VycmVudCBmcnVzdHJ1bSByYWRpdXMvc2l6ZS5cbiAgY29uc3QgZnJ1c3RydW1SYWRpdXMgPSAyICogTWF0aC50YW4oZm92IC8gMikgKiBkaXN0YW5jZTtcblxuICAvLyBXZSB3YW50IG91ciBvYmplY3QgdG8gcmVtYWluIHRoZSBzYW1lIHNpemUgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnRcbiAgLy8gZnJ1c3RydW0gc2l6ZS5cbiAgLy9cbiAgLy8gRm9yIGV4YW1wbGU6XG4gIC8vICAgU3VwcG9zZSBmcnVzdHJ1bSBzaXplIGlzIDEwMCwgYW5kIG9iamVjdCBzaXplIGlzIDIwXG4gIC8vICAgdGhlbiByYXRpbyAob3Igc2NhbGUpID0gMTAwIC8gMjAgPSA1LjBcbiAgLy9cbiAgLy8gICBTdXBwb3NlIGZydXN0cnVtIHNpemUgY2hhbmdlcyB0byAyMDAsIGFuZCBvYmplY3Qgc2l6ZSBpcyAyMFxuICAvLyAgIHRoZW4gcmF0aW8gKG9yIHNjYWxlKSA9IDIwMCAvIDIwID0gMTAuMFxuICAvL1xuICAvLyBCdXQgdGhpcyBzY2FsZSB2YWx1ZSBhbG9uZSB3aWxsIGNhdXNlIHRoZSBvYmplY3QgdG8gZmlsbFxuICAvLyB0aGUgc2NyZWVuLCBzbyB3ZSBuZWVkIGEgc2NhbGUgdmFsdWUgdG8gZ2V0IGl0IGJhY2sgdG8gYVxuICAvLyBtb3JlIHVzZWZ1bCBzaXplLlxuICBjb25zdCBzY2FsZSA9IChmcnVzdHJ1bVJhZGl1cyAvIG1lc2hTaXplKSAqIG1lc2hTY2FsZTtcbiAgbWVzaC5zY2FsZS5zZXQoc2NhbGUsIHNjYWxlLCBzY2FsZSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgcGxhbmVNZXNoLnJvdGF0aW9uLnggKz0gMC4wMDU7XG4gIHBsYW5lTWVzaC5yb3RhdGlvbi55ICs9IDAuMDA1O1xuXG4gIHJlc2V0TWVzaFNpemUoYm94TWVzaCwgQk9YX1NJWkUsIEJPWF9TQ0FMRSk7XG4gIHJlc2V0TWVzaFNpemUocGxhbmVNZXNoLCBQTEFORV9TSVpFLCBQTEFORV9TQ0FMRSk7XG5cbiAgY29udHJvbHMudXBkYXRlKCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgdXBkYXRlKCk7XG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcbn1cblxuaW5pdCgpO1xuYW5pbWF0ZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcHMvb2JqZWN0LWNvbnN0YW50LXNpemUvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9