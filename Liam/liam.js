import ItemCarousel from "./itemCarousel.js";
import { StarsBackground } from "./stars.js";
import { initScrollAnimation } from "./animations.js";
import { initAppearAnimation } from "./animations.js";
import { delay } from "./helpers.js";

function initItemCarousel() {
  const itemDiv = document.querySelector("#item-carousel");
  const itemCarousel = new ItemCarousel(itemDiv, {
    loop: true,
    height: "400px",
    width: "310px",
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

async function initAnimationsWithDelay(ms) {
  await delay(ms);
  initAppearAnimation();

  await delay(2000);
  const span = document.querySelector("#scroll-span");
  initScrollAnimation(span);
}

initItemCarousel();
initStarsBackground();
initAnimationsWithDelay(100);

/**
bugs:
 * star:
 ** mouseenter -> mouseleave -> mouseenter before mouseleave animation starts leads to mouseleave playing even when hovering

**/
