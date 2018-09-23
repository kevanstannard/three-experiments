const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
// let orbitControls;
let keyboard;
let axis;
let animateDirection = 0;
let animateRotation = 0;
let materialFront;
let materialRight;
let materialBack;
let materialLeft;

const SPEED = Math.PI / 2 / 60;

const PLANE_WIDTH = 180;
const PLANE_HEIGHT = 100;

const DISTANCE = 100;

const key = {
  FORWARD: 'W',
  BACKWARD: 'S',
  LEFT: 'A',
  RIGHT: 'D',
  UP: 'space',
  DOWN: 'shift',
};

const slides = [
  '../../assets/textures/slides/broccoli.jpg',
  '../../assets/textures/slides/carrots.jpg',
  '../../assets/textures/slides/cauliflower.jpg',
  '../../assets/textures/slides/onions.jpg',
  '../../assets/textures/slides/pumpkin.jpg',
];

const textureLoader = new THREE.TextureLoader();
const textures = slides.map(slide => textureLoader.load(slide));

let nextTexture = 0;
let currentTexture = 0;

const indexAt = (index) => {
  if (index < 0) {
    return (textures.length - (-index % textures.length)) % textures.length;
  }
  return index % textures.length;
};

const textureAt = index => textures[indexAt(index)];

function init() {
  keyboard = new KeyboardState();

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(new THREE.Vector3());
  // camera.position.set(0, 0, DISTANCE - 10);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  // orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  // const gridHelper = new THREE.GridHelper(100, 10);
  // scene.add(gridHelper);

  // const axisHelper = new THREE.AxisHelper(100);
  // scene.add(axisHelper);

  // const markerGeometry = new THREE.SphereGeometry(5);
  // const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  // const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  // marker.position.setY(60);

  axis = new THREE.Object3D();

  const geometry = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);

  const textureFront = textureAt(0);
  materialFront = new THREE.MeshBasicMaterial({ map: textureFront, side: THREE.DoubleSide });
  const planeFront = new THREE.Mesh(geometry, materialFront);
  // planeFront.add(marker);
  planeFront.position.setZ(-DISTANCE);
  axis.add(planeFront);

  const textureRight = textureAt(1);
  materialRight = new THREE.MeshBasicMaterial({ map: textureRight, side: THREE.DoubleSide });
  const planeRight = new THREE.Mesh(geometry, materialRight);
  planeRight.position.setX(DISTANCE);
  planeRight.rotateY(-Math.PI / 2);
  axis.add(planeRight);

  const textureLeft = textureAt(-1);
  materialLeft = new THREE.MeshBasicMaterial({ map: textureLeft, side: THREE.DoubleSide });
  const planeLeft = new THREE.Mesh(geometry, materialLeft);
  planeLeft.position.setX(-DISTANCE);
  planeLeft.rotateY(Math.PI / 2);
  axis.add(planeLeft);

  const textureBack = null;
  materialBack = new THREE.MeshBasicMaterial({ map: textureBack, side: THREE.DoubleSide });
  const planeBack = new THREE.Mesh(geometry, materialBack);
  planeBack.position.setZ(DISTANCE);
  planeBack.rotateY(-Math.PI);
  axis.add(planeBack);

  scene.add(axis);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);
}

function update() {
  keyboard.update();

  if (animateDirection === 0) {
    if (keyboard.pressed(key.LEFT)) {
      animateDirection = -1;
      nextTexture = indexAt(currentTexture - 1);
      materialBack.map = textureAt(nextTexture - 1);
      materialBack.needsUpdate = true;
    }
    if (keyboard.pressed(key.RIGHT)) {
      animateDirection = 1;
      nextTexture = indexAt(currentTexture + 1);
      materialBack.map = textureAt(nextTexture + 1);
      materialBack.needsUpdate = true;
    }
  } else {
    const distance = SPEED * animateDirection;
    animateRotation += distance;
    if (animateRotation < -Math.PI / 2 || animateRotation > Math.PI / 2) {
      animateDirection = 0;
      animateRotation = 0;
      currentTexture = nextTexture;
      nextTexture = 0;

      materialLeft.map = textureAt(currentTexture - 1);
      materialLeft.needsUpdate = true;

      materialFront.map = textureAt(currentTexture);
      materialFront.needsUpdate = true;

      materialRight.map = textureAt(currentTexture + 1);
      materialRight.needsUpdate = true;

      materialBack.map = null;
      materialBack.needsUpdate = true;

      axis.rotation.y = 0;
    } else {
      axis.rotation.y += distance;
    }
  }

  // orbitControls.update();
}

function render() {
  renderer.render(scene, camera);
}

function tick() {
  update();
  render();
  requestAnimationFrame(tick);
}

init();
tick();
