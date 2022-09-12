import { THREE, Stats, windowResize } from "../../modules/three/r83";

export function script() {
  const SCREEN_WIDTH = window.innerWidth;
  const SCREEN_HEIGHT = window.innerHeight;
  const VIEW_ANGLE = 45;
  const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
  const NEAR = 1;
  const FAR = 100;

  let scene;
  let camera;
  let renderer;
  let gridHelper;
  let orbitControls;
  let stats;

  const origin = new THREE.Vector3();

  function Vector3Helper(vector, color) {
    THREE.AxisHelper.call(this, 2);
    this.material.transparent = true;
    this.material.opacity = 0.5;
    //
    this.vector = vector;
    this.length = vector.length();
    this.vectorUnit = vector.clone().normalize();
    const arrow = new THREE.ArrowHelper(
      this.vectorUnit,
      origin,
      this.length,
      color
    );
    this.add(arrow);
  }

  Vector3Helper.prototype = Object.assign(
    Object.create(THREE.AxisHelper.prototype),
    {
      constructor: Vector3Helper,
    }
  );

  // function Matrix3Helper(m) {
  //   THREE.Object3D.call(this);
  //   const e = m.elements;
  //   this.v1 = new THREE.Vector3(e[0], e[1], e[2]);
  //   this.v2 = new THREE.Vector3(e[3], e[4], e[5]);
  //   this.v3 = new THREE.Vector3(e[6], e[7], e[8]);
  //   this.v1Normal = this.v1.clone().normalize();
  //   this.v2Normal = this.v2.clone().normalize();
  //   this.v3Normal = this.v3.clone().normalize();
  //   this.v1Arrow = new THREE.ArrowHelper(this.v1Normal, this.position, this.v1.length(), 0xff0000);
  //   this.v2Arrow = new THREE.ArrowHelper(this.v2Normal, this.position, this.v2.length(), 0x00ff00);
  //   this.v3Arrow = new THREE.ArrowHelper(this.v3Normal, this.position, this.v3.length(), 0x0000ff);
  //   this.add(this.v1Arrow);
  //   this.add(this.v2Arrow);
  //   this.add(this.v3Arrow);
  // }
  //
  // Matrix3Helper.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
  //   constructor: Matrix3Helper,
  // });

  function Matrix3Helper(m) {
    THREE.AxisHelper.call(this, 2);
    this.material.transparent = true;
    this.material.opacity = 0.5;
    //
    const e = m.elements;
    this.v1 = new THREE.Vector3(e[0], e[1], e[2]);
    this.v2 = new THREE.Vector3(e[3], e[4], e[5]);
    this.v3 = new THREE.Vector3(e[6], e[7], e[8]);
    this.v1Normal = this.v1.clone().normalize();
    this.v2Normal = this.v2.clone().normalize();
    this.v3Normal = this.v3.clone().normalize();
    this.v1Arrow = new THREE.ArrowHelper(
      this.v1Normal,
      this.position,
      this.v1.length(),
      0xff0000
    );
    this.v2Arrow = new THREE.ArrowHelper(
      this.v2Normal,
      this.position,
      this.v2.length(),
      0x00ff00
    );
    this.v3Arrow = new THREE.ArrowHelper(
      this.v3Normal,
      this.position,
      this.v3.length(),
      0x0000ff
    );
    this.add(this.v1Arrow);
    this.add(this.v2Arrow);
    this.add(this.v3Arrow);
  }

  Matrix3Helper.prototype = Object.assign(
    Object.create(THREE.AxisHelper.prototype),
    {
      constructor: Matrix3Helper,
    }
  );

  const v = new THREE.Vector3(1, 1, 1);
  const vHelper = new Vector3Helper(v, 0xff7700);
  vHelper.position.x = -3;

  const m = new THREE.Matrix3()
    // .set(
    //   -1, -1, -1,
    //   0, 1, 0,
    //   0, 0, 1,
    // );
    .set(0, -1, 0, 1, 0, 0, 0, 0, 1);

  const mHelper = new Matrix3Helper(m);

  const result = v.clone();
  result.applyMatrix3(m);
  const resultHelper = new Vector3Helper(result, 0xffff00);
  resultHelper.position.x = 3;

  console.log("v", v);
  console.log("m", m.elements);
  console.log("result", result);

  function initStats() {
    stats = new Stats();
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "20px";
    stats.setMode(0); // 0: fps, 1: ms
    document.getElementById("stats").appendChild(stats.domElement);
  }

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 4, 4);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);

    initStats();

    gridHelper = new THREE.GridHelper(10, 10);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.2;
    scene.add(gridHelper);

    scene.add(vHelper);
    scene.add(mHelper);
    scene.add(resultHelper);
  }

  function update() {
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
