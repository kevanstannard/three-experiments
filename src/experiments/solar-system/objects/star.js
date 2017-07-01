import orbitRadiusScale from '../lib/orbit-radius-scale';
import orbitPeriodScale from '../lib/orbit-period-scale';

function daysToSeconds(days) {
  return days * 24 * 60 * 60;
}

export default class Star extends THREE.Object3D {

  constructor(props) {
    super();
    const { radius, color } = props;
    const geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25 });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
    this.satellites = [];
    this.prevTime = 0;
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

  update(delta) {
    // console.log(delta);
    this.satellites.forEach((satellite) => {
      const orbitPeriod = orbitPeriodScale(satellite.planet.orbitPeriod);
      const orbitAnglePerSecond = (2 * Math.PI) / daysToSeconds(orbitPeriod);
      const deltaSeconds = delta / 1000;
      const angleDelta = orbitAnglePerSecond * deltaSeconds;
      // console.log(satellite.planet.orbitPeriod);
      satellite.angle += angleDelta;
      satellite.x = orbitRadiusScale(satellite.planet.orbitRadius) * Math.cos(satellite.angle);
      satellite.y = orbitRadiusScale(satellite.planet.orbitRadius) * Math.sin(satellite.angle);
      satellite.planet.position.set(satellite.x, satellite.y, satellite.z);
    });
  }

}
