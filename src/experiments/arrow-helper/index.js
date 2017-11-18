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
let stats;

const origin = new THREE.Vector3();

function initStats() {
  stats = new Stats('bottomLeft');
  stats.dom.style.position = 'absolute';
  stats.dom.style.left = '0px';
  stats.dom.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function renderVectors(vectors) {
  const prevVector = origin;
  for (let i = 0; i < vectors.length; i += 1) {
    const currVector = vectors[i];
    const currVectorNormal = currVector.clone().normalize();
    const arrow = new THREE.ArrowHelper(currVectorNormal, prevVector, currVector.length());
    scene.add(arrow);
    prevVector.add(currVector);
  }
}

function randomNumberInRange(min, max) {
  const scale = max - min;
  const offset = min;
  return Math.random() * scale + offset;
}

function randomNumber() {
  return randomNumberInRange(-20, 20);
}

function randomVector() {
  return new THREE.Vector3(
    randomNumber(),
    randomNumber(),
    randomNumber(),
  );
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

  const gridHelper = new THREE.GridHelper(200, 10);
  scene.add(gridHelper);

  const axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  const numberOfVectors = 50;
  const vectors = [];
  for (let n = 1; n <= numberOfVectors; n += 1) {
    const vector = randomVector();
    vectors.push(vector);
  }

  renderVectors(vectors);
}

function update() {
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
