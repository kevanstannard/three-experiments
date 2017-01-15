const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let orbitControls;
let primaryLight;
let stats;
let raycaster;
let currentObject;

const mouse = new THREE.Vector2();

const origin = new THREE.Vector3(0, 0, 0);

function initStats() {
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '20px';
  stats.setMode(0); // 0: fps, 1: ms
  document.getElementById('stats').appendChild(stats.domElement);
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentClick() {
  if (currentObject) {
    currentObject.animate = {
      radius: 40,
      angle: 0,
    };
  }
}

function init() {
  scene = new THREE.Scene();

  const cubeSize = 40;

  for (let x = 0; x < 3; x += 1) {
    for (let y = 0; y < 3; y += 1) {
      const geometry = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
      const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (x - 1) * 60,
        (y - 1) * 60,
        0,
      );
      scene.add(mesh);
    }
  }

  primaryLight = new THREE.DirectionalLight(0xffffff);
  primaryLight.position.set(500, 200, 100);
  scene.add(primaryLight);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(200, 200, 200);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

  raycaster = new THREE.Raycaster();

  THREEx.WindowResize(renderer, camera);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('click', onDocumentClick, false);

  document.body.appendChild(renderer.domElement);

  initStats();
}

function update() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    if (currentObject !== intersects[0].object) {
      if (currentObject) {
        currentObject.material.emissive.setHex(currentObject.currentHex);
      }
      currentObject = intersects[0].object;
      currentObject.currentHex = currentObject.material.emissive.getHex();
      currentObject.material.emissive.setHex(0x444444);
    }
  } else {
    if (currentObject) {
      currentObject.material.emissive.setHex(currentObject.currentHex);
    }
    currentObject = null;
  }

  scene.children.forEach((object) => {
    if (object.animate) {
      object.position.z = Math.sin(object.animate.angle) * object.animate.radius;
      object.animate.radius -= 0.05;
      object.animate.angle += 0.1;
      if (object.animate.radius < 0) {
        object.animate = null;
      }
    }
  });

  stats.update();
  orbitControls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
