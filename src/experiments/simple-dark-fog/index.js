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
// let gridHelper;
// let geometry;
// let material;
// let mesh;
let orbitControls;
let guiControls;
let pointLight;
let ambientLight;
let fog;

const origin = new THREE.Vector3(0, 0, 0);

function initControls() {
  guiControls = {
    fogEnabled: true,
    fogNear: 1,
    fogFar: 1000,
  };
  const gui = new dat.GUI();
  gui.add(guiControls, 'fogEnabled');
  gui.add(guiControls, 'fogNear', 1, 500);
  gui.add(guiControls, 'fogFar', 501, 1500);
}

function init() {
  scene = new THREE.Scene();

  // gridHelper = new THREE.GridHelper(200, 10);
  // scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(200);
  scene.add(axisHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(500, 200, 500);
  camera.lookAt(origin);

  // geometry = new THREE.BoxGeometry(50, 50, 50);
  // material = new THREE.MeshLambertMaterial({ color: 0x888888 });
  // mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 500);
  pointLight.position.set(200, 200, 200);
  scene.add(pointLight);

  const boxSize = 50;
  const gapSize = 40;
  const gridSize = 9;

  const areaSize = (boxSize * gridSize) + (gapSize * (gridSize - 1));
  const start = -(areaSize / 2) + (boxSize / 2);
  const end = (areaSize / 2) + (boxSize / 2);

  for (let x = start; x <= end; x += (boxSize + gapSize)) {
    for (let z = start; z <= end; z += (boxSize + gapSize)) {
      const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
      const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, 0, z);
      scene.add(mesh);
    }
  }

  // const texture = new THREE.Texture();
  // const textureLoader = new THREE.ImageLoader();
  // textureLoader.load('../../assets/textures/misc/uv_grid_sm.jpg', (image) => {
  //   texture.image = image;
  //   texture.needsUpdate = true;
  // });

  // const loader = new THREE.OBJLoader();
  // loader.load('../../assets/objects/minecraft-tree.obj', (object) => {
  //   // object.traverse((child) => {
  //   //   if (child instanceof THREE.Mesh) {
  //   //     child.material.map = texture;
  //   //   }
  //   // });
  //   object.position.set(0, 4, 0);
  //   object.scale.set(0.01, 0.01, 0.01);
  //   scene.add(object);
  //   camera.lookAt(object.position);
  // });

  fog = new THREE.Fog(0x000000, 1, 2000);
  scene.fog = fog;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initControls();
}

function update() {
  orbitControls.update();
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
