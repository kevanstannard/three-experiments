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
let gridHelper;
let orbitControls;
let stats;
let skeletonHelper;
let bones;
let clock;

const origin = new THREE.Vector3(0, 0, 0);

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function init() {
  clock = new THREE.Clock();

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(10, 10, 10);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);

  // axisHelper = new THREE.AxisHelper(100);
  // scene.add(axisHelper);

  const lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1, 0);
  lights[1] = new THREE.PointLight(0xffffff, 1, 0);
  lights[2] = new THREE.PointLight(0xffffff, 1, 0);

  lights[0].position.set(0, 200, 0);
  lights[1].position.set(100, 200, 100);
  lights[2].position.set(-100, -200, -100);

  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);

  // We have two bones, but this is visually
  // represented as a single line between them

  bones = [];
  const bone1 = new THREE.Bone();
  bone1.position.y = -2;
  bones.push(bone1);

  const bone2 = new THREE.Bone();
  bone2.position.y = 2;
  bone1.add(bone2);
  bones.push(bone2);

  const bone3 = new THREE.Bone();
  bone3.position.y = 2;
  bone2.add(bone3);
  bones.push(bone3);

  const skeleton = new THREE.Skeleton(bones);

  const height = 4;
  const halfHeight = height / 2;
  const heightSegments = 16;
  const segmentHeight = 4 / heightSegments;

  const geometry = new THREE.CylinderGeometry(
    2,      // radiusTop
    2,      // radiusBottom
    height, // height
    4,      // radiusSegments
    heightSegments, // heightSegments
    true,   // openEnded
  );

  // Describe how the geometry vertices are affected by the bones
  geometry.vertices.forEach((vertex) => {
    const y = vertex.y + halfHeight;
    const skinIndex = Math.floor(y / segmentHeight);
    const skinWeight = (y % segmentHeight) / segmentHeight;
    geometry.skinIndices.push(new THREE.Vector4(skinIndex, 0, 0, 0));
    geometry.skinWeights.push(new THREE.Vector4(1 - skinWeight, 0, 0, 0));
  });

  const material = new THREE.MeshStandardMaterial({
    skinning: true,
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    shading: THREE.FlatShading,
  });

  const mesh = new THREE.SkinnedMesh(geometry, material);
  scene.add(mesh);

  mesh.add(bones[0]);
  mesh.bind(skeleton);

  skeletonHelper = new THREE.SkeletonHelper(mesh);
  scene.add(skeletonHelper);
}

function update() {
  const t = clock.getElapsedTime();
  const y = Math.sin(t);
  bones[2].rotation.z = Math.abs(y);
  bones[1].rotation.z = Math.abs(y);
  bones[0].rotation.z = Math.abs(y);
  skeletonHelper.update();
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
