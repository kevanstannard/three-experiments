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
  // let geometry;
  // let material;
  // let mesh;
  let controls;
  let pointLight;
  // let ambientLight;

  // const origin = new THREE.Vector3(0, 0, 0);

  function init() {
    scene = new THREE.Scene();

    gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    axisHelper = new THREE.AxisHelper(10);
    scene.add(axisHelper);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(15, 10, 15);
    // camera.lookAt(origin);

    // geometry = new THREE.BoxGeometry(50, 50, 50);
    // material = new THREE.MeshLambertMaterial({ color: 0x888888 });
    // mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

    // ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    // scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xffffff, 1, 500);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const texture = new THREE.Texture();
    const textureLoader = new THREE.ImageLoader();
    textureLoader.load("assets/textures/misc/uv_grid_sm.jpg", (image) => {
      texture.image = image;
      texture.needsUpdate = true;
    });

    const loader = new THREE.OBJLoader();
    loader.load("assets/objects/minecraft-tree.obj", (object) => {
      // object.traverse((child) => {
      //   if (child instanceof THREE.Mesh) {
      //     child.material.map = texture;
      //   }
      // });
      object.position.set(0, 4, 0);
      object.scale.set(0.01, 0.01, 0.01);
      scene.add(object);
      camera.lookAt(object.position);
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);
  }

  function update() {
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
