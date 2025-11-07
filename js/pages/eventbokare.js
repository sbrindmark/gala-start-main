export default async function eventbokare() { 
  const res = await fetch("http://localhost:3000/clubs");
  const clubs = await res.json();

  const html = `
    <section class="eventbokare wrapper">
      <h1 id="rubrik">Boka Event</h1>

      <div id="innehall">
        <p>Välj klubb, se tillgängliga event och boka dina biljetter.</p>

        <form id="eventForm">
          <div id="klubb-container">
            <label for="klubb">Välj klubb:</label>
            <select id="klubb" required>
              <option value="">Välj...</option>
              ${clubs.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
            </select>
          </div>

          <div id="event-lista"></div>

          <div id="biljett-sektion" style="display:none;">
            <label for="antal">Antal biljetter:</label>
            <input type="number" id="antal" min="1" max="10" value="1">
            <button id="bokaBtn" type="button">Boka</button>
          </div>
        </form>
      </div>

      <div id="boknings-resultat"></div>
    </section>
  `;

  // Kör logik efter att sidan laddats in
  requestAnimationFrame(() => {
    const rubrik = document.getElementById("rubrik");
    const innehall = document.getElementById("innehall");
    const klubbContainer = document.getElementById("klubb-container");
    const klubbSelect = document.getElementById("klubb");
    const eventLista = document.getElementById("event-lista");
    const biljettSektion = document.getElementById("biljett-sektion");
    const bokaBtn = document.getElementById("bokaBtn");
    const resultat = document.getElementById("boknings-resultat");
    let valdEvent = null;
    let eventNamn = "";

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
            <input type="radio" name="event" value="${e.id}" id="event-${e.id}" data-namn="${e.name}">
            <label for="event-${e.id}">${e.name} – ${e.date}</label>
          </div>
        `
          )
          .join("");

      document.querySelectorAll('input[name="event"]').forEach(radio => {
        radio.addEventListener("change", e => {
          valdEvent = e.target.value;
          eventNamn = e.target.dataset.namn;
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

      // 🔹 Ändra rubriken efter bokning
      rubrik.textContent = "Din bokning är klar! 🎉";

      // Visa tackmeddelande
      resultat.innerHTML = `
        <div class="booking-confirmation">
          <p>Ses på eventet — det kommer bli magiskt!</p>
          <p>Du har bokat <strong>${antal}</strong> biljetter till <strong>${eventNamn}</strong>.</p>
        </div>
      `;

      // Dölj formuläret och infon
      innehall.style.display = "none";
    });
  });

  return html;
}
