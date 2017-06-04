export default class Planet extends THREE.Object3D {

  constructor(props) {
    super();
    const { radius, color, orbitRadius } = props;

    const geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);

    this.orbitRadius = orbitRadius;
  }

}
