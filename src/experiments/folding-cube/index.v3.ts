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

function makeFace({ name }: { name: string }) {
  const boxGeom = new THREE.BoxGeometry(1, 1, 1);
  console.log(boxGeom);

  const geom = new THREE.PlaneGeometry(1, 1);
  // geom.computeBoundingBox();
  const mesh = new THREE.Mesh(
    geom,
    new THREE.MeshBasicMaterial({ wireframe: true })
  );
  mesh.name = `${name}:Mesh`;

  const arrowSize = 0.5;

  const arrowX = new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0).normalize(),
    new THREE.Vector3(0, 0, 0),
    arrowSize
  );
  arrowX.name = `${name}:ArrowX`;

  const arrowY = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0).normalize(),
    new THREE.Vector3(0, 0, 0),
    arrowSize
  );
  arrowY.name = `${name}:ArrowY`;

  const arrowZ = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1).normalize(),
    new THREE.Vector3(0, 0, 0),
    arrowSize
  );
  arrowZ.name = `${name}:ArrowZ`;

  const object = new THREE.Object3D();
  // object.userData["mesh"] = mesh;
  object.add(mesh);
  object.add(arrowY);
  object.add(arrowX);
  object.add(arrowZ);

  object.name = name;

  return object;
}

// const front = makeFace({ name: "Front" });
// const frontPos = new THREE.Matrix4().setPosition(new THREE.Vector3(0, 0, 0.5));
// front.matrixAutoUpdate = false;
// front.applyMatrix4(frontPos);
// front.updateMatrix();

// const back = makeFace({ name: "Back", rotate: [0, Math.PI, 0] });

const right = makeFace({ name: "Right" });
const rightRot = new THREE.Matrix4().makeRotationFromEuler(
  new THREE.Euler(0, -Math.PI / 2, 0, "XYZ")
);
const rightPos = new THREE.Matrix4().setPosition(new THREE.Vector3(-0.5, 0, 0));

right.matrixAutoUpdate = false;
right.applyMatrix4(rightRot);
right.applyMatrix4(rightPos);
right.updateMatrix();

// const left = makeFace({ name: "Left", rotate: [0, Math.PI / 2, 0] });

// const top = makeFace({ name: "Top", rotate: [-Math.PI / 2, 0, 0] });

// const bottom = makeFace({ name: "Bottom", rotate: [Math.PI / 2, 0, 0] });

// const sides: Record<string, Mesh> = {
//   right,
//   bottom,
//   left,
//   top,
//   back,
// };

// front.position.set(0, 0, 0.5);
// back.position.set(0, 0, -0.5);
// right.position.set(-0.5, 0, 0);
// left.position.set(0.5, 0, 0);
// top.position.set(0, 0.5, 0);
// bottom.position.set(0, -0.5, 0);

const cuboid = new THREE.Object3D();
// cuboid.add(front);
// cuboid.add(back);
cuboid.add(right);
// cuboid.add(left);
// cuboid.add(top);
// cuboid.add(bottom);

// const mesh: THREE.Mesh = cuboid.children[0].userData["mesh"];
// console.log(mesh.geometry.attributes.normal);

const rightMesh = cuboid.getObjectByName("Right:Mesh") as THREE.Mesh | void;
console.log(rightMesh);
if (rightMesh) {
  const positions = rightMesh.geometry.getAttribute("position").array;
  console.log(positions);
  let count = positions.length / 3;
  for (let i = 0; i < count; i++) {
    let p = new THREE.Vector3(
      positions[i * 3],
      positions[i * 3 + 1],
      positions[i * 3 + 2]
    );
    const p2 = rightMesh.localToWorld(p);
    console.log(p, p2);
  }

  // const edges = new THREE.EdgesGeometry(rightMesh.geometry);
  // console.log(edges);
  // rightMesh.geometry.computeBoundingBox();
  // console.log(rightMesh.geometry.boundingBox);
  // if (rightMesh.geometry.boundingBox) {
  //   const box = new THREE.Box3();
  //   box
  //     .copy(rightMesh.geometry.boundingBox)
  //     .applyMatrix4(rightMesh.matrixWorld);
  //   console.log(box);
  // }

  // const line = new THREE.LineSegments(
  //   edges,
  //   new THREE.LineBasicMaterial({ color: 0xffffff })
  // );
  // scene.add(line);
}

// const frontMesh = cuboid.getObjectByName("Front:Mesh") as THREE.Mesh;
// if (frontMesh) {
//   frontMesh.geometry.computeBoundingBox();
//   console.log(frontMesh.geometry.boundingBox);
// }

scene.add(cuboid);

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
