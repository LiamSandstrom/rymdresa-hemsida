export class Skillbar {
  #text;
  #progress;
  #percent;

  constructor(text, progress, percent) {
    this.#text = text;
    this.#progress = progress;
    this.#percent = percent;

    console.log(text)
    this.#text.textContent = this.#percent + "%";
    this.#progress.dataset.percent = percent;
  }

  getPercent = () => this.#percent;
}
