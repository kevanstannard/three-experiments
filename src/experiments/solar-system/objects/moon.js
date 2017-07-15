export default class Moon extends THREE.Object3D {

  constructor(props) {
    super();
    const { radius, color, orbitRadius, orbitPeriod } = props;

    const geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);

    this.radius = radius;
    this.orbitRadius = orbitRadius;
    this.orbitPeriod = orbitPeriod;
  }

}