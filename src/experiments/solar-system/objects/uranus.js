import { ONE_BILLION } from '../lib/constants';
import Planet from './planet';

const props = {
  color: 0xccffff,
  radius: 25362, // kms
  orbitRadius: 3 * ONE_BILLION, // kms
  orbitPeriod: 84 * 365, // days
};

export default class Uranus extends Planet {

  constructor() {
    super(props);
  }

}
