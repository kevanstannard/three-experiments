/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/experiments/fractal-tree/index.js":
/*!***********************************************!*\
  !*** ./src/experiments/fractal-tree/index.js ***!
  \***********************************************/
/***/ (() => {

eval("/* eslint-disable no-param-reassign */ var SCREEN_WIDTH = window.innerWidth;\nvar SCREEN_HEIGHT = window.innerHeight;\nvar VIEW_ANGLE = 45;\nvar ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;\nvar NEAR = 1;\nvar FAR = 1000;\nvar scene;\nvar camera;\nvar renderer;\nvar gridHelper;\nvar controls;\nvar tree;\nfunction Tree() {\n    var depth = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 6, size = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;\n    this.depth = depth;\n    this.size = size;\n    this.growth = 0;\n    this.hasBranches = this.depth > 1;\n    this.branches = null;\n    var geometry = new THREE.BoxGeometry(size / 8, size, size / 8);\n    // Change the geometrys center position to be the base of the geometry\n    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, size / 2, 0));\n    var material = new THREE.MeshNormalMaterial({\n        wireframe: true\n    });\n    THREE.Mesh.call(this, geometry, material);\n}\nTree.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {\n    constructor: Tree,\n    addBranches: function addBranches() {\n        var top = new THREE.Vector3(0, this.size, 0);\n        var branchSize = this.size * 0.7;\n        var branchDepth = this.depth - 1;\n        this.branches = [];\n        var branch1 = new Tree(branchDepth, branchSize);\n        branch1.position.set(top.x, top.y, top.z);\n        branch1.rotateZ(Math.PI * (1 / 4));\n        branch1.rotation.y = 2 * Math.PI / 3 * 0;\n        this.add(branch1);\n        this.branches.push(branch1);\n        var branch2 = new Tree(branchDepth, branchSize);\n        branch2.position.set(top.x, top.y, top.z);\n        branch2.rotateZ(Math.PI * (1 / 4));\n        branch2.rotation.y = 2 * Math.PI / 3 * 1;\n        this.add(branch2);\n        this.branches.push(branch2);\n        var branch3 = new Tree(branchDepth, branchSize);\n        branch3.position.set(top.x, top.y, top.z);\n        branch3.rotateZ(Math.PI * (1 / 4));\n        branch3.rotation.y = 2 * Math.PI / 3 * 2;\n        this.add(branch3);\n        this.branches.push(branch3);\n    },\n    update: function update() {\n        if (this.growth < 1) {\n            this.growth += 0.005;\n            this.scale.y = this.growth;\n        } else if (this.hasBranches) {\n            if (!this.branches) {\n                this.addBranches();\n            }\n            this.branches.forEach(function(branch) {\n                branch.rotation.y += 0.005;\n                branch.update();\n            });\n        }\n    }\n});\nfunction init() {\n    scene = new THREE.Scene();\n    gridHelper = new THREE.GridHelper(100, 10);\n    scene.add(gridHelper);\n    tree = new Tree();\n    scene.add(tree);\n    // ambientLight = new THREE.AmbientLight(0x000000);\n    // scene.add(ambientLight);\n    // pointLight = new THREE.PointLight(0xffffff, 2, 500);\n    // pointLight.position.set(80, 80, 80);\n    // scene.add(pointLight);\n    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);\n    camera.position.set(0, 400, 400);\n    renderer = new THREE.WebGLRenderer({\n        antialias: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    controls = new THREE.OrbitControls(camera, renderer.domElement);\n    var withinTree = new THREE.Vector3(tree.position.x, tree.position.y + 100, tree.position.z);\n    controls.target.set(withinTree.x, withinTree.y, withinTree.z);\n    THREEx.WindowResize(renderer, camera);\n    document.body.appendChild(renderer.domElement);\n}\nfunction update() {\n    tree.update();\n    tree.rotation.y -= 0.002;\n    controls.update();\n}\nfunction animate() {\n    requestAnimationFrame(animate);\n    update();\n    renderer.render(scene, camera);\n}\ninit();\nanimate();\n\n\n//# sourceURL=webpack://three-experiments/./src/experiments/fractal-tree/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/experiments/fractal-tree/index.js"]();
/******/ 	
/******/ })()
;