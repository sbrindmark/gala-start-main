import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function houseTechnoClub() {
  // Ladda data för House-Techno-klubben (k23o) och returnera HTML
  const html = await clubInfoAndEvents("k23o");

  // =========================
  // 🎵 Ljud – spelas vid första klicket (användarinteraktion krävs)
  // =========================
  document.body.addEventListener(
    "click",
    () => {
      const audio = document.getElementById("introAudio");
      if (audio && audio.paused) {
        audio.volume = 0.4;
        audio.play().catch(() => { }); // Förhindrar fel om ljudet blockeras
      }
    },
    { once: true }
  );

  // =========================
  // 📋 Förbokningsformulär
  // =========================
  const bookingForm = document.getElementById("bookingForm");
  const bookingStatus = document.getElementById("bookingStatus");

  if (bookingForm) {
    bookingForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Samlar in formulärdata
      const fd = new FormData(bookingForm);
      const payload = {
        name: fd.get("name"),
        email: fd.get("email"),
        eventId: fd.get("eventId"),
        quantity: Number(fd.get("quantity")),
        createdAt: new Date().toISOString(),
      };

      // Enkel validering
      if (!payload.name || !payload.email || !payload.eventId) {
        bookingStatus.textContent = "Fyll i alla obligatoriska fält.";
        bookingStatus.style.color = "var(--color-danger)";
        return;
      }

      try {
        // Skicka data till JSON-servern (bookings)
        const res = await fetch("http://localhost:3000/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(res.statusText);

        // Visar bekräftelsemeddelande
        bookingStatus.textContent = `Bokning mottagen för ${payload.name}. Tack!`;
        bookingStatus.style.color = "var(--color-text)";
        bookingForm.reset();
      } catch (err) {
        // Felhantering
        bookingStatus.textContent = `Fel vid bokning: ${err.message}`;
        bookingStatus.style.color = "var(--color-danger)";
      }
    });
  }

  // =========================
  // 🕓 Uppdaterar årtal i footern
  // =========================
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Konsolmeddelande för kontroll
  console.log("House-Techno-klubben laddad ✔️");

  return html;
}
