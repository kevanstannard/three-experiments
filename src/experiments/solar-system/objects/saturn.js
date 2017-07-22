import { ONE_BILLION } from '../lib/constants';
import Planet from './planet';

const props = {
  color: 0xffd700,
  radius: 58232, // kms
  orbitRadius: 1.4 * ONE_BILLION, // kms
  orbitPeriod: 10759, // days
};

export default class Saturn extends Planet {

  constructor() {
    super(props);
  }

}
