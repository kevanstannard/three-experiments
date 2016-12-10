function System() {
  THREE.Object3D.call(this);
  const geometry = new THREE.SphereGeometry(4, 4, 4);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  const mesh = new THREE.Mesh(geometry, material);
  this.add(mesh);
}

System.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
  constructor: System,
});

export default System;
