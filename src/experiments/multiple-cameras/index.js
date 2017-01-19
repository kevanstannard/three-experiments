const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = (SCREEN_WIDTH / 2) / SCREEN_HEIGHT;

let scene;
let camera1;
let camera2;
let renderer1;
let renderer2;
let axisHelper;
let gridHelper;
let orbitControls1;
let orbitControls2;
let pointLight;
let ambientLight;
let mesh;
let controls;
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

function initControls() {
  controls = {
    xRotation: 0,
    yRotation: 0,
    zRotation: 0,
  };
  const gui = new dat.GUI();
  gui.add(controls, 'xRotation', 0, Math.PI * 2);
  gui.add(controls, 'yRotation', 0, Math.PI * 2);
  gui.add(controls, 'zRotation', 0, Math.PI * 2);
}

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffff00, 2, 100);
  scene.add(pointLight);

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 20);
  scene.add(pointLightHelper);

  camera1 = new THREE.PerspectiveCamera(30, ASPECT, 1, 1000);
  camera1.position.set(200, 200, 200);
  camera1.lookAt(origin);

  const cameraHelper = new THREE.CameraHelper(camera1);
  scene.add(cameraHelper);

  camera2 = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, 1, 5000);
  camera2.position.set(2000, 400, 200);
  camera2.lookAt(origin);

  renderer1 = new THREE.WebGLRenderer({ antialias: true });
  renderer1.setSize(SCREEN_WIDTH / 2, SCREEN_HEIGHT);

  renderer2 = new THREE.WebGLRenderer({ antialias: true });
  renderer2.setSize(SCREEN_WIDTH / 2, SCREEN_HEIGHT);

  orbitControls1 = new THREE.OrbitControls(camera1, renderer1.domElement);
  orbitControls2 = new THREE.OrbitControls(camera2, renderer2.domElement);

  THREEx.WindowResize(renderer1, camera1);
  THREEx.WindowResize(renderer2, camera2);

  const container1 = document.createElement('div');
  const container2 = document.createElement('div');

  container1.style.position = 'absolute';
  container1.style.top = '0px';
  container1.style.bottom = '0px';
  container1.style.left = '0px';
  container1.style.right = `${SCREEN_WIDTH / 2 - 1}px`;

  container2.style.position = 'absolute';
  container2.style.top = '0px';
  container2.style.bottom = '0px';
  container2.style.left = `${SCREEN_WIDTH / 2}px`;
  container2.style.right = '0px';

  document.body.appendChild(container1);
  document.body.appendChild(container2);

  container1.appendChild(renderer1.domElement);
  container2.appendChild(renderer2.domElement);

  initStats();
  initControls();
}

function update() {
  const t = new Date().getTime() / 1000;
  pointLight.position.x = 100 * Math.sin(t);
  pointLight.position.z = 100 * Math.cos(t);
  mesh.rotation.set(
    mesh.rotation.x = controls.xRotation,
    mesh.rotation.y = controls.yRotation,
    mesh.rotation.z = controls.zRotation,
  );
  stats.update();
  orbitControls1.update();
  orbitControls2.update();
}

function render() {
  renderer1.render(scene, camera1);
  renderer2.render(scene, camera2);
}

function tick() {
  update();
  render();
  requestAnimationFrame(tick);
}

init();
tick();
