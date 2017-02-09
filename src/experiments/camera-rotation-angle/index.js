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
let labelEl;

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

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.autoRotate = true;
  orbitControls.autoRotateSpeed = -2.0;

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  const gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  const axisHelper = new THREE.AxisHelper(50);
  scene.add(axisHelper);

  camera.position.set(0, 50, 100);
  camera.lookAt(origin);

  labelEl = document.createElement('div');
  labelEl.style.position = 'absolute';
  labelEl.style.width = '50px';
  labelEl.style.padding = '10px';
  labelEl.style.backgroundColor = '#333333';
  labelEl.style.color = 'white';
  labelEl.style.top = '120px';
  labelEl.style.left = '0px';
  labelEl.style.textAlign = 'center';
  document.body.appendChild(labelEl);

  // Ref:
  // http://stackoverflow.com/questions/42089919/three-js-camera-rotation-y-to-360-degrees-conversion/42112495?noredirect=1#comment71441294_42112495
  //
  // If you set
  //
  // camera.rotation.order = "YXZ"
  //
  // ( the default is "XYZ" ) the Euler angles will make a lot more sense to you:
  //
  // rotation.y will be the camera heading in radians
  //
  // rotation.x will be the camera pitch in radians
  //
  // rotation.z will be the camera roll in radians
  //
  // The rotations will be applied in that order.
  //
  // For more information, see this stackoverflow answer.
  //
  // http://stackoverflow.com/questions/17517937/three-js-camera-tilt-up-or-down-and-keep-horizon-level/17518092#17518092

  camera.rotation.order = 'YXZ';
}

function update() {
  const heading = camera.rotation.y;
  const radians = heading > 0
    ? heading
    : (2 * Math.PI) + heading;
  const degrees = THREE.Math.radToDeg(radians);
  labelEl.innerHTML = Math.floor(degrees);

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
