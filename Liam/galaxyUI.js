export default class GalaxyUI {
  #container;
  #selected;
  #buttons;
  #orbits;
  #planetElements;
  #customerEl;
  #degreesEl;
  #travelTimeEl;
  #titleEl;
  #infoElements;

  constructor(container) {
    this.#container = container;
    this.#buttons = new Map();
    this.#selected = null;
    this.#orbits = [];
    this.#planetElements = new Map();
    this.#infoElements = [
      ...document.querySelector("#titles").children,
      ...document.querySelector("#project-text").children,
      document.querySelector("#project"),
    ];
    this.#customerEl = document.querySelector("#planet-customer-text");
    this.#degreesEl = document.querySelector("#planet-degrees-text");
    this.#travelTimeEl = document.querySelector("#planet-traveltime-text");
    this.#titleEl = document.querySelector("#planet-title-text");
  }

  init(buttons) {
    for (const button of buttons) {
      const element = document.createElement("button");
      element.textContent = button.text + " ^";
      this.#buttons.set(button, true);
      element.addEventListener("click", () => {
        const sortedPlanets = button.cb(this.#buttons.get(button));
        this.rotateGalaxy(sortedPlanets);
        this.selectButton(element, this.#buttons.get(button));
        this.#buttons.set(button, !this.#buttons.get(button));
      });
      this.#container.appendChild(element);
    }
  }

  selectButton(button, inOrder) {
    if (this.#selected !== null) {
      this.#selected.classList.remove("inOrder");
      this.#selected.classList.remove("notInOrder");
    }
    const str = button.textContent;
    if (inOrder) {
      button.classList.add("inOrder");
      button.textContent = str.slice(0, -1) + "^";
    } else {
      button.textContent = str.slice(0, -1) + "v";
      button.classList.add("notInOrder");
    }
    this.#selected = button;
  }

  createPlanetElement(planet, clickCallback) {
    const element = document.createElement("div");
    element.classList.add("planet");
    element.addEventListener("click", () => {
      clickCallback(planet);
    });
    this.#planetElements.set(planet, element);
    return element;
  }

  addOrbit(orbit) {
    this.#orbits.push(orbit);
  }

  rotateGalaxy(sortedPlanets) {
    for (let i = 0; i < sortedPlanets.length; i++) {
      const planet = sortedPlanets[i];
      const rotation = i * 45;
      const planetElement = this.#planetElements.get(planet);
      const orbit = this.#findOrbitForPlanet(planetElement);
      if (orbit) {
        orbit.style.transform = `rotate(${rotation}deg)`;
      }
    }
  }

  updateSelection(selectedPlanet, previousPlanet) {
    if (previousPlanet && this.#planetElements.has(previousPlanet)) {
      this.#planetElements
        .get(previousPlanet)
        .classList.remove("planet-selected");
    }
    if (selectedPlanet && this.#planetElements.has(selectedPlanet)) {
      this.#planetElements.get(selectedPlanet).classList.add("planet-selected");
    }
  }

  updateText(planet) {
    if (!planet) return;

    this.animateText();
    this.#customerEl.textContent = planet.getCustomer();
    this.#degreesEl.textContent = planet.getDegrees();
    this.#travelTimeEl.textContent = planet.getTravelTime();
    this.#titleEl.textContent = planet.getTitle();
  }

  #findOrbitForPlanet(planetElement) {
    return this.#orbits.find((orbit) => orbit.contains(planetElement));
  }

  animateText() {
    for (const el of this.#infoElements) {
      el.classList.remove("text-update");
      void el.offsetWidth;
      el.classList.add("text-update");
    }
  }
}
