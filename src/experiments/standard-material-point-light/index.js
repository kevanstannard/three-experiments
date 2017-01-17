const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
// let axisHelper;
// let gridHelper;
let orbitControls;
let pointLight;
let pointLightHelper;
let ambientLight;
let material;
let geometry;
let mesh;
let controls;
let stats;
let bumpTexture;

const textureLoader = new THREE.TextureLoader();

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
    metalness: 0,
    roughness: 0,
    distance: 10,
    bumpMap: false,
  };
  const gui = new dat.GUI();
  gui.add(controls, 'metalness', 0, 1);
  gui.add(controls, 'roughness', 0, 1);
  gui.add(controls, 'distance', 10, 50);
  gui.add(controls, 'bumpMap');
}

function init() {
  scene = new THREE.Scene();

  // gridHelper = new THREE.GridHelper(100, 10);
  // scene.add(gridHelper);

  // axisHelper = new THREE.AxisHelper(100);
  // scene.add(axisHelper);

  geometry = new THREE.BoxGeometry(100, 10, 100);
  material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  textureLoader.load('../../assets/textures/bump/stone-001-500x500.jpg', (texture) => {
    bumpTexture = texture;
  });

  ambientLight = new THREE.AmbientLight(0xffffff, 0.03);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 200);
  scene.add(pointLight);

  pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
  scene.add(pointLightHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(100, 100, 100);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
  initControls();
}

function update() {
  const t = new Date().getTime() / 1000;
  const x = Math.sin(t) * controls.distance;
  const y = controls.distance;
  const z = Math.cos(t) * controls.distance;

  pointLight.position.x = x;
  pointLight.position.y = y;
  pointLight.position.z = z;

  material.metalness = controls.metalness;
  material.roughness = controls.roughness;

  if (controls.bumpMap && !material.bumpMap) {
    material.bumpMap = bumpTexture;
    material.needsUpdate = true;
  } else if (!controls.bumpMap && material.bumpMap) {
    material.bumpMap = null;
    material.needsUpdate = true;
  }

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
