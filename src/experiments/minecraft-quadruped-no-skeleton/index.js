import data from './cow';

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
let parts;

// class Pivot extends THREE.SphereGeometry {
//   constructor() {
//     const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
//     const geometry = new THREE.SphereGeometry(0.5, 8, 8);
//     super(geometry, material);
//     return this;
//   }
// }

function Pivot() {
  const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
  const geometry = new THREE.SphereGeometry(0.5, 8, 8);
  THREE.Mesh.call(this, geometry, material);
}

Pivot.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
  constructor: Pivot,
});

// const p = new Pivot();
// console.log(p);

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
  camera.position.set(30, 30, -30);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.target = new THREE.Vector3(0, 15, 0);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  const axisHelper = new THREE.AxisHelper(10);
  scene.add(axisHelper);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
  });

  const model = new THREE.Object3D();

  parts = [];

  data.bones.forEach((bone) => {
    const pivot = bone.pivot;
    const part = new THREE.Object3D();
    part.name = bone.name;
    part.position.set(pivot[0], pivot[1], pivot[2]);
    part.add(new Pivot());
    parts.push(part);
    bone.cubes.forEach((dataCube) => {
      const size = dataCube.size;
      const origin = dataCube.origin;
      const width = size[0];
      const height = size[1];
      const depth = size[2];
      const xoff = width / 2;
      const yoff = height / 2;
      const zoff = depth / 2;
      const x = (origin[0] + xoff) - pivot[0];
      const y = (origin[1] + yoff) - pivot[1];
      const z = (origin[2] + zoff) - pivot[2];
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const box = new THREE.Mesh(geometry, material);
      box.position.set(x, y, z);
      part.add(box);
    });
    model.add(part);
  });

  scene.add(model);

  // Fix body rotation
  parts[0].rotation.x = -Math.PI / 2;
}

function update() {
  const time = Date.now() * 0.002;
  const angle = Math.sin(time);

  parts[1].rotation.y = (Math.PI * angle) / 8; // Head
  parts[2].rotation.x = (Math.PI * angle) / 16; // Leg 0
  parts[3].rotation.x = -(Math.PI * angle) / 16; // Leg 1
  parts[4].rotation.x = (Math.PI * angle) / 16; // Leg 2
  parts[5].rotation.x = -(Math.PI * angle) / 16; // Leg 3

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
