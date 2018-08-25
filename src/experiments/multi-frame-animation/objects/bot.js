// Notes:
// * A bone pivot is relative to the parent bone pivot.
// * A box offset is relative to its bones pivot.

const botBone = {
  name: 'body',
  pivot: [0, 0, 0],
  boxes: [
    {
      size: [32, 64, 16],
      offset: [0, 0, 0],
    },
  ],
  children: [
    {
      name: 'head',
      pivot: [0, 32, 0],
      boxes: [
        {
          name: 'head',
          size: [32, 32, 32],
          offset: [0, 16, 0],
        },
        {
          name: 'eye',
          size: [24, 8, 4],
          offset: [0, 16, 16],
        },
      ],
      children: [],
    },
    {
      name: 'leftArm',
      pivot: [24, 32, 0],
      boxes: [
        {
          size: [16, 64, 16],
          offset: [0, -32, 0],
        },
      ],
      children: [],
    },
    {
      name: 'rightArm',
      pivot: [-24, 32, 0],
      boxes: [
        {
          size: [16, 64, 16],
          offset: [0, -32, 0],
        },
      ],
      children: [],
    },
    {
      name: 'leftLeg',
      pivot: [8, -32, 0],
      boxes: [
        {
          size: [16, 64, 16],
          offset: [0, -32, 0],
        },
      ],
      children: [],
    },
    {
      name: 'rightLeg',
      pivot: [-8, -32, 0],
      boxes: [
        {
          size: [16, 64, 16],
          offset: [0, -32, 0],
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
  }

  addBone(parent, bone) {
    const pivot = new THREE.Object3D();
    const [pivotX, pivotY, pivotZ] = bone.pivot;
    pivot.position.set(pivotX, pivotY, pivotZ);

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
      const [offsetX, offsetY, offsetZ] = box.offset;
      const [sizeX, sizeY, sizeZ] = box.size;
      const boxGeometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
      boxMesh.position.set(offsetX, offsetY, offsetZ);
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
