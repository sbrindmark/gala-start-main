// House Techno klubbens sida

// Importerar funktion för att hämta klubbinfo och events
import clubInfoAndEvents from "../utils/club-info-and-events.js";


// Huvudfunktion för House Techno klubben-sidan
export default async function houseTechnoClub() {

  // Hämtar HTML för klubbens event och info
  const html = await clubInfoAndEvents("k23o");

  // Bygger sidans HTML
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

  // Väntar tills DOM är klar
  setTimeout(() => {

    // Sätter klass på body (endast denna klubb)
    const body = document.body;
    body.className = "house-techno-klubben";

    // Hittar wrapper-sektionen
    const technoSection = document.querySelector("section.wrapper");
    if (!technoSection) return;

    // Skapar videobakgrund (endast denna klubb)
    const bgVideo = document.createElement("video");
    bgVideo.src = "././videos/housedanceslow.mp4";
    bgVideo.autoplay = true;
    bgVideo.loop = true;
    bgVideo.muted = true;
    bgVideo.playsInline = true;
    bgVideo.className = "bg-video";

    // Om video inte kan spelas – visa fallback-bild
    bgVideo.onerror = () => {
      console.warn("Videon kunde inte spelas — fallback aktiverad.");
      technoSection.style.backgroundImage = 'url("../../images/djtech.jpg")';
      technoSection.style.backgroundSize = "cover";
      technoSection.style.backgroundPosition = "center";
    };

    // Lägger videon bakom innehållet
   document.body.prepend(bgVideo);  // Fullscreen video – påverkar ingen annan sida


    // Event-kort blir klickbara (för bokning)
    document.querySelectorAll(".event").forEach((eventEl) => {
      eventEl.style.cursor = "pointer";

      eventEl.addEventListener("click", () => {

        const title = eventEl.querySelector("h3")?.textContent || "";

        const clubId = 'k23o';
        const eventId = eventEl.dataset.eventId || null;

        const price = Math.floor(Math.random() * 200) + 150;

        const prefill = { clubId, eventId, eventName: title, price };
        sessionStorage.setItem('prefillBooking', JSON.stringify(prefill));

        location.hash = 'eventbokare';
      });
    });

    // Ljudspår kopplade till event
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

      // Skippa om knappen redan finns
      if (eventEl.querySelector(".play-btn")) return;

      // Skapar play-knapp
      const btn = document.createElement("button");
      btn.className = "play-btn";
      btn.textContent = "▶";
      btn.dataset.sound = tracks[i] || "././sounds/default.mp3";

      const h3 = eventEl.querySelector("h3");
      if (h3) h3.insertAdjacentElement("afterend", btn);

      const audio = new Audio(btn.dataset.sound);

      // Hanterar play/pause
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        // Stoppa annat ljud
        if (activeAudio && activeAudio !== audio) {
          activeAudio.pause();
          activeAudio.currentTime = 0;
          if (activeButton) activeButton.textContent = "▶";
        }

        // Stoppa ljud om det redan spelas
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
          btn.textContent = "▶";
          activeAudio = null;
          activeButton = null;
          return;
        }

        // Starta ljud
        audio.play();
        btn.textContent = "⏸";
        activeAudio = audio;
        activeButton = btn;

        // Stoppar efter 70 sekunder
        setTimeout(() => {
          if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
            btn.textContent = "▶";
            activeAudio = null;
            activeButton = null;
          }
        }, 70000);

        // När ljudet slutar
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


// Stoppar ljud och tar bort video vid sidbyte
window.addEventListener('hashchange', () => {

  // Stoppa ljud
  const audio = document.querySelector('audio');
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  // Stoppa och ta bort video helt
  const video = document.querySelector('video.bg-video');
  if (video) {
    video.pause();
    video.currentTime = 0;
    video.remove(); // Viktigt: annars ligger videon kvar på andra sidor
  }
});
