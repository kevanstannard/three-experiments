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
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(10, 10, 10);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  // const gridHelper = new THREE.GridHelper(100, 10);
  // scene.add(gridHelper);

  // const axisHelper = new THREE.AxisHelper(1);
  // scene.add(axisHelper);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  // LineGeometry with THREE.Line
  const geometry1 = new THREE.CircleGeometry(4, 64);
  geometry1.vertices.shift();
  const material1 = new THREE.LineBasicMaterial({ color: 0x4375B6 });
  const line1 = new THREE.Line(geometry1, material1);
  line1.position.set(-5, 0, 0);
  scene.add(line1);

  // LineGeometry with THREE.Mesh
  const geometry2 = new THREE.CircleGeometry(4, 64);
  geometry2.vertices.shift();
  const material2 = new THREE.LineBasicMaterial({ color: 0x4375B6 });
  const line2 = new THREE.Mesh(geometry2, material2);
  line2.position.set(5, 0, 0);
  scene.add(line2);
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
