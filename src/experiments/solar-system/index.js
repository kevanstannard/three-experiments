import model from './model/scaled';
import createStar from './lib/factory';
import SolarSystem from './objects/solar-system';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 5000000;

let prevTime = Date.now();
let scene;
let camera;
let renderer;
let orbitControls;
let stats;
let solarSystem;

let followObject;
const followObjectWorldPosition = new THREE.Vector3();

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function init() {
  scene = new THREE.Scene();

  const axisHelper = new THREE.AxisHelper(1000);
  scene.add(axisHelper);

  solarSystem = new SolarSystem();

  const sol = createStar(model);
  solarSystem.addBody(sol);

  scene.add(solarSystem);

  // console.log(sol.children);
  // followObject = sol.children[9];

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, -100000, 100000);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  if (!followObject) {
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  }

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
}

function update() {
  const time = Date.now();
  const delta = time - prevTime;
  prevTime = time;
  solarSystem.update(delta);
  stats.update();
  if (!followObject) {
    orbitControls.update();
  } else {
    followObject.getWorldPosition(followObjectWorldPosition);
    camera.position.set(followObjectWorldPosition.x, followObjectWorldPosition.y, 5000);
    camera.lookAt(followObjectWorldPosition);
  }
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
