export default class Galaxy {
  #planets;
  #selectedPlanet;

  constructor() {
    this.#planets = [];
    this.#selectedPlanet = null;
  }

  sortOnTitleInOrder = (inOrder) => {
    if (inOrder) {
      return this.#planets.sort((a, b) =>
        a.getTitle().toLowerCase().localeCompare(b.getTitle().toLowerCase())
      );
    } else {
      return this.#planets.sort((a, b) =>
        b.getTitle().toLowerCase().localeCompare(a.getTitle().toLowerCase())
      );
    }
  };

  sortOnDegreesInOrder = (inOrder) => {
    if (inOrder) {
      return this.#planets.sort((a, b) => a.getDegrees() - b.getDegrees());
    } else {
      return this.#planets.sort((a, b) => b.getDegrees() - a.getDegrees());
    }
  };

  sortOnTravelTimeInOrder = (inOrder) => {
    if (inOrder) {
      return this.#planets.sort(
        (a, b) => a.getTravelTime() - b.getTravelTime()
      );
    } else {
      return this.#planets.sort(
        (a, b) => b.getTravelTime() - a.getTravelTime()
      );
    }
  };

  planetClicked = (planet) => {
    if (this.#selectedPlanet !== null) {
      this.#selectedPlanet = null;
    }
    this.#selectedPlanet = planet;
  };

  getSelectedPlanet() {
    return this.#selectedPlanet;
  }

  addPlanet(planet) {
    this.#planets.push(planet);
  }

  getPlanets =() => this.#planets;
}