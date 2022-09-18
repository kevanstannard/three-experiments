import TWEEN from "@tweenjs/tween.js";
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
  PlaneGeometry,
  MeshBasicMaterial,
  DoubleSide,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

const BOX_SIZE = 1;

const origin = new Vector3(0, 0, 0);

const scene = new Scene();

const camera = new PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.set(BOX_SIZE * 4, BOX_SIZE * 4, BOX_SIZE * 4);
camera.lookAt(origin);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

const orbitControls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

// const gridHelper = new GridHelper(BOX_SIZE * 2, 10);
// scene.add(gridHelper);

const axesHelper = new AxesHelper(BOX_SIZE * 2);
scene.add(axesHelper);

const sides: Mesh[] = [];

var geom = new PlaneGeometry(1, 1);
var side0 = new Mesh(
  geom,
  new MeshBasicMaterial({ color: "white", wireframe: true })
);
scene.add(side0);

var side1Geom = new PlaneGeometry(1, 1);
side1Geom.translate(-0.5, 0, 0);
var side1 = new Mesh(
  side1Geom,
  new MeshBasicMaterial({ color: "white", wireframe: true })
);
sides.push(side1);

var side2 = side1.clone();
sides.push(side2);
var side3 = side1.clone();
sides.push(side3);
var side4 = side1.clone();
sides.push(side4);
var side5 = side1.clone();
sides.push(side5);
side5.material = new MeshBasicMaterial({
  color: "blue",
  side: DoubleSide,
});

side1.position.set(-0.5, 0, 0);
side2.position.set(0, -0.5, 0);
side2.rotation.z = Math.PI / 2;
side3.position.set(0.5, 0, 0);
side3.rotation.z = Math.PI;
side4.position.set(-0.5, -0.5, 0);
side4.rotation.z = Math.PI / 2;
side5.position.set(-0.5, 0.5, 0);
side5.rotation.z = -Math.PI / 2;

// side0.add(side1);
// side0.add(side2);
// side0.add(side3);
// side3.add(side4);
// side4.add(side5);

function foldTheCube() {
  var start = { value: Math.PI / 2 };
  var finish = { value: 0 };
  new TWEEN.Tween(start)
    .to(finish, 3000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onUpdate(function ({ value }) {
      const angle = value;
      sides[0].rotation.y = angle;
      sides[1].rotation.x = -angle;
      sides[2].rotation.y = -angle;
      sides[3].rotation.x = -angle;
      sides[4].rotation.x = angle;
    })
    .start();
}

function render() {
  renderer.render(scene, camera);
}

function tick() {
  // TWEEN.update();
  orbitControls.update();
  render();
  requestAnimationFrame(tick);
}

foldTheCube();

tick();
