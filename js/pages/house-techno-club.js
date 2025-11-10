// House Techno klubbens sida
import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function houseTechnoClub() {
  const html = await clubInfoAndEvents("k23o");

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

  setTimeout(() => {
    const body = document.body;
    body.className = "house-techno-klubben";

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

    // Gör event klickbara
    document.querySelectorAll(".event").forEach((eventEl) => {
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
        infoBox.querySelector(".close-btn").addEventListener("click", () => infoBox.remove());
      });
    });

    //  Lägg till "Play"-knappar till varje event
    const events = document.querySelectorAll(".event");
    const tracks = [
      "././sounds/djAgge1.mp3",
      "././sounds/djAgge2.mp3",
      "././sounds/djAgge3.mp3",
      "././sounds/djAgge4.mp3",
      "././sounds/djAggeecho.mp3",
      "././sounds/djAgge6.mp3"
    ];

    let activeAudio = null;
    let activeButton = null;

    events.forEach((eventEl, i) => {
      if (eventEl.querySelector(".play-btn")) return; // guard clause: redan har knapp

      const btn = document.createElement("button");
      btn.className = "play-btn";
      btn.textContent = "▶";
      btn.dataset.sound = tracks[i] || "./sounds/default.mp3";

      const h3 = eventEl.querySelector("h3");
      if (h3) h3.insertAdjacentElement("afterend", btn);

      const audio = new Audio(btn.dataset.sound);

      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        // Om annat ljud spelas, stoppa det direkt
        if (activeAudio && activeAudio !== audio) {
          activeAudio.pause();
          activeAudio.currentTime = 0;
          if (activeButton) activeButton.textContent = "▶";
        }

        // Om nuvarande ljud spelas, stoppa det
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
          btn.textContent = "▶";
          activeAudio = null;
          activeButton = null;
          return; // guard clause avslutar här
        }

        // Spela ljud
        audio.play().catch(err => console.error("Kunde inte spela ljud:", err));
        btn.textContent = "⏸";
        activeAudio = audio;
        activeButton = btn;

        // Stoppa automatiskt efter 1 minut
        setTimeout(() => {
          if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
            btn.textContent = "▶";
            activeAudio = null;
            activeButton = null;
          }
        }, 70000); // 70 sekunder

        audio.addEventListener("ended", () => {
          btn.textContent = "▶";
          activeAudio = null;
          activeButton = null;
        });
      });
    });
  }, 300);

  return pageHtml;
}
