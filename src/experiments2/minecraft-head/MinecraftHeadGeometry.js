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
const SKIN_HEIGHT = 64;

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

export default function MinecraftHeadGeometry(size) {
  const head = {
    front: faceVectors(8, 8, 8, 8),
    right: faceVectors(0, 8, 8, 8),
    left: faceVectors(16, 8, 8, 8),
    back: faceVectors(24, 8, 8, 8),
    top: faceVectors(8, 0, 8, 8),
    bottom: faceVectors(16, 0, 8, 8),
  };

  const geometry = new THREE.CubeGeometry(size, size, size);

  // Clear out any UV mapping that may have already existed on the cube
  geometry.faceVertexUvs[0] = [];

  geometry.faceVertexUvs[0][0] = [head.left[0], head.left[1], head.left[3]];
  geometry.faceVertexUvs[0][1] = [head.left[1], head.left[2], head.left[3]];

  geometry.faceVertexUvs[0][2] = [head.right[0], head.right[1], head.right[3]];
  geometry.faceVertexUvs[0][3] = [head.right[1], head.right[2], head.right[3]];

  geometry.faceVertexUvs[0][4] = [head.top[0], head.top[1], head.top[3]];
  geometry.faceVertexUvs[0][5] = [head.top[1], head.top[2], head.top[3]];

  geometry.faceVertexUvs[0][6] = [head.bottom[0], head.bottom[1], head.bottom[3]];
  geometry.faceVertexUvs[0][7] = [head.bottom[1], head.bottom[2], head.bottom[3]];

  geometry.faceVertexUvs[0][8] = [head.front[0], head.front[1], head.front[3]];
  geometry.faceVertexUvs[0][9] = [head.front[1], head.front[2], head.front[3]];

  geometry.faceVertexUvs[0][10] = [head.back[0], head.back[1], head.back[3]];
  geometry.faceVertexUvs[0][11] = [head.back[1], head.back[2], head.back[3]];

  return geometry;
}
