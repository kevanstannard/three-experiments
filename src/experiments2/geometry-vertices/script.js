import { THREE, windowResize } from "../../modules/three/r83";
import { loadFonts } from "../../modules/fonts";

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
  let fonts;
  let box;

  const origin = new THREE.Vector3(0, 0, 0);

  function load() {
    return loadFonts().then((theFonts) => {
      fonts = theFonts;
    });
  }

  function VerticesAnimation(geometry) {
    this.geometry = geometry;
    this.original = geometry.clone();
    this.vertexIndex = 0;
    this.theta = 0;
  }

  VerticesAnimation.prototype = {
    update() {
      this.theta += 0.1;
      if (this.theta > Math.PI) {
        this.theta = 0;
        this.vertexIndex =
          (this.vertexIndex + 1) % this.geometry.vertices.length;
      }
      const orig = this.original.vertices[this.vertexIndex];
      const curr = this.geometry.vertices[this.vertexIndex];
      const delta = Math.sin(this.theta);
      curr.x = orig.x + orig.x * delta;
      curr.y = orig.y + orig.y * delta;
      curr.z = orig.z + orig.z * delta;
      this.geometry.verticesNeedUpdate = true;
    },
  };

  function AnimatedBoxGeometry(
    width,
    height,
    depth,
    widthSegments,
    heightSegments,
    depthSegments
  ) {
    THREE.BoxGeometry.call(
      this,
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments
    );
    this.animation = new VerticesAnimation(this);
  }

  AnimatedBoxGeometry.prototype = Object.assign(
    Object.create(THREE.BoxGeometry.prototype),
    {
      constructor: AnimatedBoxGeometry,

      update() {
        this.animation.update();
      },
    }
  );

  function Label(text) {
    const params = {
      font: fonts.helvetiker_regular,
      size: 5,
      height: 1, // Thickness
    };
    const geometry = new THREE.TextGeometry(text, params);
    const material = new THREE.MeshNormalMaterial();
    THREE.Mesh.call(this, geometry, material);
  }

  Label.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
    constructor: Label,
  });

  function AnimatedBox(size, _camera) {
    this.camera = _camera;
    this.geometry = new AnimatedBoxGeometry(size, size, size);
    this.material = new THREE.MeshNormalMaterial({ wireframe: true });
    THREE.Mesh.call(this, this.geometry, this.material);

    const vertices = this.geometry.vertices;

    this.labels = [];
    for (let i = 0; i < vertices.length; i += 1) {
      const label = new Label(String(i));
      label.position.copy(vertices[i]);
      this.labels.push(label);
      this.add(label);
    }
  }

  AnimatedBox.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
    constructor: AnimatedBox,

    update() {
      this.geometry.update();
      for (let i = 0; i < this.geometry.vertices.length; i += 1) {
        this.labels[i].position.copy(this.geometry.vertices[i]);
        this.labels[i].lookAt(this.camera.position);
      }
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

    box = new AnimatedBox(50, camera);
    scene.add(box);

    // vertices
    //
    // [
    //   {"x":5,"y":5,"z":5},       // 0
    //   {"x":5,"y":5,"z":-5},      // 1
    //   {"x":5,"y":-5,"z":5},      // 2
    //   {"x":5,"y":-5,"z":-5},     // 3
    //   {"x":-5,"y":5,"z":-5},     // 4
    //   {"x":-5,"y":5,"z":5},      // 5
    //   {"x":-5,"y":-5,"z":-5},    // 6
    //   {"x":-5,"y":-5,"z":5},     // 7
    // ]
    //
    // Faces
    //
    // [{
    //     "a": 0,                  // {"x":5,"y":5,"z":5}
    //     "b": 2,                  // {"x":5,"y":-5,"z":5}
    //     "c": 1,                  // {"x":5,"y":5,"z":-5}
    //     "normal": {
    //         "x": 1,
    //         "y": 0,
    //         "z": 0
    //     },
    //     "vertexNormals": [{
    //         "x": 1,
    //         "y": 0,
    //         "z": 0
    //      }, {
    //         "x": 1,
    //         "y": 0,
    //         "z": 0
    //     }, {
    //         "x": 1,
    //         "y": 0,
    //         "z": 0
    //     }],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 0
    // }, {
    //     "a": 2,
    //     "b": 3,
    //     "c": 1,
    //     "normal": {
    //         "x": 1,
    //         "y": 0,
    //         "z": 0
    //     },
    //     "vertexNormals": [{
    //         "x": 1,
    //         "y": 0,
    //         "z": 0
    //     }, {
    //         "x": 1,
    //         "y": 0,
    //         "z": 0
    //     }, {
    //         "x": 1,
    //         "y": 0,
    //         "z": 0
    //     }],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 0
    // }, {
    //     "a": 4,
    //     "b": 6,
    //     "c": 5,
    //     "normal": {
    //         "x": -1,
    //         "y": 0,
    //         "z": 0
    //     },
    //     "vertexNormals": [{
    //         "x": -1,
    //         "y": 0,
    //         "z": 0
    //     }, {
    //         "x": -1,
    //         "y": 0,
    //         "z": 0
    //     }, {
    //         "x": -1,
    //         "y": 0,
    //         "z": 0
    //     }],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 1
    // }, {
    //     "a": 6,
    //     "b": 7,
    //     "c": 5,
    //     "normal": {
    //         "x": -1,
    //         "y": 0,
    //         "z": 0
    //     },
    //     "vertexNormals": [{
    //         "x": -1,
    //         "y": 0,
    //         "z": 0
    //     }, {
    //         "x": -1,
    //         "y": 0,
    //         "z": 0
    //     }, {
    //         "x": -1,
    //         "y": 0,
    //         "z": 0
    //     }],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 1
    // }, {
    //     "a": 4,
    //     "b": 5,
    //     "c": 1,
    //     "normal": {
    //         "x": 0,
    //         "y": 1,
    //         "z": 0
    //     },
    //     "vertexNormals": [{
    //         "x": 0,
    //         "y": 1,
    //         "z": 0
    //     }, {
    //         "x": 0,
    //         "y": 1,
    //         "z": 0
    //     }, {
    //         "x": 0,
    //         "y": 1,
    //         "z": 0
    //     }],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 2
    // }, {
    //     "a": 5,
    //     "b": 0,
    //     "c": 1,
    //     "normal": {
    //         "x": 0,
    //         "y": 1,
    //         "z": 0
    //     },
    //     "vertexNormals": [{
    //         "x": 0,
    //         "y": 1,
    //         "z": 0
    //     }, {
    //         "x": 0,
    //         "y": 1,
    //         "z": 0
    //     }, {
    //         "x": 0,
    //         "y": 1,
    //         "z": 0
    //     }],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 2
    // }, {
    //     "a": 7,
    //     "b": 6,
    //     "c": 2,
    //     "normal": {
    //         "x": 0,
    //         "y": -1,
    //         "z": 0
    //     },
    //     "vertexNormals": [{
    //         "x": 0,
    //         "y": -1,
    //         "z": 0
    //     }, {
    //         "x": 0,
    //         "y": -1,
    //         "z": 0
    //     }, {
    //         "x": 0,
    //         "y": -1,
    //         "z": 0
    //     }],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 3
    // }, {
    //     "a": 6,
    //     "b": 3,
    //     "c": 2,
    //     "normal": {
    //         "x": 0,
    //         "y": -1,
    //         "z": 0
    //     },
    //     "vertexNormals": [{
    //         "x": 0,
    //         "y": -1,
    //         "z": 0
    //     }, {
    //         "x": 0,
    //         "y": -1,
    //         "z": 0
    //     }, {
    //         "x": 0,
    //         "y": -1,
    //         "z": 0
    //     }],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 3
    // }, {
    //     "a": 5,
    //     "b": 7,
    //     "c": 0,
    //     "normal": {
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //     },
    //     "vertexNormals": [{
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //     }, {
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //     }, {
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //     }],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 4
    // }, {
    //     "a": 7,
    //     "b": 2,
    //     "c": 0,
    //     "normal": {
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //     },
    //     "vertexNormals": [{
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //     }, {
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //     }, {
    //         "x": 0,
    //         "y": 0,
    //         "z": 1
    //     }],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 4
    // }, {
    //     "a": 1,
    //     "b": 3,
    //     "c": 4,
    //     "normal": {
    //         "x": 0,
    //         "y": 0,
    //         "z": -1
    //     },
    //     "vertexNormals": [{
    //         "x": 0,
    //         "y": 0,
    //         "z": -1
    //     }, {
    //         "x": 0,
    //         "y": 0,
    //         "z": -1
    //     }, {
    //         "x": 0,
    //         "y": 0,
    //         "z": -1
    //     }],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 5
    // }, {
    //     "a": 3,
    //     "b": 6,
    //     "c": 4,
    //     "normal": {
    //         "x": 0,
    //         "y": 0,
    //         "z": -1
    //     },
    //     "vertexNormals": [{
    //         "x": 0,
    //         "y": 0,
    //         "z": -1
    //     }, {
    //         "x": 0,
    //         "y": 0,
    //         "z": -1
    //     }, {
    //         "x": 0,
    //         "y": 0,
    //         "z": -1
    //     }],
    //     "color": 16777215,
    //     "vertexColors": [],
    //     "materialIndex": 5
    // }]
    //
    // faceVertexUvs
    //
    // [
    //     [
    //         [{
    //             "x": 0,
    //             "y": 1
    //         }, {
    //             "x": 0,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 1
    //         }],
    //         [{
    //             "x": 0,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 1
    //         }],
    //         [{
    //             "x": 0,
    //             "y": 1
    //         }, {
    //             "x": 0,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 1
    //         }],
    //         [{
    //             "x": 0,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 1
    //         }],
    //         [{
    //             "x": 0,
    //             "y": 1
    //         }, {
    //             "x": 0,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 1
    //         }],
    //         [{
    //             "x": 0,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 1
    //         }],
    //         [{
    //             "x": 0,
    //             "y": 1
    //         }, {
    //             "x": 0,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 1
    //         }],
    //         [{
    //             "x": 0,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 1
    //         }],
    //         [{
    //             "x": 0,
    //             "y": 1
    //         }, {
    //             "x": 0,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 1
    //         }],
    //         [{
    //             "x": 0,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 1
    //         }],
    //         [{
    //             "x": 0,
    //             "y": 1
    //         }, {
    //             "x": 0,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 1
    //         }],
    //         [{
    //             "x": 0,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 0
    //         }, {
    //             "x": 1,
    //             "y": 1
    //         }]
    //     ]
    // ]

    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    windowResize(renderer, camera);

    document.body.appendChild(renderer.domElement);
  }

  function update() {
    box.update();
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
