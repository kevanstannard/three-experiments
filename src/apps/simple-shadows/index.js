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
let box;
// let geometry;
// let material;
// let mesh;
let controls;
let redLight;
let blueLight;
// let ambientLight;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  //
  //
  // SCENE
  //
  //

  scene = new THREE.Scene();

  //
  //
  // GRID HELPER
  //
  //

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  //
  //
  // AXIS HELPER
  //
  //

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  //
  //
  // CAMERA
  //
  //

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  //
  //
  // FLOOR
  //
  //

  const floorGeometry = new THREE.PlaneGeometry(200, 200);
  const floorMaterial = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.1;
  floor.rotation.x = -Math.PI / 2;

  // Indicate which objects can receive shadows
  floor.receiveShadow = true;

  scene.add(floor);

  //
  //
  // BOX
  //
  //

  const boxGeometry = new THREE.BoxGeometry(20, 20, 20);
  const boxMaterial = new THREE.MeshLambertMaterial();
  box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.y = 40;

  // Indicate which objects can cast shadows
  box.castShadow = true;
  box.receiveShadow = false;

  scene.add(box);

  //
  //
  // LIGHTS
  //
  //

  // Indicate the lights that can cast shadows

  redLight = new THREE.PointLight(0xff0000, 1, 500);
  redLight.castShadow = true;
  redLight.position.set(-50, 100, 50);
  scene.add(redLight);

  blueLight = new THREE.PointLight(0x0000ff, 1, 500);
  blueLight.castShadow = true;
  blueLight.position.set(50, 100, -50);
  scene.add(blueLight);

  //
  //
  // HELPERS
  //
  //

  const sphereSize = 4;

  const redPointLightHelper = new THREE.PointLightHelper(redLight, sphereSize);
  scene.add(redPointLightHelper);

  const bluePointLightHelper = new THREE.PointLightHelper(blueLight, sphereSize);
  scene.add(bluePointLightHelper);

  // const redLightShadowHelper = new THREE.CameraHelper(redLight.shadow.camera);
  // scene.add(redLightShadowHelper);

  // const blueLightShadowHelper = new THREE.CameraHelper(blueLight.shadow.camera);
  // scene.add(blueLightShadowHelper);

  //
  //
  // RENDERER
  //
  //

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Enable shadows
  renderer.shadowMap.enabled = true;

  // Antialias the shadows
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  //
  //
  // ORBIT CONTROLS
  //
  //

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  box.rotation.z += 0.01;
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
