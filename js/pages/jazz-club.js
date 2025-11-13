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

      // När ett event klickas, gå direkt till bokningssidan och visa priser
      eventEl.addEventListener("click", () => {
        const title = eventEl.querySelector("h3")?.textContent || "";
        // Förifyll bokningssidan via sessionStorage så den kan visa priser direkt
        const clubId = 'a37c'; // jazz-klubbens id
        const eventId = eventEl.dataset.eventId || null;
        // Generera ett pris (samma logik som bokningssidan använder)
        const pris = sessionStorage.getItem('eventPris');
        const prefill = { clubId, eventId, eventName: title, pris };
        sessionStorage.setItem('prefillBooking', JSON.stringify(prefill));
        // Navigera till bokningssidan (hash)
        location.hash = 'eventbokare';
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

