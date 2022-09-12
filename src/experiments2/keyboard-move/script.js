import { THREE, windowResize, KeyboardState } from "../../modules/three/r83";

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
  let pointLight;
  let ambientLight;
  let keyboard;
  let mesh;

  const key = {
    FORWARD: "W",
    BACKWARD: "S",
    LEFT: "A",
    RIGHT: "D",
    UP: "space",
    DOWN: "shift",
  };

  const origin = new THREE.Vector3(0, 0, 0);

  function init() {
    keyboard = new KeyboardState();

    scene = new THREE.Scene();

    gridHelper = new THREE.GridHelper(1000, 50);
    scene.add(gridHelper);

    axisHelper = new THREE.AxisHelper(100);
    scene.add(axisHelper);

    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshLambertMaterial({ color: 0x888888 });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 200, 200);
    camera.lookAt(origin);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);
  }

  function update() {
    keyboard.update();
    // keyboard.debug();

    if (keyboard.pressed(key.LEFT)) {
      mesh.position.x -= 1;
    }
    if (keyboard.pressed(key.RIGHT)) {
      mesh.position.x += 1;
    }
    if (keyboard.pressed(key.FORWARD)) {
      mesh.position.z -= 1;
    }
    if (keyboard.pressed(key.BACKWARD)) {
      mesh.position.z += 1;
    }
    if (keyboard.pressed(key.UP)) {
      mesh.position.y += 1;
    }
    if (keyboard.pressed(key.DOWN)) {
      mesh.position.y -= 1;
    }

    camera.lookAt(mesh.position);
  }

  function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
  }

  init();
  animate();
}
