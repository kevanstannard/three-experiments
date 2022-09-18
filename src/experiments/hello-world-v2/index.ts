import {
  Vector3,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  GridHelper,
  AxesHelper,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  PointLight,
} from "three";
import dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { windowResize } from "../../libs/windowResize";

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

const origin = new Vector3(0, 0, 0);

const scene = new Scene();

const camera = new PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.set(200, 200, 200);
camera.lookAt(origin);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

const orbitControls = new OrbitControls(camera, renderer.domElement);

windowResize(renderer, camera);

document.body.appendChild(renderer.domElement);

const stats = Stats();
stats.dom.style.position = "absolute";
stats.dom.style.left = "0px";
stats.dom.style.top = "20px";
stats.setMode(0); // 0 === fps, 1 === ms

const statsEl = document.getElementById("stats");
if (statsEl) {
  statsEl.appendChild(stats.domElement);
}

const controls = {
  xRotation: 0,
  yRotation: 0,
  zRotation: 0,
};

const gui = new dat.GUI();
const parentElement = gui.domElement.parentElement;
if (parentElement) {
  parentElement.style.zIndex = "2";
}
gui.add(controls, "xRotation", 0, Math.PI * 2);
gui.add(controls, "yRotation", 0, Math.PI * 2);
gui.add(controls, "zRotation", 0, Math.PI * 2);

const gridHelper = new GridHelper(100, 10);
scene.add(gridHelper);

const axesHelper = new AxesHelper(100);
scene.add(axesHelper);

const geometry = new BoxGeometry(50, 50, 50);
const material = new MeshStandardMaterial({ color: 0xff0000 });
const mesh = new Mesh(geometry, material);
scene.add(mesh);

const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new PointLight(0xffffff, 1, 1000);
pointLight.position.set(50, 200, -100);
scene.add(pointLight);

function update() {
  mesh.rotation.set(
    (mesh.rotation.x = controls.xRotation),
    (mesh.rotation.y = controls.yRotation),
    (mesh.rotation.z = controls.zRotation)
  );
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

tick();
