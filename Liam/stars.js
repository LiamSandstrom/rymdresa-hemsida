import { randomInt } from "./helpers.js";
import { delay } from "./helpers.js";

export class StarsBackground {
  #bgElement;
  #cells;
  #cellSize;
  #starSpawnChance;
  #bufferMultiplier;
  #currentHeight;
  #currentWidth;
  #currentSize;

  constructor(
    bgElement,
    cellSize,
    { starSpawnChance = 3, bufferMultiplier = 1.1 } = {}
  ) {
    this.#bgElement = bgElement;
    this.#cellSize = cellSize;
    this.#starSpawnChance = starSpawnChance;
    this.#cells = [];
    this.#bufferMultiplier = bufferMultiplier;
    this.#currentHeight = 0;
    this.#currentWidth = 0;
  }

  init() {
    this.#createBackground();
    this.#bgElement.style.gridTemplateColumns = `repeat(auto-fill, ${
      this.#cellSize
    }px)`;
    this.#bgElement.style.gridTemplateRows = `repeat(auto-fill, ${
      this.#cellSize
    }px)`;
    this.#bgElement.style.opacity = "100%";

    window.addEventListener("resize", () => {
      this.#createBackground();
    });
  }

  #createBackground() {
    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = document.documentElement.scrollHeight;

    if (pageWidth * pageHeight < this.#currentSize) {
      return;
    }

    this.#bgElement.innerHTML = "";

    this.#currentWidth = pageWidth * this.#bufferMultiplier;
    this.#currentHeight = pageHeight * this.#bufferMultiplier;
    this.#currentSize = this.#currentHeight * this.#currentWidth;

    const cols = Math.floor(this.#currentWidth / this.#cellSize);
    const rows = Math.floor(this.#currentHeight / this.#cellSize);
    console.log("AH");

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
    div.addEventListener("mousedown", this.#cellClick);

    div.addEventListener("touchstart", this.#cellEnter);
    div.addEventListener("touchend", this.#cellLeave);

    return div;
  }

  #cellEnter(e) {
    const cell = e.target;
    for (const child of cell.children) {
      child.style.transition = "all 0.25s ease";
      child.classList.add("star-hover");
      cell.style.cursor = "pointer";
    }
  }

  async #cellLeave(e) {
    const cell = e.target;
    await delay(500);
    for (const child of cell.children) {
      child.style.transition = "all 0.9s";
      child.classList.remove("star-hover");
    }
  }

  async #cellClick(e) {
    console.log(e);
    const cell = e.target;
    for (const child of cell.children) {
      child.classList.add("star-clicked-begin");
      child.style.transition = "scale 0.8s, background-color 0.50s";
      await delay(550);
      child.classList.remove("star-clicked-begin");
      child.style.transition = "all 0.3s";
      child.classList.add("star-clicked");
      await delay(1000);
      child.style.transition = "all 1s";
      child.classList.remove("star-clicked");
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
