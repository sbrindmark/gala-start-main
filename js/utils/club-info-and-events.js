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
        <article class="event">
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
        </article>
      `)
        .join('')
      }
  `;

}