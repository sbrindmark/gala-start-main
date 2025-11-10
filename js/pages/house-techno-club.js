// House Techno klubbens sida
import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function houseTechnoClub() {
  // Hämtar innehåll för klubben
  const html = await clubInfoAndEvents("k23o");

  // När sidan laddas – aktivera klubbens tema
  setTimeout(() => {
    const body = document.body;
    body.className = "house-techno-klubben";
   // Aktiverar klubbens tema och lägger till bakgrundsvideo
setTimeout(() => {
  const body = document.body;
  body.className = "house-techno-klubben";

  // Kontrollera att vi befinner oss på House Techno Klubben
  const technoSection = document.querySelector("section.wrapper");
  if (!technoSection) return; // påverkar inte andra sidor

  // Skapar videoelement för bakgrunden
  const bgVideo = document.createElement("video");
  bgVideo.src = "././videos/housedanceslow.mp4"; // rätt sökväg
  bgVideo.autoplay = true;
  bgVideo.loop = true;
  bgVideo.muted = true;
  bgVideo.playsInline = true;
  bgVideo.className = "bg-video";

  // Om videon inte kan laddas → fallback-bild
  bgVideo.onerror = () => {
    console.warn(" Videon kunde inte spelas — visar bakgrundsbild istället.");
    technoSection.style.backgroundImage = 'url("../../images/djtech.jpg")';
    technoSection.style.backgroundSize = "cover";
    technoSection.style.backgroundPosition = "center";
  };
  // Lägger videon i klubbens sektion
  technoSection.prepend(bgVideo);
}, 300);


    //  Gör varje event klickbar
    document.querySelectorAll(".event").forEach((eventEl) => {
      eventEl.style.cursor = "pointer";
      eventEl.addEventListener("click", () => {
        const title = eventEl.querySelector("h3")?.textContent || "";
        const desc = eventEl.querySelector("p")?.textContent || "";

        // Informationsruta om events
        const infoBox = document.createElement("div");
        infoBox.className = "event-info";
        infoBox.innerHTML = `
          <div class="event-info-content">
            <h2>${title}</h2>
            <p>${desc}</p>
            <a href="#eventbokare" class="boka-btn">🎟️ Boka event</a>
            <button class="close-btn">Stäng</button>
          </div>
        `;

        document.body.appendChild(infoBox);

        // Stäng info-rutan
        infoBox.querySelector(".close-btn").addEventListener("click", () => {
          infoBox.remove();
        });
      });
    });
  }, 200);

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
