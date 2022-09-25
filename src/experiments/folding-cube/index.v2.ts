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
  ArrowHelper,
  Object3D,
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

function makeSide({
  arrowSize,
  translate,
}: {
  arrowSize: number;
  translate: [number, number, number];
}) {
  const [tx, ty, tz] = translate;
  const side = new Mesh(
    new PlaneGeometry(1, 1),
    new MeshBasicMaterial({ wireframe: true })
  );
  side.geometry.translate(tx, ty, tz);
  const arrow = new ArrowHelper(
    new Vector3(0, 1, 0).normalize(),
    new Vector3(0, 0, 0),
    arrowSize
  );
  arrow.translateX(tx);
  arrow.translateY(ty);
  arrow.translateZ(tz);
  side.add(arrow);
  return side;
}

const front = makeSide({
  arrowSize: 0.5,
  translate: [0, 0, 0],
});

const right = makeSide({
  arrowSize: 0.5,
  translate: [-0.5, 0, 0],
});

const left = makeSide({
  arrowSize: 0.5,
  translate: [0.5, 0, 0],
});

const top = makeSide({
  arrowSize: 0.5,
  translate: [0, 0.5, 0],
});

const bottom = makeSide({
  arrowSize: 0.5,
  translate: [0, -0.5, 0],
});

const back = makeSide({
  arrowSize: 0.5,
  translate: [0.5, 0, 0],
});

// const sides: Record<string, Mesh> = {
//   right,
//   bottom,
//   left,
//   top,
//   back,
// };

front.position.set(0, 0, 0.5);
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

const cuboid = new Object3D();
cuboid.add(front);

scene.add(cuboid);

// function makeFoldTween() {
//   const start = { value: 0 };
//   const finish = { value: Math.PI / 2 };
//   return new TWEEN.Tween(start)
//     .to(finish, 5000)
//     .easing(TWEEN.Easing.Sinusoidal.InOut)
//     .onUpdate(({ value }) => {
//       sides.right.rotation.y = -value;
//       sides.left.rotation.y = value;
//       sides.top.rotation.x = -value;
//       sides.bottom.rotation.x = value;
//       sides.back.rotation.y = value;
//     });
// }

// function makeUnfoldTween() {
//   const start = { value: Math.PI / 2 };
//   const finish = { value: 0 };
//   return new TWEEN.Tween(start)
//     .to(finish, 5000)
//     .easing(TWEEN.Easing.Sinusoidal.InOut)
//     .onUpdate(({ value }) => {
//       sides.right.rotation.y = -value;
//       sides.left.rotation.y = value;
//       sides.top.rotation.x = -value;
//       sides.bottom.rotation.x = value;
//       sides.back.rotation.y = value;
//     });
// }

// function makeRotateXTween() {
//   const start = { value: 0 };
//   const finish = { value: Math.PI / 2 };
//   let initialRotation = 0;
//   return new TWEEN.Tween(start)
//     .to(finish, 5000)
//     .easing(TWEEN.Easing.Sinusoidal.InOut)
//     .onStart(() => {
//       initialRotation = cuboid.rotation.x;
//     })
//     .onComplete(() => {
//       cuboid.updateMatrix();
//       cuboid.applyMatrix4(cuboid.matrix);
//       cuboid.position.set(0, 0, 0);
//       cuboid.rotation.set(0, 0, 0);
//       cuboid.scale.set(1, 1, 1);
//       cuboid.updateMatrix();
//     })
//     .onUpdate(({ value }) => {
//       cuboid.rotation.x = initialRotation + value;
//     });
// }

// function makeRotateYTween() {
//   const start = { value: 0 };
//   const finish = { value: Math.PI / 2 };
//   let initialRotation = 0;
//   return new TWEEN.Tween(start)
//     .to(finish, 5000)
//     .easing(TWEEN.Easing.Sinusoidal.InOut)
//     .onStart(() => {
//       initialRotation = cuboid.rotation.y;
//     })
//     .onComplete(() => {
//       cuboid.updateMatrix();
//       cuboid.applyMatrix4(cuboid.matrix);
//       cuboid.position.set(0, 0, 0);
//       cuboid.rotation.set(0, 0, 0);
//       cuboid.scale.set(1, 1, 1);
//       cuboid.updateMatrix();
//     })
//     .onUpdate(({ value }) => {
//       cuboid.rotation.y = initialRotation + value;
//     });
// }

// function makeRotateZTween() {
//   const start = { value: 0 };
//   const finish = { value: Math.PI / 2 };
//   let initialRotation = 0;
//   return new TWEEN.Tween(start)
//     .to(finish, 5000)
//     .easing(TWEEN.Easing.Sinusoidal.InOut)
//     .onStart(() => {
//       initialRotation = cuboid.rotation.z;
//     })
//     .onComplete(() => {
//       cuboid.updateMatrix();
//       cuboid.applyMatrix4(cuboid.matrix);
//       cuboid.position.set(0, 0, 0);
//       cuboid.rotation.set(0, 0, 0);
//       cuboid.scale.set(1, 1, 1);
//       cuboid.updateMatrix();
//     })
//     .onUpdate(({ value }) => {
//       cuboid.rotation.z = initialRotation + value;
//     });
// }

function update() {
  // TWEEN.update();
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

// https://stackoverflow.com/questions/27022160/three-js-can-i-apply-position-rotation-and-scale-to-the-geometry/27023024#27023024

// const tween = makeFoldTween().chain(
//   makeRotateXTween()
//   // makeRotateXTween().chain(
//   //   makeRotateYTween().chain(makeRotateZTween().chain(makeUnfoldTween()))
//   // )
// );
// tween.delay(5000);
// tween.start();

tick();

const button = document.createElement("button");
const text = document.createTextNode("Hello");
button.appendChild(text);
button.style.position = "absolute";
button.style.top = "0px";
button.style.right = "0px";
document.body.append(button);
