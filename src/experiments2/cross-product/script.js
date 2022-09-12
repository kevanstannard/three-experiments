import { THREE, Stats, windowResize } from "../../modules/three/r83";

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
  let orbitControls;
  let stats;
  let clock;

  let origin;

  let direction1;
  let direction1Arrow;

  let direction2;
  let direction2Arrow;

  let direction3;
  let direction3Arrow;

  let line;

  function Line() {
    this.start = new THREE.Vector3();
    this.end = new THREE.Vector3();
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
    });
    const geometry = new THREE.Geometry();
    geometry.vertices.push(this.start, this.end);
    THREE.Line.call(this, geometry, material);
  }

  Line.prototype = Object.assign(Object.create(THREE.Line.prototype), {
    constructor: Line,

    set(start, end) {
      this.start.copy(start);
      this.end.copy(end);
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

    scene = new THREE.Scene();

    gridHelper = new THREE.GridHelper(2, 4);
    scene.add(gridHelper);

    axisHelper = new THREE.AxisHelper(2);
    scene.add(axisHelper);

    origin = new THREE.Vector3(0, 0, 0);

    direction1 = new THREE.Vector3();
    direction1Arrow = new THREE.ArrowHelper(direction1, origin, 1, 0xff0000);
    scene.add(direction1Arrow);

    direction2 = new THREE.Vector3();
    direction2Arrow = new THREE.ArrowHelper(direction2, origin, 1, 0x00ff00);
    scene.add(direction2Arrow);

    direction3 = new THREE.Vector3();
    direction3Arrow = new THREE.ArrowHelper(direction3, origin, 1, 0x0000ff);
    scene.add(direction3Arrow);

    line = new Line();
    scene.add(line);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(3, 3, 3);
    camera.lookAt(origin);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);

    initStats();
  }

  function update() {
    const t = clock.getElapsedTime();
    const a = Math.sin(t / 10);
    const b = Math.cos(t / 10);

    direction1.set(a, 0, b).normalize();
    direction2.set(a, b, 0).normalize();
    direction3.crossVectors(direction1, direction2).normalize();

    direction1Arrow.setDirection(direction1);
    direction2Arrow.setDirection(direction2);
    direction3Arrow.setDirection(direction3);

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
