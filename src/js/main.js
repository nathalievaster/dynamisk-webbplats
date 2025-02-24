 "use strict"
// Meny-knapp
// Hämtar elementen
let openButton = document.getElementById("open-menu");
let closeButton = document.getElementById("close-menu");

//Lägger till eventlyssnare
openButton.addEventListener('click', toggleMenu);
closeButton.addEventListener('click', toggleMenu);

// Skapar funktionen som fungerar på båda knapparna
function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");
    navMenuEl.classList.toggle("open")

    let style = window.getComputedStyle(navMenuEl);
    if (style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

// Animation på knapp

const button = document.getElementById('buttonAnimate');

button.addEventListener('click', () => {
    button.classList.add('shake');

    // Ta bort animationen efter att den har kört klart (500ms)
    setTimeout(() => {
        button.classList.remove('shake');
    }, 500);
});

// Hämta datan med Fetch API
document.addEventListener("DOMContentLoaded", async ()=> {
    try {
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        const data = await response.json();

        const courses = data.filter(item => item.type === "kurs");
        const programs = data.filter(item => item.type === "program");
    }
})

// Stapeldiagram
const ctx = document.getElementById('barChart');
new Chart(ctx, {
    type: bar,
    data: {
        labels: 
        datasets: [{
            label: "Antal sökande",
            data: 
        }]
    },
});