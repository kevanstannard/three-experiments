export default class CircleTarget {
  constructor({ speed, radius, target }) {
    this.speed = speed; // radians per second
    this.radius = radius;
    this.target = target;
    this.angle = 0;
  }

  getMoveVector(currentPosition, delta) {
    const angleToMove = delta / 1000 * this.speed;
    this.angle = this.angle + angleToMove;

    const x = this.radius * Math.cos(this.angle);
    const z = this.radius * Math.sin(this.angle);
    const y = 0;

    const targetPosition = new THREE.Vector3(
      this.target.position.x + x,
      this.target.position.y + y,
      this.target.position.z + z,
    );

    const moveVector = targetPosition.clone().sub(currentPosition);

    return moveVector;
  }
}
