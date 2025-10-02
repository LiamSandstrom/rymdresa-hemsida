const projektLista = document.getElementById("projektLista");

fetch("data.json")
 .then(response => response.json())
 .then(data => {
    data.forEach(projekt => {
        let li = document.createElement("li");
        li.classList.add("projektKort");

        let titel = document.createElement("h4");
        titel.textContent = projekt.titel;
        let kund = document.createElement("p");
        kund.innerHTML = `<strong>Kund:</strong> ${projekt.kund}`;
        let beskrivning = document.createElement("p");
        beskrivning.innerHTML = `<strong>Beskrivning:</strong> ${projekt.beskrivning}`;
        let information = document.createElement("p");
        information.innerHTML = `<strong>Info:</strong> ${projekt.information}`;



        li.appendChild(titel);
        li.appendChild(kund);
        li.appendChild(beskrivning);
        li.appendChild(information);
        projektLista.appendChild(li);
    })
 })

let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function showSlides(x) {
    if (x >= slides.length){
        slideIndex = 0;
    } else if (x < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = x;
    }
    

    for( let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

function changeSlide(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

showSlides(slideIndex);

