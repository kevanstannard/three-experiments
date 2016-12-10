import Pulse from './Pulse';

export default function Pulses(radius) {
  THREE.Object3D.call(this);

  this.pulse1 = new Pulse(radius, 4000, false);
  this.pulse1.position.z = -0.5;

  this.pulse2 = new Pulse(radius, 4000, false);
  this.pulse2.position.z = 0.5;

  this.add(this.pulse1);
  this.add(this.pulse2);

  this.pulse1.start();
  setTimeout(() => {
    this.pulse2.start();
  }, 2000);
}

Pulses.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {

  constructor: Pulses,

  update() {
    this.pulse1.update();
    this.pulse2.update();
  },

});
