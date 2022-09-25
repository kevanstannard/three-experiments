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

  constructor(name: string) {
    super();

    this.name = name;

    const geom = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ wireframe: true });
    const mesh = new THREE.Mesh(geom, material);
    mesh.name = `${name}:Mesh`;

    const arrowX = new Arrow(1, 0, 0);
    const arrowY = new Arrow(0, 1, 0);
    const arrowZ = new Arrow(0, 0, 1);

    this.add(mesh);
    this.add(arrowY);
    this.add(arrowX);
    this.add(arrowZ);

    this.mesh = mesh;
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

const front = new Face("Front");
front.position.set(0, 0, 0.5);

const back = new Face("Back");
back.position.set(0, 0, -0.5);
back.rotateY(Math.PI);

const right = new Face("Right");
right.rotateY(-Math.PI / 2);
right.position.set(-0.5, 0, 0);

const left = new Face("Left");
left.rotateY(Math.PI / 2);
left.position.set(0.5, 0, 0);

const top = new Face("Top");
top.rotateX(-Math.PI / 2);
top.position.set(0, 0.5, 0);

const bottom = new Face("Bottom");
bottom.rotateX(Math.PI / 2);
bottom.position.set(0, -0.5, 0);

scene.add(front);
scene.add(back);
scene.add(left);
scene.add(right);
scene.add(top);
scene.add(bottom);

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
