// Textures:
// http://www.humus.name/index.php?page=Textures

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let axisHelper;
let gridHelper;
let orbitControls;
let pointLight;
let ambientLight;
let mesh;
let controls;
let stats;
const skyboxes = {};

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
    skybox: 'langholmen',
  };
  const gui = new dat.GUI();
  gui.add(controls, 'skybox', ['sky', 'langholmen']);
}

function skyboxUrl(id, type) {
  return `../../assets/textures/skybox/${id}/${type}.jpg`;
}

function skyboxUrls(id) {
  return [
    skyboxUrl(id, 'posx'), skyboxUrl(id, 'negx'),
    skyboxUrl(id, 'posy'), skyboxUrl(id, 'negy'),
    skyboxUrl(id, 'posz'), skyboxUrl(id, 'negz'),
  ];
}

function skybox(id) {
  const urls = skyboxUrls(id);
  const box = new THREE.CubeTextureLoader().load(urls);
  box.format = THREE.RGBFormat;
  return box;
}

function init() {
  skyboxes.sky = skybox('sky');
  skyboxes.langholmen = skybox('langholmen');

  scene = new THREE.Scene();
  scene.background = skyboxes.langholmen;

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
  initControls();
}

function update() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  mesh.rotation.z += 0.01;
  scene.background = skyboxes[controls.skybox];
  stats.update();
  orbitControls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
