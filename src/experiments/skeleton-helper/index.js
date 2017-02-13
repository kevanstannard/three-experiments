const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let orbit;
let stats;
let lights;
let helper;
let bones;
// let skeleton;

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
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(20, 30, 40);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbit = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  // const gridHelper = new THREE.GridHelper(40, 10);
  // scene.add(gridHelper);

  // const axisHelper = new THREE.AxisHelper(2);
  // scene.add(axisHelper);

  lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1);
  lights[1] = new THREE.PointLight(0xffffff, 1);
  // lights[2] = new THREE.PointLight(0xffffff, 1);

  lights[0].position.set(200, 300, 400);
  lights[1].position.set(-200, -300, -400);
  // lights[2].position.set(-400, -500, 500);

  scene.add(lights[0]);
  scene.add(lights[1]);
  // scene.add(lights[2]);

  const bodyBone = new THREE.Bone();

  const headBone = new THREE.Bone();

  const leftShoulderBone = new THREE.Bone();
  const leftHandBone = new THREE.Bone();

  const rightShoulderBone = new THREE.Bone();
  const rightHandBone = new THREE.Bone();

  const leftHipBone = new THREE.Bone();
  const leftFootBone = new THREE.Bone();

  const rightHipBone = new THREE.Bone();
  const rightFootBone = new THREE.Bone();

  bodyBone.position.set(0, 0, 0);

  headBone.position.set(0, 10, 0);

  leftShoulderBone.position.set(6, 6, 0);
  leftHandBone.position.set(0, -6, 0);

  rightShoulderBone.position.set(-6, 6, 0);
  rightHandBone.position.set(0, -6, 0);

  leftHipBone.position.set(2, -6, 0);
  leftFootBone.position.set(0, -6, 0);

  rightHipBone.position.set(-2, -6, 0);
  rightFootBone.position.set(0, -6, 0);

  bodyBone.add(headBone);

  bodyBone.add(leftShoulderBone);
  leftShoulderBone.add(leftHandBone);

  bodyBone.add(rightShoulderBone);
  rightShoulderBone.add(rightHandBone);

  bodyBone.add(leftHipBone);
  leftHipBone.add(leftFootBone);

  bodyBone.add(rightHipBone);
  rightHipBone.add(rightFootBone);

  bones = [];
  bones.push(bodyBone);
  bones.push(headBone);
  bones.push(leftShoulderBone);
  bones.push(leftHandBone);
  bones.push(rightShoulderBone);
  bones.push(rightHandBone);
  bones.push(leftHipBone);
  bones.push(leftFootBone);
  bones.push(rightHipBone);
  bones.push(rightFootBone);

  // Interesting, we don't actually need a skeleton ???
  // skeleton = new THREE.Skeleton(bones);

  helper = new THREE.SkeletonHelper(bodyBone);

  scene.add(helper);
  scene.add(bodyBone);
}

function update() {
  const time = Date.now() * 0.001;
  const angle = Math.sin(time);

  bones[1].rotation.y = (Math.PI * angle) / 8; // Head
  bones[2].rotation.x = (Math.PI * angle) / 4; // Left shoulder
  bones[4].rotation.x = -(Math.PI * angle) / 4; // Right shoulder
  bones[6].rotation.x = -(Math.PI * angle) / 4; // Left hip
  bones[8].rotation.x = (Math.PI * angle) / 4; // Right hip

  helper.update();
  stats.update();
  orbit.update();
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
