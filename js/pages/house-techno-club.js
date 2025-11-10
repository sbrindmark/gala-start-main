// 🎧 HOUSE TECHNO CLUB – Individuell klubbsida
// Vanilla JS – hämtar data från JSON Server via clubInfoAndEvents()

import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function houseTechnoClub() {
  // Hämtar klubbens events via din JSON-server
  const html = await clubInfoAndEvents("k23o");

  // Väntar lite och lägger till en klass för klubbens tema
  setTimeout(() => {
    const body = document.body;
    body.className = "house-techno-klubben"; // kopplar till CSS-filen

    // Subtil interaktiv bakgrundsrörelse (visuellt men lätt)
    document.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      body.style.background = `
        radial-gradient(circle at ${x * 100}% ${y * 100}%, #200040, #000)
      `;
    });
  }, 100);

  // Returnerar klubbens HTML + kontaktsektion
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
