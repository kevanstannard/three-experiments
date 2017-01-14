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
let controls;
let pointLight;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(10);
  scene.add(axisHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(3, 3, 3);
  camera.lookAt(origin);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 0);
  pointLight.position.set(100, 200, 300);
  scene.add(pointLight);

  // Notes:
  // * Object is assigned a MeshPhongMaterial
  // * Object faces are single sided

  const loader = new THREE.OBJLoader();
  loader.load('../../assets/objects/blender-box.obj', (object) => {
    scene.add(object);
    camera.lookAt(object.position);
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
