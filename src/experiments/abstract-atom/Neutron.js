export default class Neutron extends THREE.Mesh {

  constructor() {
    const geometry = new THREE.SphereGeometry(10, 4, 4);
    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    super(geometry, material);
  }

}
