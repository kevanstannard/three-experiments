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
// let pointLight;
// let ambientLight;
let mesh;
let stats;

// const origin = new THREE.Vector3(0, 0, 0);

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
  camera.position.set(0, 0, -300);
  // camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  // gridHelper = new THREE.GridHelper(100, 10);
  // scene.add(gridHelper);

  // axisHelper = new THREE.AxisHelper(100);
  // scene.add(axisHelper);

  const geometry = new THREE.SphereBufferGeometry(
    100,    // radius
    32,     // width segments
    32,     // height segments
  );
  const material = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,

  });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // const pointLight1 = new THREE.PointLight(0xffffff, 2, 500);
  // pointLight1.position.set(200, 200, 200);
  // scene.add(pointLight1);

  // const pointLight2 = new THREE.PointLight(0xffffff, 1, 500);
  // pointLight2.position.set(-200, -200, -200);
  // scene.add(pointLight2);

  const loader = new THREE.TextureLoader();
  loader.load('../../assets/textures/sphere/earth.jpg', (texture) => {
    material.map = texture;
    material.needsUpdate = true;
  });
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
