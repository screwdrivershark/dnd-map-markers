"use strict";

const mapContainer = document.querySelector("#map-container");
mapContainer.addEventListener("click", (e) => {
    if (!e.target.closest(".marker")) {
        const popups = mapContainer.querySelectorAll(".popup");
        popups.forEach((popup) => popup.classList.add("hidden"));
    }
})

mapContainer.addEventListener("click", (e) => {
    const rect = mapContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(`left: ${x}, top: ${y}`);
})

fetch("markers.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((marker) => {
            const horizontalOffset = 10;
            const verticalOffset = 20;

            const description = marker.text?.trim() || "";
            const button = document.createElement("button");
            button.classList.add("marker");
            button.style.left = `${marker.left - horizontalOffset}px`;
            button.style.top = `${marker.top - verticalOffset}px`;

            const html = `
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16"
                stroke="white" stroke-width="1">
                <!-- <animate attributeName="stroke-width" values="1;0;1" dur="4s" repeatCount="indefinite"/> -->
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>                    
            </svg>
            <div class="popup hidden">
                <h2>${marker.title}</h2>
                <span>${description}</span>
            </div>`;
            button.innerHTML = html;

            button.addEventListener("click", (e) => {
                const popup = e.currentTarget.querySelector(".popup");
                popup.classList.toggle("hidden");
            });
            mapContainer.appendChild(button);
        })
    })
    .catch((error) => {
        console.error(error);
        alert("Failed to load markers file!");
    });
