import Electron from './Electron';

const ELECTRON_ROTATION_VELOCITY = (2 * Math.PI) / 16;

export default class Shell extends THREE.Object3D {

  constructor(shellNumber) {
    super();
    this.shellNumber = shellNumber;
    this.maxElectrons = 2 * this.shellNumber * this.shellNumber;
    this.electrons = [];
    this.angleOffset = 0;
    this.time = 0;
  }

  isFull() {
    return this.electrons.length === this.maxElectrons - 1;
  }

  addElectrons(electronCount) {
    let count = electronCount;
    for (let i = 0; i < this.maxElectrons; i += 1) {
      if (!this.isFull()) {
        this.addElectron();
        count -= 1;
      }
    }
  }

  addElectron() {
    if (this.isFull()) {
      return false;
    }
    const electron = new Electron();
    this.electrons.push(electron);
    this.add(electron);
    this.angleOffset = Math.PI * 2 / this.electrons.length;
    return true;
  }

  update(delta) {
    this.time += delta;
    const baseAngle = this.time * ELECTRON_ROTATION_VELOCITY;
    for (let i = 0; i < this.electrons.length; i += 1) {
      const electron = this.electrons[i];
      const radius = this.shellNumber * 50;
      const angle = baseAngle + (i * this.angleOffset);
      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle) * radius;
      electron.position.set(x, y, 0);
    }
  }

}
