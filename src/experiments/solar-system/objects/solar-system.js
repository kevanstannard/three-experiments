export default class SolarSystem extends THREE.Object3D {

  constructor() {
    super();
    this.bodies = [];
  }

  addBody(body) {
    this.bodies.push(body);
    this.add(body);
  }

  update(delta) {
    this.bodies.forEach((body) => {
      body.update(delta);
    });
  }

}
