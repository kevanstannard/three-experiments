/* eslint-disable no-param-reassign, max-len */

import Body from './Body';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let controls;
let pointLight;
let ambientLight;
let sun;

const origin = new THREE.Vector3(0, 0, 0);

function init() {
  scene = new THREE.Scene();

  // gridHelper = new THREE.GridHelper(100, 10);
  // scene.add(gridHelper);

  // axisHelper = new THREE.AxisHelper(100);
  // scene.add(axisHelper);

  sun = new Body('Sun', 40, 0xffff00);
  sun.mesh.position.x = 100;

  // const mer = new Body(5, 0xffffff);
  // sun.addBody(mer, 57);

  // const ven = new Body(12, 0xffffff);
  // sun.addBody(ven, 108);

  const earth = new Body('Earth', 13, 0xffffff);
  const earthMoon = new Body('Moon', 4, 0xffffff);
  earth.add(earthMoon, 26);
  sun.add(earth, 150);

  sun.addToScene(scene);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 0, 400);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

// const radius = 40;
// let theta = 0;

function update() {
  // // Children
  // object.children.forEach((child) => {
  //   if (child.move) {
  //     child.position.x = (child.move.x * sphereSize) + (child.move.x * sphereSize * Math.sin(theta));
  //     child.position.y = (child.move.y * sphereSize) + (child.move.y * sphereSize * Math.sin(theta));
  //     child.position.z = (child.move.z * sphereSize) + (child.move.z * sphereSize * Math.sin(theta));
  //   }
  // });
  //
  // // Object
  // theta += 0.02;
  // const x = radius * Math.cos(theta);
  // const y = radius * Math.sin(theta);
  // const z = 0;
  // object.position.set(x, y, z);
  sun.update();

  // Controls
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
