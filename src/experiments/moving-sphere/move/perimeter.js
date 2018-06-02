export default class Perimeter {
  constructor({ speed, boundary }) {
    this.speed = speed;
    this.targetPositions = boundary;
    this.targetPositionIndex = -1;
    this.targetPosition = null;
  }

  getMoveVector(currentPosition, delta) {
    if (!this.targetPosition) {
      this.targetPositionIndex = 1;
      this.targetPosition = this.targetPositions[this.targetPositionIndex];
      return this.targetPositions[0];
    }

    const distanceToMove = delta / 1000 * this.speed;
    const vectorToTarget = this.targetPosition.clone().sub(currentPosition);
    const distanceToTarget = currentPosition.distanceTo(this.targetPosition);

    let moveVector;
    if (distanceToMove >= distanceToTarget) {
      moveVector = vectorToTarget;
      this.targetPositionIndex = (this.targetPositionIndex + 1) % this.targetPositions.length;
      this.targetPosition = this.targetPositions[this.targetPositionIndex];
    } else {
      moveVector = vectorToTarget.normalize().multiplyScalar(distanceToMove);
    }

    return moveVector;
  }
}
