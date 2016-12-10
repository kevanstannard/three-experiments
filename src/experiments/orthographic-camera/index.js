// See:
// https://www.youtube.com/watch?v=k3adBAnDpos
// http://stackoverflow.com/questions/17558085/three-js-orthographic-camera

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

// View size is how much vertical space to fit in the view
// This is in world coordinates
const VIEW_SIZE = 600;

// The aspect ratio provides information about how wide our view should
// be compared to how tall it should be
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

let scene;
let camera;
let renderer;
let axisHelper;
let gridHelper;
let controls;
let ambientLight;
let light;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(230, 3);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(230);
  scene.add(axisHelper);

  const boxSize = 100;
  const gapSize = 50;
  const gridSize = 3;

  const areaSize = (boxSize * gridSize) + (gapSize * (gridSize - 1));
  const start = -(areaSize / 2) + (boxSize / 2);
  const end = (areaSize / 2) + (boxSize / 2);

  for (let x = start; x <= end; x += (boxSize + gapSize)) {
    for (let z = start; z <= end; z += (boxSize + gapSize)) {
      const height = 1 + (Math.random() * 199);
      const geometry = new THREE.BoxGeometry(100, height, 100);
      const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, height / 2, z);
      scene.add(mesh);
    }
  }

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  light = new THREE.DirectionalLight(0xffffff, 1, 1000);
  light.position.set(100, 300, 600);
  scene.add(light);

  camera = new THREE.OrthographicCamera(
    -(ASPECT_RATIO * VIEW_SIZE) / 2, (ASPECT_RATIO * VIEW_SIZE) / 2,
    VIEW_SIZE / 2, -(VIEW_SIZE / 2),
    -1000, 1000,
  );

  camera.position.set(300, 300, 300);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(origin.x, origin.y, origin.z);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
