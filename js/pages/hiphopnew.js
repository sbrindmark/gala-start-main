export default function hiphopClub() {

  const events = [

    {
      title: "Ken Ring",
      date: "2025-11-15",
      
      description: "En natt med tunga bars, beats och energi på scenen.",
    },
    {
      title: "Breakdance battle",
      date: "2025-11-28",
      
      description: "Dansare från hela landet möts i en episk battle.",
    },
    {
      title: "DJ Night  Old School Edition",
      date: "2025-12-10",
      
      description: "Back to the roots vinyl, scratch och groove hela kvällen.",
    },
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
                  <img src="${ev.image}" alt="${ev.title}">
                  <h3>${ev.title}</h3>
                  <p><strong>${ev.date}</strong></p>
                  <p>${ev.description}</p>
                </div>
              `).join('')}
            </div>
          </section>

          <section id="om">
            <div class=wrapper>
            <h2>Om Oss</h2>
            <p>När natten faller över staden finns det bara ett ställe där musiken, energin och atmosfären möts – Hip-Hop Klubben.</p>
            <p>Här är varje beat, varje danssteg och varje rhyme en del av kulturen. Vi lever för scenen, för vibben och för communityt.</p>
            <p>Hip-Hop Klubben är mer än bara en nattklubb – det är en livsstil.</p>
          </section>

          
    <section class="contact-section">
      <div class=wrapper>
      <h2>Kontakt</h2>
      <p>📍 Stockholm, Sweden</p>
      <p>📧 <a href="mailto:info@Hiphop.se">info@hiphop.se</a></p>
      <p>📞 +46 70 123 57 80</p>
      <p>Följ oss på <a href="#">Instagram</a> & <a href="#">Facebook</a></p>
    </section>
         
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Hip-Hop Klubben – Där rytmen aldrig slutar.</p>
      </footer>
      

    </div>
  `;

  setTimeout(() => {
    const form = document.querySelector('.hiphop-club form');
    const confirmation = document.querySelector('.hiphop-club .booking-confirmation');
    const eventName = document.getElementById('event-name');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const selected = document.getElementById('event').value;
        eventName.textContent = selected;
        form.style.display = 'none';
        confirmation.style.display = 'block';
      });
    }
  }, 100);

  return html;
}