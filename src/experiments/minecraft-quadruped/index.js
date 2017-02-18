import { merge } from 'lodash';

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
let stats;
let mesh;
let helper;

// const origin = new THREE.Vector3(0, 0, 0);

const quadruped = {
  bones: [
    {
      name: 'body',
      pivot: [0.0, 19.0, 2.0],
      cubes: [
        {
          origin: [-5.0, 13.0, -5.0],
          size: [10, 16, 8],
          uv: [28, 8],
        },
      ],
    },
    {
      name: 'head',
      pivot: [0.0, 18.0, -6.0],
      cubes: [
        {
          origin: [-4.0, 14.0, -14.0],
          size: [8, 8, 8],
          uv: [0, 0],
        },
      ],
    },
    {
      name: 'leg0',
      pivot: [-3.0, 12.0, 7.0],
      cubes: [
        {
          origin: [-5.0, 0.0, 5.0],
          size: [4, 12, 4],
          uv: [0, 16],
        },
      ],
    },
    {
      name: 'leg1',
      pivot: [3.0, 12.0, 7.0],
      cubes: [
        {
          origin: [1.0, 0.0, 5.0],
          size: [4, 12, 4],
          uv: [0, 16],
        },
      ],
    },
    {
      name: 'leg2',
      pivot: [-3.0, 12.0, -5.0],
      cubes: [
        {
          origin: [-5.0, 0.0, -7.0],
          size: [4, 12, 4],
          uv: [0, 16],
        },
      ],
    },
    {
      name: 'leg3',
      pivot: [3.0, 12.0, -5.0],
      cubes: [
        {
          origin: [1.0, 0.0, -7.0],
          size: [4, 12, 4],
          uv: [0, 16],
        },
      ],
    },
  ],
};

const cow = {
  texturewidth: 64,
  textureheight: 32,
  bones: [
    {
      name: 'body',
      reset: true,
      pivot: [0.0, 19.0, 2.0],
      cubes: [
        {
          origin: [-6.0, 11.0, -5.0],
          size: [12, 18, 10],
          uv: [18, 4],
        },
        {
          origin: [-2.0, 11.0, -6.0],
          size: [4, 6, 1],
          uv: [52, 0],
        },
      ],
    },
    {
      name: 'head',
      reset: true,
      pivot: [0.0, 20.0, -8.0],
      cubes: [
        {
          origin: [-4.0, 16.0, -14.0],
          size: [8, 8, 6],
          uv: [0, 0],
        },
        {
          origin: [-5.0, 22.0, -12.0],
          size: [1, 3, 1],
          uv: [22, 0],
        },
        {
          origin: [4.0, 22.0, -12.0],
          size: [1, 3, 1],
          uv: [22, 0],
        },
      ],
    },
    {
      name: 'leg0',
      pivot: [-4.0, 12.0, 7.0],
    },
    {
      name: 'leg1',
      pivot: [4.0, 12.0, 7.0],
    },
    {
      name: 'leg2',
      pivot: [-4.0, 12.0, -6.0],
    },
    {
      name: 'leg3',
      pivot: [4.0, 12.0, -6.0],
    },
  ],
};

const cowMerged = {};

// Replace bones when reset === true
// This only works when the parent and child have the same number of bones
const cowMergedBones = [];
for (let i = 0; i < cow.bones.length; i += 1) {
  const quadBone = quadruped.bones[i];
  const cowBone = cow.bones[i];
  if (cowBone.reset) {
    cowMergedBones.push(cowBone);
  } else {
    cowMergedBones.push(merge({}, quadBone, cowBone));
  }
}
cowMerged.bones = cowMergedBones;

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

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(40, 40, -40);

  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.target = new THREE.Vector3(0, 15, 0);

  THREEx.WindowResize(renderer, camera);

  document.body.appendChild(renderer.domElement);

  initStats();

  // const gridHelper = new THREE.GridHelper(100, 10);
  // scene.add(gridHelper);

  const axisHelper = new THREE.AxisHelper(20);
  axisHelper.material.transparent = true;
  axisHelper.material.opacity = 0.5;
  scene.add(axisHelper);

  // const geometry = new THREE.BoxGeometry(50, 50, 50);
  // const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  // mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
  pointLight.position.set(50, 200, -100);
  scene.add(pointLight);

  const bones = [];
  const geometry = new THREE.Geometry();
  cowMerged.bones.forEach((geometryBone, boneIndex) => {
    const pivot = geometryBone.pivot;
    // console.log(pivot);
    const cubes = geometryBone.cubes;
    const bone = new THREE.Bone();
    bone.position.set(pivot[0], pivot[1], pivot[2]);
    cubes.forEach((cube) => {
      const size = cube.size;
      const origin = cube.origin;
      const width = size[0];
      const height = size[1];
      const depth = size[2];
      const xoff = width / 2;
      const yoff = height / 2;
      const zoff = depth / 2;
      const x = origin[0] + xoff;
      const y = origin[1] + yoff;
      const z = origin[2] + zoff;
      const boxGeometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
      // console.log(boxGeometry.vertices);
      boxGeometry.vertices.forEach((vertex) => {
        vertex.hello = 'world';
      });
      boxGeometry.translate(x, y, z);
      geometry.merge(boxGeometry);
      for (let i = 0; i < boxGeometry.vertices.length; i += 1) {
        geometry.skinIndices.push(new THREE.Vector4(boneIndex, 0, 0, 0));
        geometry.skinWeights.push(new THREE.Vector4(1, 0, 0, 0));
      }
    });
    bones.push(bone);
  });

  const skeleton = new THREE.Skeleton(bones);

  const material = new THREE.MeshStandardMaterial({
    skinning: true,
    wireframe: true,
    // metalness: 0,
    // side: THREE.DoubleSide,
    // roughness: 1,
    // transparent: true,
    // opacity: 0.25,
  });

  mesh = new THREE.SkinnedMesh(geometry, material);

  bones.forEach((bone) => {
    mesh.add(bone);
  });

  mesh.bind(skeleton);

  // ???????????????????????????????????????????
  // For some reason the data has the body at an
  // odd orentation. Fixing that here.
  bones[0].rotation.x = -Math.PI / 2;

  scene.add(mesh);

  helper = new THREE.SkeletonHelper(mesh);
  helper.material.linewidth = 4; // Not working ?
  scene.add(helper);

  // var geometry = new THREE.SphereGeometry( 5, 32, 32 );
  // var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  // var sphere = new THREE.Mesh( geometry, material );
  // scene.add( sphere );

  const pivots = new THREE.Group();
  const pivotMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
  bones.forEach((bone) => {
    // console.log(bone.position);
    const pivotGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    pivotGeometry.translate(bone.position.x, bone.position.y, bone.position.z);
    const pivot = new THREE.Mesh(pivotGeometry, pivotMaterial);
    pivots.add(pivot);
  });

  mesh.add(pivots);

  // const loader = new THREE.TextureLoader();
  // loader.load('cow.png', (texture) => {
  //   console.log(texture);
  //   console.log(mesh.geometry);
  // });
}

function update() {
  const time = Date.now() * 0.002;
  const angle = Math.sin(time);

  const bones = mesh.skeleton.bones;
  bones[1].rotation.y = (Math.PI * angle) / 8; // Head
  bones[2].rotation.x = (Math.PI * angle) / 16; // Leg 0
  bones[3].rotation.x = -(Math.PI * angle) / 16; // Leg 1
  bones[4].rotation.x = (Math.PI * angle) / 16; // Leg 2
  bones[5].rotation.x = -(Math.PI * angle) / 16; // Leg 3

  helper.update();
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
