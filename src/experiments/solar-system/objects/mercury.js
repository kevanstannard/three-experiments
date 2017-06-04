import Planet from './planet';

const props = {
  radius: 2440,
  // color: 0x888888,
  color: 0xffffff,
  orbitRadius: 58000000,
};

export default class Mercury extends Planet {

  constructor() {
    super(props);
  }

}
