import { THREE, windowResize } from "../../modules/three/r83";

// Ref:
// https://github.com/mrdoob/three.js/wiki/Drawing-lines

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
  let line;

  const origin = new THREE.Vector3(0, 0, 0);

  function CircleLineGeometry(radius, segments, thetaStart, thetaLength) {
    const args = {
      radius: radius || 50,
      segments: segments || 8,
      thetaStart: thetaStart || 0,
      thetaLength: thetaLength || 2 * Math.PI,
    };
    const geometry = new THREE.Geometry();
    const delta =
      (args.thetaStart + args.thetaLength - args.thetaStart) / args.segments;
    for (let i = 0; i <= args.segments; i += 1) {
      const angle = args.thetaStart + delta * i;
      const x = args.radius * Math.cos(angle);
      const y = args.radius * Math.sin(angle);
      geometry.vertices.push(new THREE.Vector3(x, y, 0));
    }
    return geometry;
  }

  function init() {
    scene = new THREE.Scene();

    gridHelper = new THREE.GridHelper(100, 10);
    scene.add(gridHelper);

    axisHelper = new THREE.AxisHelper(100);
    scene.add(axisHelper);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(100, 100, 100);
    camera.lookAt(origin);

    const radius = 50;
    const segments = 32;
    const thetaStart = 0;
    const thetaLength = 2 * Math.PI;

    const geometry = new CircleLineGeometry(
      radius,
      segments,
      thetaStart,
      thetaLength
    );
    const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
    line = new THREE.Line(geometry, material);
    scene.add(line);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);
  }

  function update() {
    line.rotation.y += 0.01;
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
