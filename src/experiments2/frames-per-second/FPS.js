function now() {
  return (window.performance || Date).now() / 1000;  // Seconds
}

export default class FPS {

  constructor() {
    this.prevTime = now();
    this.delta = 0;
    this.elapsed = 0;
    this.frames = 0;
    this.fps = 0;
    this.fpsAverage = 0;
  }


  update() {
    const time = now();
    this.frames += 1;
    this.delta = time - this.prevTime;
    this.elapsed += this.delta;
    this.fps = 1 / this.delta;
    this.fpsAverage = this.frames / this.elapsed;
    this.prevTime = time;
  }

}
