function Body(name, radius, color = 0xffffff) {
  const geometry = new THREE.SphereGeometry(radius, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color, wireframe: true });
  THREE.Mesh.call(this, geometry, material);
  this.name = name;
}

Body.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
  constructor: Body,
});

export default Body;
