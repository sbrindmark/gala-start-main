import clubInfoAndEvents, { attachDeleteButtonListeners } from "../utils/club-info-and-events.js";

// Global variabel för admin-status
export let isAdmin = false;

//Funktion för att ändra isAdmin
export function setIsAdmin(value) {
  isAdmin = value;
}

export default async function admin() {

  setTimeout(() => {
    const form = document.getElementById('bandForm');

    if (!form) {
      console.error('Formuläret hittades inte!');
      return;
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const bandnamn = document.getElementById('bandnamn').value;
      const beskrivning = document.getElementById('beskrivning').value;
      const datetimeInput = document.querySelector('input[type="datetime-local"]');
      const klubbInput = document.querySelector('input[name="klubb"]:checked');

      // Kontrollera att alla fält är ifyllda
      if (!bandnamn || !beskrivning || !datetimeInput?.value || !klubbInput) {
        alert('Fyll i alla fält!');
        return;
      }

      const datetime = datetimeInput.value;
      const klubb = klubbInput.value;

      console.log('Bandnamn:', bandnamn);
      console.log('Beskrivning:', beskrivning);
      console.log('DateTime:', datetime);
      console.log('Klubb:', klubb);

      fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clubId: klubb,
          name: bandnamn,
          date: datetime.replace('T', ' '),
          description: beskrivning
        })
      })
        .then(response => {
          console.log('Response status:', response.status);
          return response.json();
        })
        .then(data => {
          console.log('Nytt evenemang skapat:', data);
          alert('Event sparat!');
          // Rensa formuläret
          form.reset();
        })
        .catch(error => {
          console.error('Fel vid sparande:', error);
          alert('Kunde inte spara eventet. Kolla konsolen för detaljer.');
        });
    });

  }, 1000);


  // Toggle för att visa events

  setTimeout(() => {
    const button = document.getElementById('toggleButton');
    const list = document.getElementById('eventList');

    if (!button || !list) {
      console.error('Toggle-element hittades inte!');
      return;
    }

    button.addEventListener('click', async () => {
      // Ladda events första gången man klickar
      if (list.innerHTML.trim() === '<li></li>' || list.innerHTML.trim() === '') {
        console.log('Laddar events...');
        const loadedEvents = await clubInfoAndEvents('');
        list.innerHTML = `<li>${loadedEvents}</li>`;


        attachDeleteButtonListeners();
      }

      list.classList.toggle('show');

      if (list.classList.contains('show')) {
        button.textContent = 'Dölj events';
      } else {
        button.textContent = 'Visa events';
      }
    });
  }, 10);

  return `
  <div class="wrapper">
  
    <div class="create-event">
      <h2>Skapa Nytt Event</h2>
      <form id="bandForm">
        
        <div class="form-group">
          <label for="bandnamn">Artist/Band</label>
          <input type="text" id="bandnamn" placeholder="T.ex. Metallica" required>
        </div>

        <div class="form-group">
          <label for="beskrivning">Beskrivning</label>
          <textarea id="beskrivning" placeholder="Beskriv eventet..." required></textarea>
        </div>

        <div class="form-group">
          <label for="datetime">Datum & Tid</label>
          <input type="datetime-local" id="datetime" required>
        </div>

        <div class="form-group">
          <label>Välj Klubb</label>
          <div class="radio-group">
            <div class="radio-option">
              <input type="radio" name="klubb" id="jazz" value="a37c" required>
              <label for="jazz">Jazz-klubben</label>
            </div>
            <div class="radio-option">
              <input type="radio" name="klubb" id="metal" value="fg5i">
              <label for="metal">Metal-klubben</label>
            </div>
            <div class="radio-option">
              <input type="radio" name="klubb" id="house" value="house-techno">
              <label for="house">House/Techno</label>
            </div>
            <div class="radio-option">
              <input type="radio" name="klubb" id="standup" value="c8m3">
              <label for="standup">Stand-up Comedy</label>
            </div>
            <div class="radio-option">
              <input type="radio" name="klubb" id="hiphop" value="hiphop">
              <label for="hiphop">Hip-hop</label>
            </div>
          </div>
        </div>

        <input type="submit" value="Skapa Event">
      </form>
    </div>

    <button id="toggleButton">Visa events</button>
    <ul id="eventList" class="event-list">
      <li></li>
    </ul>

    <footer class="contact">
      <h2>Kontakta oss</h2>
      <p>Email: info@galaemporium.se</p>
      <p>Telefon: 08-123 45 67</p>
    </footer>
  </div>
  `;
};