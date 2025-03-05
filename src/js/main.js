"use strict"
import Chart from "chart.js/auto";
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
/*
const button = document.getElementById('buttonAnimate');

button.addEventListener('click', () => {
    button.classList.add('shake');

    // Ta bort animationen efter att den har kört klart (500ms)
    setTimeout(() => {
        button.classList.remove('shake');
    }, 500);
}); 
*/

/**
 * Hämtar och filtrerar kurs- och programdata från en extern källa
 * och skapar grafiska visualiseringar för de mest populära kurserna och programmen.
 * 
 * @async
 * @function fetchData
 * @throws {Error} Om API-anropet misslyckas eller om data inte går att bearbeta
 */
async function fetchData() {
    try {
        const response = await fetch("https://studenter.miun.se/~mallar/dt211g/");
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Ingen data hittades.");
        }

        // Filtrera ut kurser och program
        const courses = data.filter(item => item.type === "Kurs");
        const programs = data.filter(item => item.type === "Program");

        // Hämta de 6 mest sökta kurserna
        const topCourses = courses
            .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
            .slice(0, 6);

        createBarChart(topCourses);

        // Hämta de 5 mest sökta programmen
        const topPrograms = programs
            .sort((a, b) => b.applicantsTotal - a.applicantsTotal)
            .slice(0, 5);

        createPieChart(topPrograms);
    } catch (error) {
        console.error("Fel vid hämtning av data:", error);
    }
}

/**
 * Skapar ett stapeldiagram för de mest populära kurserna.
 * 
 * @function createBarChart
 * @param {Array} topCourses - En lista med de 6 mest sökta kurserna
 */
function createBarChart(topCourses) {
    const ctx = document.getElementById('barChart');

    new Chart(ctx, {
        type: "bar",
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        },
        data: {
            labels: topCourses.map(course => course.name),
            datasets: [{
                label: "Antal sökande",
                data: topCourses.map(course => parseInt(course.applicantsTotal, 10))
            }]
        }
    });
}

/**
 * Skapar ett cirkeldiagram för de mest populära programmen.
 * 
 * @function createPieChart
 * @param {Array} topPrograms - En lista med de 5 mest sökta programmen
 */
function createPieChart(topPrograms) {
    const ctx = document.getElementById('pieChart');

    new Chart(ctx, {
        type: "pie",
        options: { responsive: true },
        data: {
            labels: topPrograms.map(program => program.name),
            datasets: [{
                label: "Antal sökande",
                data: topPrograms.map(program => parseInt(program.applicantsTotal, 10))
            }]
        }
    });
}

// Anropa fetchData när sidan laddats
window.onload = fetchData;

// KARTA
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchLocation");
    const locationInput = document.getElementById("locationInput");
    const mapFrame = document.getElementById("mapFrame");

    /**
     * Hämtar koordinater för en angiven plats och uppdaterar kartan.
     * 
     * @function searchLocation
     */
    function searchLocation() {
        let location = locationInput.value.trim();

        if (!location) {
            alert("Ange en plats!");
            return;
        }

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    alert("Platsen hittades inte!");
                    return;
                }

                let lat = parseFloat(data[0].lat);
                let lon = parseFloat(data[0].lon);
                let bboxMargin = 0.02;
                let bbox = `${lon - bboxMargin},${lat - bboxMargin},${lon + bboxMargin},${lat + bboxMargin}`;

                // Uppdatera kartan med ny plats
                mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
            })
            .catch(error => {
                console.error("Fel vid API-anrop:", error);
            });
    }

    // Lyssna efter klick på sökknappen
    searchButton.addEventListener("click", searchLocation);
});
