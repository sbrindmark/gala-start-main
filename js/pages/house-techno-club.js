// 🎧 HOUSE TECHNO CLUB 
// Vanilla JS + lätt interaktiv bakgrund bara på denna sida

import clubInfoAndEvents, { attachDeleteButtonListeners } from "../utils/club-info-and-events.js";

export default async function houseTechnoClub() {
  // Hämtar klubbens evenemang
  const html = await clubInfoAndEvents("k23o");

  attachDeleteButtonListeners();

  // När sidan laddats: aktivera temat + bakgrundseffekt
  setTimeout(() => {
    const body = document.body;
    body.className = "house-techno-klubben";

    // Skapa en namngiven funktion för mousemove
    function houseTechnoMouseMove(e) {
      // Kontrollera om vi fortfarande är på house-techno sidan
      if (!body.classList.contains("house-techno-klubben")) {
        // Ta bort event lyssnaren och återställ bakgrund
        document.removeEventListener("mousemove", houseTechnoMouseMove);
        body.style.background = ""; // Återställ till CSS-standard
        return;
      }

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      body.style.background = `
        radial-gradient(circle at ${x * 100}% ${y * 100}%, #250046, #000)
      `;
    }

    // 💫 Endast på denna sida – musrörelse påverkar bakgrunden subtilt
    document.addEventListener("mousemove", houseTechnoMouseMove);
  }, 100);

  // Returnerar HTML för klubbens innehåll + kontaktsektion
  return `
    <section class="wrapper">
      ${html}
    </section>

    <section class="contact-section">
      <h2>Kontakt</h2>
      <p>📍 Stockholm, Sweden</p>
      <p>📧 <a href="mailto:info@housetechno.se">info@housetechno.se</a></p>
      <p>📞 +46 70 123 45 67</p>
      <p>Följ oss på <a href="#">Instagram</a> & <a href="#">Facebook</a></p>
    </section>
  `;
}
