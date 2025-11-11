import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function comedy() {
  const eventsHtml = await clubInfoAndEvents('c8m3');

  //html för comedy club
  return `
    <div class="comedy-page">
      ${eventsHtml}
 
      <footer class="contact">
        <h2>Kontakta oss</h2>
        <p>Email: info@standupcomedy.se</p>
        <p>Telefon: 08-555 12 678</p>
      </footer>
    </div>
  `;
}

