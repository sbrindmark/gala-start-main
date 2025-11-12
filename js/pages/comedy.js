import clubInfoAndEvents, { attachDeleteButtonListeners } from "../utils/club-info-and-events.js";

export default async function comedy() {
  const eventsHtml = await clubInfoAndEvents('c8m3');

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
        const date = eventEl.querySelector(".date")?.textContent || "";

        // Skapa info-rutan
        const infoBox = document.createElement("div");
        infoBox.className = "event-info";
        infoBox.innerHTML = `
          <div class="event-info-content">
            <h2>${title}</h2>
            <p>${desc}</p>
            <button class="boka-btn">🎟️ Boka event</button>
            <button class="close-btn">Stäng</button>
          </div>
        `;

        document.body.appendChild(infoBox);

        // Boka event knappen
        infoBox.querySelector(".boka-btn").addEventListener("click", () => {
          // Spara eventinfo i sessionStorage
          const eventInfo = {
            clubId: 'c8m3', // Comedy club ID
            clubName: 'Standup Comedy Club',
            eventName: title,
            eventDate: date,
            eventDesc: desc
          };
          sessionStorage.setItem('selectedEvent', JSON.stringify(eventInfo));

          // Gå till bokningssidan
          window.location.hash = '#eventbokare';
          infoBox.remove();
        });

        // Stänger info-rutan
        infoBox.querySelector(".close-btn").addEventListener("click", () => {
          infoBox.remove();
        });
      });
    });
  }, 300);

  //html för comedy club
  return `
    <div class="comedy-page">
      ${eventsHtml}
 
      <footer class="contact">
        <h2>Kontakta oss</h2>
        <p>Email: info@standupcomedy.se</p>
        <p>Telefon: 08-555 12 678</p>
      </footer>
    </div>
  `;
}

