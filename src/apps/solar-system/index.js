/* eslint-disable no-param-reassign */

// Ref
// http://stackoverflow.com/questions/15214582/how-do-i-rotate-some-moons-around-a-planet-with-three-js

// import Body from './Body';
import Body from './Body';

// function Body(name, radius, color) {
//   THREE.Object3D.call(this);
//   const geometry = new THREE.SphereGeometry(radius, 8, 8);
//   const material = new THREE.MeshLambertMaterial({ color, wireframe: true });
//   const mesh = new THREE.Mesh(geometry, material);
//   this.name = name;
//   this.add(mesh);
//   this.satellites = [];
// }
//
// Body.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
//
//   constructor: Body,
//
//   addBody(body, radius) {
//     const satellite = {
//       body,
//       radius,
//       angle: 0,
//     };
//     this.satellites.push(satellite);
//     this.add(body);
//     body.position.x = radius;
//   },
//
//   update() {
//     this.rotation.y += 0.005;
//     this.satellites.forEach((satellite) => {
//       satellite.body.update();
//     });
//   },
//
// });

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

// const sunDef = {
//   name: 'Sun',
//   radius: 695700,
//   color: 0xffff00,
//   children: [
//     { name: 'Mercury', radius: 4800 / 2, orbitRadius: 57910000 },
//     { name: 'Venus', radius: 12100 / 2, orbitRadius: 108200000 },
//     { name: 'Earth', radius: 12750 / 2, orbitRadius: 149600000 },
//     { name: 'Mars', radius: 6800 / 2, orbitRadius: 227940000 },
//     { name: 'Jupiter', radius: 142800 / 2, orbitRadius: 778330000 },
//     { name: 'Saturn', radius: 120660 / 2, orbitRadius: 1424600000 },
//     { name: 'Uranus', radius: 51800 / 2, orbitRadius: 2873550000 },
//     { name: 'Neptune', radius: 49500 / 2, orbitRadius: 4501000000 },
//     { name: 'Pluto', radius: 3300 / 2, orbitRadius: 5945900000 },
//   ],
// };

const origin = new THREE.Vector3(0, 0, 0);

// function createBody(def) {
//   const body = new Body(def.name, def.radius / 2000, def.color || 0xffffff);
//   if (def.children) {
//     def.children.forEach((childDef) => {
//       const childBody = createBody(childDef);
//       body.addBody(childBody, childDef.orbitRadius / 1000000);
//     });
//   }
//   return body;
// }

function init() {
  scene = new THREE.Scene();

  const gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  const axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  // sun = createBody(sunDef);
  // sun.position.y = 40;
  // scene.add(sun);

  sun = new Body('Sun', 40, 0xffff00);
  // const earth = new Body('Earth', 13, 0x0000ff);
  // const moon = new Body('Moon', 4, 0x888888);

  // sun.addBody(earth);
  // earth.addBody(moon);
  scene.add(sun);

  // sun = new Body('Sun', 40, 0xffff00);
  // sun.position.y = 40;
  // scene.add(sun);

  // const mercury = new Body(5, 0xffffff);
  // sun.addBody(mer, 57);

  // const ven = new Body(12, 0xffffff);
  // sun.addBody(ven, 108);

  // const earth = new Body('Earth', 13, 0xffffff);
  // sun.addBody(earth, 150);

  // const moon = new Body('Moon', 4, 0xffffff);
  // earth.addBody(moon, 26);

  // sun.addToScene(scene);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
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

function update() {
  // sun.update();
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
