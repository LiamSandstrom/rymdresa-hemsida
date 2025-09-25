export default class ItemCarousel {
  #outerContainer;
  #innerContainer;
  #items = [];
  #currIndex;
  #animationSpeed;
  #dotContainer;
  #options;
  #autoPlayTracker;

  static #leftArrowSVG =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDZMMTAgMTJMMTUgMTgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==";
  static #rightArrowSVG =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgNkwxNSAxMkw5IDE4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K";

  constructor(
    container,
    {
      width = "400px",
      height = "400px",
      animationSpeed = 400,
      showArrows = true,
      showDots = true,
      autoPlay = false,
      autoPlayInterval = 5000,
      loop = false,
    } = {}
  ) {
    this.#animationSpeed = animationSpeed;
    this.#options = { showArrows, showDots, autoPlay, autoPlayInterval, loop };

    this.#assignContainers(width, height);
    this.#assignItems(container);

    if (this.#options.showArrows) this.#addArrows();
    if (this.#options.showDots) this.#addDots();
    if (this.#options.autoPlay) this.autoPlay();
    this.setStart();
  }

  #assignContainers(width, height) {
    this.#outerContainer = document.createElement("div");
    this.#innerContainer = document.createElement("div");

    this.#outerContainer.style.width = width;
    this.#outerContainer.style.height = height;

    this.#outerContainer.classList.add("outerContainer");
    this.#innerContainer.classList.add("innerContainer");

    this.#outerContainer.appendChild(this.#innerContainer);
  }

  #assignItems(container) {
    const items = Array.from(container.children);
    for (const item of items) {
      this.#items.push(item);
      this.#innerContainer.appendChild(item);
    }
  }

  setStart() {
    this.#currIndex = 0;
    this.#selectDot();
    this.#innerContainer.style.transform = "translate(-0%)";
  }

  next() {
    this.#moveToOffset(1);
  }

  previous() {
    this.#moveToOffset(-1);
  }

  #moveToOffset(offset) {
    const newIndex = this.#currIndex + offset;
    const maxIndex = this.itemsLength() - 1;

    if (newIndex < 0 || newIndex > maxIndex) {
      if (!this.#options.loop) return;
      const loopIndex = newIndex < 0 ? maxIndex : 0;
      this.goToSlide(loopIndex);
    } else {
      this.setIndex(newIndex);
      this.#animateSlide(this.#getNextTranslate());
    }

    if (this.#options.autoPlay) this.clearAutoPlay();
  }

  goToSlide(index) {
    if (index < 0 || index >= this.itemsLength()) return;

    this.setIndex(index);
    this.#animateSlide(this.#getNextTranslate());
  }

  autoPlay() {
    this.#autoPlayTracker = setTimeout(
      this.next.bind(this),
      this.#options.autoPlayInterval
    );
  }

  clearAutoPlay() {
    if (!this.#options.autoPlay) return;
    clearTimeout(this.#autoPlayTracker);
    this.autoPlay();
  }

  #animateSlide(newTransform) {
    this.#innerContainer.style.transition = `transform ${
      this.#animationSpeed
    }ms ease`;
    this.#innerContainer.style.transform = `translate(${newTransform})`;
  }

  #getNextTranslate() {
    const containerWidth = this.#innerContainer.offsetWidth;
    const gap = Number.parseInt(getComputedStyle(this.#innerContainer).gap);
    const total = (containerWidth + gap) * this.#currIndex;
    return -(total / containerWidth) * 100 + "%";
  }

  #addArrows() {
    const leftArrow = document.createElement("img");
    leftArrow.src = ItemCarousel.#leftArrowSVG;
    leftArrow.classList.add("arrow");
    leftArrow.classList.add("leftArrow");
    this.#outerContainer.appendChild(leftArrow);

    const rightArrow = document.createElement("img");
    rightArrow.src = ItemCarousel.#rightArrowSVG;
    rightArrow.classList.add("arrow");
    rightArrow.classList.add("rightArrow");
    this.#outerContainer.appendChild(rightArrow);

    leftArrow.addEventListener("click", () => this.previous());
    rightArrow.addEventListener("click", () => this.next());
  }

  #addDots() {
    this.#dotContainer = document.createElement("div");
    this.#dotContainer.classList.add("dot-container");
    for (let i = 0; i < this.itemsLength(); i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      this.#dotContainer.appendChild(dot);

      dot.addEventListener("click", () => this.goToSlide(i));
    }
    this.#outerContainer.appendChild(this.#dotContainer);
  }

  #selectDot() {
    if (this.#options.showDots != true) return;
    this.#dotContainer.children[this.#currIndex].style.backgroundColor =
      "white";
  }

  #deselectDot() {
    if (this.#options.showDots != true) return;
    this.#dotContainer.children[this.#currIndex].style.backgroundColor =
      "transparent";
  }

  setIndex(value) {
    this.#deselectDot();
    this.#currIndex = value;
    this.#selectDot();
  }

  //Public
  itemsLength = () => this.#items.length;
  getElement = () => this.#outerContainer;
  getCurrentIndex = () => this.#currIndex;

  destroy() {
    this.#outerContainer?.remove();
  }
}
