import Planet from './planet';

const props = {
  radius: 6371,
  color: 0x0000ff,
  orbitRadius: 150000000,
};

export default class Earth extends Planet {

  constructor() {
    super(props);
  }

}
