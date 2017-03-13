export default class Proton extends THREE.Mesh {

  constructor() {
    const geometry = new THREE.SphereGeometry(10, 4, 4);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    super(geometry, material);
  }

}
