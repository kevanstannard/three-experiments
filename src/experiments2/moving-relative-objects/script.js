import { THREE, windowResize } from "../../modules/three/r83";

export function script() {
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
  let object;

  const origin = new THREE.Vector3(0, 0, 0);

  const sphereSize = 20;

  function init() {
    scene = new THREE.Scene();

    gridHelper = new THREE.GridHelper(100, 10);
    scene.add(gridHelper);

    axisHelper = new THREE.AxisHelper(100);
    scene.add(axisHelper);

    const geometry = new THREE.SphereGeometry(10, 32, 32);
    const material = new THREE.MeshNormalMaterial();

    object = new THREE.Object3D();

    const mid = new THREE.Mesh(geometry, material);

    const top = new THREE.Mesh(geometry, material);
    top.position.y = sphereSize;
    top.move = { x: 0, y: 1, z: 0 };

    const bottom = new THREE.Mesh(geometry, material);
    bottom.position.y = -sphereSize;
    bottom.move = { x: 0, y: -1, z: 0 };

    const left = new THREE.Mesh(geometry, material);
    left.position.x = sphereSize;
    left.move = { x: 1, y: 0, z: 0 };

    const right = new THREE.Mesh(geometry, material);
    right.position.x = -sphereSize;
    right.move = { x: -1, y: 0, z: 0 };

    object.add(mid);
    object.add(top);
    object.add(bottom);
    object.add(left);
    object.add(right);

    scene.add(object);

    ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 200, 200);
    camera.lookAt(origin);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);
  }

  const radius = 40;
  let theta = 0;

  function update() {
    // Children
    object.children.forEach((child) => {
      if (child.move) {
        child.position.x =
          child.move.x * sphereSize +
          child.move.x * sphereSize * Math.sin(theta);
        child.position.y =
          child.move.y * sphereSize +
          child.move.y * sphereSize * Math.sin(theta);
        child.position.z =
          child.move.z * sphereSize +
          child.move.z * sphereSize * Math.sin(theta);
      }
    });

    // Object
    theta += 0.02;
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    const z = 0;
    object.position.set(x, y, z);

    // Controls
    controls.update();
  }

  function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
  }

  init();
  animate();
}
