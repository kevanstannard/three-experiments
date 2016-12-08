/* eslint-disable no-param-reassign */

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 1000;

let scene;
let camera;
let renderer;
let gridHelper;
let controls;
// let pointLight;
// let ambientLight;
let tree;

// const origin = new THREE.Vector3(0, 0, 0);

function Tree(depth = 6, size = 100) {
  const geometry = new THREE.BoxGeometry(size / 8, size, size / 8);

  // Change the geometrys center position to be the base of the geometry
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, size / 2, 0));

  const material = new THREE.MeshNormalMaterial({ wireframe: true });
  // const material = new THREE.MeshStandardMaterial({
  //   color: 0x2194ce,
  //   metalness: 0.5,
  //   roughness: 0,
  //   shading: THREE.SmoothShading,
  // });
  // const material = new THREE.MeshPhongMaterial({
  //   color: 0x888888,
  //   shininess: 100,
  //   shading: THREE.FlatShading,
  // });
  THREE.Mesh.call(this, geometry, material);

  this.branches = [];

  const top = new THREE.Vector3(0, size, 0);

  if (depth > 1) {
    const branchSize = size * 0.7;

    const branch1 = new Tree(depth - 1, branchSize);
    branch1.position.set(top.x, top.y, top.z);
    branch1.rotateZ(Math.PI * (1 / 4));
    branch1.rotation.y = (2 * Math.PI / 3) * 0;
    this.add(branch1);
    this.branches.push(branch1);

    const branch2 = new Tree(depth - 1, branchSize);
    branch2.position.set(top.x, top.y, top.z);
    branch2.rotateZ(Math.PI * (1 / 4));
    branch2.rotation.y = (2 * Math.PI / 3) * 1;
    this.add(branch2);
    this.branches.push(branch2);

    const branch3 = new Tree(depth - 1, branchSize);
    branch3.position.set(top.x, top.y, top.z);
    branch3.rotateZ(Math.PI * (1 / 4));
    branch3.rotation.y = (2 * Math.PI / 3) * 2;
    this.add(branch3);
    this.branches.push(branch3);
  }
}

Tree.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {

  constructor: Tree,

  update() {
    this.branches.forEach((branch) => {
      branch.rotation.y += 0.001;
      branch.update();
    });
  },

});

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  tree = new Tree();
  scene.add(tree);

  // ambientLight = new THREE.AmbientLight(0x000000);
  // scene.add(ambientLight);

  // pointLight = new THREE.PointLight(0xffffff, 2, 500);
  // pointLight.position.set(80, 80, 80);
  // scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 400, 400);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  const withinTree = new THREE.Vector3(
    tree.position.x,
    tree.position.y + 100,
    tree.position.z,
  );
  controls.target.set(withinTree.x, withinTree.y, withinTree.z);


  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  tree.update();
  tree.rotation.y -= 0.002;
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
