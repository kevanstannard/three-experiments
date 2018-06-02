export default class Bot extends THREE.Object3D {

  constructor(props) {
    super();
    const {
      name,
      radius,
      color,
      move,
    } = props;

    const geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);

    this.name = name;
    this.radius = radius;
    this.move = move;
  }

  update(delta) {
    const moveVector = this.move.getMoveVector(this.position, delta);
    this.position.add(moveVector);
  }
}
