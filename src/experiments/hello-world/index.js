const Stats = require('libs/stats/r17/stats');

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let orbitControls;
let mesh;
let controls;
let stats;

const origin = new THREE.Vector3(0, 0, 0);

function initStats() {
  stats = new Stats();
  stats.dom.style.position = 'absolute';
  stats.dom.style.left = '0px';
  stats.dom.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function initControls() {
  controls = {
    xRotation: 0,
    yRotation: 0,
    zRotation: 0,
  };
  const gui = new dat.GUI();
  gui.domElement.parentElement.style.zIndex = 2;
  gui.add(controls, 'xRotation', 0, Math.PI * 2);
  gui.add(controls, 'yRotation', 0, Math.PI * 2);
  gui.add(controls, 'zRotation', 0, Math.PI * 2);
}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
  initControls();

  const gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  const axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);
}

function update() {
  mesh.rotation.set(
    mesh.rotation.x = controls.xRotation,
    mesh.rotation.y = controls.yRotation,
    mesh.rotation.z = controls.zRotation,
  );
  stats.update();
  orbitControls.update();
}

function render() {
  renderer.render(scene, camera);
}

function tick() {
  update();
  render();
  requestAnimationFrame(tick);
}

init();
tick();
