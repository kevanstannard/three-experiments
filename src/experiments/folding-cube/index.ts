import { upperCase } from "lodash";
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
camera.position.set(BOX_SIZE * 4, BOX_SIZE * 2, BOX_SIZE * 8);
camera.lookAt(origin);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

const orbitControls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(BOX_SIZE / 4);
scene.add(axesHelper);

function roundVector(vector: THREE.Vector3) {
  const x = Math.round(vector.x * 10) / 10 || 0;
  const y = Math.round(vector.y * 10) / 10 || 0;
  const z = Math.round(vector.z * 10) / 10 || 0;
  return new THREE.Vector3(x, y, z);
}

class Arrow extends THREE.ArrowHelper {
  constructor(x: number, y: number, z: number) {
    super(
      new THREE.Vector3(x, y, z).normalize(),
      new THREE.Vector3(0, 0, 0),
      0.5
    );
  }
}

class Face extends THREE.Object3D {
  mesh: THREE.Mesh;

  constructor(name: string, color: string) {
    super();

    this.name = name;

    const planeGeom = new THREE.PlaneGeometry(1, 1);
    const planeMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
    const planeMesh = new THREE.Mesh(planeGeom, planeMaterial);
    planeMesh.name = `${name}:Mesh`;

    const colorGeom = new THREE.PlaneGeometry(0.125, 0.125);
    const colorMaterial = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
    });
    const colorMesh = new THREE.Mesh(colorGeom, colorMaterial);

    const arrowX = new Arrow(1, 0, 0);
    const arrowY = new Arrow(0, 1, 0);
    const arrowZ = new Arrow(0, 0, 1);

    this.add(planeMesh);
    this.add(colorMesh);
    this.add(arrowY);
    this.add(arrowX);
    this.add(arrowZ);

    this.mesh = planeMesh;
  }

  getNormal() {
    const v = new THREE.Vector3();
    this.getWorldDirection(v);
    return roundVector(v.normalize());
  }

  getVertices() {
    // Temporary vector to hold calculated values.
    const v = new THREE.Vector3();

    // This is needed to ensure the "face.matrixWorld" matrix has been populated.
    this.getWorldPosition(v);

    const positionAttribute = this.mesh.geometry.getAttribute("position");
    const vertices = [0, 1, 2, 3].map((index) => {
      v.fromBufferAttribute(positionAttribute, index);
      this.localToWorld(v);
      return roundVector(v.clone());
    });

    return vertices;
  }
}

class Cuboid extends THREE.Object3D {
  front: Face;
  back: Face;
  right: Face;
  left: Face;
  top: Face;
  bottom: Face;

  constructor() {
    super();

    const front = new Face("Front", "red");
    front.position.set(0, 0, 0.5);

    const back = new Face("Back", "orange");
    back.position.set(0, 0, -0.5);
    back.rotateY(Math.PI);

    const right = new Face("Right", "yellow");
    right.rotateY(-Math.PI / 2);
    right.position.set(-0.5, 0, 0);

    const left = new Face("Left", "green");
    left.rotateY(Math.PI / 2);
    left.position.set(0.5, 0, 0);

    const top = new Face("Top", "blue");
    top.rotateX(-Math.PI / 2);
    top.position.set(0, 0.5, 0);

    const bottom = new Face("Bottom", "indigo");
    bottom.rotateX(Math.PI / 2);
    bottom.position.set(0, -0.5, 0);

    this.add(front);
    this.add(back);
    this.add(right);
    this.add(left);
    this.add(top);
    this.add(bottom);

    this.front = front;
    this.back = back;
    this.right = right;
    this.left = left;
    this.top = top;
    this.bottom = bottom;
  }

  getVertices() {
    const front = this.front.getVertices();
    const back = this.back.getVertices();
    const right = this.right.getVertices();
    const left = this.left.getVertices();
    const top = this.top.getVertices();
    const bottom = this.bottom.getVertices();
    return { front, back, right, left, top, bottom };
  }
}

function rotateY(cuboid: Cuboid, angle: number) {
  const rotateToTheRight = new THREE.Matrix4().makeRotationFromEuler(
    new THREE.Euler(0, angle, 0, "XYZ")
  );
  cuboid.applyMatrix4(rotateToTheRight);
}

function rotateZ(cuboid: Cuboid, angle: number) {
  const rotateToTheRight = new THREE.Matrix4().makeRotationFromEuler(
    new THREE.Euler(0, 0, angle, "XYZ")
  );
  cuboid.applyMatrix4(rotateToTheRight);
}

function rotateX(cuboid: Cuboid, angle: number) {
  const rotateToTheRight = new THREE.Matrix4().makeRotationFromEuler(
    new THREE.Euler(angle, 0, 0, "XYZ")
  );
  cuboid.applyMatrix4(rotateToTheRight);
}

const cuboid1 = new Cuboid();
cuboid1.position.set(-3, 0, 0);
scene.add(cuboid1);

const cuboid2 = new Cuboid();
rotateY(cuboid2, Math.PI / 2);
cuboid2.position.set(-1, 0, 0);

const cuboid3 = new Cuboid();
rotateY(cuboid3, Math.PI / 2);
rotateZ(cuboid3, Math.PI / 2);
cuboid3.position.set(1, 0, 0);

const cuboid4 = new Cuboid();
rotateY(cuboid4, Math.PI / 2);
rotateZ(cuboid4, Math.PI / 2);
rotateX(cuboid4, Math.PI / 2);
cuboid4.position.set(3, 0, 0);

scene.add(cuboid1);
scene.add(cuboid2);
scene.add(cuboid3);
scene.add(cuboid4);

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
