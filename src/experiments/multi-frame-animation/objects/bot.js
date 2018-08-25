// Notes:
// * A bone pivot is relative to the parent bone pivot.
// * A box offset is relative to its bones pivot.

const botBone = {
  name: 'body',
  pivot: new THREE.Vector3(0, 0, 0),
  boxes: [
    {
      size: new THREE.Vector3(32, 64, 16),
      offset: new THREE.Vector3(0, 0, 0),
    },
  ],
  children: [
    {
      name: 'head',
      pivot: new THREE.Vector3(0, 32, 0),
      boxes: [
        {
          name: 'head',
          size: new THREE.Vector3(32, 32, 32),
          offset: new THREE.Vector3(0, 16, 0),
        },
        {
          name: 'eye',
          size: new THREE.Vector3(24, 8, 4),
          offset: new THREE.Vector3(0, 16, 16),
        },
      ],
      children: [],
    },
    {
      name: 'leftArm',
      pivot: new THREE.Vector3(24, 32, 0),
      boxes: [
        {
          size: new THREE.Vector3(16, 64, 16),
          offset: new THREE.Vector3(0, -32, 0),
        },
      ],
      children: [],
    },
    {
      name: 'rightArm',
      pivot: new THREE.Vector3(-24, 32, 0),
      boxes: [
        {
          size: new THREE.Vector3(16, 64, 16),
          offset: new THREE.Vector3(0, -32, 0),
        },
      ],
      children: [],
    },
    {
      name: 'leftLeg',
      pivot: new THREE.Vector3(8, -32, 0),
      boxes: [
        {
          size: new THREE.Vector3(16, 64, 16),
          offset: new THREE.Vector3(0, -32, 0),
        },
      ],
      children: [],
    },
    {
      name: 'rightLeg',
      pivot: new THREE.Vector3(-8, -32, 0),
      boxes: [
        {
          size: new THREE.Vector3(16, 64, 16),
          offset: new THREE.Vector3(0, -32, 0),
        },
      ],
      children: [],
    },
  ],
};

export default class Bot extends THREE.Object3D {
  constructor() {
    super();

    this.bones = {};

    this.addBone(this, botBone);

    // console.log(this.bones);

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

  addBone(parent, bone) {
    const pivot = new THREE.Object3D();
    pivot.position.copy(bone.pivot);

    const pivotGeometry = new THREE.SphereGeometry(4, 4, 4);
    const pivotMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const pivotMesh = new THREE.Mesh(pivotGeometry, pivotMaterial);

    pivot.add(pivotMesh);

    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.8,
    });

    bone.boxes.forEach((box) => {
      const boxGeometry = new THREE.BoxGeometry(box.size.x, box.size.y, box.size.z);
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
      boxMesh.position.copy(box.offset);
      pivot.add(boxMesh);
    });

    parent.add(pivot);

    this.bones[bone.name] = pivot;

    bone.children.forEach(child => this.addBone(pivot, child));
  }

  update() {
    this.bones.head.rotation.y += 0.01;
    this.bones.leftArm.rotation.x += 0.01;
    this.bones.rightArm.rotation.x += 0.01;
    this.bones.leftLeg.rotation.x += 0.01;
    this.bones.rightLeg.rotation.x += 0.01;
  }
}
