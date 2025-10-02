import Planet from "./planet.js";
import Galaxy from "./galaxy.js";
import GalaxyUI from "./galaxyUI.js";

export default class GalaxyController {
  #container;
  #galaxy;
  #galaxyUI;

  constructor(container) {
    this.#container = container;
    this.#galaxy = new Galaxy();
    this.#galaxyUI = new GalaxyUI(document.querySelector("#project-selection-buttons"));
  }

  async init() {
    const data = await axios.get("./liam/projects.json");
    const projects = data.data.projects;
    
    for (let i = 0; i < projects.length; i++) {
      const orbit = this.#createOrbit(i, projects[i]);
      this.#container.appendChild(orbit);
    }
    
    this.#galaxyUI.init([
      { text: "Name", cb: this.#galaxy.sortOnTitleInOrder },
      { text: "Degrees", cb: this.#galaxy.sortOnDegreesInOrder },
      { text: "Travel time", cb: this.#galaxy.sortOnTravelTimeInOrder },
    ]);

    this.#handlePlanetClick(this.#galaxy.getPlanets()[0])
  }

  #createOrbit(i, project) {
    const orbit = document.createElement("div");
    orbit.classList.add("orbit");
    const size = this.#container.offsetWidth - 60 * i + "px";
    orbit.style.width = size;
    orbit.style.height = size;
    
    const planet = new Planet(project);
    const planetElement = this.#galaxyUI.createPlanetElement(planet, this.#handlePlanetClick.bind(this));
    
    this.#galaxy.addPlanet(planet);
    this.#galaxyUI.addOrbit(orbit);
    
    orbit.appendChild(planetElement);
    return orbit;
  }

  #handlePlanetClick(planet) {
    const previousPlanet = this.#galaxy.getSelectedPlanet();
    if(planet === previousPlanet) return;
    this.#galaxy.planetClicked(planet);
    const selectedPlanet = this.#galaxy.getSelectedPlanet();
    
    this.#galaxyUI.updateSelection(selectedPlanet, previousPlanet);
    this.#galaxyUI.updateText(selectedPlanet);
  }
}
