import TWEEN from "@tweenjs/tween.js";
import {
  Vector3,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  Mesh,
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
camera.position.set(BOX_SIZE * 4, BOX_SIZE * 2, BOX_SIZE * 6);
camera.lookAt(origin);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

const orbitControls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

const axesHelper = new AxesHelper(BOX_SIZE * 2);
scene.add(axesHelper);

var geom = new PlaneGeometry(1, 1);

var front = new Mesh(geom, new MeshBasicMaterial({ wireframe: true }));
scene.add(front);

var rightGeom = geom.clone();
rightGeom.translate(-0.5, 0, 0);
var right = new Mesh(rightGeom, new MeshBasicMaterial({ wireframe: true }));

var leftGeom = geom.clone();
leftGeom.translate(0.5, 0, 0);
var left = new Mesh(leftGeom, new MeshBasicMaterial({ wireframe: true }));

var topGeom = geom.clone();
topGeom.translate(0, 0.5, 0);
var top = new Mesh(topGeom, new MeshBasicMaterial({ wireframe: true }));

var bottomGeom = geom.clone();
bottomGeom.translate(0, -0.5, 0);
var bottom = new Mesh(bottomGeom, new MeshBasicMaterial({ wireframe: true }));

var backGeom = geom.clone();
backGeom.translate(0.5, 0, 0);
var back = new Mesh(backGeom, new MeshBasicMaterial({ wireframe: true }));
back.material = new MeshBasicMaterial({
  color: "blue",
  side: DoubleSide,
});

const sides: Record<string, Mesh> = {
  right,
  bottom,
  left,
  top,
  back,
};

right.position.set(-0.5, 0, 0);
left.position.set(0.5, 0, 0);
top.position.set(0, 0.5, 0);
bottom.position.set(0, -0.5, 0);
back.position.set(1, 0, 0);

front.add(right);
front.add(left);
front.add(top);
front.add(bottom);
left.add(back);

function foldTheCube() {
  var start = { value: Math.PI / 2 };
  var finish = { value: 0 };
  new TWEEN.Tween(start)
    .to(finish, 5000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onUpdate(({ value }) => {
      sides.right.rotation.y = -value;
      sides.left.rotation.y = value;
      sides.top.rotation.x = -value;
      sides.bottom.rotation.x = value;
      sides.back.rotation.y = value;
    })
    .start();
}

function update() {
  TWEEN.update();
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

foldTheCube();

tick();
