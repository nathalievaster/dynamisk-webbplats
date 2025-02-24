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
window.onload = async () => {
    try {
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        const data = await response.json();

        // Lagrar program och kurser i varsina variabler
        const courses = data.filter(item => item.type === "Kurs");
        const programs = data.filter(item => item.type === "Program");

        // Plockar ut de 6 mest sökta kurserna
        const topCourses = courses
            .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
            .slice(0, 6);

        console.log("Topp 6 kurser:", topCourses);

        // Plockar ut de 5 mest sökta programmen
        const topPrograms = programs
            .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
            .slice(0, 5);

        console.log("Topp 5 program:", topPrograms);
    } catch (error) {
        console.error("Fel vid hämtning av data:", error);
    }
};

// Stapeldiagram
/*
const ctx = document.getElementById('barChart');
new Chart(ctx, {
    type: bar,
    data: {
        labels: 
        datasets, [{
            label: "Antal sökande",
            data: 
        }]
    },
}); */