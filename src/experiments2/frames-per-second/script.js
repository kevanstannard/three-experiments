import { THREE, Stats, windowResize } from "../../modules/three/r83";
import FPS from "./FPS";

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
  let pointLight;
  let ambientLight;
  let stats;
  let fps;
  let fpsEl;

  const origin = new THREE.Vector3(0, 0, 0);

  function initStats() {
    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "1em";
    stats.domElement.style.top = "4em";
    stats.setMode(0); // 0: fps, 1: ms
    document.getElementById("stats").appendChild(stats.domElement);
  }

  function init() {
    fps = new FPS();

    scene = new THREE.Scene();

    gridHelper = new THREE.GridHelper(100, 10);
    scene.add(gridHelper);

    axisHelper = new THREE.AxisHelper(100);
    scene.add(axisHelper);

    const count = 3000;
    for (let i = 0; i < count; i += 1) {
      const geometry = new THREE.BoxGeometry(5, 5, 5);
      const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
      const box = new THREE.Mesh(geometry, material);
      box.position.x = Math.random() * 200 - 100;
      box.position.y = Math.random() * 200 - 100;
      box.position.z = Math.random() * 200 - 100;
      scene.add(box);
    }

    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(50, 200, -100);
    scene.add(pointLight);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(200, 200, 200);
    camera.lookAt(origin);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);

    initStats();

    fpsEl = document.createElement("div");
    fpsEl.style.color = "white";
    fpsEl.style.position = "absolute";
    fpsEl.style.top = "150px";
    fpsEl.style.left = "1em";
    document.body.appendChild(fpsEl);
  }

  let prevTime;
  let currTime;

  function update() {
    fps.update();

    currTime = Math.floor(fps.elapsed);
    if (currTime !== prevTime) {
      fpsEl.innerHTML = `fps: ${Math.round(fps.fps)}<br />avg: ${Math.round(
        fps.fpsAverage
      )}`;
      prevTime = currTime;
    }

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
