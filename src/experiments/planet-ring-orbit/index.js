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
let pointLight;
let ambientLight;
let stats;

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

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(100, 100, 100);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  const gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  const axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  const starGeometry = new THREE.SphereGeometry(10, 32, 32);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xCDF409 });
  const starMesh = new THREE.Mesh(starGeometry, starMaterial);
  scene.add(starMesh);

  const planetGeometry = new THREE.SphereGeometry(5, 32, 32);
  const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x09F425 });
  const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
  planetMesh.position.set(20, 30, -40);
  scene.add(planetMesh);

  const radius = starMesh.position.distanceTo(planetMesh.position);
  const ringGeometry = new THREE.CircleGeometry(radius, 32);
  ringGeometry.rotateX(-Math.PI / 2);
  ringGeometry.vertices.shift(); // Remove the line that goes from the center to the ring
  const ringMaterial = new THREE.LineBasicMaterial({ color: 0xCC0000 });
  const ringMesh = new THREE.Line(ringGeometry, ringMaterial);
  scene.add(ringMesh);

  ringMesh.lookAt(planetMesh.position);
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
