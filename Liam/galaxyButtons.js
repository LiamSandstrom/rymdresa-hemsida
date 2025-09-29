export default class GalaxyButtons {
  #container;
  #selected;
  #buttons;

  constructor(buttons) {
    this.#container = document.querySelector("#project-selection-buttons");
    this.#buttons = new Map();
    this.#selected = null;

    for (const button of buttons) {
      const element = document.createElement("button");
      element.textContent = button.text + " ^";
      this.#buttons.set(button, true);
      element.addEventListener("click", () => {
        button.cb(this.#buttons.get(button));
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
}
