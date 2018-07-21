export default class Car extends THREE.Object3D {
  constructor(props) {
    super();
    const { name, color, size } = props;

    const bodyGeometry = new THREE.BoxGeometry(size, size, size);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, size / 2, 0);

    const arrowDirection = new THREE.Vector3(0, 0, 1).normalize();
    const arrowLength = size;
    const arrowColor = 0xffffff;
    const arrowPosition = new THREE.Vector3(0, 0, 0);
    const arrow = new THREE.ArrowHelper(arrowDirection, arrowPosition, arrowLength, arrowColor);
    body.add(arrow);

    this.add(body);

    this.name = name;

    const speedScale = (50 / size);
    this.moveSpeed = 50 * speedScale; // units per second
    this.rotationSpeed = (Math.PI / 180) * 50 * speedScale; // radians per second
  }

  rotateLeft(delta) {
    const rotationAngle = this.rotationSpeed * delta;
    this.rotateY(rotationAngle);
  }

  rotateRight(delta) {
    const rotationAngle = this.rotationSpeed * delta;
    this.rotateY(-rotationAngle);
  }

  moveForward(delta) {
    const distance = this.moveSpeed * delta;
    const forwardDirection = this.getWorldDirection(); // Note: This is a unit vector
    forwardDirection.multiplyScalar(distance);
    this.position.add(forwardDirection);
  }

  moveBackward(delta) {
    const distance = this.moveSpeed * delta;
    const backwardDirection = this.getWorldDirection().negate();
    backwardDirection.multiplyScalar(distance);
    this.position.add(backwardDirection);
  }
}
