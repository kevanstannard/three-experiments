const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene;
let camera;
let renderer;
let orbit;
let stats;
let lights;
let helper;
let mesh;
let bones;
let boneIndexes;

const origin = new THREE.Vector3(0, 0, 0);

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

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(10, 10, 20);
  camera.lookAt(origin);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  orbit = new THREE.OrbitControls(camera, renderer.domElement);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  // const gridHelper = new THREE.GridHelper(40, 10);
  // scene.add(gridHelper);

  const axisHelper = new THREE.AxisHelper(2);
  scene.add(axisHelper);

  lights = [];
  lights[0] = new THREE.PointLight(0xffffff, 1);
  lights[1] = new THREE.PointLight(0xffffff, 1);
  // lights[2] = new THREE.PointLight(0xffffff, 1);

  lights[0].position.set(200, 300, 400);
  lights[1].position.set(-200, -300, -400);
  // lights[2].position.set(-400, 500, 500);

  scene.add(lights[0]);
  scene.add(lights[1]);
  // scene.add(lights[2]);

  const bodyBone = new THREE.Bone();
  const chestBone = new THREE.Bone();
  const hipBone = new THREE.Bone();

  bodyBone.add(chestBone);
  bodyBone.add(hipBone);

  chestBone.position.set(0, 4, 0);
  hipBone.position.set(0, -4, 0);

  bones = [];
  bones.push(bodyBone);
  bones.push(chestBone);
  bones.push(hipBone);

  boneIndexes = {
    BODY_BONE: 0,
    CHEST_BONE: 1,
    HIP_BONE: 2,
  };

  const skeleton = new THREE.Skeleton(bones);

  const params = {
    width: 8,
    height: 12,
    depth: 4,
    widthSegments: 1,
    heightSegments: 2,
    depthSegments: 1,
  };

  const geometry = new THREE.BoxGeometry(
    params.width,
    params.height,
    params.depth,
    params.widthSegments,
    params.heightSegments,
    params.depthSegments,
  );

  const shoulderPos = params.height / 2;
  const waistPos = -params.height / 2;

  geometry.vertices.forEach((vertex) => {
    if (vertex.y === shoulderPos) { // Shoulder
      geometry.skinIndices.push(new THREE.Vector4(boneIndexes.CHEST_BONE, 0, 0, 0));
      geometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));
    } else if (vertex.y === waistPos) { // Waist
      geometry.skinIndices.push(new THREE.Vector4(boneIndexes.HIP_BONE, 0, 0, 0));
      geometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));
    } else {
      geometry.skinIndices.push(new THREE.Vector4(
        boneIndexes.CHEST_BONE, boneIndexes.HIP_BONE, 0, 0,
      ));
      geometry.skinWeights.push(new THREE.Vector4(
        0.5, 0.5, 0, 0,
      ));
    }
  });

  const material = new THREE.MeshStandardMaterial({
    skinning: true,
    // wireframe: true,
    color: 0x0088ff,
    metalness: 0,
    roughness: 1,
  });

  mesh = new THREE.SkinnedMesh(geometry, material);

  mesh.add(bodyBone);
  mesh.bind(skeleton);

  scene.add(mesh);

  helper = new THREE.SkeletonHelper(mesh);
  scene.add(helper);
}

function update() {
  const time = Date.now() * 0.001;
  const angle = Math.sin(time);

  const skeletonBones = mesh.skeleton.bones;

  skeletonBones[boneIndexes.CHEST_BONE].rotation.y = (Math.PI * angle) / 8;
  skeletonBones[boneIndexes.HIP_BONE].rotation.y = -(Math.PI * angle) / 8;

  helper.update();
  stats.update();
  orbit.update();
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
