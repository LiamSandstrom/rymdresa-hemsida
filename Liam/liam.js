import ItemCarousel from "./itemCarousel.js";
import { StarsBackground } from "./stars.js";
import { initScrollAnimation } from "./animations.js";
import { initAppearAnimation } from "./animations.js";
import { delay } from "./helpers.js";
import Galaxy from "./galaxy.js";
import GalaxyController from "./galaxyController.js";
import GalaxyUI from "./galaxyUI.js";
import { Skillbar } from "./skillBars.js";

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

async function initGalaxy() {
  const container = document.querySelector("#project-selection");
  const galaxyController = new GalaxyController(container);
  galaxyController.init();
}

function initSkillbars() {
  const flying = document.querySelector("#skillbar-flying");
  const stars = document.querySelector("#skillbar-star");
  const survival = document.querySelector("#skillbar-survival");

  const flyingText = document.querySelector("#flying-percent");
  const starText = document.querySelector("#star-percent");
  const survivalText = document.querySelector("#survival-percent");

  const flyingPercent = 77;
  const starsPercent = 96;
  const survivalPercent = 82;

  const flyingSkillbar = new Skillbar(flyingText, flying, flyingPercent);
  const starsSkillbar = new Skillbar(starText, stars, starsPercent);
  const survivalSkillbar = new Skillbar(
    survivalText,
    survival,
    survivalPercent
  );

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percent = bar.dataset.percent + "%";

          bar.style.width = percent;

          obs.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(flying);
  observer.observe(stars);
  observer.observe(survival);
}

initItemCarousel();
initStarsBackground();
initAnimationsWithDelay(100);
initGalaxy();
initSkillbars();

/**
bugs:
 * star:
 ** mouseenter -> mouseleave -> mouseenter before mouseleave animation starts leads to mouseleave playing even when hovering
**/
