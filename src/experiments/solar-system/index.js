import { ONE_MILLION } from './lib/constants';

import Moon from './objects/moon';
import Mercury from './objects/mercury';
import Venus from './objects/venus';
import Earth from './objects/earth';
import Mars from './objects/mars';
import Jupiter from './objects/jupiter';
import Saturn from './objects/saturn';
import Uranus from './objects/uranus';
import Neptune from './objects/neptune';
import Sol from './objects/sol';
import SolarSystem from './objects/solar-system';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 50000000;

let prevTime = Date.now();
let scene;
let camera;
let renderer;
let orbitControls;
let stats;
let solarSystem;

let followObject;
const followObjectWorldPosition = new THREE.Vector3();

const bodies = {};

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

  bodies.mercury = new Mercury();
  bodies.venus = new Venus();

  bodies.earth = new Earth();
  bodies.moon = new Moon({
    color: 0xffffff,
    radius: 1737,
    orbitRadius: 384000,
    orbitPeriod: 27,
  });
  bodies.earth.addMoon(bodies.moon);

  bodies.mars = new Mars();

  bodies.jupiter = new Jupiter();
  bodies.ganymede = new Moon({
    color: 0xffffff,
    radius: 5262 / 2,
    orbitRadius: 1.070 * ONE_MILLION,
    orbitPeriod: 7,
  });
  bodies.jupiter.addMoon(bodies.ganymede);
  bodies.callisto = new Moon({
    color: 0xffffff,
    radius: 4821 / 2,
    orbitRadius: 1.8827 * ONE_MILLION,
    orbitPeriod: 17,
  });
  bodies.jupiter.addMoon(bodies.callisto);
  bodies.io = new Moon({
    color: 0xffffff,
    radius: 3660 / 2,
    orbitRadius: 0.422 * ONE_MILLION,
    orbitPeriod: 1.7691,
  });
  bodies.jupiter.addMoon(bodies.io);

  bodies.saturn = new Saturn();

  bodies.uranus = new Uranus();

  bodies.neptune = new Neptune();

  bodies.sol = new Sol();
  bodies.sol.addPlanet(bodies.mercury);
  bodies.sol.addPlanet(bodies.venus);
  bodies.sol.addPlanet(bodies.earth);
  bodies.sol.addPlanet(bodies.mars);
  bodies.sol.addPlanet(bodies.jupiter);
  bodies.sol.addPlanet(bodies.saturn);
  bodies.sol.addPlanet(bodies.uranus);
  bodies.sol.addPlanet(bodies.neptune);

  solarSystem = new SolarSystem();

  solarSystem.addBody(bodies.sol);

  scene.add(solarSystem);

  followObject = bodies.moon;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

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
    camera.position.set(
      followObjectWorldPosition.x,
      followObjectWorldPosition.y,
      2000000,
    );
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
