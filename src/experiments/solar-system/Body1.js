/* eslint-disable no-param-reassign */

function Body(name, radius, color) {
  // Body has an Object3D prototype
  THREE.Object3D.call(this);

  // Create visible center mesh
  // Add the center to this Object3D
  const centerGeometry = new THREE.SphereGeometry(1, 4, 4);
  const centerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  this.center = new THREE.Mesh(centerGeometry, centerMaterial);
  this.add(this.center);

  // Create the body mesh
  const bodyGeometry = new THREE.SphereGeometry(radius, 8, 8);
  const bodyMaterial = new THREE.MeshLambertMaterial({ color, wireframe: true });
  this.mesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
  this.add(this.mesh);

  // Set the name
  this.name = name;

  // Create an array to hold any satellites
  this.satellites = [];
}

Body.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {

  constructor: Body,

  addBody(body, radius) {
    const satellite = {
      body,
      radius,
      angle: 0,
    };
    this.satellites.push(satellite);
    this.add(body);
    body.position.x = radius;
  },

  update() {
    this.rotation.y += 0.005;
    this.satellites.forEach((satellite) => {
      satellite.body.update();
    });
  },

});

export default Body;
