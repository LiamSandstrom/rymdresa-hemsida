let currentSlide = 0;
const slides = document.getElementsByClassName("slide");

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[currentSlide].style.display = "block";
}

function changeSlide(step) {
  showSlide(currentSlide + step);
}

window.onload = () => showSlide(currentSlide);