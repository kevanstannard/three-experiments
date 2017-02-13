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
let orbitControls;
let pointLight;
let ambientLight;
let stats;

const origin = new THREE.Vector3(0, 0, 0);

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function loadTextures(urls, callback) {
  const textures = [];
  const onLoad = () => {
    callback(null, textures);
  };
  const onProgress = () => {};
  const onError = (url) => {
    callback(new Error(`Cannot load${url}`));
  };
  const manager = new THREE.LoadingManager(onLoad, onProgress, onError);
  const loader = new THREE.TextureLoader(manager);
  for (let i = 0; i < urls.length; i += 1) {
    textures.push(loader.load(urls[i]));
  }
}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(5, 5, 5);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  const urls = [
    '../../assets/textures/misc/free.jpg',
    '../../assets/textures/misc/uv_grid_sm.jpg',
  ];

  loadTextures(urls, (error, textures) => {
    if (error) {
      console.log(error);
      return;
    }
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    geometry.faces.forEach((face) => {
      face.materialIndex %= 2;
    });
    const mat1 = new THREE.MeshLambertMaterial({ map: textures[0] });
    const mat2 = new THREE.MeshLambertMaterial({ map: textures[1] });
    const materials = [mat1, mat2];
    const mats = new THREE.MultiMaterial(materials);
    const cube = new THREE.Mesh(geometry, mats);
    scene.add(cube);
  });
}

function update() {
  stats.update();
  orbitControls.update();
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
