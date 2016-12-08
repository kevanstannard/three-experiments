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
let controls;
let pointLight;
let ambientLight;

let sun;
let earth;
let moon;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  // For each body we create
  // 1) a Mesh
  // 2) an Object3D
  //
  // The Object3D is the parent of the mesh
  // The Object3D is the parent of other satellites
  //
  // When we rotate the Object3D it then rotates its satellites
  //
  // We can also undo the rotation on the mesh,
  // (and give it an addtional rotattion)
  // to prevent the mesh simply rotating with the Object3D

  const sunGeometry = new THREE.SphereGeometry(30, 16, 16);
  const sunMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00, wireframe: true });
  const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
  sun = new THREE.Object3D();
  sun.add(sunMesh);
  scene.add(sun);

  const earthGeometry = new THREE.SphereGeometry(10, 16, 16);
  const earthMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff, wireframe: true });
  const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
  earth = new THREE.Object3D();
  earth.add(earthMesh);
  earth.position.x = 80;
  sun.add(earth);

  const moonGeometry = new THREE.SphereGeometry(3, 16, 16);
  const moonMaterial = new THREE.MeshLambertMaterial({ color: 0x888888, wireframe: true });
  const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
  moon = new THREE.Object3D();
  moon.add(moonMesh);
  moon.position.x = 20;
  earth.add(moon);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  sun.rotation.y += 0.01;
  sun.children[0].rotation.y -= (0.01 + 0.001);

  earth.rotation.y += 0.01;
  earth.children[0].rotation.y -= (0.01 + 0.02);

  moon.rotation.y += 0.01;
  moon.children[0].rotation.y -= 0.01;

  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
