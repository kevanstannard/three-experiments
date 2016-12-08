export default function CircleLineGeometry(radius, segments, thetaStart, thetaLength) {
  const args = {
    radius: radius || 50,
    segments: segments || 8,
    thetaStart: thetaStart || 0,
    thetaLength: thetaLength || (2 * Math.PI),
  };
  const geometry = new THREE.Geometry();
  const delta = ((args.thetaStart + args.thetaLength) - args.thetaStart) / args.segments;
  for (let i = 0; i <= args.segments; i += 1) {
    const angle = args.thetaStart + (delta * i);
    const x = args.radius * Math.cos(angle);
    const y = args.radius * Math.sin(angle);
    geometry.vertices.push(new THREE.Vector3(x, y, 0));
  }
  return geometry;
}
