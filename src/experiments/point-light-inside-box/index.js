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
// let ambientLight;
// let mesh;
// let controls;
let stats;
let boxWidth;
let boxHeight;
let boxDepth;

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

  // axisHelper = new THREE.AxisHelper(10);
  // scene.add(axisHelper);

  // const backWallGeometry = new THREE.PlaneBufferGeometry(40, 40);
  // const backWallMaterial = new THREE.MeshLambertMaterial({
  //   color: 0xffffff,
  //   side: THREE.DoubleSide,
  // });
  // const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
  // backWall.position.set(10, 10, -10);
  // scene.add(backWall);

  // const rightWallGeometry = new THREE.PlaneBufferGeometry(40, 40);
  // const rightWallMaterial = new THREE.MeshLambertMaterial({
  //   color: 0xffffff,
  //   side: THREE.DoubleSide,
  // });
  // const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
  // rightWall.rotation.y = Math.PI / 2;
  // rightWall.position.set(-10, 10, 10);
  // scene.add(rightWall);

  // const bottomWallGeometry = new THREE.PlaneBufferGeometry(40, 40);
  // const bottomWallMaterial = new THREE.MeshLambertMaterial({
  //   color: 0xffffff,
  //   side: THREE.DoubleSide,
  // });
  // const bottomWall = new THREE.Mesh(bottomWallGeometry, bottomWallMaterial);
  // bottomWall.rotation.x = -Math.PI / 2;
  // bottomWall.position.set(10, -10, 10);
  // scene.add(bottomWall);

  // const geometry = new THREE.BoxGeometry(400, 400, 400);
  // const material = new THREE.MeshLambertMaterial({
  //   color: 0xffffff,
  //   // side: THREE.DoubleSide,
  // });
  // const room = new THREE.Mesh(geometry, material);
  // scene.add(room);

  // ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  // scene.add(ambientLight);

  boxWidth = 400;
  boxHeight = 200;
  boxDepth = 400;

  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  pointLight = new THREE.PointLight(0xffff00, 2, boxDepth);
  // pointLight.position.set(0, 180, 0);
  scene.add(pointLight);

  // var pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
  // pointLight.position.set( 10, 10, 10 );
  // scene.add( pointLight );

  const sphereSize = 1;
  const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
  scene.add(pointLightHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 0, -boxDepth / 2);
  // camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.target = origin;

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
  // initControls();
}

let angle = 0;

function update() {
  // mesh.rotation.set(
  //   mesh.rotation.x = controls.xRotation,
  //   mesh.rotation.y = controls.yRotation,
  //   mesh.rotation.z = controls.zRotation,
  // );
  angle += 0.01;
  const x = Math.sin(angle) * boxWidth / 3;
  const z = Math.sin(angle) * boxDepth / 3;
  pointLight.position.set(x, 0, z);

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
