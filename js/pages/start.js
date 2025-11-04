import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function start() {
  const eventHtml = await clubInfoAndEvents();
  return `
    <section class="clubs">
      <h2>Våra Klubbar</h2>
      <div class="club-grid">
        <a href="#jazz-klubben" class="club jazz">Jazz Club</a>
        <a href="#metal-klubben" class="club metal">Metal Club</a>
        <a href="#comedy-klubben" class="club comedy">Stand-Up Comedy</a>
        <a href="#theatre-klubben" class="club theatre">Theatre Nights</a>
      </div>
      <div id="all-events-container">
        <h2>Alla kommande events på Gala</h2>
        <p>Gala är en samlingsplats för olika musikklubbar.</p>
        ${eventHtml}
      </div>
    </section>
  `;
}