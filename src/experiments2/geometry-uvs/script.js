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
  let controls;
  let ambientLight;
  let plane;

  const origin = new THREE.Vector3(0, 0, 0);

  const textures = {};

  function loadTexture(id, url) {
    return new Promise((resolve) => {
      const loader = new THREE.TextureLoader();
      loader.load(url, (texture) => {
        textures[id] = texture;
        resolve();
      });
    });
  }

  function load() {
    const promises = [];
    promises.push(loadTexture("free", "../../assets/textures/misc/free.jpg"));
    return Promise.all(promises);
  }

  function UVSizeAnimation(geometry) {
    this.geometry = geometry;
    this.original = geometry.clone();
    this.deltaMin = 0.5;
    this.deltaMax = 1;
    this.delta = this.deltaMax;
    this.speed = 0.005;
    this.direction = -1;
  }

  UVSizeAnimation.prototype = {
    updateDelta() {
      let newDelta = this.delta + this.speed * this.direction;
      if (newDelta < this.deltaMin) {
        newDelta = this.deltaMin;
        this.direction = 1;
      } else if (newDelta > this.deltaMax) {
        newDelta = this.deltaMax;
        this.direction = -1;
      }
      this.delta = newDelta;
    },
    update() {
      this.updateDelta();
      const triangles = this.original.faceVertexUvs[0];
      for (let i = 0; i < triangles.length; i += 1) {
        const tri = this.geometry.faceVertexUvs[0][i];
        const orig = this.original.faceVertexUvs[0][i];
        for (let j = 0; j < tri.length; j += 1) {
          tri[j].x = orig[j].x * this.delta;
          tri[j].y = orig[j].y * this.delta;
        }
      }
      this.geometry.uvsNeedUpdate = true;
    },
  };

  function AnimatedPlaneGeometry(size) {
    THREE.PlaneGeometry.call(this, size, size, 1);
    this.animation = new UVSizeAnimation(this);
  }

  AnimatedPlaneGeometry.prototype = Object.assign(
    Object.create(THREE.PlaneGeometry.prototype),
    {
      constructor: AnimatedPlaneGeometry,
      update() {
        this.animation.update();
      },
    }
  );

  function AnimatedPlane() {
    this.geometry = new AnimatedPlaneGeometry(100);
    this.material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: textures.free,
      // wireframe: true,
    });
    THREE.Mesh.call(this, this.geometry, this.material);
  }

  AnimatedPlane.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
    constructor: AnimatedPlane,
    update() {
      this.geometry.update();
    },
  });

  function init() {
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(100, 120, 140);
    camera.lookAt(origin);

    scene = new THREE.Scene();

    gridHelper = new THREE.GridHelper(100, 10);
    scene.add(gridHelper);

    axisHelper = new THREE.AxisHelper(100);
    scene.add(axisHelper);

    plane = new AnimatedPlane();
    scene.add(plane);

    // console.log(plane.geometry);

    // console.log(geometry);
    // console.log(JSON.stringify(geometry.faceVertexUvs, null, 2));

    // geometry.vertices
    //
    // [
    //   {
    //     "x": -50,
    //     "y": 50,
    //     "z": 0
    //   },
    //   {
    //     "x": 50,
    //     "y": 50,
    //     "z": 0
    //   },
    //   {
    //     "x": -50,
    //     "y": -50,
    //     "z": 0
    //   },
    //   {
    //     "x": 50,
    //     "y": -50,
    //     "z": 0
    //   }
    // ]

    // geometry.faceVertexUvs
    //
    // [
    //   [
    //     [
    //       {
    //         "x": 0,
    //         "y": 1
    //       },
    //       {
    //         "x": 0,
    //         "y": 0
    //       },
    //       {
    //         "x": 1,
    //         "y": 1
    //       }
    //     ],
    //     [
    //       {
    //         "x": 0,
    //         "y": 0
    //       },
    //       {
    //         "x": 1,
    //         "y": 0
    //       },
    //       {
    //         "x": 1,
    //         "y": 1
    //       }
    //     ]
    //   ]
    // ]

    // geometry.faces
    // [
    //   {
    //     "a": 0,
    //     "b": 2,
    //     "c": 1,
    //     "normal": {
    //       "x": 0,
    //       "y": 0,
    //       "z": 1
    //     },
    //     "vertexNormals": [
    //       {
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //       },
    //       {
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //       },
    //       {
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //       }
    //     ],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 0
    //   },
    //   {
    //     "a": 2,
    //     "b": 3,
    //     "c": 1,
    //     "normal": {
    //       "x": 0,
    //       "y": 0,
    //       "z": 1
    //     },
    //     "vertexNormals": [
    //       {
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //       },
    //       {
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //       },
    //       {
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //       }
    //     ],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 0
    //   }
    // ]

    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);
  }

  function update() {
    plane.update();
    controls.update();
  }

  function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
  }

  load().then(() => {
    init();
    animate();
  });
}
