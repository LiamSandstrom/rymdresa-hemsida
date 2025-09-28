export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
