import TetrahedronLattice from './TetrahedronLattice';

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
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function init() {
  const lattice = new TetrahedronLattice();
  console.log(lattice);

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

  const axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  const radius = 10;

  for (let i = -1; i <= 2; i += 1) {
    const gridHelperH = new THREE.GridHelper(radius * 6, 3);
    gridHelperH.position.set(radius, i * radius * 2, radius);
    scene.add(gridHelperH);
    const gridHelperV = new THREE.GridHelper(radius * 6, 3);
    gridHelperV.position.set(radius, radius, i * radius * 2);
    gridHelperV.rotation.set(Math.PI / 2, 0, 0);
    scene.add(gridHelperV);
  }

  // const geometry = new THREE.BoxGeometry(radius * 2, radius * 2, radius * 2);
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  function addSphere(x, y, z) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x * radius * 2, y * radius * 2, z * radius * 2);
    scene.add(mesh);
    // lattice.add(mesh);
  }

  addSphere(1, 0, 0);
  addSphere(-1, 0, 0);
  addSphere(0, 1, 0);
  addSphere(0, -1, 0);
  addSphere(0, 0, 1);
  addSphere(0, 0, -1);

  addSphere(1, -1, 0);
  addSphere(-1, 1, 0);

  addSphere(1, 0, -1);
  addSphere(-1, 0, 1);

  addSphere(0, 1, -1);
  addSphere(0, -1, 1);
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
