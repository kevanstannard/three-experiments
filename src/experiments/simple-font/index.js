// References
// https://github.com/mrdoob/three.js/tree/master/examples/fonts

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
let controls;
let pointLight;
let ambientLight;

const fonts = {};
const origin = new THREE.Vector3(0, 0, 0);
const fontLoader = new THREE.FontLoader();

function loadFont(fontId) {
  return new Promise((resolve) => {
    const fontUrl = `../../lib/fonts/fonts/${fontId}.typeface.json`;
    fontLoader.load(fontUrl, (font) => {
      fonts[fontId] = font;
      resolve();
    });
  });
}

function load() {
  return loadFont('helvetiker_regular');
}

function init() {
  scene = new THREE.Scene();

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  const params = {
    font: fonts.helvetiker_regular,
    size: 28,
    height: 20, // Thickness
  };
  const textGeometry = new THREE.TextGeometry('three', params);
  const textMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);

  ambientLight = new THREE.AmbientLight(0x888888);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  pointLight.position.set(100, 100, 100);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 0, 200);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

load().then(() => {
  init();
  animate();
});
