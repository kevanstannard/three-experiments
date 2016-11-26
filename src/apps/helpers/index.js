const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 0.1;
const FAR = 20000;

const origin = new THREE.Vector3(0,0,0);

const scene = new THREE.Scene();

const gridHelper = new THREE.GridHelper(100, 10);
scene.add(gridHelper);

const axisHelper = new THREE.AxisHelper(100);
scene.add(axisHelper);

const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.set(200, 200, 200);
camera.lookAt(origin);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);
