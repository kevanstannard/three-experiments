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
let orbitControls;
// let ambientLight;
let stats;
let rectLight;
let rectLightHelper;

const origin = new THREE.Vector3(0, 0, 0);

function Wall(width, height) {
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 1,
    side: THREE.DoubleSide,
  });
  const geometry = new THREE.PlaneBufferGeometry(width, height);
  THREE.Mesh.call(this, geometry, material);
}

Wall.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
  constructor: Wall,
});

function Room(width, height, depth) {
  THREE.Object3D.call(this);

  const back = new Wall(width, height);
  back.position.set(0, 0, -depth / 2);
  this.add(back);

  const right = new Wall(depth, height);
  right.rotation.y = Math.PI / 2;
  right.position.set(-width / 2, 0, 0);
  this.add(right);

  const left = new Wall(depth, height);
  left.rotation.y = -Math.PI / 2;
  left.position.set(width / 2, 0, 0);
  this.add(left);

  const bottom = new Wall(width, depth);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.set(0, -height / 2, 0);
  this.add(bottom);

  const top = new Wall(width, depth);
  top.rotation.x = Math.PI / 2;
  top.position.set(0, height / 2, 0);
  this.add(top);
}

Room.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
  constructor: Room,
});

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

  axisHelper = new THREE.AxisHelper(50);
  scene.add(axisHelper);

  // ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  // scene.add(ambientLight);

  const roomSize = 100;
  const room = new Room(roomSize, roomSize, roomSize);
  scene.add(room);

  rectLight = new THREE.RectAreaLight(0xFFFFFF, 1000, 5, 20);
  rectLight.matrixAutoUpdate = true;
  rectLight.position.set(5, 5, 0);

  rectLightHelper = new THREE.RectAreaLightHelper(rectLight);
  rectLight.add(rectLightHelper);

  scene.add(rectLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 0, 200);
  camera.lookAt(origin);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
}

function update() {
  const t = (Date.now() / 1000);
  const r = 15.0;
  const lx = r * Math.cos(t);
  const lz = r * Math.sin(t);
  const ly = 5.0 + 5.0 * Math.sin(t / 3.0);
  rectLight.position.set(lx, ly, lz);
  rectLight.lookAt(origin);
  rectLight.updateMatrixWorld();

  rectLightHelper.update();
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
