export function initScrollAnimation(span) {
  for (let i = 0; i < span.children.length; i++) {
    const letter = span.children[i];
    letter.style.animationDelay = `${i * 0.1}s`;
  }
}
