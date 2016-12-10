// Reference:
// http://stackoverflow.com/questions/15331358/three-js-get-object-size-with-respect-to-camera-and-object-position-on-screen

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
let boxGeometry;
let boxMaterial;
let boxMesh;
let planeGeometry;
let planeMaterial;
let planeMesh;
let controls;
let ambientLight;

const origin = new THREE.Vector3(0, 0, 0);
const fov = VIEW_ANGLE * (Math.PI / 180);

const BOX_SIZE = 20;
const BOX_SCALE = 0.25;

const PLANE_SIZE = 20;
const PLANE_SCALE = 0.2;

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(50, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(50);
  scene.add(axisHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(100, 100, 100);
  camera.lookAt(origin);

  boxGeometry = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
  boxMaterial = new THREE.MeshNormalMaterial();
  boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(boxMesh);

  planeGeometry = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 32);
  planeMaterial = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
  planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.position.set(-50, 0, -50);
  scene.add(planeMesh);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function resetMeshSize(mesh, meshSize, meshScale) {
/*
        Cam
        | \
        |  \
        |   \
      Obj1   \
              \
               \
              Obj2

  Obj1 size = 10
  Obj2 size = 20

  Distance Cam to Obj1 = 30
  Distance Cam to Obj2 = 60

  tan(theta/2) = radius / distance
  radius = tan(theta/2) * distance
  size = 2 * tan(theta/2) * distance

  Examples:

    View Angle = 45
    FOV = 0.7853981634

    Mesh Size  10     20
    Distance   30     60
    Size       24.85  49.71
    Scale      2.49   2.49

*/

  // Determine the distance of the camera to the object
  const distance = camera.position.distanceTo(mesh.position);

  // Calculate a stanard size based on the object distance.
  // We want to scale all objects at this distance to this size.
  const standardSize = 2 * Math.tan(fov / 2) * distance;

  // We want our object to remain the same size relative to the current
  // standard size.
  //
  // For example:
  //   Suppose the standard size is 100, and object size is 20
  //   then the ratio (or scale) = 100 / 20 = 5.0
  //
  //   Suppose the standard size changes to 200 (due to the camera moving away),
  //   and object size is 20, then the ratio (or scale) = 200 / 20 = 10.0
  //
  // But this scale value will just standardise the object size
  // so that it fills the screen.
  //
  // For example:
  //   With standard size 100, object size 20 then
  //     scale = 100 / 20 = 5.0
  //
  //   When we scale our object, we get it's new size
  //     size = 20 * 5.0 = 100
  //
  //   So our object is now the same size as the standard
  //
  // Lastly we need a scale value to convert the object back to a standard size.

  const scale = (standardSize / meshSize) * meshScale;
  mesh.scale.set(scale, scale, scale);
}

function update() {
  planeMesh.rotation.x += 0.005;
  planeMesh.rotation.y += 0.005;

  resetMeshSize(boxMesh, BOX_SIZE, BOX_SCALE);
  resetMeshSize(planeMesh, PLANE_SIZE, PLANE_SCALE);

  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
