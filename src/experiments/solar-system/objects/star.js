import Orbit from './orbit';
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
    this.radius = radius;
  }

  addPlanet(planet) {
    const satellite = {
      planet,
      x: 0,
      y: 0,
      z: 0,
      angle: 0,
      orbitRadius: this.radius + planet.orbitRadius + planet.radius,
    };
    this.satellites.push(satellite);
    this.add(planet);
    const orbit = new Orbit(orbitRadiusScale(satellite.orbitRadius));
    this.add(orbit);
  }

  update(delta) {
    this.satellites.forEach((satellite) => {
      const orbitPeriod = orbitPeriodScale(satellite.planet.orbitPeriod);
      const orbitAnglePerSecond = (2 * Math.PI) / daysToSeconds(orbitPeriod);
      const deltaSeconds = delta / 1000;
      const angleDelta = orbitAnglePerSecond * deltaSeconds;
      satellite.angle += angleDelta;
      satellite.x = orbitRadiusScale(satellite.orbitRadius) * Math.cos(satellite.angle);
      satellite.y = orbitRadiusScale(satellite.orbitRadius) * Math.sin(satellite.angle);
      satellite.planet.position.set(satellite.x, satellite.y, satellite.z);
      satellite.planet.update(delta);
    });
  }

}
