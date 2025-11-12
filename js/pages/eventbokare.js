export default async function eventbokare() {
  const aktivBokning = sessionStorage.getItem('aktivBokning');

  if (aktivBokning) {
    const bokning = JSON.parse(aktivBokning);
    const html = `
      <section class="eventbokare wrapper">
        <h1 id="rubrik" class="confirmed">Din bokning är klar! 🎉</h1>
        <div id="boknings-resultat">
          <div class="booking-confirmation">
            <p>Tack för din bokning, ${bokning.fullnamn}!</p>
            <p>Visa denna QR-kod vid entrén:</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bokning.bokningsId}" alt="QR-kod" />
            <p class="auto-back">Du skickas automatiskt tillbaka till bokningssidan om 5 sekunder...</p>
          </div>
        </div>
      </section>
    `;

    setTimeout(() => {
      sessionStorage.removeItem('aktivBokning');
      window.location.reload();
    }, 5000);

    return html;
  }

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
            <input type="number" id="antal" min="1" max="10" value="1" required />

            <!-- 🔹 Fullständigt namn, E-postadress och Telefonnummer -->
            <label for="fullnamn">Fullständigt namn:</label>
            <input type="text" id="fullnamn" required placeholder="Skriv ditt fullständiga namn" />

            <label for="epost">E-postadress:</label>
            <input type="email" id="epost" required placeholder="johndoe@gmail.com />

            <label for="telefon">Telefonnummer:</label>
            <input type="tel" id="telefon" pattern="[0-9+ ]{6,}" placeholder="+46 70 123 45 67" required />

            <p id="pris-info"></p>
            <button id="bokaBtn" type="submit">Boka</button>
          </div>
        </form>
      </div>

      <div id="boknings-resultat"></div>
    </section>
  `;

  requestAnimationFrame(() => {
    const rubrik = document.getElementById("rubrik");
    const innehall = document.getElementById("innehall");
    const klubbSelect = document.getElementById("klubb");
    const eventLista = document.getElementById("event-lista");
    const biljettSektion = document.getElementById("biljett-sektion");
    const bokaBtn = document.getElementById("bokaBtn");
    const resultat = document.getElementById("boknings-resultat");
    const prisInfo = document.getElementById("pris-info");

    let valdEvent = null;
    let eventNamn = "";
    let biljettPris = 0;

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
          .map(e => {
            const pris = Math.floor(Math.random() * 200) + 150;
            return `
              <div>
                <input type="radio" name="event" value="${e.id}" id="event-${e.id}" data-namn="${e.name}" data-pris="${pris}">
                <label for="event-${e.id}">${e.name} – ${e.date} <span style="color:#ff72d2;">(${pris} kr/biljett)</span></label>
              </div>
            `;
          })
          .join("");

      document.querySelectorAll('input[name="event"]').forEach(radio => {
        radio.addEventListener("change", e => {
          valdEvent = e.target.value;
          eventNamn = e.target.dataset.namn;
          biljettPris = parseInt(e.target.dataset.pris);
          biljettSektion.style.display = "block";
          uppdateraPris();
        });
      });
    });

    document.getElementById("antal").addEventListener("input", () => {
      uppdateraPris();
    });

    function uppdateraPris() {
      const antal = parseInt(document.getElementById("antal").value);
      if (!isNaN(antal) && biljettPris > 0) {
        const total = antal * biljettPris;
        prisInfo.textContent = `Pris per biljett: ${biljettPris} kr | Totalt: ${total} kr`;
      }
    }

    document.getElementById("eventForm").addEventListener("submit", async e => {
      e.preventDefault();

      if (!valdEvent) {
        alert("Välj ett event först.");
        return;
      }

      const antal = parseInt(document.getElementById("antal").value);
      const fullnamn = document.getElementById("fullnamn").value.trim();
      const epost = document.getElementById("epost").value.trim();
      const telefon = document.getElementById("telefon").value.trim();

      if (!fullnamn || !epost || !telefon) {
        alert("Fyll i fullständigt namn, e-post och telefonnummer.");
        return;
      }

      const totalKostnad = antal * biljettPris;
      const bokningsId = "EVT-" + Math.random().toString(36).substring(2, 10).toUpperCase();

      bokaBtn.disabled = true;
      bokaBtn.textContent = "Bokar...";

      const bokning = {
        bokningsId,
        eventId: valdEvent,
        eventNamn,
        fullnamn,
        antal,
        prisPerBiljett: biljettPris,
        totalKostnad,
        epost,
        telefon,
        datum: new Date().toISOString()
      };

      try {
        const res = await fetch("http://localhost:3000/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bokning)
        });

        if (!res.ok) throw new Error("Kunde inte spara bokningen");

        sessionStorage.setItem("aktivBokning", JSON.stringify(bokning));

        rubrik.textContent = "Din bokning är klar! 🎉";
        rubrik.classList.add("confirmed");
        innehall.style.display = "none";

        resultat.innerHTML = `
          <div class="booking-confirmation">
            <p>Tack för din bokning, ${fullnamn}!</p>
            <p>Visa denna QR-kod vid entrén:</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bokningsId}" alt="QR-kod" />
            <p class="auto-back">Du skickas automatiskt tillbaka om 5 sekunder...</p>
          </div>
        `;

        setTimeout(() => {
          sessionStorage.removeItem("aktivBokning");
          window.location.reload();
        }, 5000);
      } catch (err) {
        console.error("Fel vid bokning:", err);
        alert("Något gick fel när bokningen skulle sparas.");
      }
    });
  });

  return html;
}
