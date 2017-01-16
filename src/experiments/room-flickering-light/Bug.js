function Bug() {
  THREE.Object3D.call(this);
  // const geometry = new THREE.SphereGeometry(1, 2, 2, 0, Math.PI);
  const geometry = new THREE.CircleBufferGeometry(0.5);
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  this.sphere = new THREE.Mesh(geometry, material);
  this.sphere.castShadow = true;
  this.sphere.receiveShadow = false;
  this.add(this.sphere);
}

Bug.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {
  constructor: Bug,
  update() {
    if (this.moveSteps) {
      this.sphere.position.x += this.moveDelta.x;
      this.sphere.position.y += this.moveDelta.y;
      this.moveSteps -= 1;
      return;
    }
    const wantsToMove = Math.random() > 0.9999;
    if (wantsToMove) {
      this.moveTarget = {
        x: -20 + Math.random() * 40,
        y: -20 + Math.random() * 40,
      };
      this.moveSteps = 60 * 3;
      this.moveDelta = {
        x: this.moveTarget.x / this.moveSteps,
        y: this.moveTarget.y / this.moveSteps,
      };
    }
  },
});

export default Bug;
