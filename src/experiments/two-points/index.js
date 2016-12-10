const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

const orbitControlsEnabled = false;

let scene;
let camera;
let renderer;
let axisHelper;
let gridHelper;
let controls;
let pointLight;
let ambientLight;
let height;

// const origin = new THREE.Vector3(0, 0, 0);

function mid(v1, v2) {
  return new THREE.Vector3(
    v1.x + ((v2.x - v1.x) / 2),
    v1.y + ((v2.y - v1.y) / 2),
    v1.z + ((v2.z - v1.z) / 2),
  );
}

const points = {
  from: new THREE.Vector3(-200, -150, 0),
  to: new THREE.Vector3(50, -80, 0),
};

points.mid = mid(points.from, points.to);

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(200, 20);
  gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  const pointGeometry = new THREE.CircleGeometry(2, 32);
  const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const pointFrom = new THREE.Mesh(pointGeometry, pointMaterial);
  pointFrom.position.set(points.from.x, points.from.y, points.from.z);

  const pointTo = new THREE.Mesh(pointGeometry, pointMaterial);
  pointTo.position.set(points.to.x, points.to.y, points.to.z);

  const pointMid = new THREE.Mesh(pointGeometry, pointMaterial);
  pointMid.position.set(points.mid.x, points.mid.y, points.mid.z);

  scene.add(pointFrom);
  scene.add(pointTo);
  scene.add(pointMid);

  const radius = points.from.distanceTo(points.to) / 2;
  const regionGeometry = new THREE.CircleGeometry(radius, 32);
  const regionMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  const region = new THREE.Mesh(regionGeometry, regionMaterial);
  region.position.set(points.mid.x, points.mid.y, points.mid.z);
  scene.add(region);

  height = radius / Math.tan(Math.PI / 8);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(points.mid.x, points.mid.y, height);
  camera.lookAt(points.mid);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(points.mid.x, points.mid.y, points.mid.z);
  controls.enabled = orbitControlsEnabled;

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

// let count = 0;

const difX = points.from.distanceTo(points.to);

const xMin = -difX / 4;
const xMax = difX / 4;

const camDelta = 1;
let camX = 0;
let camDir = 1;

console.log(xMin, xMax, camX);

function update() {
  controls.update();

  camX += (camDelta * camDir);
  // console.log(camX);
  if (camX < xMin) {
    camDir = -camDir;
    camX = xMin + camDir * camDelta;
  } else if (camX > xMax) {
    camDir = -camDir;
    camX = xMax + camDir * camDelta;
  }

  // count += 0.005;
  // const angle = Math.PI * (5 / 8) + Math.sin(count) * Math.PI * (1 / 8);

  // if (angle > angleMax) {
  //   angleDir = -angleDir;
  //   angle += 2 * angleDelta * angleDir;
  // } else if (angle < angleMin) {
  //   angleDir = -angleDir;
  //   angle += 2 * angleDelta * angleDir;
  // }

  // const x = 0; // height * Math.sin(angle);
  // const y = height * Math.cos(angle);
  // const z = height * Math.sin(angle);
  camera.position.set(points.mid.x + camX, points.mid.y - camX, height);
  camera.lookAt(points.mid);
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
