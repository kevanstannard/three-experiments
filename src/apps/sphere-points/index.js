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
let geometry;
let material;
let mesh;
let controls;
let pointLight;
let ambientLight;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  geometry = new THREE.SphereGeometry(1, 32, 32);
  material = new THREE.MeshLambertMaterial({ color: 0xffffff });

  // https://en.wikipedia.org/wiki/Spherical_coordinate_system
  // http://stackoverflow.com/questions/969798/plotting-a-point-on-the-edge-of-a-sphere

  const radius = 100;
  const intervals = 10;

  // phi is the angle on the xy plane
  // [0, 2PI]
  const phi0 = Math.PI * (0 / 4);
  const phi1 = Math.PI * (2 / 4);
  const phiDelta = (phi1 - phi0) / intervals;

  // theta is the angle from the z axis
  // [0, PI]
  const theta0 = Math.PI * (0 / 2);
  const theta1 = Math.PI * (2 / 4);
  const thetaDelta = (theta1 - theta0) / intervals;

  // let count = 0;
  for (let phi = phi0; phi <= phi1; phi += phiDelta) {
    for (let theta = theta0; theta <= theta1; theta += thetaDelta) {
      // count += 1;
      // console.log(count);
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      scene.add(mesh);
    }
  }

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

init();
animate();
