import Proton from './Proton';
import Neutron from './Neutron';

function rand() {
  return Math.floor(Math.random() * 100) - 50;
}

export default class Nucleus extends THREE.Object3D {

  constructor(props) {
    super();
    let protonCount = props.protons;
    let neutronCount = props.neutrons;

    while (protonCount || neutronCount) {
      if (protonCount) {
        const proton = new Proton();
        proton.position.set(rand(), rand(), 0);
        this.add(proton);
        protonCount -= 1;
      }
      if (neutronCount) {
        const neutron = new Neutron();
        neutron.position.set(rand(), rand(), 0);
        this.add(neutron);
        neutronCount -= 1;
      }
    }
  }

}
