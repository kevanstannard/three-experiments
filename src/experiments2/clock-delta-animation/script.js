import { THREE, Stats, windowResize } from "../../modules/three/r83";

export function script() {
  const SCREEN_WIDTH = window.innerWidth;
  const SCREEN_HEIGHT = window.innerHeight;
  const VIEW_ANGLE = 45;
  const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
  const NEAR = 1;
  const FAR = 500;

  let scene;
  let camera;
  let renderer;
  let axisHelper;
  let gridHelper;
  let orbitControls;
  let stats;
  let clock;
  let cube1;
  let cube2;
  let cube3;
  let cube4;
  let cube5;

  const origin = new THREE.Vector3(0, 0, 0);

  function Cube(rotationPerSecond) {
    this.rotationPerSecond = rotationPerSecond || Math.PI / 2;
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshNormalMaterial();
    THREE.Mesh.call(this, geometry, material);
  }

  Cube.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
    constructor: Cube,
    update(delta) {
      const rotation = this.rotationPerSecond * delta;
      this.rotation.z += rotation;
    },
  });

  function initStats() {
    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "auto";
    stats.domElement.style.top = "0px";
    stats.domElement.style.right = "0px";
    stats.setMode(0); // 0: fps, 1: ms
    document.getElementById("stats").appendChild(stats.domElement);
  }

  function init() {
    clock = new THREE.Clock();
    clock.start();

    scene = new THREE.Scene();

    gridHelper = new THREE.GridHelper(50, 10);
    scene.add(gridHelper);

    axisHelper = new THREE.AxisHelper(20);
    scene.add(axisHelper);

    cube1 = new Cube(Math.PI);
    cube1.position.set(-40, 0, 0);
    scene.add(cube1);

    cube2 = new Cube(Math.PI / 2);
    cube2.position.set(-20, 0, 0);
    scene.add(cube2);

    cube3 = new Cube(Math.PI / 4);
    cube3.position.set(0, 0, 0);
    scene.add(cube3);

    cube4 = new Cube(Math.PI / 8);
    cube4.position.set(20, 0, 0);
    scene.add(cube4);

    cube5 = new Cube(Math.PI / 16);
    cube5.position.set(40, 0, 0);
    scene.add(cube5);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(50, 50, 50);
    camera.lookAt(origin);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);

    initStats();
  }

  function update() {
    const delta = clock.getDelta();
    cube1.update(delta);
    cube2.update(delta);
    cube3.update(delta);
    cube4.update(delta);
    cube5.update(delta);
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
}
