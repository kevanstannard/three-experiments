const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let origin;
let direction;
let raycaster;
let controls;
let arrow;
let clock;

const planes = [];

function createPlane(name, z) {
  const geometry = new THREE.PlaneGeometry(10, 10);
  const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = z;
  mesh.name = name;
  planes.push(mesh);
  return mesh;
}

function init() {
  clock = new THREE.Clock();

  scene = new THREE.Scene();

  const gridHelper = new THREE.GridHelper(20, 4);
  scene.add(gridHelper);

  const axisHelper = new THREE.AxisHelper(20);
  scene.add(axisHelper);

  origin = new THREE.Vector3();
  direction = new THREE.Vector3();

  arrow = new THREE.ArrowHelper(direction, origin, 20);
  scene.add(arrow);

  const plane1 = createPlane('Plane 1', 0);
  scene.add(plane1);

  const plane2 = createPlane('Plane 2', -10);
  scene.add(plane2);

  const plane3 = createPlane('Plane 3', -20);
  scene.add(plane3);

  raycaster = new THREE.Raycaster();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(50, 50, -30);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);
}

function updatePlanes() {
  const t = clock.getElapsedTime();
  const x = Math.sin(t);
  const z = Math.cos(t);
  direction.set(x, 0, z).normalize();
  raycaster.set(origin, direction);
  arrow.setDirection(direction);
  planes.forEach(plane => plane.material.color.set(0xffffff));
  const intersections = raycaster.intersectObjects(planes);
  intersections.forEach((intersection) => {
    intersection.object.material.color.set(0xff0000);
  });
}

function update() {
  controls.update();
  updatePlanes();
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
