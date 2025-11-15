// Import för att hämta klubbens data
import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function houseTechnoClub() {

  // Hämtar HTML för klubbens event
  const html = await clubInfoAndEvents("k23o");

  // Bygger sidans innehåll
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

  // Väntar tills DOM finns
  setTimeout(() => {

    // Unik klass så att bara denna klubb påverkas
    document.body.className = "house-techno-klubben";

    const technoSection = document.querySelector("section.wrapper");
    if (!technoSection) return;

    // Skapar bakgrundsvideo
    const bgVideo = document.createElement("video");
    bgVideo.src = "./videos/housedanceslow.mp4";
    bgVideo.autoplay = true;
    bgVideo.loop = true;
    bgVideo.muted = true;
    bgVideo.playsInline = true;
    bgVideo.className = "bg-video";

    // Lägger videon längst bak
    document.body.prepend(bgVideo);

    // ------------------- MUSIKSYSTEM -------------------

    const events = document.querySelectorAll(".event");

    // Lista med ljudspår
    const tracks = [
      "./sounds/djAgge1.mp3",
      "./sounds/djAgge2.mp3",
      "./sounds/djAgge3.mp3",
      "./sounds/djAgge4.mp3",
      "./sounds/djAggeecho.mp3",
      "./sounds/djAgge6.mp3"
    ];

    let activeAudio = null;
    let activeButton = null;

    events.forEach((eventEl, i) => {

      // Skapa knapp om den inte finns
      if (!eventEl.querySelector(".play-btn")) {

        const btn = document.createElement("button");
        btn.className = "play-btn";
        btn.textContent = "▶";
        btn.dataset.sound = tracks[i] || "./sounds/default.mp3";

        const h3 = eventEl.querySelector("h3");
        if (h3) h3.appendChild(btn);

        // Skapa ljudobjekt
        const audio = new Audio(btn.dataset.sound);

        // OBS! Spara audio-objektet i elementet så vi kan stoppa det senare
        eventEl.audioObj = audio;

        // Klick på play-knappen
        btn.addEventListener("click", (e) => {
          e.stopPropagation(); // gör att eventet fortfarande är klickbart

          // Stoppa annat ljud
          if (activeAudio && activeAudio !== audio) {
            activeAudio.pause();
            activeAudio.currentTime = 0;
            if (activeButton) activeButton.textContent = "▶";
          }

          // Stoppa om samma ljud spelas
          if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
            btn.textContent = "▶";
            activeAudio = null;
            activeButton = null;
            return;
          }

          // Spela ljud
          audio.play();
          btn.textContent = "⏸";
          activeAudio = audio;
          activeButton = btn;

          audio.addEventListener("ended", () => {
            btn.textContent = "▶";
            activeAudio = null;
            activeButton = null;
          });
        });
      }

      // Öppna eventbokningen när man klickar på eventkort
      eventEl.addEventListener("click", () => {

        const title = eventEl.querySelector("h3")?.textContent || "";

        const prefill = {
          clubId: "k23o",
          eventId: eventEl.dataset.eventId || null,
          eventName: title,
          pris: sessionStorage.getItem("eventPris")
        };

        sessionStorage.setItem("prefillBooking", JSON.stringify(prefill));

        location.hash = "eventbokare";
      });
    });

  }, 300);

  return pageHtml;
}


// ----------------   STOPPA LJUD & VIDEO VID SIDBYTE   ----------------

window.addEventListener("hashchange", () => {

  // Hitta alla event som har spelare
  const events = document.querySelectorAll(".event");

  events.forEach(ev => {
    if (ev.audioObj) {
      ev.audioObj.pause();
      ev.audioObj.currentTime = 0;
    }
  });

  // Stoppa och ta bort video
  const video = document.querySelector("video.bg-video");
  if (video) {
    video.pause();
    video.currentTime = 0;
    video.remove();
  }
});
