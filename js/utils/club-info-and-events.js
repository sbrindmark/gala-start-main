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
          <p>${id}</p>
        </article>
      `)
      .join('')
    }
  `;
}