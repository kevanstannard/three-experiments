/* eslint-disable no-param-reassign */

function Body(name, radius, color) {
  this.name = name;
  this.radius = radius;
  this.satellites = [];
  this.geometry = new THREE.SphereGeometry(radius, 8, 8);
  this.material = new THREE.MeshLambertMaterial({ color, wireframe: true });
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.name = name;
}

Body.prototype = {

  constructor: Body,

  add(body, radius) {
    const satellite = {
      body,
      radius,
      angle: 0,
    };
    this.satellites.push(satellite);
    console.log('Adding mesh', body.mesh.name, 'to', this.mesh.name);
    this.mesh.add(body.mesh);
  },

  addToScene(scene) {
    scene.add(this.mesh);
    this.satellites.forEach((satellite) => {
      satellite.body.addToScene(scene);
    });
  },

  update() {
    this.satellites.forEach((satellite) => {
      const x = satellite.radius * Math.cos(satellite.angle);
      const y = satellite.radius * Math.sin(satellite.angle);
      satellite.body.mesh.position.set(x, y, 0);
      satellite.angle += 0.01;
      satellite.body.update();
    });
  },

};

export default Body;
