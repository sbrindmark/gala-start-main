import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function start() {
  const eventHtml = await clubInfoAndEvents();
  return `
    <section class="clubs">
      <h2>Våra Klubbar</h2>
      <div class="club-grid">
        <a href="#jazz-klubben" class="club jazz">🎷 Jazz Club</a>
        <a href="#metal-klubben" class="club dance">🤘 Metal Club</a>
        <a href="#standup-comedy" class="club comedy">🎭 Stand-Up Comedy</a>
      </div>
      <div id="all-events-container">
        <h2>Alla kommande events på Gala</h2>
        <p>Gala är en samlingsplats för olika musikklubbar.</p>
        ${eventHtml}
      </div>
    </section>
  `;
}