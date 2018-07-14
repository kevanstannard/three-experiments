const rotationAngle = (Math.PI / 180) * 2;

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
  }

  rotateLeft() {
    this.rotateY(rotationAngle);
  }

  rotateRight() {
    this.rotateY(-rotationAngle);
  }

  // TODO: Make the speed relative to the size of the car
  // For example: speed = size / 50 * forward direction
  moveForward() {
    const forwardDirection = this.getWorldDirection(); // Note: This is a unit vector
    this.position.add(forwardDirection);
  }

  moveBackward() {
    const backwardDirection = this.getWorldDirection().negate();
    this.position.add(backwardDirection);
  }
}
