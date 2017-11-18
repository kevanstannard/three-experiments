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

const origin = new THREE.Vector3(0, 0, 0);

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

  const v1 = new THREE.Vector3(-20, 40, 20);
  const v2 = new THREE.Vector3(0, 0, -60);
  const v3 = new THREE.Vector3(100, -20, 50);
  const v4 = new THREE.Vector3(-100, 0, 50);
  const vectors = [v1, v2, v3, v4];
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
