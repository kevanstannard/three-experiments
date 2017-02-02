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

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(50, 50, 50);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  const axisHelper = new THREE.AxisHelper(40);
  scene.add(axisHelper);

  const gridHelper = new THREE.GridHelper(10, 10);
  gridHelper.position.z = 20;
  scene.add(gridHelper);

  console.log(gridHelper);

  const gridHelper2 = gridHelper.clone();
  gridHelper2.position.x = 20;
  scene.add(gridHelper2);
}

function update() {
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
