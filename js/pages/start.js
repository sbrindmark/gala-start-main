import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function start() {
  let eventHtml = '';
  try {
    eventHtml = await clubInfoAndEvents();
  } catch (error) {
    console.error('Error loading events:', error);
    eventHtml = '<p>Kunde inte ladda events. Kontrollera att servern körs.</p>';
  }

  return `
    <section class="clubs">
      <h2>Våra Klubbar</h2>
      <div class="club-grid">

        <a href="#jazz-klubben" class="club jazz">🎷 Jazz Club</a>
        <a href="#metal-klubben" class="club metal">🤘 Metal Club</a>
        <a href="#standup-comedy" class="club comedy">🎭 Stand-Up Comedy</a>
        <a href="#house-techno-klubben" class="club house-techno">🎧 House Techno Nights</a>

      </div>
      <div id="all-events-container">
        <h2>Alla kommande events på Gala Emporium</h2>
        <p>Gala är en samlingsplats för olika musikklubbar.</p>
        <div class="wrapper">
          ${eventHtml}
        </div>
      </div>
    </section>
  `;
}
