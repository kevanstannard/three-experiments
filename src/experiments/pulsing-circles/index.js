import Pulses from './Pulses';

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

let pulses1;
let pulses2;
let pulses3;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  pulses1 = new Pulses(20);
  pulses1.position.set(-20, 20, -10);
  // pulses1.rotation.x = -Math.PI / 4;
  scene.add(pulses1);

  pulses2 = new Pulses(20);
  pulses2.position.set(20, 20, 10);
  // pulses2.rotation.y = Math.PI / 4;
  scene.add(pulses2);

  pulses3 = new Pulses(20);
  pulses3.position.set(0, 0, 0);
  scene.add(pulses3);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 50, 100);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  pulses1.update();
  pulses1.rotation.x += 0.005;
  pulses1.rotation.y += 0.005;
  pulses1.rotation.z += 0.005;

  pulses2.update();
  pulses2.rotation.x += 0.01;
  pulses2.rotation.y += 0.01;
  pulses2.rotation.z += 0.01;

  pulses3.update();

  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
