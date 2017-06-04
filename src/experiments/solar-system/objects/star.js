import orbitScale from '../lib/orbit-scale';

export default class Star extends THREE.Object3D {

  constructor(props) {
    super();
    const { radius, color } = props;
    const geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25 });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
    this.satellites = [];
  }

  addPlanet(planet) {
    const satellite = {
      planet,
      x: 0,
      y: 0,
      z: 0,
      angle: 0,
    };
    this.satellites.push(satellite);
    this.add(planet);
  }

  update() {
    this.satellites.forEach((satellite) => {
      satellite.angle += 0.01;
      satellite.x = orbitScale(satellite.planet.orbitRadius) * Math.cos(satellite.angle);
      satellite.y = orbitScale(satellite.planet.orbitRadius) * Math.sin(satellite.angle);
      satellite.planet.position.set(satellite.x, satellite.y, satellite.z);
    });
  }

}
