// References
// https://github.com/mrdoob/three.js/tree/master/examples/fonts

import { loadFonts } from '../../lib/fonts';

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
let fonts;

const origin = new THREE.Vector3(0, 0, 0);

const FONT_SIZE = 36;

function createText(text, fontId) {
  const params = {
    font: fonts[fontId],
    size: FONT_SIZE,
    height: 1, // Thickness
  };
  const geometry = new THREE.TextGeometry(text, params);
  const material = new THREE.MeshLambertMaterial({ color: 0x888888 });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function load() {
  return loadFonts()
    .then((theFonts) => {
      fonts = theFonts;
    });
}

function init() {
  scene = new THREE.Scene();

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  const lineHeight = FONT_SIZE;

  const one = createText('one', 'gentilis_regular', 0xff0000);
  one.position.y = lineHeight * 2;
  scene.add(one);

  const two = createText('two', 'helvetiker_regular', 0x00ff00);
  two.position.y = lineHeight * 1;
  scene.add(two);

  const three = createText('three', 'optimer_regular', 0x0000ff);
  three.position.y = lineHeight * 0;
  scene.add(three);

  ambientLight = new THREE.AmbientLight(0x888888);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 2, 1000);
  pointLight.position.set(100, 100, 100);
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

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

load().then(() => {
  init();
  animate();
});
