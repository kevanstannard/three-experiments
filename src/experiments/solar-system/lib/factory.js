import Star from '../objects/star';
import Planet from '../objects/planet';
import Moon from '../objects/moon';

function createMoon(moonModel) {
  const moon = new Moon(moonModel);
  return moon;
}

function createPlanet(planetModel) {
  const planet = new Planet(planetModel);
  if (planetModel.moons) {
    planetModel.moons.forEach((moonModel) => {
      const moon = createMoon(moonModel);
      planet.addMoon(moon);
    });
  }
  return planet;
}

function createStar(starModel) {
  const star = new Star(starModel);
  if (starModel.planets) {
    starModel.planets.forEach((planetModel) => {
      const planet = createPlanet(planetModel);
      star.addPlanet(planet);
    });
  }
  return star;
}

export default createStar;
