const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let camera;
let scene;
let renderer;
let origin;
let orbitControls;
let rectLight;
let rectLightHelper;

function init() {
  origin = new THREE.Object3D();

  renderer = new THREE.WebGLRenderer();

  // camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 20000);
  // camera.position.set(0, 20, 45);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 20, 45);
  camera.lookAt(origin.position);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  scene = new THREE.Scene();

  rectLight = new THREE.RectAreaLight(0xFFFFFF, undefined, 2, 10);
  rectLight.matrixAutoUpdate = true;
  rectLight.intensity = 80.0;
  rectLight.position.set(5, 5, 0);

  rectLightHelper = new THREE.RectAreaLightHelper(rectLight);
  rectLight.add(rectLightHelper);

  scene.add(camera);
  scene.add(origin);
  scene.add(rectLight);

  document.body.appendChild(renderer.domElement);
}

function render() {
  rectLightHelper.update();
  renderer.render(scene, camera);
}

function update() {
  const t = (Date.now() / 1000);
  const r = 15.0;
  const lx = r * Math.cos(t);
  const lz = r * Math.sin(t);
  const ly = 5.0 + 5.0 * Math.sin(t / 3.0);
  rectLight.position.set(lx, ly, lz);
  rectLight.lookAt(origin.position);
  rectLight.updateMatrixWorld();
  orbitControls.update();
}

function tick() {
  update();
  render();
  requestAnimationFrame(tick);
}

init();
tick();
