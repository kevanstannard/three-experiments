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

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('../../assets/textures/misc/free.jpg', (t1) => {
    textureLoader.load('../../assets/textures/misc/uv_grid_sm.jpg', (t2) => {
      const geometry = new THREE.BoxGeometry(3, 3, 3);

      // geometry.vertices.forEach((vertex) => {
      //   vertex.normalize().multiplyScalar(1);
      // });

      geometry.faces.forEach((face) => {
        face.materialIndex %= 2;
      });

      // Disable eslint so the collowing code can be used in
      // a stack overflow answer
      /* eslint-disable */
      // for (var i = 0; i < geometry.faces.length; i += 1) {
      //   var face = geometry.faces[i];
      //   face.materialIndex = face.materialIndex % 2;
      // }
      /* eslint-enable */

      const mat1 = new THREE.MeshLambertMaterial({ map: t1 });
      const mat2 = new THREE.MeshLambertMaterial({ map: t2 });

      const materials = [mat1, mat2];
      const mats = new THREE.MultiMaterial(materials);

      const cube = new THREE.Mesh(geometry, mats);

      scene.add(cube);
    });
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
