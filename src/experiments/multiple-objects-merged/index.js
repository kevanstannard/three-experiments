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
let ambientLight;

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

  // Create an empty geometry to contain all of our joined geometries
  const thingGeometry = new THREE.Geometry();

  // Set the box size
  const size = 30;

  // Set the "normalised" box positions
  // This is nothing to do with the joining,
  // it just specifies the relative positions of the boxes
  const positions = [
    [0, 0, -1],
    [0, -1, 0],
    [0, 0, 1],
    [-1, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
  ];
  positions.forEach(([x0, y0, z0], index) => {
    // Create a geometry for the child part
    const geometry = index % 2
      ? new THREE.BoxGeometry(size, size, size)
      : new THREE.SphereGeometry(size / 2, 32, 32);

    // Create a translation matrix that moves the box into its relative position
    const x = x0 * size;
    const y = y0 * size;
    const z = z0 * size;
    const translation = new THREE.Matrix4().makeTranslation(x, y, z);
    // Merge the geometry into the parent geometry
    thingGeometry.merge(geometry, translation);
  });

  // Now we can render the merged geometry
  const thingMaterial = new THREE.MeshNormalMaterial();
  thing = new THREE.Mesh(thingGeometry, thingMaterial);

  scene.add(thing);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  pointLight.position.set(100, 100, 100);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  thing.rotation.x += 0.01;
  thing.rotation.y += 0.01;
  thing.rotation.z += 0.01;
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
