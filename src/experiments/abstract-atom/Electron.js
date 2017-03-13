export default class Electron extends THREE.Mesh {

  constructor() {
    const geometry = new THREE.SphereGeometry(2, 4, 4);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    super(geometry, material);
  }

}
