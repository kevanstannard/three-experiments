import Planet from './planet';

const props = {
  color: 0xff0000,
  radius: 3390, // kms
  orbitRadius: 230000000, // kms
  orbitPeriod: 687, // days
};

export default class Mars extends Planet {

  constructor() {
    super(props);
  }

}
