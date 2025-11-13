import clubInfoAndEvents, { attachDeleteButtonListeners } from "../utils/club-info-and-events.js";

export default async function comedy() {
  const eventsHtml = await clubInfoAndEvents('c8m3');


  // gör varje event klickbar
  setTimeout(() => {
    const eventEls = document.querySelectorAll(".event");
    eventEls.forEach((eventEl) => {
      eventEl.style.cursor = "pointer";

      // När ett event klickas, gå direkt till bokningssidan och visa priser
      eventEl.addEventListener("click", () => {
        const title = eventEl.querySelector("h3")?.textContent || "";
        // Förifyll bokningssidan via sessionStorage så den kan visa priser direkt
        const clubId = 'c8m3'; // Comedy-klubbens id
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

  //html för comedy club med flexbox layout
  return `
    <div class="comedy-page-flex">
      <div class="comedy-events">
        ${eventsHtml}
        <footer class="contact">
          <h2>Kontakta oss</h2>
          <p>Email: info@standupcomedy.se</p>
          <p>Telefon: 08-555 12 678</p>
        </footer>
      </div>
      <div class="comedy-image">
        <img src="images/skratt.jpg" alt="Skratt" />
      </div>
    </div>
  `;
}

