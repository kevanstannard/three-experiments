import Planet from './planet';

const props = {
  name: 'earth',
  color: 0x0000ff,
  radius: 6371, // kms
  orbitRadius: 150000000, // kms
  orbitPeriod: 365, // days
};

export default class Earth extends Planet {

  constructor() {
    super(props);
  }

}
