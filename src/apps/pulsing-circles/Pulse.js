import CircleLineGeometry from './CircleLineGeometry';

export default function Pulse(radius, duration = 4000, autoStart = true) {
  THREE.Object3D.call(this);

  this.duration = duration;
  const segments = 32;
  const discColor = 0x8DE2E0;
  const lineColor = discColor;

  const discGeometry = new THREE.CircleGeometry(radius, segments);
  const discMaterial = new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide,
    color: discColor,
    transparent: true,
    opacity: 0,
  });
  this.disc = new THREE.Mesh(discGeometry, discMaterial);
  this.add(this.disc);

  const lineGeometry = new CircleLineGeometry(radius, segments);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    linewidth: 1,
    transparent: true,
    opacity: 0,
  });
  this.line = new THREE.Line(lineGeometry, lineMaterial);
  this.add(this.line);

  if (autoStart) {
    this.start();
  }
}

Pulse.prototype = Object.assign(Object.create(THREE.Object3D.prototype), {

  constructor: Pulse,

  start() {
    this.started = new Date();
  },

  stop() {
    this.started = null;
  },

  update() {
    if (!this.started) {
      return;
    }
    const now = new Date();
    const timeElapsed = now - this.started;
    let percentElapsed = timeElapsed / this.duration;
    if (percentElapsed >= 1) {
      percentElapsed -= Math.floor(percentElapsed);
    }

    const opacity = 1 - percentElapsed;

    let scale = percentElapsed;
    if (scale <= 0) {
      scale = 0.001;
    }

    // I was getting an error:
    //  Matrix3.getInverse(): can't invert matrix, determinant is 0
    //
    // From SO:
    //  Matrix3.getInverse(): can't invert matrix, determinant is 0
    //  usually happens when either the scale.x, scale.y or scale.z are 0.
    //  Make sure you're not scaling the object to 0.
    //
    // Ref:
    //  http://stackoverflow.com/questions/19150120/scaling-an-object-in-three-js

    this.scale.set(scale, scale, scale);
    this.line.material.opacity = opacity;
    this.disc.material.opacity = opacity * 0.15;
  },

});
