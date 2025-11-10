// House Techno klubbens sida
import clubInfoAndEvents, { attachDeleteButtonListeners } from "../utils/club-info-and-events.js";

export default async function houseTechnoClub() {
  // Hämtar innehåll för klubben
  const html = await clubInfoAndEvents("k23o");

  // Returnerar HTML direkt (först)
  const pageHtml = `
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

  // När sidan har laddats helt
  setTimeout(() => {
    const body = document.body;
    body.className = "house-techno-klubben";

    // Lägg till bakgrundsvideo endast på denna sida
    const technoSection = document.querySelector("section.wrapper");
    if (!technoSection) return;

    const bgVideo = document.createElement("video");
    bgVideo.src = "././videos/housedanceslow.mp4";
    bgVideo.autoplay = true;
    bgVideo.loop = true;
    bgVideo.muted = true;
    bgVideo.playsInline = true;
    bgVideo.className = "bg-video";

    bgVideo.onerror = () => {
      console.warn("Videon kunde inte spelas — visar bakgrundsbild istället.");
      technoSection.style.backgroundImage = 'url("../../images/djtech.jpg")';
      technoSection.style.backgroundSize = "cover";
      technoSection.style.backgroundPosition = "center";
    };

    technoSection.prepend(bgVideo);

    // Gör varje event klickbar
    const eventEls = document.querySelectorAll(".event");
    eventEls.forEach((eventEl) => {
      eventEl.style.cursor = "pointer";

      eventEl.addEventListener("click", () => {
        const title = eventEl.querySelector("h3")?.textContent || "";
        const desc = eventEl.querySelector("p")?.textContent || "";

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

        // Stänger info-rutan
        infoBox.querySelector(".close-btn").addEventListener("click", () => {
          infoBox.remove();
        });
      });
    });
  }, 300);

  return pageHtml;
}
