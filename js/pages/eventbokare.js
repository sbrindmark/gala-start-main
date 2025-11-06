export default async function eventbokare() {
  const res = await fetch("http://localhost:3000/clubs");
  const clubs = await res.json();

  const html = `
    <section class="eventbokare wrapper">
      <h1>Boka Event</h1>
      <p>Välj klubb, se tillgängliga event och boka dina biljetter.</p>

      <form id="eventForm">
        <label for="klubb">Välj klubb:</label>
        <select id="klubb" required>
          <option value="">Välj...</option>
          ${clubs.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
        </select>

        <div id="event-lista"></div>

        <div id="biljett-sektion" style="display:none;">
          <label for="antal">Antal biljetter:</label>
          <input type="number" id="antal" min="1" max="10" value="1">
          <button id="bokaBtn" type="button">Boka</button>
        </div>
      </form>

      <div id="boknings-resultat"></div>
    </section>
  `;

  // Kör logik efter att sidan laddats in
  requestAnimationFrame(() => {
    const klubbSelect = document.getElementById("klubb");
    const eventLista = document.getElementById("event-lista");
    const biljettSektion = document.getElementById("biljett-sektion");
    const bokaBtn = document.getElementById("bokaBtn");
    const resultat = document.getElementById("boknings-resultat");
    let valdEvent = null;

    // När användaren väljer klubb
    klubbSelect?.addEventListener("change", async () => {
      const klubb = klubbSelect.value;
      eventLista.innerHTML = "";
      biljettSektion.style.display = "none";
      valdEvent = null;

      if (!klubb) return;

      const res = await fetch(`http://localhost:3000/events?clubId=${klubb}`);
      const events = await res.json();

      if (events.length === 0) {
        eventLista.innerHTML = "<p>Inga event tillgängliga för denna klubb just nu.</p>";
        return;
      }

      eventLista.innerHTML =
        "<label>Välj event:</label>" +
        events
          .map(
            e => `
          <div>
            <input type="radio" name="event" value="${e.id}" id="event-${e.id}">
            <label for="event-${e.id}">${e.name} – ${e.date}</label>
          </div>
        `
          )
          .join("");

      document.querySelectorAll('input[name="event"]').forEach(radio => {
        radio.addEventListener("change", e => {
          valdEvent = e.target.value;
          biljettSektion.style.display = "block";
        });
      });
    });

    // När man klickar på "Boka"
    bokaBtn?.addEventListener("click", async () => {
      if (!valdEvent) {
        alert("Välj ett event först.");
        return;
      }

      const antal = document.getElementById("antal").value;

      await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: valdEvent, tickets: antal }),
      });

      // Visa tackmeddelande (stannar kvar!)
      resultat.innerHTML = `
        <div class="booking-confirmation">
          <h3>✅ Tack för din bokning!</h3>
          <p>Du har bokat <strong>${antal}</strong> biljetter.</p>
        </div>
      `;

      // Rensa formuläret utan att ta bort tacktexten
      document.getElementById("antal").value = 1;
      document.querySelectorAll('input[name="event"]').forEach(r => (r.checked = false));
      biljettSektion.style.display = "none";
      // ❌ eventLista.innerHTML = ""; ← tas bort helt!
    });
  });

  return html;
}
