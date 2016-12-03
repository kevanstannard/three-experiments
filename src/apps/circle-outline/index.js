// See:
// https://github.com/mrdoob/three.js/wiki/Drawing-lines

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
let line;
let controls;

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

  material = new THREE.LineBasicMaterial({ color: 0xffff00 });

  geometry = new THREE.Geometry();

  const radius = 50;
  const segments = 32;
  const thetaStart = 0;
  const thetaLength = (2 * Math.PI) * (1 / 2);

  const delta = ((thetaStart + thetaLength) - thetaStart) / segments;
  for (let i = 0; i <= segments; i += 1) {
    const angle = thetaStart + (delta * i);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    geometry.vertices.push(new THREE.Vector3(x, y, 0));
  }

  line = new THREE.Line(geometry, material);
  scene.add(line);

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
