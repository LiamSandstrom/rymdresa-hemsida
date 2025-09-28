export function initScrollAnimation(span) {
  for (let i = 0; i < span.children.length; i++) {
    const letter = span.children[i];
    letter.style.animation = "wave 4s ease-in-out infinite";
    letter.style.animationDelay = `${i * 0.1}s`;
  }
}

export function initAppearAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-in");
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}
