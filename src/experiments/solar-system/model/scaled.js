import sol from './index';

const RADIUS_SCALE = 0.01;
const ORBIT_RADIUS_SCALE = 0.0001;

function scale(model) {
  const scaledModel = { ...model };
  if (model.radius) {
    scaledModel.radius = model.radius * RADIUS_SCALE;
  }
  if (model.orbitRadius) {
    scaledModel.orbitRadius = model.orbitRadius * ORBIT_RADIUS_SCALE;
  }
  return scaledModel;
}

function scaleMoon(model) {
  const scaled = scale(model);
  return scaled;
}

function scalePlanet(model) {
  const scaled = scale(model);
  if (model.moons) {
    scaled.moons = model.moons.map(scaleMoon);
  }
  return scaled;
}

function scaleStar(model) {
  const scaled = scale(model);
  if (model.planets) {
    scaled.planets = model.planets.map(scalePlanet);
  }
  return scaled;
}

export default scaleStar(sol);
