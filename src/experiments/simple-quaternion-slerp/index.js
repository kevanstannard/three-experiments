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
let object;
let fromRotation;
let toRotation;

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
  camera.position.set(3, 5, 6);
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

  object = new THREE.Object3D();

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  object.add(mesh);

  const vector = new THREE.Vector3(0, 0, 1);

  const arrow = new THREE.ArrowHelper(
    vector.clone().normalize(),
    mesh.position,
    vector.length(),
    0xffffff,
  );

  object.add(arrow);

  scene.add(object);

  fromRotation = new THREE.Quaternion();
  fromRotation.copy(object.quaternion);

  toRotation = new THREE.Quaternion();
  const axisNormalised = new THREE.Vector3(1, 1, 1).normalize();
  const angle = Math.PI;
  toRotation.setFromAxisAngle(axisNormalised, angle);

  const axisArrow = new THREE.ArrowHelper(
    axisNormalised.clone(),
    mesh.position,
    axisNormalised.length() * 2,
    0xffff00,
  );
  scene.add(axisArrow);
}

let angle = 0;

function update() {
  const percent = Math.abs(Math.sin(angle));
  angle += 0.01;

  THREE.Quaternion.slerp(fromRotation, toRotation, object.quaternion, percent);

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
