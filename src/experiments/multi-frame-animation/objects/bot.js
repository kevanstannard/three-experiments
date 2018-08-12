const bot = {
  name: 'body',
  size: new THREE.Vector3(32, 64, 16),
  pivot: new THREE.Vector3(0, 0, 0),
  offset: new THREE.Vector3(0, 0, 0),
  children: [
    {
      name: 'head',
      size: new THREE.Vector3(32, 32, 32),
      pivot: new THREE.Vector3(0, 32, 0),
      offset: new THREE.Vector3(0, 16, 0),
      children: [],
    },
    {
      name: 'leftArm',
      size: new THREE.Vector3(16, 64, 16),
      pivot: new THREE.Vector3(24, 32, 0),
      offset: new THREE.Vector3(0, -32, 0),
      children: [],
    },
    {
      name: 'rightArm',
      size: new THREE.Vector3(16, 64, 16),
      pivot: new THREE.Vector3(-24, 32, 0),
      offset: new THREE.Vector3(0, -32, 0),
      children: [],
    },
    {
      name: 'leftLeg',
      size: new THREE.Vector3(16, 64, 16),
      pivot: new THREE.Vector3(8, -32, 0),
      offset: new THREE.Vector3(0, -32, 0),
      children: [],
    },
    {
      name: 'rightLeg',
      size: new THREE.Vector3(16, 64, 16),
      pivot: new THREE.Vector3(-8, -32, 0),
      offset: new THREE.Vector3(0, -32, 0),
      children: [],
    },
  ],
};

const addBox = (parent, box) => {
  const geometry = new THREE.BoxGeometry(box.size.x, box.size.y, box.size.z);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0.8,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(box.offset);

  const pivot = new THREE.Object3D();
  pivot.position.copy(box.pivot);

  const pivotGeometry = new THREE.SphereGeometry(4, 4, 4);
  const pivotMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const pivotMesh = new THREE.Mesh(pivotGeometry, pivotMaterial);

  pivot.add(mesh);
  pivot.add(pivotMesh);

  parent.add(pivot);

  box.children.forEach(child => addBox(pivot, child));
};

export default class Bot extends THREE.Object3D {
  constructor() {
    super();

    addBox(this, bot);

    // const headSize = new THREE.Vector3(32, 16, 32);
    // const bodySize = new THREE.Vector3(headSize.x, headSize.y * 1.5, headSize.z);
    // const armSize = new THREE.Vector3(headSize.x, bodySize.y / 2, headSize.z / 2);
    // const legSize = new THREE.Vector3(headSize.x / 2 - 2, bodySize.y, headSize.z);
    //
    // const headJointPosition = new THREE.Vector3(
    //   0,
    //   bodySize.y / 2 + headSize.y / 2 + 1,
    //   0,
    // );
    //
    // const leftArmJointPosition = new THREE.Vector3(
    //   bodySize.x / 2 + armSize.x / 2 + 1,
    //   -armSize.y / 2,
    //   0,
    // );
    //
    // const rightArmJointPosition = new THREE.Vector3(
    //   -(bodySize.x / 2 + armSize.x / 2 + 1),
    //   -armSize.y / 2,
    //   0,
    // );
    //
    // const armPosition = new THREE.Vector3(0, armSize.y / 2, 0);
    //
    // const leftLegJointPosition = new THREE.Vector3(
    //   bodySize.x / 4,
    //   -(bodySize.y / 2 + 1),
    //   0,
    // );
    //
    // const rightLegJointPosition = new THREE.Vector3(
    //   -(bodySize.x / 4),
    //   -(bodySize.y / 2 + 1),
    //   0,
    // );
    //
    // const legPosition = new THREE.Vector3(0, -legSize.y / 2, 0);
    //
    // const jointGeometry = new THREE.SphereGeometry(headSize.x / 2);
    // const jointMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    //
    // const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    //
    // const bodyGeometry = new THREE.BoxGeometry(bodySize.x, bodySize.y, bodySize.z);
    // const body = new THREE.Mesh(bodyGeometry, material);
    //
    // const headJoint = new THREE.Mesh(jointGeometry, jointMaterial);
    // const headGeometry = new THREE.BoxGeometry(headSize.x, headSize.y, headSize.z);
    // const head = new THREE.Mesh(headGeometry, material);
    // headJoint.add(head);
    // headJoint.position.copy(headJointPosition);
    //
    // const armGeometry = new THREE.BoxGeometry(armSize.x, armSize.y, armSize.z);
    //
    // const rightArmJoint = new THREE.Object3D();
    // const rightArm = new THREE.Mesh(armGeometry, material);
    // rightArmJoint.add(rightArm);
    // rightArm.position.copy(armPosition);
    // rightArmJoint.position.copy(leftArmJointPosition);
    //
    // const leftArmJoint = new THREE.Object3D();
    // const leftArm = new THREE.Mesh(armGeometry, material);
    // leftArmJoint.add(leftArm);
    // leftArm.position.copy(armPosition);
    // leftArmJoint.position.copy(rightArmJointPosition);
    //
    // const legGeometry = new THREE.BoxGeometry(legSize.x, legSize.y, legSize.z);
    //
    // const rightLegJoint = new THREE.Object3D();
    // const rightLeg = new THREE.Mesh(legGeometry, material);
    // rightLegJoint.add(rightLeg);
    // rightLeg.position.copy(legPosition);
    // rightLegJoint.position.copy(rightLegJointPosition);
    //
    // const leftLegJoint = new THREE.Object3D();
    // const leftLeg = new THREE.Mesh(legGeometry, material);
    // leftLegJoint.add(leftLeg);
    // leftLeg.position.copy(legPosition);
    // leftLegJoint.position.copy(leftLegJointPosition);
    //
    // this.add(headJoint);
    // this.add(body);
    // this.add(rightArmJoint);
    // this.add(leftArmJoint);
    // this.add(rightLegJoint);
    // this.add(leftLegJoint);
  }
}
