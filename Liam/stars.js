import { randomInt } from "./helpers.js";
import { delay } from "./helpers.js";
//fill entire screen with gridcells

//random chance to populate cell

//random top / bottom : left / right

export class StarsBackground {
  #bgElement;
  #cells;
  #cellSize;
  #starSpawnChance;

  constructor(bgElement, cellSize, { starSpawnChance = 3 } = {}) {
    this.#bgElement = bgElement;
    this.#cellSize = cellSize;
    this.#starSpawnChance = starSpawnChance;
    this.#cells = [];
  }

  init() {
    this.#createBackground();
    this.#bgElement.style.gridTemplateColumns = `repeat(auto-fill, ${
      this.#cellSize
    }px)`;
    this.#bgElement.style.gridTemplateRows = `repeat(auto-fill, ${
      this.#cellSize
    }px)`;

    window.addEventListener("resize", () => {
      this.#bgElement.innerHTML = "";
      this.#createBackground();
    });
  }

  #createBackground() {
    const cols = Math.floor((window.innerWidth * 1.2) / this.#cellSize);
    const rows = Math.floor((window.innerHeight * 1.2) / this.#cellSize);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = this.#createCell();

        if (randomInt(1, this.#starSpawnChance) === 1) {
          const star = this.#createStar();
          cell.appendChild(star);
        }
        this.#bgElement.appendChild(cell);
      }
    }
  }

  #createCell() {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.style.height = `${this.#cellSize}px`;

    div.addEventListener("mouseenter", this.#cellEnter);
    div.addEventListener("mouseleave", this.#cellLeave);

    div.addEventListener("touchstart", this.#cellEnter);
    div.addEventListener("touchend", this.#cellLeave);

    return div;
  }

  #cellEnter(e) {
    const cell = e.target;
    for (const child of cell.children) {
      child.style.transition = "all 0.3s ease";
      child.classList.add("star-hover");
    }
  }

  async #cellLeave(e) {
    const cell = e.target;
    await delay(500);
    for (const child of cell.children) {
      child.style.transition = "all 1s";
      child.classList.remove("star-hover");
      child.style.backgroundColor = "white";
    }
  }

  #createStar() {
    const div = document.createElement("div");
    div.classList.add("star");

    const justifyNum = randomInt(1, 3);
    switch (justifyNum) {
      case 1:
        div.style.justifySelf = "flex-start";
        break;
      case 2:
        div.style.justifySelf = "center";
        break;
      case 3:
        div.style.justifySelf = "flex-end";
        break;
    }

    const alignNum = randomInt(1, 3);
    switch (alignNum) {
      case 1:
        div.style.alignSelf = "flex-end";
        break;
      case 2:
        div.style.alignSelf = "center";
        break;
      case 3:
        div.style.alignSelf = "flex-start";
        break;
    }

    return div;
  }
}
