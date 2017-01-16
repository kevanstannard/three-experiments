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
// let pointLight;
// let ambientLight;
// let mesh;
// let controls;
let stats;
// let light;
const lights = [];

const origin = new THREE.Vector3(0, 0, 0);

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

function PlaneWithLight(options = {}) {
  THREE.Object3D.call(this);

  const geometry = new THREE.PlaneBufferGeometry(40, 40);
  const material = new THREE.MeshStandardMaterial(options.material);
  this.plane = new THREE.Mesh(geometry, material);
  this.add(this.plane);

  this.pointLight = new THREE.PointLight(0xffffff, 1, 100);
  this.add(this.pointLight);

  this.pointLightHelper = new THREE.PointLightHelper(this.pointLight, 1);
  // this.add(this.pointLightHelper);
}

PlaneWithLight.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
  constructor: PlaneWithLight,
  update() {
    const t = (new Date()).getTime() / 1000;
    const z = 20 + Math.sin(t) * 10;
    this.pointLight.position.set(0, 0, z);
  },
});

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  const light1 = new PlaneWithLight({
    material: { metalness: 0 },
  });
  light1.position.x = -50;
  lights.push(light1);
  scene.add(light1);

  const light2 = new PlaneWithLight({
    material: { metalness: 1 },
  });
  light2.position.x = 50;
  lights.push(light2);
  scene.add(light2);

  // const geometry = new THREE.PlaneBufferGeometry(20, 20);
  // const material = new THREE.MeshStandardMaterial();
  // const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  // const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  // pointLight.position.set(0, 0, 50);
  // scene.add(pointLight);

  // const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
  // scene.add(pointLightHelper);

  // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  // scene.add(ambientLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(100, 100, 100);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
  // initControls();
}

function update() {
  // mesh.rotation.set(
  //   mesh.rotation.x = controls.xRotation,
  //   mesh.rotation.y = controls.yRotation,
  //   mesh.rotation.z = controls.zRotation,
  // );
  lights.forEach(light => light.update());
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
