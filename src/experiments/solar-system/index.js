import Moon from './objects/moon';
import Mercury from './objects/mercury';
import Venus from './objects/venus';
import Earth from './objects/earth';
import Sol from './objects/sol';
import SolarSystem from './objects/solar-system';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 5000000;
const SCALE = 0.005;

let prevTime = Date.now();
let scene;
let camera;
let renderer;
let orbitControls;
let stats;
let solarSystem;
let followObject;

const origin = new THREE.Vector3(0, 0, 0);

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

  const mercury = new Mercury();
  const venus = new Venus();

  const moon = new Moon({
    color: 0xffffff,
    radius: 1737,
    orbitRadius: 384000,
    orbitPeriod: 27,
  });
  const earth = new Earth();
  earth.addMoon(moon);

  const sol = new Sol();
  sol.addPlanet(mercury);
  sol.addPlanet(venus);
  sol.addPlanet(earth);

  solarSystem = new SolarSystem();
  solarSystem.scale.set(SCALE, SCALE, SCALE);

  solarSystem.addBody(sol);

  scene.add(solarSystem);

  // followObject = mercury;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, -40000, 20000);
  camera.lookAt(origin);

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
    camera.position.set(followObject.position.x * SCALE, followObject.position.y * SCALE, 2000);
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
