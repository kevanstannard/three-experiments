import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

const BOX_SIZE = 1;

const origin = new THREE.Vector3(0, 0, 0);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.set(BOX_SIZE * 4, BOX_SIZE * 2, BOX_SIZE * 6);
camera.lookAt(origin);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

const orbitControls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(BOX_SIZE / 4);
scene.add(axesHelper);

const object = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({ wireframe: true })
);

object.rotateY(-Math.PI / 2);
object.position.set(-0.5, 0, 0);

const v = new THREE.Vector3();

// For use detecting normals?
object.getWorldDirection(v);
console.log(v);

// This is necessary for localToWorld() to work
object.getWorldPosition(v);
console.log(v);

const positionAttribute = object.geometry.getAttribute("position");
v.fromBufferAttribute(positionAttribute, 0);
object.localToWorld(v);

console.log(v);

scene.add(object);

// const positionAttribute = object.geometry.getAttribute("position");
// const vertex = new THREE.Vector3();
// vertex.fromBufferAttribute(positionAttribute, 0);
// console.log(vertex);
// const vertex2 = vertex.clone();

// const v = new THREE.Vector3(0, 0, 0);
// const v2 = object.localToWorld(v);
// console.log(v, v2);

function update() {
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
