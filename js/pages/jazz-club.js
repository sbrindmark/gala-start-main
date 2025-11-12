import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function jazzClub() {
  const eventsHtml = await clubInfoAndEvents('a37c');

  // Ta bort eventuella kvarvarande popup-rutor när sidan laddas
  const existingPopups = document.querySelectorAll('.event-info');
  existingPopups.forEach(popup => popup.remove());

  // Lägg till event listeners för klickbara events
  setTimeout(() => {
    // Gör varje event klickbar
    const eventEls = document.querySelectorAll(".event");
    eventEls.forEach((eventEl) => {
      eventEl.style.cursor = "pointer";

      // När ett event klickas, visa mer info
      eventEl.addEventListener("click", () => {
        const title = eventEl.querySelector("h3")?.textContent || "";
        const desc = eventEl.querySelector("p")?.textContent || "";
        // Skapa info-rutan
        const infoBox = document.createElement("div");
        infoBox.className = "event-info";
        infoBox.innerHTML = `
          <div class="event-info-content">
            <h2>${title}</h2>
            <p>${desc}</p>
            <a href="#eventbokare" class="boka-btn">🎟️ Boka event</a>
            <button class="close-btn">Stäng</button>
          </div>
        `;

        document.body.appendChild(infoBox);

        // Stänger info-rutan
        infoBox.querySelector(".close-btn").addEventListener("click", () => {
          infoBox.remove();
        });
      });
    });
  }, 300);

  //html för jazz club
  return `
    <div class="jazz-page">
      ${eventsHtml}
 
      <footer class="contact">
        <h2>Kontakta oss</h2>
        <p>Email: info@jazzklubben.se</p>
        <p>Telefon: 08-555 12 345</p>
      </footer>
    </div>
  `;
}

