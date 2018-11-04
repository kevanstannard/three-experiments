/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/experiments/skeleton-bone-mesh/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/experiments/skeleton-bone-mesh/index.js":
/*!*****************************************************!*\
  !*** ./src/experiments/skeleton-bone-mesh/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 10000;\nvar scene;\nvar camera;\nvar renderer;\nvar axisHelper;\nvar gridHelper;\nvar orbit;\nvar stats;\nvar lights;\nvar mesh;\nvar bones;\nvar skeletonHelper;\nvar state = {\n  animateBones: true\n};\nvar origin = new THREE.Vector3(0, 0, 0);\n\nfunction initStats() {\n  stats = new Stats();\n  stats.domElement.style.position = 'absolute';\n  stats.domElement.style.left = '0px';\n  stats.domElement.style.top = '20px';\n  stats.setMode(0); // 0: fps, 1: ms\n\n  document.getElementById('stats').appendChild(stats.domElement);\n}\n\nfunction createGeometry(sizing) {\n  var geometry = new THREE.CylinderGeometry(5, // radiusTop\n  5, // radiusBottom\n  sizing.height, // height\n  4, // radiusSegments\n  sizing.segmentCount, // heightSegments\n  true); // Vertices of the shape\n\n  for (var i = 0; i < geometry.vertices.length; i += 1) {\n    // Each vertex corresponds to one skin index\n    // which corresponds to one skin weight.\n    //\n    // The skin index is the index of the bone that\n    // the particular vertex is influenced by\n    // (each vertex can only belong to one bone).\n    //\n    // The skin weight is the amount of influence\n    // that bone has over that vertex.\n    //\n    // http://stackoverflow.com/questions/23052306/what-is-the-meaning-of-skin-indices-and-skin-weights\n    // Current vertex\n    var vertex = geometry.vertices[i]; // The cylinder geometry is centered at (0, 0, 0) which means that\n    // half of cylinder has negative y coordinates, and\n    // half of cylinder has positive y coordinates.\n    // Create a `y` value that is offset from zero by adding half the height.\n    // So our `y` values will be 0, 8, 16, 24 and 32.\n\n    var y = vertex.y + sizing.halfHeight; // The skin index is the index of the bone that\n    // the particular vertex is influenced by\n    // (each vertex can only belong to one bone).\n    //\n    // Our shape has a segment height of 8.\n    // Our `y` value rage from 0 to 32.\n    // Work out which bone influences this vertex\n    //\n    // We get:\n    // y = 0, bone = 0\n    // y = 8, bone = 1\n    // y = 16, bone = 2\n    // y = 24, bone = 3\n    // y = 32, bone = 4\n    //\n    // It's important to note that a bone is a POINT not a line.\n    // Two Bone points are required to make a visual bone line.\n    // In this example, there are 5 bones.\n    //\n    // The skinIndices' values correspond to the geometry's vertices.\n    // Each vertex can have up to 4 bones associated with it.\n    // So if you look at the first vertex, and the first skinIndex,\n    // this will tell you the bones associated with that vertex.\n    //\n    // For example the first vertex could have a value of ( 10.05, 30.10, 12.12 ).\n    // Then the first skin index could have the value of ( 10, 2, 0, 0 ).\n    // The first skin weight could have the value of ( 0.8, 0.2, 0, 0 ).\n    // In affect this would take the first vertex, and then the bone mesh.bones[10]\n    // and apply it 80% of the way. Then it would take the bone skeleton.bones[2]\n    // and apply it 20% of the way. The next two values have a weight of 0,\n    // so they would have no affect.\n\n    var skinIndex = Math.floor(y / sizing.segmentHeight); // When working with a SkinnedMesh, each vertex can have\n    // up to 4 bones affecting it. The skinWeights property\n    // is an array of weight values that correspond to the\n    // order of the vertices in the geometry.\n    //\n    // So for instance, the first skinWeight would correspond\n    // to the first vertex in the geometry.\n    //\n    // Since each vertex can be modified by 4 bones,\n    // a Vector4 is used to represent the skin weights for that vertex.\n    //\n    // The values of the vector should typically be between 0 and 1.\n    // For instance when set to 0 the bone transformation will have no affect.\n    //\n    // When set to 0.5 it will have 50% affect.\n    // When set to 100%, it will have 100% affect.\n    //\n    // If there is only 1 bone associated with the vertex\n    // then you only need to worry about the first component of the vector,\n    // the rest can be ignored and set to 0.\n\n    var skinWeight = y % sizing.segmentHeight / sizing.segmentHeight;\n    geometry.skinIndices.push(new THREE.Vector4(skinIndex, skinIndex + 1, 0, 0));\n    geometry.skinWeights.push(new THREE.Vector4(1 - skinWeight, skinWeight, 0, 0));\n  }\n\n  return geometry;\n}\n\nfunction createBones(sizing) {\n  bones = [];\n  var prevBone = new THREE.Bone();\n  bones.push(prevBone);\n  prevBone.position.y = -sizing.halfHeight;\n\n  for (var i = 0; i < sizing.segmentCount; i += 1) {\n    var bone = new THREE.Bone();\n    bone.position.y = sizing.segmentHeight;\n    bones.push(bone);\n    prevBone.add(bone);\n    prevBone = bone;\n  }\n\n  return bones;\n}\n\nfunction createMesh(geometry, theBones) {\n  var material = new THREE.MeshPhongMaterial({\n    skinning: true,\n    color: 0x156289,\n    emissive: 0x072534,\n    side: THREE.DoubleSide,\n    shading: THREE.FlatShading\n  });\n  var theMesh = new THREE.SkinnedMesh(geometry, material);\n  var skeleton = new THREE.Skeleton(theBones);\n  theMesh.add(theBones[0]);\n  theMesh.bind(skeleton);\n  skeletonHelper = new THREE.SkeletonHelper(theMesh);\n  skeletonHelper.material.linewidth = 2;\n  scene.add(skeletonHelper);\n  return theMesh;\n}\n\nfunction initBones() {\n  var segmentHeight = 8;\n  var segmentCount = 4;\n  var height = segmentHeight * segmentCount;\n  var halfHeight = height * 0.5;\n  var sizing = {\n    segmentHeight: segmentHeight,\n    segmentCount: segmentCount,\n    height: height,\n    halfHeight: halfHeight\n  };\n  var geometry = createGeometry(sizing);\n  var theBones = createBones(sizing);\n  mesh = createMesh(geometry, theBones);\n  mesh.scale.multiplyScalar(1);\n  scene.add(mesh);\n}\n\nfunction init() {\n  scene = new THREE.Scene();\n  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n  camera.position.set(50, 50, 50);\n  camera.lookAt(origin);\n  renderer = new THREE.WebGLRenderer({\n    antialias: true\n  });\n  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);\n  orbit = new THREE.OrbitControls(camera, renderer.domElement);\n  THREEx.WindowResize(renderer, camera);\n  document.body.appendChild(renderer.domElement);\n  initStats();\n  gridHelper = new THREE.GridHelper(30, 10);\n  scene.add(gridHelper);\n  axisHelper = new THREE.AxisHelper(30);\n  scene.add(axisHelper);\n  lights = [];\n  lights[0] = new THREE.PointLight(0xffffff, 1, 0);\n  lights[1] = new THREE.PointLight(0xffffff, 1, 0);\n  lights[2] = new THREE.PointLight(0xffffff, 1, 0);\n  lights[0].position.set(0, 200, 0);\n  lights[1].position.set(100, 200, 100);\n  lights[2].position.set(-100, -200, -100);\n  scene.add(lights[0]);\n  scene.add(lights[1]);\n  scene.add(lights[2]);\n  initBones();\n}\n\nfunction update() {\n  var time = Date.now() * 0.001;\n\n  if (state.animateBones) {\n    for (var i = 0; i < mesh.skeleton.bones.length; i += 1) {\n      mesh.skeleton.bones[i].rotation.z = Math.sin(time) * 2 / mesh.skeleton.bones.length;\n    }\n  }\n\n  skeletonHelper.update();\n  stats.update();\n  orbit.update();\n}\n\nfunction render() {\n  renderer.render(scene, camera);\n}\n\nfunction tick() {\n  update();\n  render();\n  requestAnimationFrame(tick);\n}\n\ninit();\ntick();\n\n//# sourceURL=webpack:///./src/experiments/skeleton-bone-mesh/index.js?");

/***/ })

/******/ });