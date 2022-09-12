function Pivot() {
  const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
  const geometry = new THREE.SphereGeometry(0.5, 8, 8);
  THREE.Mesh.call(this, geometry, material);
}

Pivot.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
  constructor: Pivot,
});

export default Pivot;
