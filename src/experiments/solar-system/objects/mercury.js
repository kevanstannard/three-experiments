import Planet from './planet';

const props = {
  // color: 0x888888,
  color: 0xffffff,
  radius: 2440, // kms
  orbitRadius: 58000000, // kms
  orbitPeriod: 88, // days
};

export default class Mercury extends Planet {

  constructor() {
    super(props);
  }

}
