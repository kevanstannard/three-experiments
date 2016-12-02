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

	'use strict';
	
	/* eslint no-prototype-builtins: "off" */
	
	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45;
	var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
	var NEAR = 1;
	var FAR = 10000;
	
	var scene = void 0;
	var camera = void 0;
	var renderer = void 0;
	// let geometry;
	// let material;
	// let mesh;
	var controls = void 0;
	var pointLight = void 0;
	var ambientLight = void 0;
	
	var origin = new THREE.Vector3(0, 0, 0);
	
	function renderGrid() {
	  var gridSize = 100;
	
	  var xzGrid = new THREE.GridHelper(gridSize, 10);
	  xzGrid.position.set(gridSize, 0, gridSize);
	  scene.add(xzGrid);
	
	  var xyGrid = new THREE.GridHelper(gridSize, 10);
	  xyGrid.rotation.x = Math.PI * (1 / 2);
	  xyGrid.position.set(gridSize, gridSize, 0);
	  scene.add(xyGrid);
	
	  var yzGrid = new THREE.GridHelper(gridSize, 10);
	  yzGrid.rotation.z = Math.PI * (1 / 2);
	  yzGrid.position.set(0, gridSize, gridSize);
	  scene.add(yzGrid);
	}
	
	function renderAxis(v, color, labelText) {
	  var dir = v.normalize();
	  var axis = new THREE.ArrowHelper(dir, origin, 250, color, 10, 5);
	  scene.add(axis);
	
	  var labelProps = { font: 'droid sans', size: 12, curveSegments: 32 };
	  var labelGeometry = new THREE.TextGeometry(labelText, labelProps);
	  var labelMaterial = new THREE.MeshBasicMaterial();
	  var label = new THREE.Mesh(labelGeometry, labelMaterial);
	  scene.add(label);
	}
	
	function renderAxes() {
	  var xAxis = new THREE.Vector3(1, 0, 0);
	  renderAxis(xAxis, 0xff0000, 'x');
	
	  var yAxis = new THREE.Vector3(0, 1, 0);
	  renderAxis(yAxis, 0x00ff00, 'y');
	
	  var zAxis = new THREE.Vector3(0, 0, 1);
	  renderAxis(zAxis, 0x0000ff, 'z');
	
	  // const axisHelper = new THREE.AxisHelper(100);
	  // scene.add(axisHelper);
	}
	
	// function roundRect(ctx, x, y, w, h, r) {
	//   ctx.beginPath();
	//   ctx.moveTo(x + r, y);
	//   ctx.lineTo(x + w - r, y);
	//   ctx.quadraticCurveTo(x + w, y, x + w, y + r);
	//   ctx.lineTo(x + w, y + h - r);
	//   ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
	//   ctx.lineTo(x + r, y + h);
	//   ctx.quadraticCurveTo(x, y + h, x, y + h - r);
	//   ctx.lineTo(x, y + r);
	//   ctx.quadraticCurveTo(x, y, x + r, y);
	//   ctx.closePath();
	//   ctx.fill();
	//   ctx.stroke();
	// }
	
	// function makeTextSprite(message, parameters = {}) {
	//   const fontface = parameters.hasOwnProperty('fontface')
	//       ? parameters.fontface
	//       : 'Arial';
	//
	//   const fontsize = parameters.hasOwnProperty('fontsize')
	//       ? parameters.fontsize
	//       : 18;
	//
	//   const borderThickness = parameters.hasOwnProperty('borderThickness')
	//       ? parameters.borderThickness
	//       : 4;
	//
	//   const borderColor = parameters.hasOwnProperty('borderColor')
	//       ? parameters.borderColor
	//       : {
	//         r: 0,
	//         g: 0,
	//         b: 0,
	//         a: 1.0,
	//       };
	//
	//   const backgroundColor = parameters.hasOwnProperty('backgroundColor')
	//       ? parameters.backgroundColor
	//       : {
	//         r: 255,
	//         g: 255,
	//         b: 255,
	//         a: 1.0,
	//       };
	//
	//   const spriteAlignment = THREE.SpriteAlignment.topLeft;
	//
	//   const canvas = document.createElement('canvas');
	//   const context = canvas.getContext('2d');
	//   // context.font = 'Bold ' + fontsize + 'px ' + fontface;
	//   context.font = `Bold ${fontsize}px ${fontface}`;
	//
	//   // get size data (height depends only on font size)
	//   const metrics = context.measureText(message);
	//   const textWidth = metrics.width;
	//
	//   // background color
	//   const bgColor = backgroundColor;
	//   context.fillStyle = `rgba(${bgColor.r},${bgColor.g},${bgColor.b},${bgColor.a})`;
	//
	//   // border color
	//   const bColor = borderColor;
	//   context.strokeStyle = `rgba(${bColor.r},${bColor.g},${bColor.b},${bColor.a})`;
	//
	//   context.lineWidth = borderThickness;
	//   roundRect(
	//     context,
	//     borderThickness / 2,
	//     borderThickness / 2,
	//     textWidth + borderThickness,
	//     fontsize * 1.4 + borderThickness,
	//     6,
	//   );
	//   // 1.4 is extra height factor for text below baseline: g,j,p,q.
	//
	//   // text color
	//   context.fillStyle = 'rgba(0, 0, 0, 1.0)';
	//
	//   context.fillText(message, borderThickness, fontsize + borderThickness);
	//
	//   // canvas contents will be used for a texture
	//   const texture = new THREE.Texture(canvas);
	//   texture.needsUpdate = true;
	//
	//   const spriteMaterial = new THREE.SpriteMaterial({
	//     map: texture,
	//     useScreenCoordinates: false,
	//     alignment: spriteAlignment,
	//   });
	//
	//   const sprite = new THREE.Sprite(spriteMaterial);
	//   sprite.scale.set(100, 50, 1.0);
	//
	//   return sprite;
	// }
	
	function init() {
	  scene = new THREE.Scene();
	
	  renderGrid();
	  renderAxes();
	
	  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	  camera.position.set(400, 400, 400);
	  camera.lookAt(origin);
	
	  // geometry = new THREE.SphereGeometry(1, 32, 32);
	  // material = new THREE.MeshLambertMaterial({ color: 0xffffff });
	
	  // https://en.wikipedia.org/wiki/Spherical_coordinate_system
	  // http://stackoverflow.com/questions/969798/plotting-a-point-on-the-edge-of-a-sphere
	
	  // const radius = 100;
	  // const intervals = 10;
	  //
	  // // phi is the angle on the xy plane
	  // // [0, 2PI]
	  // const phi0 = Math.PI * (0 / 4);
	  // const phi1 = Math.PI * (2 / 4);
	  // const phiDelta = (phi1 - phi0) / intervals;
	  //
	  // // theta is the angle from the z axis
	  // // [0, PI]
	  // const theta0 = Math.PI * (0 / 2);
	  // const theta1 = Math.PI * (2 / 4);
	  // const thetaDelta = (theta1 - theta0) / intervals;
	  //
	  // // let count = 0;
	  // for (let phi = phi0; phi <= phi1; phi += phiDelta) {
	  //   for (let theta = theta0; theta <= theta1; theta += thetaDelta) {
	  //     // count += 1;
	  //     // console.log(count);
	  //     const x = radius * Math.sin(theta) * Math.cos(phi);
	  //     const y = radius * Math.sin(theta) * Math.sin(phi);
	  //     const z = radius * Math.cos(theta);
	  //     mesh = new THREE.Mesh(geometry, material);
	  //     mesh.position.set(x, y, z);
	  //     scene.add(mesh);
	  //   }
	  // }
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDdhMjU4YWNiM2QzZjdhY2U5OWI/NTA1YyoqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9hcHBzL3NwaGVyaWNhbC1jb29yZGluYXRlcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJTQ1JFRU5fV0lEVEgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiU0NSRUVOX0hFSUdIVCIsImlubmVySGVpZ2h0IiwiVklFV19BTkdMRSIsIkFTUEVDVCIsIk5FQVIiLCJGQVIiLCJzY2VuZSIsImNhbWVyYSIsInJlbmRlcmVyIiwiY29udHJvbHMiLCJwb2ludExpZ2h0IiwiYW1iaWVudExpZ2h0Iiwib3JpZ2luIiwiVEhSRUUiLCJWZWN0b3IzIiwicmVuZGVyR3JpZCIsImdyaWRTaXplIiwieHpHcmlkIiwiR3JpZEhlbHBlciIsInBvc2l0aW9uIiwic2V0IiwiYWRkIiwieHlHcmlkIiwicm90YXRpb24iLCJ4IiwiTWF0aCIsIlBJIiwieXpHcmlkIiwieiIsInJlbmRlckF4aXMiLCJ2IiwiY29sb3IiLCJsYWJlbFRleHQiLCJkaXIiLCJub3JtYWxpemUiLCJheGlzIiwiQXJyb3dIZWxwZXIiLCJsYWJlbFByb3BzIiwiZm9udCIsInNpemUiLCJjdXJ2ZVNlZ21lbnRzIiwibGFiZWxHZW9tZXRyeSIsIlRleHRHZW9tZXRyeSIsImxhYmVsTWF0ZXJpYWwiLCJNZXNoQmFzaWNNYXRlcmlhbCIsImxhYmVsIiwiTWVzaCIsInJlbmRlckF4ZXMiLCJ4QXhpcyIsInlBeGlzIiwiekF4aXMiLCJpbml0IiwiU2NlbmUiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsImxvb2tBdCIsIkFtYmllbnRMaWdodCIsIlBvaW50TGlnaHQiLCJXZWJHTFJlbmRlcmVyIiwic2V0U2l6ZSIsIk9yYml0Q29udHJvbHMiLCJkb21FbGVtZW50IiwiVEhSRUV4IiwiV2luZG93UmVzaXplIiwiZG9jdW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJhbmltYXRlIiwi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QkMseUJBQXNCRCxPQUF0QjtBQUNBekQsWUFBUzJELE1BQVQ7QUFDQTVELFlBQVM2RCxNQUFULENBQWdCL0QsS0FBaEIsRUFBdUJDLE1BQXZCO0FBQ0Q7O0FBRUQ0QztBQUNBZSxXIiwiZmlsZSI6ImRpc3QvYXBwcy9zcGhlcmljYWwtY29vcmRpbmF0ZXMvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDdhMjU4YWNiM2QzZjdhY2U5OWIiLCIvKiBlc2xpbnQgbm8tcHJvdG90eXBlLWJ1aWx0aW5zOiBcIm9mZlwiICovXG5cbmNvbnN0IFNDUkVFTl9XSURUSCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY29uc3QgU0NSRUVOX0hFSUdIVCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmNvbnN0IFZJRVdfQU5HTEUgPSA0NTtcbmNvbnN0IEFTUEVDVCA9IFNDUkVFTl9XSURUSCAvIFNDUkVFTl9IRUlHSFQ7XG5jb25zdCBORUFSID0gMTtcbmNvbnN0IEZBUiA9IDEwMDAwO1xuXG5sZXQgc2NlbmU7XG5sZXQgY2FtZXJhO1xubGV0IHJlbmRlcmVyO1xuLy8gbGV0IGdlb21ldHJ5O1xuLy8gbGV0IG1hdGVyaWFsO1xuLy8gbGV0IG1lc2g7XG5sZXQgY29udHJvbHM7XG5sZXQgcG9pbnRMaWdodDtcbmxldCBhbWJpZW50TGlnaHQ7XG5cbmNvbnN0IG9yaWdpbiA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApO1xuXG5mdW5jdGlvbiByZW5kZXJHcmlkKCkge1xuICBjb25zdCBncmlkU2l6ZSA9IDEwMDtcblxuICBjb25zdCB4ekdyaWQgPSBuZXcgVEhSRUUuR3JpZEhlbHBlcihncmlkU2l6ZSwgMTApO1xuICB4ekdyaWQucG9zaXRpb24uc2V0KGdyaWRTaXplLCAwLCBncmlkU2l6ZSk7XG4gIHNjZW5lLmFkZCh4ekdyaWQpO1xuXG4gIGNvbnN0IHh5R3JpZCA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKGdyaWRTaXplLCAxMCk7XG4gIHh5R3JpZC5yb3RhdGlvbi54ID0gTWF0aC5QSSAqICgxIC8gMik7XG4gIHh5R3JpZC5wb3NpdGlvbi5zZXQoZ3JpZFNpemUsIGdyaWRTaXplLCAwKTtcbiAgc2NlbmUuYWRkKHh5R3JpZCk7XG5cbiAgY29uc3QgeXpHcmlkID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoZ3JpZFNpemUsIDEwKTtcbiAgeXpHcmlkLnJvdGF0aW9uLnogPSBNYXRoLlBJICogKDEgLyAyKTtcbiAgeXpHcmlkLnBvc2l0aW9uLnNldCgwLCBncmlkU2l6ZSwgZ3JpZFNpemUpO1xuICBzY2VuZS5hZGQoeXpHcmlkKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQXhpcyh2LCBjb2xvciwgbGFiZWxUZXh0KSB7XG4gIGNvbnN0IGRpciA9IHYubm9ybWFsaXplKCk7XG4gIGNvbnN0IGF4aXMgPSBuZXcgVEhSRUUuQXJyb3dIZWxwZXIoZGlyLCBvcmlnaW4sIDI1MCwgY29sb3IsIDEwLCA1KTtcbiAgc2NlbmUuYWRkKGF4aXMpO1xuXG4gIGNvbnN0IGxhYmVsUHJvcHMgPSB7IGZvbnQ6ICdkcm9pZCBzYW5zJywgc2l6ZTogMTIsIGN1cnZlU2VnbWVudHM6IDMyIH07XG4gIGNvbnN0IGxhYmVsR2VvbWV0cnkgPSBuZXcgVEhSRUUuVGV4dEdlb21ldHJ5KGxhYmVsVGV4dCwgbGFiZWxQcm9wcyk7XG4gIGNvbnN0IGxhYmVsTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoKTtcbiAgY29uc3QgbGFiZWwgPSBuZXcgVEhSRUUuTWVzaChsYWJlbEdlb21ldHJ5LCBsYWJlbE1hdGVyaWFsKTtcbiAgc2NlbmUuYWRkKGxhYmVsKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQXhlcygpIHtcbiAgY29uc3QgeEF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAwLCAwKTtcbiAgcmVuZGVyQXhpcyh4QXhpcywgMHhmZjAwMDAsICd4Jyk7XG5cbiAgY29uc3QgeUF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKTtcbiAgcmVuZGVyQXhpcyh5QXhpcywgMHgwMGZmMDAsICd5Jyk7XG5cbiAgY29uc3QgekF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAxKTtcbiAgcmVuZGVyQXhpcyh6QXhpcywgMHgwMDAwZmYsICd6Jyk7XG5cbiAgLy8gY29uc3QgYXhpc0hlbHBlciA9IG5ldyBUSFJFRS5BeGlzSGVscGVyKDEwMCk7XG4gIC8vIHNjZW5lLmFkZChheGlzSGVscGVyKTtcbn1cblxuLy8gZnVuY3Rpb24gcm91bmRSZWN0KGN0eCwgeCwgeSwgdywgaCwgcikge1xuLy8gICBjdHguYmVnaW5QYXRoKCk7XG4vLyAgIGN0eC5tb3ZlVG8oeCArIHIsIHkpO1xuLy8gICBjdHgubGluZVRvKHggKyB3IC0gciwgeSk7XG4vLyAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHggKyB3LCB5LCB4ICsgdywgeSArIHIpO1xuLy8gICBjdHgubGluZVRvKHggKyB3LCB5ICsgaCAtIHIpO1xuLy8gICBjdHgucXVhZHJhdGljQ3VydmVUbyh4ICsgdywgeSArIGgsIHggKyB3IC0gciwgeSArIGgpO1xuLy8gICBjdHgubGluZVRvKHggKyByLCB5ICsgaCk7XG4vLyAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHkgKyBoLCB4LCB5ICsgaCAtIHIpO1xuLy8gICBjdHgubGluZVRvKHgsIHkgKyByKTtcbi8vICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oeCwgeSwgeCArIHIsIHkpO1xuLy8gICBjdHguY2xvc2VQYXRoKCk7XG4vLyAgIGN0eC5maWxsKCk7XG4vLyAgIGN0eC5zdHJva2UoKTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gbWFrZVRleHRTcHJpdGUobWVzc2FnZSwgcGFyYW1ldGVycyA9IHt9KSB7XG4vLyAgIGNvbnN0IGZvbnRmYWNlID0gcGFyYW1ldGVycy5oYXNPd25Qcm9wZXJ0eSgnZm9udGZhY2UnKVxuLy8gICAgICAgPyBwYXJhbWV0ZXJzLmZvbnRmYWNlXG4vLyAgICAgICA6ICdBcmlhbCc7XG4vL1xuLy8gICBjb25zdCBmb250c2l6ZSA9IHBhcmFtZXRlcnMuaGFzT3duUHJvcGVydHkoJ2ZvbnRzaXplJylcbi8vICAgICAgID8gcGFyYW1ldGVycy5mb250c2l6ZVxuLy8gICAgICAgOiAxODtcbi8vXG4vLyAgIGNvbnN0IGJvcmRlclRoaWNrbmVzcyA9IHBhcmFtZXRlcnMuaGFzT3duUHJvcGVydHkoJ2JvcmRlclRoaWNrbmVzcycpXG4vLyAgICAgICA/IHBhcmFtZXRlcnMuYm9yZGVyVGhpY2tuZXNzXG4vLyAgICAgICA6IDQ7XG4vL1xuLy8gICBjb25zdCBib3JkZXJDb2xvciA9IHBhcmFtZXRlcnMuaGFzT3duUHJvcGVydHkoJ2JvcmRlckNvbG9yJylcbi8vICAgICAgID8gcGFyYW1ldGVycy5ib3JkZXJDb2xvclxuLy8gICAgICAgOiB7XG4vLyAgICAgICAgIHI6IDAsXG4vLyAgICAgICAgIGc6IDAsXG4vLyAgICAgICAgIGI6IDAsXG4vLyAgICAgICAgIGE6IDEuMCxcbi8vICAgICAgIH07XG4vL1xuLy8gICBjb25zdCBiYWNrZ3JvdW5kQ29sb3IgPSBwYXJhbWV0ZXJzLmhhc093blByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InKVxuLy8gICAgICAgPyBwYXJhbWV0ZXJzLmJhY2tncm91bmRDb2xvclxuLy8gICAgICAgOiB7XG4vLyAgICAgICAgIHI6IDI1NSxcbi8vICAgICAgICAgZzogMjU1LFxuLy8gICAgICAgICBiOiAyNTUsXG4vLyAgICAgICAgIGE6IDEuMCxcbi8vICAgICAgIH07XG4vL1xuLy8gICBjb25zdCBzcHJpdGVBbGlnbm1lbnQgPSBUSFJFRS5TcHJpdGVBbGlnbm1lbnQudG9wTGVmdDtcbi8vXG4vLyAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuLy8gICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4vLyAgIC8vIGNvbnRleHQuZm9udCA9ICdCb2xkICcgKyBmb250c2l6ZSArICdweCAnICsgZm9udGZhY2U7XG4vLyAgIGNvbnRleHQuZm9udCA9IGBCb2xkICR7Zm9udHNpemV9cHggJHtmb250ZmFjZX1gO1xuLy9cbi8vICAgLy8gZ2V0IHNpemUgZGF0YSAoaGVpZ2h0IGRlcGVuZHMgb25seSBvbiBmb250IHNpemUpXG4vLyAgIGNvbnN0IG1ldHJpY3MgPSBjb250ZXh0Lm1lYXN1cmVUZXh0KG1lc3NhZ2UpO1xuLy8gICBjb25zdCB0ZXh0V2lkdGggPSBtZXRyaWNzLndpZHRoO1xuLy9cbi8vICAgLy8gYmFja2dyb3VuZCBjb2xvclxuLy8gICBjb25zdCBiZ0NvbG9yID0gYmFja2dyb3VuZENvbG9yO1xuLy8gICBjb250ZXh0LmZpbGxTdHlsZSA9IGByZ2JhKCR7YmdDb2xvci5yfSwke2JnQ29sb3IuZ30sJHtiZ0NvbG9yLmJ9LCR7YmdDb2xvci5hfSlgO1xuLy9cbi8vICAgLy8gYm9yZGVyIGNvbG9yXG4vLyAgIGNvbnN0IGJDb2xvciA9IGJvcmRlckNvbG9yO1xuLy8gICBjb250ZXh0LnN0cm9rZVN0eWxlID0gYHJnYmEoJHtiQ29sb3Iucn0sJHtiQ29sb3IuZ30sJHtiQ29sb3IuYn0sJHtiQ29sb3IuYX0pYDtcbi8vXG4vLyAgIGNvbnRleHQubGluZVdpZHRoID0gYm9yZGVyVGhpY2tuZXNzO1xuLy8gICByb3VuZFJlY3QoXG4vLyAgICAgY29udGV4dCxcbi8vICAgICBib3JkZXJUaGlja25lc3MgLyAyLFxuLy8gICAgIGJvcmRlclRoaWNrbmVzcyAvIDIsXG4vLyAgICAgdGV4dFdpZHRoICsgYm9yZGVyVGhpY2tuZXNzLFxuLy8gICAgIGZvbnRzaXplICogMS40ICsgYm9yZGVyVGhpY2tuZXNzLFxuLy8gICAgIDYsXG4vLyAgICk7XG4vLyAgIC8vIDEuNCBpcyBleHRyYSBoZWlnaHQgZmFjdG9yIGZvciB0ZXh0IGJlbG93IGJhc2VsaW5lOiBnLGoscCxxLlxuLy9cbi8vICAgLy8gdGV4dCBjb2xvclxuLy8gICBjb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDAsIDAsIDEuMCknO1xuLy9cbi8vICAgY29udGV4dC5maWxsVGV4dChtZXNzYWdlLCBib3JkZXJUaGlja25lc3MsIGZvbnRzaXplICsgYm9yZGVyVGhpY2tuZXNzKTtcbi8vXG4vLyAgIC8vIGNhbnZhcyBjb250ZW50cyB3aWxsIGJlIHVzZWQgZm9yIGEgdGV4dHVyZVxuLy8gICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoY2FudmFzKTtcbi8vICAgdGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG4vL1xuLy8gICBjb25zdCBzcHJpdGVNYXRlcmlhbCA9IG5ldyBUSFJFRS5TcHJpdGVNYXRlcmlhbCh7XG4vLyAgICAgbWFwOiB0ZXh0dXJlLFxuLy8gICAgIHVzZVNjcmVlbkNvb3JkaW5hdGVzOiBmYWxzZSxcbi8vICAgICBhbGlnbm1lbnQ6IHNwcml0ZUFsaWdubWVudCxcbi8vICAgfSk7XG4vL1xuLy8gICBjb25zdCBzcHJpdGUgPSBuZXcgVEhSRUUuU3ByaXRlKHNwcml0ZU1hdGVyaWFsKTtcbi8vICAgc3ByaXRlLnNjYWxlLnNldCgxMDAsIDUwLCAxLjApO1xuLy9cbi8vICAgcmV0dXJuIHNwcml0ZTtcbi8vIH1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICByZW5kZXJHcmlkKCk7XG4gIHJlbmRlckF4ZXMoKTtcblxuICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoVklFV19BTkdMRSwgQVNQRUNULCBORUFSLCBGQVIpO1xuICBjYW1lcmEucG9zaXRpb24uc2V0KDQwMCwgNDAwLCA0MDApO1xuICBjYW1lcmEubG9va0F0KG9yaWdpbik7XG5cbiAgLy8gZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMSwgMzIsIDMyKTtcbiAgLy8gbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiB9KTtcblxuICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TcGhlcmljYWxfY29vcmRpbmF0ZV9zeXN0ZW1cbiAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85Njk3OTgvcGxvdHRpbmctYS1wb2ludC1vbi10aGUtZWRnZS1vZi1hLXNwaGVyZVxuXG4gIC8vIGNvbnN0IHJhZGl1cyA9IDEwMDtcbiAgLy8gY29uc3QgaW50ZXJ2YWxzID0gMTA7XG4gIC8vXG4gIC8vIC8vIHBoaSBpcyB0aGUgYW5nbGUgb24gdGhlIHh5IHBsYW5lXG4gIC8vIC8vIFswLCAyUEldXG4gIC8vIGNvbnN0IHBoaTAgPSBNYXRoLlBJICogKDAgLyA0KTtcbiAgLy8gY29uc3QgcGhpMSA9IE1hdGguUEkgKiAoMiAvIDQpO1xuICAvLyBjb25zdCBwaGlEZWx0YSA9IChwaGkxIC0gcGhpMCkgLyBpbnRlcnZhbHM7XG4gIC8vXG4gIC8vIC8vIHRoZXRhIGlzIHRoZSBhbmdsZSBmcm9tIHRoZSB6IGF4aXNcbiAgLy8gLy8gWzAsIFBJXVxuICAvLyBjb25zdCB0aGV0YTAgPSBNYXRoLlBJICogKDAgLyAyKTtcbiAgLy8gY29uc3QgdGhldGExID0gTWF0aC5QSSAqICgyIC8gNCk7XG4gIC8vIGNvbnN0IHRoZXRhRGVsdGEgPSAodGhldGExIC0gdGhldGEwKSAvIGludGVydmFscztcbiAgLy9cbiAgLy8gLy8gbGV0IGNvdW50ID0gMDtcbiAgLy8gZm9yIChsZXQgcGhpID0gcGhpMDsgcGhpIDw9IHBoaTE7IHBoaSArPSBwaGlEZWx0YSkge1xuICAvLyAgIGZvciAobGV0IHRoZXRhID0gdGhldGEwOyB0aGV0YSA8PSB0aGV0YTE7IHRoZXRhICs9IHRoZXRhRGVsdGEpIHtcbiAgLy8gICAgIC8vIGNvdW50ICs9IDE7XG4gIC8vICAgICAvLyBjb25zb2xlLmxvZyhjb3VudCk7XG4gIC8vICAgICBjb25zdCB4ID0gcmFkaXVzICogTWF0aC5zaW4odGhldGEpICogTWF0aC5jb3MocGhpKTtcbiAgLy8gICAgIGNvbnN0IHkgPSByYWRpdXMgKiBNYXRoLnNpbih0aGV0YSkgKiBNYXRoLnNpbihwaGkpO1xuICAvLyAgICAgY29uc3QgeiA9IHJhZGl1cyAqIE1hdGguY29zKHRoZXRhKTtcbiAgLy8gICAgIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAvLyAgICAgbWVzaC5wb3NpdGlvbi5zZXQoeCwgeSwgeik7XG4gIC8vICAgICBzY2VuZS5hZGQobWVzaCk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgYW1iaWVudExpZ2h0ID0gbmV3IFRIUkVFLkFtYmllbnRMaWdodCgweDQ0NDQ0NCk7XG4gIHNjZW5lLmFkZChhbWJpZW50TGlnaHQpO1xuXG4gIHBvaW50TGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGZmZmZmZiwgMSwgMTAwMCk7XG4gIHBvaW50TGlnaHQucG9zaXRpb24uc2V0KDUwLCA1MCwgNTApO1xuICBzY2VuZS5hZGQocG9pbnRMaWdodCk7XG5cbiAgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpO1xuICByZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gIGNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICBUSFJFRXguV2luZG93UmVzaXplKHJlbmRlcmVyLCBjYW1lcmEpO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgY29udHJvbHMudXBkYXRlKCk7XG4gIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcbn1cblxuaW5pdCgpO1xuYW5pbWF0ZSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcHMvc3BoZXJpY2FsLWNvb3JkaW5hdGVzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==