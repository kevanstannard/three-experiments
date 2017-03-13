import Nucleus from './Nucleus';
import Electron from './Electron';

const electronVelocity = Math.PI * 2 / 60;

// function rand() {
//   return Math.floor(Math.random() * 100) - 50;
// }

function calculateShellNumber(electronIndex) {
  let shellNumber = 1;
  let prevElectronCount = 0;
  let found = false;
  while (!found) {
    const shellCount = (2 * shellNumber * shellNumber);
    const electronCount = shellCount + prevElectronCount;
    if (electronIndex < electronCount) {
      found = true;
    } else {
      prevElectronCount = electronCount;
      shellNumber += 1;
    }
  }
  return shellNumber;
}

function getShell() {
  
}

export default class Atom extends THREE.Object3D {

  constructor(props) {
    super();
    this.time = 0;
    this.electrons = [];
    const { protons, neutrons, electrons } = props;

    const nucleus = new Nucleus({ protons, neutrons });
    this.add(nucleus);

    this.angleOffset = Math.PI * 2 / electrons;

    for (let n = 0; n < electrons; n += 1) {
      this.addElectron();
    }
  }

  addElectron() {
    const electronIndex = this.electrons.length;
    const electron = new Electron();
    electron.shellNumber = calculateShellNumber(electronIndex);
    this.electrons.push(electron);
    this.add(electron);
  }

  update(delta) {
    this.time += delta;
    const commonAngle = this.time * electronVelocity;
    for (let i = 0; i < this.electrons.length; i += 1) {
      const electron = this.electrons[i];
      const radius = electron.shellNumber * 50;
      const angle = commonAngle + (i * this.angleOffset);
      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle) * radius;
      electron.position.set(x, y, 0);
    }
  }

}
