import { isAdmin } from "../pages/admin.js";


export function attachDeleteButtonListeners() {
  setTimeout(() => {
    const deleteButtons = document.querySelectorAll('.delete-event-btn');
    console.log('Hittade', deleteButtons.length, 'delete-knappar');

    deleteButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const eventId = e.target.dataset.id;
        console.log('Klickade på delete-knapp för event:', eventId);

        if (confirm(`Är du säker på att du vill ta bort event med ID: ${eventId}?`)) {
          fetch(`http://localhost:3000/events/${eventId}`, {
            method: 'DELETE',
          })
            .then(response => {
              if (response.ok) {
                alert('Event borttaget!');
                // Ta bort hela article-elementet
                e.target.closest('article').remove();
              } else {
                alert('Kunde inte ta bort eventet.');
              }
            })
            .catch(error => {
              console.error('Fel:', error);
              alert('Ett fel uppstod vid borttagning.');
            });
        }
      });
    });
  }, 100);
}

export function attachChangeButtonListeners() {
  setTimeout(() => {
    const changeButtons = document.querySelectorAll('.change-event-btn');
    console.log('Hittade', changeButtons.length, 'change-knappar');

    changeButtons.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const eventId = e.target.dataset.id;
        console.log('Klickade på change-knapp för event:', eventId);

        try {
          // Hämta befintlig eventdata
          const response = await fetch(`http://localhost:3000/events/${eventId}`);
          const eventData = await response.json();

          // Visa prompts för att ändra värdena
          const newName = prompt('Ändra namn:', eventData.name);
          if (newName === null) return; // Användaren avbröt

          const newDate = prompt('Ändra datum:', eventData.date);
          if (newDate === null) return;

          const newDescription = prompt('Ändra beskrivning:', eventData.description);
          if (newDescription === null) return;

          // Skapa uppdaterat event-objekt
          const updatedEvent = {
            ...eventData,
            name: newName,
            date: newDate,
            description: newDescription
          };

          // Skicka PUT-request med uppdaterad data
          const updateResponse = await fetch(`http://localhost:3000/events/${eventId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEvent)
          });

          if (updateResponse.ok) {
            alert('Event uppdaterat!');
            // Uppdatera DOM-elementet
            const article = e.target.closest('article');
            article.querySelector('h3').textContent = `${newName} ${newDate}`;
            article.querySelector('p').textContent = newDescription;
          } else {
            alert('Kunde inte uppdatera eventet.');
          }
        } catch (error) {
          console.error('Fel:', error);
          alert('Ett fel uppstod vid uppdatering.');
        }
      });
    });
  }, 100);
}



export default async function clubInfoAndEvents(clubId) {
  let name = '', description = '', id = '';
  // if there is a clubId -> fetch the info about the club
  // and calculate the correct url for fetching filtered events
  let url = 'http://localhost:3000/events';
  if (clubId) {
    const { name: clubName, description: clubDescription } =
      await (await fetch('http://localhost:3000/clubs/' + clubId)).json();
    name = clubName;
    description = clubDescription;
    url += '?clubId=' + clubId;
    id = id;
  }
  const events =
    await (await fetch(url)).json();
  // return html


  if (!isAdmin) {

    return `
    <h1>${name}</h1>
    <p>${description}</p>
    <h2>Events</h2>
    ${events
        .toSorted((a, b) => a.date > b.date ? 1 : -1)
        .map(({ date, name, description, id }) => `
            <article class="event" data-event-id="${id}">
              <h3>${name} ${date}</h3>
              <p>${description}</p>
            </article>
          `)
        .join('')
      }
  `;
  }

  else
    return `
    <h1>${name}</h1>
    <p>${description}</p>
    <h2>Events</h2>
    ${events
        .toSorted((a, b) => a.date > b.date ? 1 : -1)
        .map(({ date, name, description, id }) => `
        <article class="event" data-event-id="${id}">
          <h3>${name} ${date}</h3>
          <p>${description}</p>
          <p>ID: ${id}</p>
          <button class="delete-event-btn" data-id="${id}">Ta bort</button>
          <button class="change-event-btn" data-id="${id}">Ändra</button>
        </article>
      `)
        .join('')
      }
  `;

}