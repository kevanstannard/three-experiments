const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
// let axisHelper;
let orbitControls;
// let ambientLight;
let stats;
// let rectLight;
// let rectLightHelper;
const lights = [];

const origin = new THREE.Vector3(0, 0, 0);

function Wall(width, height) {
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 1,
    side: THREE.DoubleSide,
  });
  const geometry = new THREE.PlaneBufferGeometry(width, height);
  THREE.Mesh.call(this, geometry, material);
}

Wall.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
  constructor: Wall,
});

function Room(width, height, depth) {
  THREE.Object3D.call(this);

  const back = new Wall(width, height);
  back.position.set(0, 0, -depth / 2);
  this.add(back);

  const right = new Wall(depth, height);
  right.rotation.y = Math.PI / 2;
  right.position.set(-width / 2, 0, 0);
  this.add(right);

  const left = new Wall(depth, height);
  left.rotation.y = -Math.PI / 2;
  left.position.set(width / 2, 0, 0);
  this.add(left);

  const bottom = new Wall(width, depth);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.set(0, -height / 2, 0);
  this.add(bottom);

  const top = new Wall(width, depth);
  top.rotation.x = Math.PI / 2;
  top.position.set(0, height / 2, 0);
  this.add(top);
}

Room.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
  constructor: Room,
});

function Light() {
  THREE.RectAreaLight.call(this, 0xFFFFFF, 100, 5, 40);
  this.helper = new THREE.RectAreaLightHelper(this);
  this.add(this.helper);

  // console.log(this.helper);

  this.ON = Symbol('On');
  this.OFF = Symbol('Off');
  this.DIM = Symbol('Dim');

  this.modes = [this.ON, this.DIM, this.OFF];

  this.nextMode();
}

Light.prototype = Object.assign(Object.create(THREE.RectAreaLight.prototype), {
  constructor: Light,
  nextMode() {
    let nextMode;
    if (this.currentMode) {
      if (this.currentMode.mode === this.OFF) {
        if (Math.random() > 0.2) {
          nextMode = this.DIM;
        }
      } else if (this.currentMode.mode === this.DIM) {
        if (Math.random() > 0.2) {
          nextMode = this.OFF;
        }
      }
    }
    if (!nextMode) {
      nextMode = this.modes[Math.floor(Math.random() * 2)];
    }
    switch (nextMode) {
      case this.OFF: {
        const duration = Math.floor(Math.random() * 0.1 * 60); // 60 FPS
        this.currentMode = { mode: nextMode, duration };
        break;
      }
      case this.DIM: {
        const duration = (Math.floor(Math.random() * 0.1 * 60)); // 60 FPS
        const intensity = Math.random() / 4;
        this.currentMode = { mode: nextMode, intensity, duration };
        break;
      }
      default: {
        const duration = Math.floor(Math.random() * 3 * 60); // 60 FPS
        this.currentMode = { mode: nextMode, duration };
      }
    }
  },
  update() {
    switch (this.currentMode.mode) {
      case this.OFF: {
        this.intensity = 0;
        break;
      }
      case this.DIM: {
        this.intensity = this.currentMode.intensity;
        break;
      }
      default: {
        this.intensity = 1000;
      }
    }
    this.currentMode.duration = this.currentMode.duration - 1;
    this.helper.update();
    if (this.currentMode.duration <= 0) {
      this.nextMode();
    }
  },
});

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function init() {
  scene = new THREE.Scene();

  // axisHelper = new THREE.AxisHelper(50);
  // scene.add(axisHelper);

  // ambientLight = new THREE.AmbientLight(0x000000, 0.1);
  // scene.add(ambientLight);

  const roomWidth = 250;
  const roomHeight = 100;
  const roomDepth = 300;
  const room = new Room(roomWidth, roomHeight, roomDepth);
  scene.add(room);

  const light1 = new Light();
  const light1Pos = {
    x: 0,
    y: (roomHeight / 2) - 1,
    z: 0,
  };
  light1.position.set(light1Pos.x, light1Pos.y, light1Pos.z);
  light1.lookAt(new THREE.Vector3(light1Pos.x, light1Pos.y - 1, light1Pos.z));
  lights.push(light1);
  scene.add(light1);

  const light2 = new Light();
  const light2Pos = {
    x: -roomWidth / 4,
    y: (roomHeight / 2) - 1,
    z: 0,
  };
  light2.position.set(light2Pos.x, light2Pos.y, light2Pos.z);
  light2.lookAt(new THREE.Vector3(light2Pos.x, light2Pos.y - 1, light2Pos.z));
  lights.push(light2);
  scene.add(light2);

  const light3 = new Light();
  const light3Pos = {
    x: roomWidth / 4,
    y: (roomHeight / 2) - 1,
    z: 0,
  };
  light3.position.set(light3Pos.x, light3Pos.y, light3Pos.z);
  light3.lookAt(new THREE.Vector3(light3Pos.x, light3Pos.y - 1, light3Pos.z));
  lights.push(light3);
  scene.add(light3);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(75, 0, 150);
  camera.lookAt(origin);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();
}

function update() {
  lights.forEach(light => light.update());
  stats.update();
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

init();
tick();
