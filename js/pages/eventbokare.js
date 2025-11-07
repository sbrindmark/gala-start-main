export default async function eventbokare() {
    // Kolla om vi har en aktiv bokning i sessionStorage
    const aktivBokning = sessionStorage.getItem('aktivBokning');

    if (aktivBokning) {
        // Om vi har en bokning, visa bekräftelsen direkt
        const bokning = JSON.parse(aktivBokning);
        const html = `
      <section class="eventbokare wrapper">
        <h1 id="rubrik" class="confirmed">Din bokning är klar! 🎉</h1>
        <div id="boknings-resultat">
          <div class="booking-confirmation">
            <p>Ses på eventet — det kommer bli magiskt!</p>
            <p>Du har bokat <strong>${bokning.antal}</strong> biljetter till <strong>${bokning.eventNamn}</strong>.</p>
            <p>Totalkostnad: <strong>${bokning.totalKostnad} kr</strong> (${bokning.prisPerBiljett} kr/st)</p>
            <button onclick="sessionStorage.removeItem('aktivBokning'); window.location.reload();" class="ny-bokning">Boka fler biljetter</button>
          </div>
        </div>
      </section>
    `;
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
            <input type="number" id="antal" min="1" max="10" value="1">
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

            // Här lägger vi till ett slumpmässigt pris per event (du kan ändra detta till fast värde om du vill)
            eventLista.innerHTML =
                "<label>Välj event:</label>" +
                events
                    .map(e => {
                        const pris = Math.floor(Math.random() * 200) + 150; // pris mellan 150–350 kr
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
                    uppdateraPris(); // Visa prisinfo direkt
                });
            });
        });

        // Uppdatera priset när antal ändras
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

        // När formuläret skickas
        document.getElementById("eventForm").addEventListener("submit", async (e) => {
            e.preventDefault(); // Stoppar formuläret från att skickas

            // Förhindra att URL:en ändras vilket skulle trigga omladdning
            history.pushState(null, '', location.href);

            if (!valdEvent) {
                alert("Välj ett event först.");
                return;
            }

            const antal = parseInt(document.getElementById("antal").value);
            if (isNaN(antal) || antal < 1) {
                alert("Välj antal biljetter.");
                return;
            }

            const totalKostnad = antal * biljettPris;

            // Inaktivera submit-knappen för att förhindra dubbelbokningar
            bokaBtn.disabled = true;
            bokaBtn.textContent = "Bokar...";

            const bokning = {
                eventId: valdEvent,
                eventNamn: eventNamn,
                antal: antal,
                prisPerBiljett: biljettPris,
                totalKostnad: totalKostnad,
                datum: new Date().toISOString()
            };

            try {
                const res = await fetch("http://localhost:3000/bookings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bokning)
                });

                if (!res.ok) throw new Error("Kunde inte spara bokningen");

                // Visa bekräftelse
                rubrik.textContent = "Din bokning är klar! 🎉";
                rubrik.classList.add("confirmed");

                // Dölj formuläret med animation
                innehall.style.transition = "opacity 0.5s ease-out";
                innehall.style.opacity = "0";

                setTimeout(() => {
                    innehall.style.display = "none";

                    // Visa bekräftelsen
                    resultat.innerHTML = `
                    <div class="booking-confirmation">
                      <p>Ses på eventet — det kommer bli magiskt!</p>
                      <p>Du har bokat <strong>${antal}</strong> biljetter till <strong>${eventNamn}</strong>.</p>
                      <p>Totalkostnad: <strong>${totalKostnad} kr</strong> (${biljettPris} kr/st)</p>
                      <button onclick="location.hash='eventbokare'" class="ny-bokning">Boka fler biljetter</button>
                    </div>
                  `;

                    // Scrolla bekräftelsen till synligt läge
                    const confirmation = document.querySelector('.booking-confirmation');
                    if (confirmation) {
                        confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 500);
            } catch (err) {
                console.error("Fel vid bokning:", err);
                alert("Något gick fel när bokningen skulle sparas.");
            }
        });
    });

    return html;
}
