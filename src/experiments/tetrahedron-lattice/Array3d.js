function createArray(xSize, ySize, zSize, initial = null) {
  const xarr = [];
  for (let x = 0; x < xSize; x += 1) {
    const yarr = [];
    for (let y = 0; y < ySize; y += 1) {
      const zarr = [];
      for (let z = 0; z < zSize; z += 1) {
        zarr.push(initial);
      }
      yarr.push(zarr);
    }
    xarr.push(yarr);
  }
  return xarr;
}

export default class Array3d {

  constructor(xSize, ySize, zSize) {
    this.dimensions = [xSize, ySize, zSize];
    this.array = createArray(xSize, ySize, zSize);
    this.origin = {
      x: Math.floor(xSize / 2),
      y: Math.floor(ySize / 2),
      z: Math.floor(zSize / 2),
    };
  }

  set(x, y, z, value) {
    // TODO: If outside the bounds of the array then resize the array
    const o = this.origin;
    this.array[o.x + x][o.y + y][o.z + z] = value;
  }

  get(x, y, z) {
    const o = this.origin;
    return this.array[o.x + x][o.y + y][o.z + z];
  }

}
