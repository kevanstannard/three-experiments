import Orbit from './orbit';
import orbitRadiusScale from '../lib/orbit-radius-scale';
import orbitPeriodScale from '../lib/orbit-period-scale';

function daysToSeconds(days) {
  return days * 24 * 60 * 60;
}

export default class Planet extends THREE.Object3D {

  constructor(props) {
    super();
    const { name, radius, color, orbitRadius, orbitPeriod } = props;

    const geometry = new THREE.SphereBufferGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);

    this.name = name;
    this.radius = radius;
    this.orbitRadius = orbitRadius;
    this.orbitPeriod = orbitPeriod;

    this.satellites = [];

    this.prev = 0;
  }

  addMoon(moon) {
    const orbitPeriod = orbitPeriodScale(moon.orbitPeriod);
    const satellite = {
      moon,
      x: 0,
      y: 0,
      z: 0,
      angle: 0,
      orbitRadius: this.radius + moon.orbitRadius + moon.radius,
      orbitPeriod,
      orbitAnglePerSecond: (2 * Math.PI) / daysToSeconds(orbitPeriod),
    };
    this.satellites.push(satellite);
    this.add(moon);
    const orbit = new Orbit(orbitRadiusScale(satellite.orbitRadius));
    this.add(orbit);
  }

  update(delta) {
    // if (delta < 16 || delta > 18) {
    //   delta = 17;
    // }
    // delta = 20;
    this.satellites.forEach((satellite) => {
      // const orbitPeriod = satellite.orbitPeriod;
      // const orbitAnglePerSecond = (2 * Math.PI) / daysToSeconds(orbitPeriod);
      const deltaSeconds = delta / 1000;
      const angleDelta = satellite.orbitAnglePerSecond * deltaSeconds;
      satellite.angle += angleDelta;
      satellite.x = orbitRadiusScale(satellite.orbitRadius) * Math.cos(satellite.angle);
      satellite.y = orbitRadiusScale(satellite.orbitRadius) * Math.sin(satellite.angle);
      satellite.moon.position.set(satellite.x, satellite.y, satellite.z);
      // if (this.name === 'earth') {
      //   if (delta < 16 || delta > 18) {
      //     console.log(
      //       // orbitPeriod,
      //       // this.prev - deltaSeconds,
      //       // satellite.orbitAnglePerSecond,
      //       // angleDelta,
      //       // this.prev - satellite.x,
      //       delta,
      //     );
      //   }
      //   this.prev = satellite.x;
      // }
    });
  }

}
