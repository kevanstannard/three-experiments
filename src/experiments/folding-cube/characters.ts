export const characters = {
  F: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],

  K: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],

  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],

  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],

  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],

  B: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
};

export type CharacterKey = keyof typeof characters;

// class Pixel extends THREE.Object3D {
//   constructor(color: string, size: number) {
//     super();
//     const geometry = new THREE.PlaneGeometry(size, size);
//     const material = new THREE.MeshBasicMaterial({
//       color: color,
//       side: THREE.DoubleSide,
//     });
//     const mesh = new THREE.Mesh(geometry, material);
//     this.add(mesh);
//   }
// }

// export class Character extends THREE.Object3D {
//   constructor(character: CharacterKey, color: string, size: number) {
//     super();
//     const bitmap = characters[character];
//     const colCount = bitmap.length;
//     const rowCount = bitmap.reduce(
//       (acc, bits) => Math.max(acc, bits.length),
//       0
//     );
//     const pixels = [];
//     for (let row = 0; row < bitmap.length; row++) {
//       let cols = bitmap[row];
//       for (let col = 0; col < cols.length; col++) {
//         let bit = bitmap[row][col];
//         if (bit) {
//           const pixel = new Pixel(color, size);
//           const x = size * col;
//           const y = size * row * -1;
//           pixel.position.set(x, y, 0);
//           pixels.push(pixel);
//         }
//       }
//     }
//     pixels.forEach((pixel) => {
//       this.add(pixel);
//     });

//     const width = colCount * size;
//     const height = rowCount * size;
//     this.position.set(-width / 2, height / 2, 0);
//   }
// }
