import { THREE, windowResize } from "../../modules/three/r92";

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

  let directionVectorAngle = 0;
  let directionVectorHelper;
  const directionVectorRadius = 50;
  const directionVector = new THREE.Vector3(1, 1, 1).normalize();

  let box1;
  let box2;

  const origin = new THREE.Vector3(0, 0, 0);

  function Box(size) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    THREE.Mesh.call(this, geometry, material);

    // Define a vector in world coordinates for this box to look at
    this.lookAtVector = new THREE.Vector3();

    // Set the initial direction of the arrow
    // This MUST have the  correct orientation for the initial box
    // so that when the box is rotated, then this arrow will rotate with it
    const direction = new THREE.Vector3(0, 0, 1);

    // Create a vector to hold the arrows position
    const position = new THREE.Vector3();

    // Create the arrow
    this.arrow = new THREE.ArrowHelper(direction, position, size, 0xffffff);

    // And make it a child of the box
    this.add(this.arrow);
  }

  Box.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
    constructor: Box,

    setDirection(vector) {
      this.lookAtVector.set(
        this.position.x + vector.x,
        this.position.y + vector.y,
        this.position.z + vector.z
      );
      this.lookAt(this.lookAtVector);
    },
  });

  function init() {
    scene = new THREE.Scene();

    gridHelper = new THREE.GridHelper(100, 10);
    scene.add(gridHelper);

    axisHelper = new THREE.AxisHelper(100);
    scene.add(axisHelper);

    directionVectorHelper = new THREE.ArrowHelper(directionVector, origin, 50);
    scene.add(directionVectorHelper);

    box1 = new Box(20);
    box1.position.set(50, 50, 0);
    scene.add(box1);

    box2 = new Box(30);
    box2.position.set(0, 50, 50);
    scene.add(box2);

    ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(150, 150, 150);
    camera.lookAt(origin);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);
  }

  function updateBoxes() {
    box1.setDirection(directionVector);
    box2.setDirection(directionVector);
  }

  function updateDirectionVector() {
    directionVectorAngle += 0.01;
    const x = directionVectorRadius * Math.cos(directionVectorAngle);
    const y = directionVectorRadius * Math.sin(directionVectorAngle);
    const z =
      directionVectorRadius *
      Math.sin(directionVectorAngle) *
      Math.cos(directionVectorAngle);
    directionVector.set(x, y, z).normalize();
    directionVectorHelper.setDirection(directionVector);
  }

  function update() {
    updateDirectionVector();
    updateBoxes();
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
