import Array3d from './Array3d';

const size = 11;

// const vectors = [
//   [1, 0, 0],
//   [-1, 0, 0],
//   [0, 1, 0],
//   [0, -1, 0],
//   [0, 0, 1],
//   [0, 0, -1],
//   [1, -1, 0],
//   [-1, 1, 0],
//   [1, 0, -1],
//   [-1, 0, 1],
//   [0, 1, -1],
//   [0, -1, 1],
// ];

const vectors = [
  { x: 1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: -1 },
  { x: 1, y: -1, z: 0 },
  { x: -1, y: 1, z: 0 },
  { x: 1, y: 0, z: -1 },
  { x: -1, y: 0, z: 1 },
  { x: 0, y: 1, z: -1 },
  { x: 0, y: -1, z: 1 },
];

function countNeighbours(array, node) {
  let count = 0;
  vectors.forEach((vector) => {
    const value = array.get(
      node.x + vector.x,
      node.y + vector.y,
      node.z + vector.z,
    );
    if (value) {
      count += 1;
    }
  });
  return count;
}

export default class TetrahedronLattice {

  constructor() {
    this.array = new Array3d(size, size, size);
    console.log(this.array);
  }

  // Find node with most neighbours and least distance
  findEmpty(node) {
    const currNode = node || { ...this.array.origin };
    const currNodeValue = this.array.get(currNode.x, currNode.y, currNode.z);
    if (!currNodeValue) {
      const currNodeNeighbourCount = countNeighbours(this.array, currNode);
      const currNodeDistance = 0;
    }
  }

  // findEmpty(node = this.array.origin) {
  //   const a = this.array;
  //   const nodeValue = a.get(node.x, node.y, node.z);
  //   if (!nodeValue) {
  //     return node;
  //   }
  //   const allEmptyNodes = [];
  //   vectors.forEach((vector) => {
  //     const nextNode = {
  //       x: node.x + vector.x,
  //       y: node.y + vector.y,
  //       z: node.z + vector.z,
  //     };
  //     const vectorNodes = this.findEmpty(nextNode);
  //     allEmptyNodes.concat(vectorNodes);
  //   });
  //   return null;
  // }

  // add(mesh) {
  //   const node = this.findEmpty();
  //   this.array.set(node.x, node.y, node.z, mesh);
  // }
}
