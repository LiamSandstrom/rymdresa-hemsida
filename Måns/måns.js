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

fetch("data.json")
.then(response => response.json())
.then(projektData => {
   const lista = document.getElementById("projekt-lista");
   
   projektData.forEach(projekt => {
    const projektElement = document.createElement("div");
    projektElement.classList.add("projekt-item");

    projektElement.innerHTML = `
    <h4>${projekt.titel}</h4>
    <p><strong>Kund: </strong> ${projekt.kund}</p>
    <p><strong>Beskrivning: </strong> ${projekt.beskrivning}</p>
    <p><strong>Info: </strong> ${projekt.information}</p>
    `;
    lista.appendChild(projektElement);
   })
})