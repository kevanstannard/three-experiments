export default class Moon extends THREE.Object3D {

  constructor(props) {
    super();
    const { name, radius, color, orbitRadius, orbitPeriod } = props;

    const geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);

    this.name = name;
    this.radius = radius;
    this.orbitRadius = orbitRadius;
    this.orbitPeriod = orbitPeriod;
  }

}
