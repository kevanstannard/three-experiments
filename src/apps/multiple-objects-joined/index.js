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
let thing;
let controls;
let pointLight;

let angle = 0;
const radius = 40;
const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(100, 100, 100);
  camera.lookAt(origin);

  const material = new THREE.MeshLambertMaterial({ wireframe: false });

  thing = new THREE.Object3D();

  const largeSize = 20;
  const smallSize = largeSize / 4;

  const positions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  positions.forEach(([largePosX, largePosY]) => {
    const largeX = largePosX * largeSize;
    const largeY = largePosY * largeSize;
    const largeGeometry = new THREE.BoxGeometry(largeSize, largeSize, largeSize);
    const largeBox = new THREE.Mesh(largeGeometry, material);
    largeBox.position.set(largeX, largeY, 0);
    thing.add(largeBox);

    positions.forEach(([smallPosX, smallPosY]) => {
      const smallX = smallPosX * smallSize * 2.5;
      const smallY = smallPosY * smallSize * 2.5;
      const smallGeometry = new THREE.SphereGeometry(smallSize, 16, 16);
      const smallBox = new THREE.Mesh(smallGeometry, material);
      smallBox.position.set(smallX, smallY, 0);
      largeBox.add(smallBox);
    });
  });

  scene.add(thing);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(100, 100, 100);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  angle += 0.005;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  const z = 0;
  thing.position.set(x, y, z);
  thing.rotation.x += 0.005;
  thing.rotation.y += 0.005;
  thing.rotation.z += 0.005;

  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
