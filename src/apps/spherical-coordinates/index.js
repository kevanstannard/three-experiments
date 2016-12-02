/* eslint no-prototype-builtins: "off" */

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
// let geometry;
// let material;
// let mesh;
let controls;
let pointLight;
let ambientLight;

const origin = new THREE.Vector3(0, 0, 0);

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
  const dir = v.normalize();
  const axis = new THREE.ArrowHelper(dir, origin, 250, color, 10, 5);
  scene.add(axis);

  const labelProps = { font: 'droid sans', size: 12, curveSegments: 32 };
  const labelGeometry = new THREE.TextGeometry(labelText, labelProps);
  const labelMaterial = new THREE.MeshBasicMaterial();
  const label = new THREE.Mesh(labelGeometry, labelMaterial);
  scene.add(label);
}

function renderAxes() {
  const xAxis = new THREE.Vector3(1, 0, 0);
  renderAxis(xAxis, 0xff0000, 'x');

  const yAxis = new THREE.Vector3(0, 1, 0);
  renderAxis(yAxis, 0x00ff00, 'y');

  const zAxis = new THREE.Vector3(0, 0, 1);
  renderAxis(zAxis, 0x0000ff, 'z');

  // const axisHelper = new THREE.AxisHelper(100);
  // scene.add(axisHelper);
}

// function roundRect(ctx, x, y, w, h, r) {
//   ctx.beginPath();
//   ctx.moveTo(x + r, y);
//   ctx.lineTo(x + w - r, y);
//   ctx.quadraticCurveTo(x + w, y, x + w, y + r);
//   ctx.lineTo(x + w, y + h - r);
//   ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
//   ctx.lineTo(x + r, y + h);
//   ctx.quadraticCurveTo(x, y + h, x, y + h - r);
//   ctx.lineTo(x, y + r);
//   ctx.quadraticCurveTo(x, y, x + r, y);
//   ctx.closePath();
//   ctx.fill();
//   ctx.stroke();
// }

// function makeTextSprite(message, parameters = {}) {
//   const fontface = parameters.hasOwnProperty('fontface')
//       ? parameters.fontface
//       : 'Arial';
//
//   const fontsize = parameters.hasOwnProperty('fontsize')
//       ? parameters.fontsize
//       : 18;
//
//   const borderThickness = parameters.hasOwnProperty('borderThickness')
//       ? parameters.borderThickness
//       : 4;
//
//   const borderColor = parameters.hasOwnProperty('borderColor')
//       ? parameters.borderColor
//       : {
//         r: 0,
//         g: 0,
//         b: 0,
//         a: 1.0,
//       };
//
//   const backgroundColor = parameters.hasOwnProperty('backgroundColor')
//       ? parameters.backgroundColor
//       : {
//         r: 255,
//         g: 255,
//         b: 255,
//         a: 1.0,
//       };
//
//   const spriteAlignment = THREE.SpriteAlignment.topLeft;
//
//   const canvas = document.createElement('canvas');
//   const context = canvas.getContext('2d');
//   // context.font = 'Bold ' + fontsize + 'px ' + fontface;
//   context.font = `Bold ${fontsize}px ${fontface}`;
//
//   // get size data (height depends only on font size)
//   const metrics = context.measureText(message);
//   const textWidth = metrics.width;
//
//   // background color
//   const bgColor = backgroundColor;
//   context.fillStyle = `rgba(${bgColor.r},${bgColor.g},${bgColor.b},${bgColor.a})`;
//
//   // border color
//   const bColor = borderColor;
//   context.strokeStyle = `rgba(${bColor.r},${bColor.g},${bColor.b},${bColor.a})`;
//
//   context.lineWidth = borderThickness;
//   roundRect(
//     context,
//     borderThickness / 2,
//     borderThickness / 2,
//     textWidth + borderThickness,
//     fontsize * 1.4 + borderThickness,
//     6,
//   );
//   // 1.4 is extra height factor for text below baseline: g,j,p,q.
//
//   // text color
//   context.fillStyle = 'rgba(0, 0, 0, 1.0)';
//
//   context.fillText(message, borderThickness, fontsize + borderThickness);
//
//   // canvas contents will be used for a texture
//   const texture = new THREE.Texture(canvas);
//   texture.needsUpdate = true;
//
//   const spriteMaterial = new THREE.SpriteMaterial({
//     map: texture,
//     useScreenCoordinates: false,
//     alignment: spriteAlignment,
//   });
//
//   const sprite = new THREE.Sprite(spriteMaterial);
//   sprite.scale.set(100, 50, 1.0);
//
//   return sprite;
// }

function init() {
  scene = new THREE.Scene();

  renderGrid();
  renderAxes();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(400, 400, 400);
  camera.lookAt(origin);

  // geometry = new THREE.SphereGeometry(1, 32, 32);
  // material = new THREE.MeshLambertMaterial({ color: 0xffffff });

  // https://en.wikipedia.org/wiki/Spherical_coordinate_system
  // http://stackoverflow.com/questions/969798/plotting-a-point-on-the-edge-of-a-sphere

  // const radius = 100;
  // const intervals = 10;
  //
  // // phi is the angle on the xy plane
  // // [0, 2PI]
  // const phi0 = Math.PI * (0 / 4);
  // const phi1 = Math.PI * (2 / 4);
  // const phiDelta = (phi1 - phi0) / intervals;
  //
  // // theta is the angle from the z axis
  // // [0, PI]
  // const theta0 = Math.PI * (0 / 2);
  // const theta1 = Math.PI * (2 / 4);
  // const thetaDelta = (theta1 - theta0) / intervals;
  //
  // // let count = 0;
  // for (let phi = phi0; phi <= phi1; phi += phiDelta) {
  //   for (let theta = theta0; theta <= theta1; theta += thetaDelta) {
  //     // count += 1;
  //     // console.log(count);
  //     const x = radius * Math.sin(theta) * Math.cos(phi);
  //     const y = radius * Math.sin(theta) * Math.sin(phi);
  //     const z = radius * Math.cos(theta);
  //     mesh = new THREE.Mesh(geometry, material);
  //     mesh.position.set(x, y, z);
  //     scene.add(mesh);
  //   }
  // }

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer();
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

init();
animate();
