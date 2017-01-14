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
let guiControls;
let pointLight;
let fog;

const origin = new THREE.Vector3(0, 0, 0);

function initControls() {
  guiControls = {
    fogEnabled: true,
    fogNear: 1,
    fogFar: 500,
  };
  const gui = new dat.GUI();
  gui.add(guiControls, 'fogEnabled');
  gui.add(guiControls, 'fogNear', 1, 500);
  gui.add(guiControls, 'fogFar', 1, 500);
}

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  gridHelper = new THREE.GridHelper(500, 20);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(500);
  scene.add(axisHelper);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(100, 100, 100);
  scene.add(pointLight);

  const texture = new THREE.Texture();
  const textureLoader = new THREE.ImageLoader();
  textureLoader.load('../../assets/textures/misc/uv_grid_sm.jpg', (image) => {
    texture.image = image;
    texture.needsUpdate = true;
  });

  const numBoxes = 10;
  const boxSize = 40;
  const delta = Math.PI * 2 / numBoxes;

  let lastBox;

  for (let count = 0; count < 5; count += 1) {
    const radius = (count + 1) * 100;
    for (let angle = 0; angle < Math.PI * 2; angle += delta) {
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const y = 0;
      const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
      const material = new THREE.MeshLambertMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.lookAt(origin);
      scene.add(mesh);
      lastBox = mesh;
    }
  }

  const cameraHeight = boxSize;

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, cameraHeight, 0);
  camera.lookAt(new THREE.Vector3(lastBox.position.x, cameraHeight, lastBox.position.z));

  fog = new THREE.Fog(0xffffff, 1, 300);
  scene.fog = fog;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initControls();
}

function update() {
  camera.rotation.y += 0.001;
  // orbitControls.update();
  if (guiControls.fogEnabled) {
    scene.fog = fog;
    scene.fog.near = guiControls.fogNear;
    scene.fog.far = guiControls.fogFar;
  } else {
    scene.fog = null;
  }
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
