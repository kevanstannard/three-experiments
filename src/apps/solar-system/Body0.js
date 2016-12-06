/* eslint-disable no-param-reassign */

function Body(name, radius, color) {
  const geometry = new THREE.SphereGeometry(radius, 8, 8);
  const material = new THREE.MeshLambertMaterial({ color, wireframe: true });
  THREE.Mesh.call(this, geometry, material);

  this.radius = radius;
  this.bodies = [];
  this.name = name;
}

Body.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {

  constructor: Body,

  addBody(object, radius) {
    this.bodies.push({
      object,
      radius,
      angle: 0,
    });
    object.position.x = radius;
    this.add(object);
  },

  addToScene(scene) {
    // console.log('Adding', this.name);
    scene.add(this);
    this.children.forEach((child) => {
      child.addToScene(scene);
    });
  },

  update() {
    // console.log('Updating', this.name);
    this.bodies.forEach((body) => {
      // console.log('Updating child', body.object.name);
      const x = body.radius * Math.cos(body.angle);
      const y = body.radius * Math.sin(body.angle);
      body.object.position.set(x, y, 0);
      body.angle += 0.01;
      body.object.update();
    });
  },

});

export default Body;
