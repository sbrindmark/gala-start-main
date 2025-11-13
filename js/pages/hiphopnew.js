import { getClubEvents } from "../utils/club-info-and-events.js";

export default async function hiphopClub() {
  // Lägg till klass på body för bakgrund + tema
  document.body.classList.add('hiphop-club');

  // Hämta events för Hip-Hop klubben (clubId: h9p2)
  const eventsHTML = await getClubEvents("h9p2");

  const html = `
    <div class="hiphop-club">
      <header>
        <h1>Hip-Hop Klubben</h1>
        <p>Beats, battles & street energy – varje helg, hela natten.</p>
      </header>

      <nav>
        <a href="#intro">Hem</a>
        <a href="#kalender">Evenemang</a>
        <a href="#om">Om Oss</a>
        <a href="#boka">Boka</a>
      </nav>

      <main>
        <div class="wrapper">
          <section id="intro">
            <h2>Välkommen till Hip-Hop Klubben</h2>
            <p>Välkommen till Sveriges mest pulserande nattklubb där beatsen aldrig dör och scenen vibrerar av energi.</p>
          </section>

          <section id="kalender">
            <h2>🎤 Kommande Evenemang</h2>
            <div class="event-grid">
              ${eventsHTML}
            </div>
          </section>

          <section id="om" class="wrapper">
            <h2>Om Oss</h2>
            <p>När natten faller över staden finns det bara ett ställe där musiken, energin och atmosfären möts – Hip-Hop Klubben.</p>
            <p>Här är varje beat, varje danssteg och varje rhyme en del av kulturen. Vi lever för scenen, för vibben och för communityt.</p>
            <p>Hip-Hop Klubben är mer än bara en nattklubb – det är en livsstil.</p>
          </section>

          <section id="boka" class="contact-section wrapper">
            <h2>Kontakt / Boka</h2>
            <p>📍 Stockholm, Sweden</p>
            <p>📧 <a href="mailto:info@hiphop.se">info@hiphop.se</a></p>
            <p>📞 +46 70 123 57 80</p>
          </section>
        </div>
      </main>


    </div>
  `;

  // När ett event klickas, gå direkt till bokningssidan och visa priser
  setTimeout(() => {
    const eventEls = document.querySelectorAll(".hiphop-club .event, .hiphop-club .event-card");
    eventEls.forEach((eventEl) => {
      eventEl.style.cursor = "pointer";
      eventEl.addEventListener("click", () => {
        const title = eventEl.querySelector("h3")?.textContent || "";
        // Förifyll bokningssidan via sessionStorage så den kan visa priser direkt
        const clubId = 'h9p2'; // hip-hop klubbens id
        const eventId = eventEl.dataset.eventId || null;
        // Generera ett pris (samma logik som bokningssidan använder)
        const pris = sessionStorage.getItem('eventPris');
        const prefill = { clubId, eventId, eventName: title, pris };
        sessionStorage.setItem('prefillBooking', JSON.stringify(prefill));
        // Navigera till bokningssidan (hash)
        location.hash = 'eventbokare';
      });
    });
  }, 100);

  return html;
}
