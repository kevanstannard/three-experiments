import Car from './objects/car';
import BotCar from './objects/bot-car';

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let axisHelper;
let gridHelper;
let pointLight;
let ambientLight;
let keyboard;
let car;
let botCars;
let clock;

const botCarCount = 3;

const key = {
  FORWARD: 'W',
  BACKWARD: 'S',
  LEFT: 'A',
  RIGHT: 'D',
  UP: 'space',
  DOWN: 'shift',
};

function init() {
  clock = new THREE.Clock();
  clock.start();

  keyboard = new KeyboardState();

  scene = new THREE.Scene();

  gridHelper = new THREE.GridHelper(1000, 50);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  car = new Car({
    name: 'Player',
    color: 0x888888,
    size: 20,
  });

  scene.add(car);

  botCars = [];
  for (let i = 0; i < botCarCount; i += 1) {
    const botCar = new BotCar({
      name: 'Bot',
      color: 0xff8888,
      size: 20,
    });
    botCars.push(botCar);
    scene.add(botCar);
  }

  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 200, -200);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function updateCamera() {
  const carDirection = car.getWorldDirection(); // Unit vector
  const reverseDirection = carDirection.negate();
  const heightVector = new THREE.Vector3(0, 400, 0);
  const cameraVector = reverseDirection.multiplyScalar(600).add(heightVector);
  const cameraPosition = car.position.clone().add(cameraVector);
  camera.position.copy(cameraPosition);
  camera.lookAt(car.position);
}

function update() {
  const delta = clock.getDelta();

  keyboard.update();
  if (keyboard.pressed(key.LEFT)) { car.rotateLeft(delta); }
  if (keyboard.pressed(key.RIGHT)) { car.rotateRight(delta); }
  if (keyboard.pressed(key.FORWARD)) { car.moveForward(delta); }
  if (keyboard.pressed(key.BACKWARD)) { car.moveBackward(delta); }

  updateCamera();

  botCars.forEach(botCar => botCar.update(delta));
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
