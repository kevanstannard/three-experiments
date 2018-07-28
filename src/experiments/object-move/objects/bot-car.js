import Car from './car';

const ACTION_FORWARD = -1;
const ACTION_LEFT = 0;
const ACTION_RIGHT = 1;

const shouldTurn = () => Math.random() < 0.5;
const whichTurn = () => Math.floor(Math.random() * 2);

export default class BotCar extends Car {
  constructor(props) {
    super(props);
    this.currentAction = ACTION_FORWARD;
    this.timeRemaining = 0;
  }

  update(delta) {
    this.timeRemaining -= delta;
    if (this.timeRemaining <= 0) {
      if (shouldTurn()) {
        this.currentAction = whichTurn();
      } else {
        this.currentAction = ACTION_FORWARD;
      }
      this.timeRemaining = 1;
    }
    switch (this.currentAction) {
      case ACTION_LEFT: {
        this.rotateLeft(delta);
        break;
      }
      case ACTION_RIGHT: {
        this.rotateRight(delta);
        break;
      }
      default: {
        // No default
      }
    }
    this.moveForward(delta);
  }
}
