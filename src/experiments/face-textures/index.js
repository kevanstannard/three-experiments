// Ref:
// https://solutiondesign.com/blog/-/blogs/webgl-and-three-js-texture-mappi-1

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
let controls;
let pointLight;
let ambientLight;
let mesh;

const origin = new THREE.Vector3(0, 0, 0);

const SKIN_WIDTH = 64;
const SKIN_HEIGHT = 64;

function faceVectors(x, y, w, h) {
  // Convert to u/v orientation in pixels
  const uvPix = {
    x,
    y: SKIN_HEIGHT - y,
    w,
    h,
  };
  // Convert to u/v coordinates
  const uv = {
    x: uvPix.x / SKIN_WIDTH,
    y: uvPix.y / SKIN_HEIGHT,
    w: uvPix.w / SKIN_WIDTH,
    h: uvPix.h / SKIN_HEIGHT,
  };
  // Convert to points
  const points = {
    p1: { x: uv.x, y: uv.y },
    p2: { x: uv.x, y: uv.y - uv.h },
    p3: { x: uv.x + uv.w, y: uv.y - uv.h },
    p4: { x: uv.x + uv.w, y: uv.y },
  };
  // Create vectors
  const vectors = [
    new THREE.Vector2(points.p1.x, points.p1.y),
    new THREE.Vector2(points.p2.x, points.p2.y),
    new THREE.Vector2(points.p3.x, points.p3.y),
    new THREE.Vector2(points.p4.x, points.p4.y),
  ];
  return vectors;
}

function init() {
  const head = {
    front: faceVectors(8, 8, 8, 8),
    right: faceVectors(0, 8, 8, 8),
    left: faceVectors(16, 8, 8, 8),
    back: faceVectors(24, 8, 8, 8),
    top: faceVectors(8, 0, 8, 8),
    bottom: faceVectors(16, 0, 8, 8),
  };

  const geometry = new THREE.BoxGeometry(10, 10, 10);
  console.log(geometry.vertices[0]);
  geometry.vertices[0].x = 10;
  geometry.vertices[0].y = 10;
  geometry.vertices[0].z = 10;
  // geometry.vertices.forEach((vertex, i) => {
  //   if (i % 2) {
  //     vertex.x *= 3;
  //     vertex.y *= 3;
  //     vertex.z *= 3;
  //   }
  // });

  // Clear out any UV mapping that may have already existed on the cube
  geometry.faceVertexUvs[0] = [];

  geometry.faceVertexUvs[0][0] = [head.left[0], head.left[1], head.left[3]];
  geometry.faceVertexUvs[0][1] = [head.left[1], head.left[2], head.left[3]];

  geometry.faceVertexUvs[0][2] = [head.right[0], head.right[1], head.right[3]];
  geometry.faceVertexUvs[0][3] = [head.right[1], head.right[2], head.right[3]];

  geometry.faceVertexUvs[0][4] = [head.top[0], head.top[1], head.top[3]];
  geometry.faceVertexUvs[0][5] = [head.top[1], head.top[2], head.top[3]];

  geometry.faceVertexUvs[0][6] = [head.bottom[0], head.bottom[1], head.bottom[3]];
  geometry.faceVertexUvs[0][7] = [head.bottom[1], head.bottom[2], head.bottom[3]];

  geometry.faceVertexUvs[0][8] = [head.front[0], head.front[1], head.front[3]];
  geometry.faceVertexUvs[0][9] = [head.front[1], head.front[2], head.front[3]];

  geometry.faceVertexUvs[0][10] = [head.back[0], head.back[1], head.back[3]];
  geometry.faceVertexUvs[0][11] = [head.back[1], head.back[2], head.back[3]];

  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load('../../assets/textures/minecraft/skins/steve.png');

  // Keep the texture pixellated
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  const material = new THREE.MeshLambertMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  mesh = new THREE.Mesh(geometry, material);

  scene = new THREE.Scene();

  scene.add(mesh);

  gridHelper = new THREE.GridHelper(100, 10);
  scene.add(gridHelper);

  axisHelper = new THREE.AxisHelper(100);
  scene.add(axisHelper);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(20, 20, 20);
  camera.lookAt(origin);

  ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);

  pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);
}

function update() {
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();
animate();
