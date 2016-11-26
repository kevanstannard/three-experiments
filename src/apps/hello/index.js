const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const NEAR = 1;
const FAR = 10000;

let scene, camera, renderer;
let axisHelper, geometry, material, mesh;

init();
animate();

function init() {

    scene = new THREE.Scene();

    axisHelper = new THREE.AxisHelper(100);
    scene.add(axisHelper);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(500, 500, 500);
    camera.lookAt(new THREE.Vector3(0,0,0));

    geometry = new THREE.BoxGeometry( 200, 200, 200 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

}

// const SCREEN_WIDTH = window.innerWidth;
// const SCREEN_HEIGHT = window.innerHeight;
// const VIEW_ANGLE = 45;
// const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
// const NEAR = 0.1;
// const FAR = 20000;
//
// const scene = new THREE.Scene();
//
// const axisHelper = new THREE.AxisHelper(100);
// scene.add(axisHelper);
//
// const gridXZ = new THREE.GridHelper(10, 1);
// scene.add(gridXZ);
//
// const ambientLight = new THREE.AmbientLight(0x111111);
// scene.add(ambientLight);
//
// const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
// camera.position.set(100, 100, 100);
// camera.lookAt(0, 0, 0);
// scene.add(camera);
//
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
//
// renderer.render(scene, camera);
//
// document.body.appendChild(renderer.domElement);
