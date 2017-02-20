// UV Mapping
//
// UV mapping is the process of taking an image and assigning parts of that
// image to individual faces of our 3D object.
//
// UV vectors are used to specify parts of a texture that may be applied
// to faces in a geometry.
//
// UV coordinates of an image look like this:
//
//
//   (0,1)     (1,1)
//     +---------+
//     |         |
//   v |         |
//     |         |
//     +---------+
//   (0,0)  u  (1,0)
//
//
// Suppose our texture had 4 sub-images:
//
//
//   (0,1)        (1,1)
//     +------+-----+
//     |   A  |  B  |
//     |      |     |
//   v +------+-----+
//     |   C  |  D  |
//     |      |     |
//     +------+-----+
//   (0,0)    u   (1,0)
//
//
// The corners of the "A" image would be:
//   Top Left:     (0, 1)
//   Bottom Left:  (0, 0.5)
//   Bottom Right: (0.5, 0.5)
//   Top Right:    (0.5, 0)
//

// Default width and height of a Minecraft skin
const SKIN_WIDTH = 64;
const SKIN_HEIGHT = 32;

function faceVectors(x, y, w, h) {
  // Convert skin coordinates that have (0, 0) in the top left corner
  // into a UV orientation that has (0, 0) in the bottom left corner.
  const uvPix = {
    x,
    y: SKIN_HEIGHT - y,
    w,
    h,
  };
  // Convert from pixel coordinates (e.g. 0 to 64)
  // into to UV coordinates (e.g. from 0 to 1)
  const uv = {
    x: uvPix.x / SKIN_WIDTH,
    y: uvPix.y / SKIN_HEIGHT,
    w: uvPix.w / SKIN_WIDTH,
    h: uvPix.h / SKIN_HEIGHT,
  };
  // Convert to points
  const points = {
    p1: { x: uv.x, y: uv.y }, // Top left
    p2: { x: uv.x, y: uv.y - uv.h }, // Bottom left
    p3: { x: uv.x + uv.w, y: uv.y - uv.h }, // Bottom right
    p4: { x: uv.x + uv.w, y: uv.y }, // Top right
  };
  // Create vectors
  const vectors = [
    new THREE.Vector2(points.p1.x, points.p1.y),
    new THREE.Vector2(points.p2.x, points.p2.y),
    new THREE.Vector2(points.p3.x, points.p3.y),
    new THREE.Vector2(points.p4.x, points.p4.y),
  ];
  return vectors;
}

export default function MinecraftHeadGeometry(u, v, width, height, depth) {
  const box = {
    front: faceVectors(u + depth, v + depth, width, height),
    right: faceVectors(u, v + depth, depth, height),
    left: faceVectors(u + depth + width, v + depth, depth, height),
    back: faceVectors(u + depth + width + depth, v + depth, width, height),
    top: faceVectors(u + depth, v, width, depth),
    bottom: faceVectors(u + depth + width, v, width, depth),
  };

  const geometry = new THREE.BoxGeometry(width, height, depth);

  // console.log(width, height, depth, '*', u + depth, v + depth, width, height, box.front);

  const isHead = width === 8 && height === 8 && depth === 6;

  if (isHead) {
    console.log(geometry);
    console.log(box);
  }

  // Clear out any UV mapping that may have already existed on the cube
  geometry.faceVertexUvs[0] = [];

  // Left
  geometry.faceVertexUvs[0][0] = [box.right[0], box.right[1], box.right[3]];
  geometry.faceVertexUvs[0][1] = [box.right[1], box.right[2], box.right[3]];

  // Right
  geometry.faceVertexUvs[0][2] = [box.left[0], box.left[1], box.left[3]];
  geometry.faceVertexUvs[0][3] = [box.left[1], box.left[2], box.left[3]];

  // Top
  geometry.faceVertexUvs[0][4] = [box.top[0], box.top[1], box.top[3]];
  geometry.faceVertexUvs[0][5] = [box.top[1], box.top[2], box.top[3]];

  // Bottom
  geometry.faceVertexUvs[0][6] = [box.bottom[0], box.bottom[1], box.bottom[3]];
  geometry.faceVertexUvs[0][7] = [box.bottom[1], box.bottom[2], box.bottom[3]];

  // Front
  geometry.faceVertexUvs[0][8] = [box.back[0], box.back[1], box.back[3]];
  geometry.faceVertexUvs[0][9] = [box.back[1], box.back[2], box.back[3]];

  // Back
  geometry.faceVertexUvs[0][10] = [box.front[0], box.front[1], box.front[3]];
  geometry.faceVertexUvs[0][11] = [box.front[1], box.front[2], box.front[3]];

  // old

  // geometry.faceVertexUvs[0][0] = [box.left[0], box.left[1], box.left[3]];
  // geometry.faceVertexUvs[0][1] = [box.left[1], box.left[2], box.left[3]];
  //
  // geometry.faceVertexUvs[0][2] = [box.right[0], box.right[1], box.right[3]];
  // geometry.faceVertexUvs[0][3] = [box.right[1], box.right[2], box.right[3]];
  //
  // geometry.faceVertexUvs[0][4] = [box.top[0], box.top[1], box.top[3]];
  // geometry.faceVertexUvs[0][5] = [box.top[1], box.top[2], box.top[3]];
  //
  // geometry.faceVertexUvs[0][6] = [box.bottom[0], box.bottom[1], box.bottom[3]];
  // geometry.faceVertexUvs[0][7] = [box.bottom[1], box.bottom[2], box.bottom[3]];
  //
  // geometry.faceVertexUvs[0][8] = [box.front[0], box.front[1], box.front[3]];
  // geometry.faceVertexUvs[0][9] = [box.front[1], box.front[2], box.front[3]];
  //
  // geometry.faceVertexUvs[0][10] = [box.back[0], box.back[1], box.back[3]];
  // geometry.faceVertexUvs[0][11] = [box.back[1], box.back[2], box.back[3]];

  return geometry;
}
