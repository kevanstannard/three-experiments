/* eslint no-prototype-builtins: "off" */

import { loadFonts } from 'lib/fonts';
import CircleLineGeometry from './CircleLineGeometry';

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
let fonts;

const labels = [];
const origin = new THREE.Vector3(0, 0, 0);

function load() {
  return loadFonts()
    .then((theFonts) => {
      fonts = theFonts;
    });
}

function renderLabel(text, position) {
  const props = { font: fonts.helvetiker_regular, size: 12, height: 1 };
  const geometry = new THREE.TextGeometry(text, props);
  const material = new THREE.MeshBasicMaterial();
  const label = new THREE.Mesh(geometry, material);
  label.position.set(position.x, position.y, position.z);
  labels.push(label);
  scene.add(label);
}

function renderGrid() {
  const gridSize = 100;

  const xzGrid = new THREE.GridHelper(gridSize, 10);
  xzGrid.position.set(gridSize, 0, gridSize);
  scene.add(xzGrid);

  const xyGrid = new THREE.GridHelper(gridSize, 10);
  xyGrid.rotation.x = Math.PI * (1 / 2);
  xyGrid.position.set(gridSize, gridSize, 0);
  scene.add(xyGrid);

  const yzGrid = new THREE.GridHelper(gridSize, 10);
  yzGrid.rotation.z = Math.PI * (1 / 2);
  yzGrid.position.set(0, gridSize, gridSize);
  scene.add(yzGrid);
}

function renderAxis(v, color, labelText) {
  const axisLength = 250;
  const labelDistance = axisLength * 1.1;

  const dir = v.normalize();
  const axis = new THREE.ArrowHelper(dir, origin, axisLength, color, 10, 5);
  scene.add(axis);

  renderLabel(
    labelText,
    new THREE.Vector3(
      dir.x * labelDistance,
      dir.y * labelDistance,
      dir.z * labelDistance,
    ),
  );
}

function renderAxes() {
  const xAxis = new THREE.Vector3(1, 0, 0);
  renderAxis(xAxis, 0xff0000, 'x');

  const yAxis = new THREE.Vector3(0, 1, 0);
  renderAxis(yAxis, 0x00ff00, 'y');

  const zAxis = new THREE.Vector3(0, 0, 1);
  renderAxis(zAxis, 0x0000ff, 'z');
}

function renderVector(vector) {
  const v = vector.clone();
  const arrowLength = v.length();
  const arrowDir = v.normalize();
  const arrowColor = 0xffff00;
  const headLength = 12;
  const headWidth = 4;
  const arrowHelper = new THREE.ArrowHelper(
    arrowDir, origin, arrowLength, arrowColor,
    headLength, headWidth,
  );
  scene.add(arrowHelper);
}

function renderLine(from, to) {
  const material = new THREE.LineDashedMaterial({
    color: 0xffffff,
    linewidth: 2,
    dashSize: 2,
    gapSize: 3,
    transparent: true,
    opacity: 0.5,
  });

  // Three JS dashed line material not showing
  // http://stackoverflow.com/questions/35523961/three-js-dashed-line-material-not-showing
  const geometry = new THREE.Geometry();
  geometry.vertices.push(from, to);
  geometry.computeLineDistances();

  const line = new THREE.Line(geometry, material);

  scene.add(line);
}

function renderCoordinate() {
  const radius = 200;
  const theta = Math.PI * (2 / 8); // Angle from x axis
  const phi = Math.PI * (2 / 8); // Angle from z axis
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  const pointNormal = new THREE.Vector3(x, y, z).normalize();
  const point = pointNormal.clone().setLength(radius);
  renderVector(point);

  const xyPoint = new THREE.Vector3(x, y, 0);
  renderLine(origin, xyPoint);

  renderLine(point, xyPoint);

  const angleRadius = 40;

  // theta angle line
  const thetaAngleGeometry = new CircleLineGeometry(angleRadius, 32, 0, theta);
  const thetaAngleMaterial = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 2 });
  const thetaAngleLine = new THREE.Line(thetaAngleGeometry, thetaAngleMaterial);
  scene.add(thetaAngleLine);

  // // phi angle line
  // // const m1 = (new THREE.Matrix4()).makeRotationY(Math.PI / 2);
  // // const m2 = (new THREE.Matrix4()).makeRotationZ(-phi / 2);
  // const phiAngleGeometry = new CircleLineGeometry(angleRadius, 32, 0, Math.PI * 2);
  // // phiAngleGeometry.applyMatrix(m1);
  // // phiAngleGeometry.applyMatrix(m2);
  // const phiAngleMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
  // const phiAngleLine = new THREE.Line(phiAngleGeometry, phiAngleMaterial);
  // // phiAngleLine.rotation.y = Math.PI / 2;
  // // phiAngleLine.rotation.z = phi;
  // scene.add(phiAngleLine);
  //
  // const a = new THREE.Vector3(0, 0, 1);
  // const b = pointNormal;
  // const c = origin;
  //
  // const ab = a.clone().sub(b);
  // const ac = a.clone().sub(c);
  // const d = new THREE.Vector3();
  // d.crossVectors(ab, ac);
  // console.log('d', d);
  //
  // // Find the normal
  // const v1 = new THREE.Vector3(0, 0, 1);
  // const v2 = pointNormal;
  // const normal = new THREE.Vector3();
  // normal.crossVectors(v1, v2);
  //
  // // zzz
  // const arrowLength = 100;
  // const arrowColor = 0x00ff00;
  // const arrowHelper = new THREE.ArrowHelper(normal, origin, arrowLength, arrowColor);
  // scene.add(arrowHelper);
  //
  //
  // // console.log(normal);
  //
  // const axis = new THREE.Vector3(0, 0, 1);
  // phiAngleLine.quaternion.setFromUnitVectors(axis, normal);
  //
  // // ???
  // // const v1 = new THREE.Vector3(0, 0, 1);
  // // const v2 = point;
  // // const quaternion = new THREE.Quaternion().setFromUnitVectors(v1, v2);
  // // const matrix = new THREE.Matrix4().makeRotationFromQuaternion(quaternion);
  // // phiAngleLine.applyMatrix(matrix);
}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(300, 100, 300);
  camera.lookAt(origin);

  renderGrid();
  renderAxes();
  renderCoordinate();

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  labels.forEach((label) => {
    label.lookAt(camera.position);
  });
  controls.update();
  renderer.render(scene, camera);
}

load().then(() => {
  init();
  animate();
});
