import Planet from './planet';

const props = {
  radius: 6052,
  color: 0xd2691e,
  orbitRadius: 108000000,
};

export default class Venus extends Planet {

  constructor() {
    super(props);
  }

}
