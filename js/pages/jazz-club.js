import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function jazzClub() {
  const eventsHtml = await clubInfoAndEvents('a37c');

  // HTML för jazzklubben
  return `
    <div class="wrapper jazz-wrapper">
      ${eventsHtml}

      <footer class="contact">
        <h2>Kontakta oss</h2>
        <p>Email: info@jazzklubben.se</p>
        <p>Telefon: 08-555 12 125</p>
      </footer>
    </div>
  `;
}
