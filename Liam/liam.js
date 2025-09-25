import ItemCarousel from "./itemCarousel.js";
import { StarsBackground } from "./stars.js";

function initItemCarousel() {
  const itemDiv = document.querySelector("#item-carousel");
  const itemCarousel = new ItemCarousel(itemDiv, {
    loop: true,
  });
  itemDiv.appendChild(itemCarousel.getElement());
}

function initStarsBackground() {
  const itemDiv = document.querySelector("#background");
  const starsBackground = new StarsBackground(itemDiv, 50, {
    starSpawnChance: 5,
  });
  starsBackground.init();
}

initItemCarousel()
initStarsBackground();

