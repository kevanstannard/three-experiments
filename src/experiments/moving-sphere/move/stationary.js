/* eslint class-methods-use-this: off */

const zero = new THREE.Vector3();

export default class Stationary {
  getMoveVector() {
    return zero;
  }
}
