import { THREE, Stats, DatGUI, windowResize } from "../../modules/three/r83";

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
  let mesh;
  let controls;
  let stats;

  const origin = new THREE.Vector3(0, 0, 0);

  function initStats() {
    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "1em";
    stats.domElement.style.top = "4em";
    stats.setMode(0); // 0: fps, 1: ms
    document.getElementById("stats").appendChild(stats.domElement);
  }

  function initControls() {
    controls = {
      xRotation: 0,
      yRotation: 0,
      zRotation: 0,
    };
    const gui = new DatGUI.GUI();
    gui.add(controls, "xRotation", 0, Math.PI * 2);
    gui.add(controls, "yRotation", 0, Math.PI * 2);
    gui.add(controls, "zRotation", 0, Math.PI * 2);
  }

  function init() {
    scene = new THREE.Scene();

    gridHelper = new THREE.GridHelper(100, 10);
    scene.add(gridHelper);

    axisHelper = new THREE.AxisHelper(100);
    scene.add(axisHelper);

    // Vertices of a 4 sided pyramid
    const vertices = [
      new THREE.Vector3(30, 0, 0),
      new THREE.Vector3(0, 0, 30),
      new THREE.Vector3(-30, 0, 0),
      new THREE.Vector3(0, 0, -30),
      new THREE.Vector3(0, 30, 0),
    ];

    // Anti-clockwise = outer face
    // Clockwise = inner face
    const faces = [
      new THREE.Face3(4, 1, 0),
      new THREE.Face3(4, 2, 1),
      new THREE.Face3(4, 3, 2),
      new THREE.Face3(4, 0, 3),
      new THREE.Face3(1, 2, 3),
      new THREE.Face3(3, 0, 1),
    ];

    const geometry = new THREE.Geometry();
    geometry.vertices = vertices;
    geometry.faces = faces;
    geometry.computeFaceNormals();

    const material = new THREE.MeshLambertMaterial({
      opacity: 0.5,
      color: 0x44ff44,
      transparent: true,
      side: THREE.DoubleSide,
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 20, 0);
    scene.add(mesh);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(50, 200, -100);
    scene.add(pointLight);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(100, 100, 100);
    camera.lookAt(origin);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);

    initStats();
    initControls();
  }

  function update() {
    mesh.rotation.set(
      (mesh.rotation.x = controls.xRotation),
      (mesh.rotation.y = controls.yRotation),
      (mesh.rotation.z = controls.zRotation)
    );
    stats.update();
    orbitControls.update();
  }

  function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
  }

  init();
  animate();
}
