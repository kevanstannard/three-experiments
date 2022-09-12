import { THREE, windowResize } from "../../modules/three/r83";

export function script() {
  const SCREEN_WIDTH = window.innerWidth;
  const SCREEN_HEIGHT = window.innerHeight;
  const VIEW_ANGLE = 45;
  const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
  const NEAR = 0.1;
  const FAR = 20000;

  let controls;
  let renderer;
  let scene;
  let camera;

  const origin = new THREE.Vector3(0, 0, 0);

  function renderGridHelper() {
    const gridHelper = new THREE.GridHelper(100, 10);
    scene.add(gridHelper);
  }

  function renderAxisHelper() {
    const axisHelper = new THREE.AxisHelper(100);
    scene.add(axisHelper);
  }

  function renderArrowHelper() {
    const arrowDir = new THREE.Vector3(3, 2, 1).normalize();
    const arrowLength = 100;
    const arrowColor = 0xffff00;
    const headLength = 12;
    const headWidth = 4;
    const arrowHelper = new THREE.ArrowHelper(
      arrowDir,
      origin,
      arrowLength,
      arrowColor,
      headLength,
      headWidth
    );
    scene.add(arrowHelper);
  }

  function init() {
    scene = new THREE.Scene();

    renderGridHelper();
    renderAxisHelper();
    renderArrowHelper();

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(200, 200, 200);
    camera.lookAt(origin);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  init();
  animate();
}
