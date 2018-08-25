import Bot from './objects/bot';

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
let bot;
let clock;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  clock = new THREE.Clock();
  clock.start();

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  const gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  const axisHelper = new THREE.AxesHelper(100);
  scene.add(axisHelper);

  bot = new Bot();
  scene.add(bot);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);
}

function update() {
  const delta = clock.getDelta();
  orbitControls.update();
  bot.update(delta);
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
