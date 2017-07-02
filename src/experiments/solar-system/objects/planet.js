import orbitRadiusScale from '../lib/orbit-radius-scale';
import orbitPeriodScale from '../lib/orbit-period-scale';

function daysToSeconds(days) {
  return days * 24 * 60 * 60;
}

export default class Planet extends THREE.Object3D {

  constructor(props) {
    super();
    const { radius, color, orbitRadius, orbitPeriod } = props;

    const geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);

    this.orbitRadius = orbitRadius;
    this.orbitPeriod = orbitPeriod;

    this.satellites = [];
  }

  addMoon(moon) {
    const satellite = {
      moon,
      x: 0,
      y: 0,
      z: 0,
      angle: 0,
    };
    this.satellites.push(satellite);
    this.add(moon);
    // const orbit = new Orbit(orbitRadiusScale(moon.orbitRadius));
    // this.add(orbit);
  }

  update(delta) {
    this.satellites.forEach((satellite) => {
      const orbitPeriod = orbitPeriodScale(satellite.moon.orbitPeriod);
      const orbitAnglePerSecond = (2 * Math.PI) / daysToSeconds(orbitPeriod);
      const deltaSeconds = delta / 1000;
      const angleDelta = orbitAnglePerSecond * deltaSeconds;
      satellite.angle += angleDelta;
      satellite.x = orbitRadiusScale(satellite.moon.orbitRadius) * Math.cos(satellite.angle);
      satellite.y = orbitRadiusScale(satellite.moon.orbitRadius) * Math.sin(satellite.angle);
      satellite.moon.position.set(satellite.x, satellite.y, satellite.z);
    });
  }

}
