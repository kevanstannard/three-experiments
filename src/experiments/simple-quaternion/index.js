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
  camera.position.set(5, 5, 5);
  camera.lookAt(origin);

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

  // Creating a quaterion with
  // a) the axis pointing along Y
  // b) a rotation of Math.PI / 4
  const quaternion = new THREE.Quaternion();
  const axisNormalised = new THREE.Vector3(0, 1, 0).normalize();
  const angle = Math.PI / 4;
  quaternion.setFromAxisAngle(axisNormalised, angle);

  const beforeVector = new THREE.Vector3(1, 0, 0);

  const afterVector = beforeVector.clone();
  afterVector.applyQuaternion(quaternion);

  // console.log('beforeVector', beforeVector);
  // console.log('afterVector', afterVector);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.quaternion.copy(quaternion);
  scene.add(mesh);

  const beforeArrow = new THREE.ArrowHelper(
    beforeVector.clone().normalize(),
    origin,
    beforeVector.length(),
    0xffff00,
  );
  scene.add(beforeArrow);

  const afterArrow = new THREE.ArrowHelper(
    afterVector.clone().normalize(),
    origin,
    afterVector.length() * 2,
    0xffffff,
  );
  scene.add(afterArrow);
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
