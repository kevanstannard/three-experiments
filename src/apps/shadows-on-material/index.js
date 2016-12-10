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
let floor;
let controls;
let redLight;
let blueLight;
let greenLight;

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
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.25;
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

  const loader = new THREE.TextureLoader();
  loader.load('images/green-eye.png', (texture) => {
    const floorGeometry = new THREE.PlaneGeometry(200, 200);
    const floorMaterial = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      map: texture,
      transparent: true,
    });
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    scene.add(floor);
  });

  //
  //
  // BOX
  //
  //

  const boxGeometry = new THREE.BoxGeometry(20, 20, 20);
  const boxMaterial = new THREE.MeshStandardMaterial();
  box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.y = 40;
  box.castShadow = true;
  box.receiveShadow = false;

  scene.add(box);

  //
  //
  // LIGHTS
  //
  //

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  redLight = new THREE.PointLight(0xff0000, 2, 500);
  redLight.castShadow = true;
  redLight.position.set(-50, 100, 50);
  scene.add(redLight);

  blueLight = new THREE.PointLight(0x0000ff, 2, 500);
  blueLight.castShadow = true;
  blueLight.position.set(50, 100, -50);
  scene.add(blueLight);

  greenLight = new THREE.PointLight(0x00ff00, 1, 500);
  greenLight.castShadow = true;
  greenLight.position.set(50, 100, 50);
  scene.add(greenLight);

  //
  //
  // HELPERS
  //
  //

  const sphereSize = 4;

  const redPointLightHelper = new THREE.PointLightHelper(redLight, sphereSize);
  scene.add(redPointLightHelper);

  const redLightShadowHelper = new THREE.CameraHelper(redLight.shadow.camera);
  redLightShadowHelper.material.transparent = true;
  redLightShadowHelper.material.opacity = 0.25;
  scene.add(redLightShadowHelper);

  const bluePointLightHelper = new THREE.PointLightHelper(blueLight, sphereSize);
  scene.add(bluePointLightHelper);

  const blueLightShadowHelper = new THREE.CameraHelper(blueLight.shadow.camera);
  blueLightShadowHelper.material.transparent = true;
  blueLightShadowHelper.material.opacity = 0.25;
  scene.add(blueLightShadowHelper);

  const greenPointLightHelper = new THREE.PointLightHelper(greenLight, sphereSize);
  scene.add(greenPointLightHelper);

  const greenLightShadowHelper = new THREE.CameraHelper(greenLight.shadow.camera);
  greenLightShadowHelper.material.transparent = true;
  greenLightShadowHelper.material.opacity = 0.25;
  scene.add(greenLightShadowHelper);

  //
  //
  // RENDERER
  //
  //

  renderer = new THREE.WebGLRenderer({ antialias: true });
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

const radius = 0.25;
let angle = 0;

function update() {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  box.rotation.z += 0.01;

  if (floor) {
    angle += 0.01;
    floor.rotation.x = (Math.PI / 2) + (radius * Math.cos(angle));
    floor.rotation.y = radius * Math.sin(angle);
    floor.rotation.z += 0.01;
  }

  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
