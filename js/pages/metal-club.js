import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function metalClub() {
  const eventsHtml = await clubInfoAndEvents('fg5i');

  // HTML för metalclub
  return `
  <div class ="wrapper">
    ${eventsHtml}
  
    <footer class="contact">
      <h2>Kontakta oss</h2>
      <p>Email: info@metalklubben.se</p>
      <p>Telefon: 08-123 45 67</p>
    </footer>
    </div>
  `;
}