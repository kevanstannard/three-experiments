// Ref:
// https://solutiondesign.com/blog/-/blogs/webgl-and-three-js-texture-mappi-1

import MinecraftHeadGeometry from './MinecraftHeadGeometry';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let axisHelper;
let gridHelper;
let controls;
let pointLight;
let ambientLight;
let steve;
let alex;

const textureLoader = new THREE.TextureLoader();
const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  const headGeometry = new MinecraftHeadGeometry(10);

  // Pixellated texture
  const steveTexture = textureLoader.load('skins/steve.png');
  steveTexture.magFilter = THREE.NearestFilter;
  steveTexture.minFilter = THREE.LinearMipMapLinearFilter;

  const steveMaterial = new THREE.MeshLambertMaterial({ map: steveTexture });
  steve = new THREE.Mesh(headGeometry, steveMaterial);
  steve.position.set(-10, 5, 0);
  scene.add(steve);

  // Pixellated texture
  const alexTexture = textureLoader.load('skins/alex.png');
  alexTexture.magFilter = THREE.NearestFilter;
  alexTexture.minFilter = THREE.LinearMipMapLinearFilter;

  const alexMaterial = new THREE.MeshLambertMaterial({ map: alexTexture });
  alex = new THREE.Mesh(headGeometry, alexMaterial);
  alex.position.set(10, 5, 0);
  scene.add(alex);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 20, 40);
  camera.lookAt(origin);

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

function update() {
  steve.rotation.y += 0.01;
  alex.rotation.y -= 0.01;
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
