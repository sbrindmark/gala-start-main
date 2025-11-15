// Importerar funktion för att hämta klubbinfo och events
import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function houseTechnoClub() {

  // Hämtar klubbens event och info
  const html = await clubInfoAndEvents("k23o");

  // Sidans HTML-struktur
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

    // Lägger unik klass på body (endast denna klubb)
    document.body.className = "house-techno-klubben";

    const technoSection = document.querySelector("section.wrapper");
    if (!technoSection) return;

    // Videobakgrund
    const bgVideo = document.createElement("video");
    bgVideo.src = "videos/housedanceslow.mp4";
    bgVideo.autoplay = true;     // startar direkt
    bgVideo.loop = true;         // repeterar
    bgVideo.muted = true;        // krävs för autoplay
    bgVideo.playsInline = true;
    bgVideo.className = "bg-video";

    // Om videon inte laddas – använd fallback-bild
    bgVideo.onerror = () => {
      technoSection.style.backgroundImage = 'url("images/djtech.jpg")';
      technoSection.style.backgroundSize = "cover";
      technoSection.style.backgroundPosition = "center";
    };

    // Lägger videon bakom allt innehåll
    document.body.prepend(bgVideo);

    // Ljudsystem – varje event får ett eget spår
    const events = document.querySelectorAll(".event");

    const tracks = [
      "sounds/djAgge1.mp3",
      "sounds/djAgge2.mp3",
      "sounds/djAgge3.mp3",
      "sounds/djAgge4.mp3",
      "sounds/djAggeecho.mp3",
      "sounds/djAgge6.mp3"
    ];

    let activeAudio = null;     // håller koll på vilket ljud som spelas
    let activeButton = null;    // håller koll på aktiv play-knapp

    events.forEach((eventEl, i) => {

      // Gör hela eventkortet klickbart
      eventEl.style.cursor = "pointer";

      // Skapar play-knapp om den inte finns
      if (!eventEl.querySelector(".play-btn")) {

        const btn = document.createElement("button");
        btn.className = "play-btn";
        btn.textContent = "▶";              // standardikon
        btn.dataset.sound = tracks[i] || "sounds/default.mp3";

        const h3 = eventEl.querySelector("h3");
        if (h3) h3.appendChild(btn);

        // Skapar ljudobjekt för eventet
        const audio = new Audio(btn.dataset.sound);
        eventEl.audioObj = audio;           // sparar ljudet på elementet

        // Play / pause på knappen
        btn.addEventListener("click", (e) => {
          e.stopPropagation(); // eventkortet ska fortfarande vara klickbart

          // Stoppar tidigare ljud
          if (activeAudio && activeAudio !== audio) {
            activeAudio.pause();
            activeAudio.currentTime = 0;
            if (activeButton) activeButton.textContent = "▶";
          }

          // Om ljudet spelas → stoppa
          if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
            btn.textContent = "▶";
            activeAudio = null;
            activeButton = null;
            return;
          }

          // Startar ljudet
          audio.play();
          btn.textContent = "⏸";
          activeAudio = audio;
          activeButton = btn;

          // När spåret tar slut
          audio.addEventListener("ended", () => {
            btn.textContent = "▶";
            activeAudio = null;
            activeButton = null;
          });
        });
      }

      // Öppnar bokningssidan vid klick på eventkort
      eventEl.addEventListener("click", () => {

        const title = eventEl.querySelector("h3")?.textContent || "";

        const prefill = {
          clubId: "k23o",
          eventId: eventEl.dataset.eventId || null,
          eventName: title,
          pris: sessionStorage.getItem("eventPris") // hämtar pris från sessionStorage
        };

        sessionStorage.setItem("prefillBooking", JSON.stringify(prefill));
        location.hash = "eventbokare"; // navigerar till bokning
      });
    });

  }, 300);

  return pageHtml;
}

// Stoppar allt ljud & video när man byter sida
window.addEventListener("hashchange", () => {

  const events = document.querySelectorAll(".event");

  // Stoppar alla aktiva ljud
  events.forEach(ev => {
    if (ev.audioObj) {
      ev.audioObj.pause();
      ev.audioObj.currentTime = 0;
    }
  });

  // Tar bort videon vid sidbyte
  const video = document.querySelector("video.bg-video");
  if (video) {
    video.pause();
    video.currentTime = 0;
    video.remove();
  }
});
