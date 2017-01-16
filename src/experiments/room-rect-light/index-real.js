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
// let gridHelper;
let orbitControls;
// let pointLight;
let ambientLight;
// let mesh;
// let controls;
let stats;
let rectLight;
let rectLightHelper;

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

const origin = new THREE.Vector3(0, 0, 0);
// const origin = new THREE.Object3D();

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

// function initControls() {
//   controls = {
//     xRotation: 0,
//     yRotation: 0,
//     zRotation: 0,
//   };
//   const gui = new dat.GUI();
//   gui.add(controls, 'xRotation', 0, Math.PI * 2);
//   gui.add(controls, 'yRotation', 0, Math.PI * 2);
//   gui.add(controls, 'zRotation', 0, Math.PI * 2);
// }

function init() {
  scene = new THREE.Scene();

  axisHelper = new THREE.AxisHelper(10);
  scene.add(axisHelper);

  // const room = new Room(100, 100, 100);
  // scene.add(room);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  // pointLight = new THREE.PointLight(0xffff00, 1, 100);
  // scene.add(pointLight);
  //
  // const sphereSize = 1;
  // const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
  // scene.add(pointLightHelper);

  // const light = new THREE.RectAreaLight(0xffffff, 1, 50, 50);
  // light.intensity = 80.0;
  // light.position.y = 100;
  // scene.add(light);

  rectLight = new THREE.RectAreaLight(0xFFFFFF, undefined, 2, 10);
  rectLight.matrixAutoUpdate = true;
  rectLight.intensity = 80.0;
  rectLight.position.set(5, 5, 0);
  scene.add(rectLight);

  rectLightHelper = new THREE.RectAreaLightHelper(rectLight);
  rectLight.add(rectLightHelper);

  scene.add(rectLightHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(90, 50, 240);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.target = origin;

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
}

// let angle = 0;

function update() {
  stats.update();
  orbitControls.update();
  // angle += 0.01;
  // const x = 10 + Math.sin(angle) * 10;
  // const y = 10 + Math.cos(angle) * 10;
  // const z = 10 + Math.sin(angle) * 10;
  // pointLight.position.set(x, y, z);

  const t = (Date.now() / 1000);
  const r = 15.0;
  const lx = r * Math.cos(t);
  const lz = r * Math.sin(t);
  const ly = 5.0 + 5.0 * Math.sin(t / 3.0);
  rectLight.position.set(lx, ly, lz);
  rectLight.lookAt(origin);
  rectLight.updateMatrixWorld();

  rectLightHelper.update(); // required
}

// function animate() {
//   requestAnimationFrame(animate);
//   update();
//   renderer.render(scene, camera);
// }

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
