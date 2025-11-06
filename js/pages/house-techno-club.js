// 🎧 HOUSE TECHNO CLUB 
// Vanilla JS + lätt interaktiv bakgrund bara på denna sida

import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function houseTechnoClub() {
  // Hämtar klubbens evenemang
  const html = await clubInfoAndEvents("k23o");

  // När sidan laddats: aktivera temat + bakgrundseffekt
  setTimeout(() => {
    const body = document.body;
    body.className = "house-techno-klubben";

    // 💫 Endast på denna sida – musrörelse påverkar bakgrunden subtilt
    document.addEventListener("mousemove", (e) => {
      if (!body.classList.contains("house-techno-klubben")) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      body.style.background = `
        radial-gradient(circle at ${x * 100}% ${y * 100}%, #250046, #000)
      `;
    });
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
