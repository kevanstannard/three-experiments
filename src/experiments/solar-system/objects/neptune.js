import { ONE_BILLION } from '../lib/constants';
import Planet from './planet';

const props = {
  color: 0x336699,
  radius: 24622, // kms
  orbitRadius: 4.5 * ONE_BILLION, // kms
  orbitPeriod: 165 * 365, // days
};

export default class Neptune extends Planet {

  constructor() {
    super(props);
  }

}
