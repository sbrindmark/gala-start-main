// Hus Techno klubbens sida

import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function houseTechnoClub() {
  // Hämtar innehåll för klubben
  const html = await clubInfoAndEvents("k23o");

  // När sidan laddas – aktivera klubbens tema
  setTimeout(() => {
    const body = document.body;
    body.className = "house-techno-klubben";
  }, 100);

  // Returnerar innehåll och kontakt
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
