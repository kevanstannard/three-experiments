export default class Orbit extends THREE.Object3D {

  constructor(radius) {
    super();
    const geometry = new THREE.CircleGeometry(radius, 1024);
    geometry.vertices.shift(); // Remove the line that goes from the center to the ring
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
    });
    const mesh = new THREE.Line(geometry, material);
    this.add(mesh);
  }

}
