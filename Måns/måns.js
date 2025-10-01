const bilder = document.querySelectorAll(".slide");
let aktuellIndex = 0;

function visaBild(index) {
    bilder.forEach((bild, i) => {
        bild.classList.remove("active");
        if (i === index) {
            bild.classList.add("active");
        }
    })
}

visaBild(aktuellIndex);

function nextSlide() {
    aktuellIndex = (aktuellIndex + 1) % bilder.length;
    visaBild(aktuellIndex);
}

function prevSlide() {
    aktuellIndex = (aktuellIndex - 1 + bilder.length) % bilder.length;
    visaBild(aktuellIndex);
}