import Planet from './planet';

const props = {
  color: 0xd2691e,
  radius: 6052, // kms
  orbitRadius: 108000000, // kms
  orbitPeriod: 225, // days
};

export default class Venus extends Planet {

  constructor() {
    super(props);
  }

}
