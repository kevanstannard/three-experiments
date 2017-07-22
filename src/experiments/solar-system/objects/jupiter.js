import { ONE_MILLION } from '../lib/constants';
import Planet from './planet';

const props = {
  color: 0xff6347,
  radius: 69911, // kms
  orbitRadius: 778 * ONE_MILLION, // kms
  orbitPeriod: 4329, // days
};

export default class Jupiter extends Planet {

  constructor() {
    super(props);
  }

}
