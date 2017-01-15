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
let pointLight;
let ambientLight;
// let mesh;
// let controls;
let stats;

const boxSize = 50;

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

function init() {
  scene = new THREE.Scene();

  // gridHelper = new THREE.GridHelper(100, 10);
  // scene.add(gridHelper);

  // axisHelper = new THREE.AxisHelper(50);
  // scene.add(axisHelper);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
  scene.add(ambientLight);

  for (let x = 0; x <= 2; x += 1) {
    const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      // side: THREE.BackSide,
      metalness: 0,
      roughness: 1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (x - 1) * boxSize;
    scene.add(mesh);
  }

  // for (let z = 0; z <= 2; z += 1) {
  //   const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  //   const material = new THREE.MeshStandardMaterial({
  //     color: 0xffffff,
  //     // side: THREE.BackSide,
  //     metalness: 0,
  //     roughness: 1,
  //   });
  //   const mesh = new THREE.Mesh(geometry, material);
  //   mesh.position.x = -boxSize * 2;
  //   mesh.position.z = boxSize + (z - 1) * boxSize;
  //   scene.add(mesh);
  // }

  pointLight = new THREE.PointLight(0xffff00, 1, boxSize * 2);
  pointLight.position.set(0, 0, boxSize);
  scene.add(pointLight);

  const sphereSize = 1;
  const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
  scene.add(pointLightHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, boxSize * 2, boxSize * 4);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.target = origin;

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
}

let angle = 0;

function update() {
  angle += 0.01;
  pointLight.position.x = Math.sin(angle) * boxSize;
  stats.update();
  orbitControls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
