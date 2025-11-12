export default function hiphopClub() {
  // Lägg till klass på body för bakgrund + tema
  document.body.classList.add('hiphop-club');

  const events = [
    { title: "Ken Ring", date: "2025-11-15", description: "En natt med tunga bars, beats och energi på scenen." },
    { title: "Breakdance battle", date: "2025-11-28", description: "Dansare från hela landet möts i en episk battle." },
    { title: "DJ Night  Old School Edition", date: "2025-12-10", description: "Back to the roots vinyl, scratch och groove hela kvällen." },
  ];

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
              ${events.map(ev => `
                <div class="event-card">
                  <h3>${ev.title}</h3>
                  <p><strong>${ev.date}</strong></p>
                  <p>${ev.description}</p>
                </div>
              `).join('')}
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
            <p>Följ oss på <a href="#">Instagram</a> & <a href="#">Facebook</a></p>
          </section>
        </div>
      </main>

      
    </div>
  `;

  // Lägg på klick-hanterare efter att HTML hunnit monteras
  setTimeout(() => {
    const eventEls = document.querySelectorAll(".hiphop-club .event-card");
    eventEls.forEach((eventEl) => {
      eventEl.style.cursor = "pointer";

      eventEl.addEventListener("click", () => {
        const title = eventEl.querySelector("h3")?.textContent || "";
        // Hämta första p som inte är datumet (andra p-taggen)
        const ps = [...eventEl.querySelectorAll("p")];
        const desc = (ps[1]?.textContent || ps[0]?.textContent || "").trim();

        // Ta bort ev. befintlig overlay innan ny skapas
        document.querySelectorAll(".event-info").forEach(n => n.remove());

        const infoBox = document.createElement("div");
        infoBox.className = "event-info";
        infoBox.innerHTML = `
          <div class="event-info-content">
            <h2>${title}</h2>
            <p>${desc}</p>
            <a href="#eventbokare" class="boka-btn">🎟️ Boka event</a>
            <button class="close-btn" aria-label="Stäng">Stäng</button>
          </div>
        `;

        document.body.appendChild(infoBox);

        const close = () => infoBox.remove();
        infoBox.querySelector(".close-btn")?.addEventListener("click", close);
        infoBox.addEventListener("click", (e) => {
          if (e.target === infoBox) close();
        });
        document.addEventListener("keydown", function onKey(e){
          if (e.key === "Escape") { close(); document.removeEventListener("keydown", onKey); }
        });
      });
    });
  }, 100);

  return html;
}
