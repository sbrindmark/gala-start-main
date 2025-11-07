import clubInfoAndEvents from "../utils/club-info-and-events.js";
let allEvents = [];
let allClubs = [];
 
export default async function start() {
  let eventHtml = '';
  try {
    // Fetch all events and clubs for search functionality
    const [eventsResponse, clubsResponse] = await Promise.all([
      fetch('http://localhost:3002/events'),
      fetch('http://localhost:3002/clubs')
    ]);
 
    allEvents = await eventsResponse.json();
    allClubs = await clubsResponse.json();
 
    // Add club info to events for better search
    allEvents = allEvents.map(event => ({
      ...event,
      clubName: allClubs.find(club => club.id === event.clubId)?.name || ''
    }));
 
    eventHtml = await clubInfoAndEvents();
  } catch (error) {
    console.error('Error loading events:', error);
    eventHtml = '<p>Kunde inte ladda events. Kontrollera att servern körs.</p>';
  }
 
  // Add event listeners after the HTML is rendered
  setTimeout(() => {
    setupSearchFunctionality();
  }, 0);
 
  return `
    <section id="alla-klubbar" class="clubs-section">
  <div class="clubs-intro">
    <h2>Välkommen till Gala Emporium</h2>
    <p>Stadens puls av musik, skratt och energi. Utforska våra klubbar – från jazzens sväng och metallens kraft till nattens techno och stand-upens skratt. Här lever varje kväll, varje ton och varje applåd.</p>
   </div>
   
      <div class="club-grid">
    <a href="#jazz-klubben" class="club jazz">
     <img src="images/jazzmain.jpg" alt="Jazz Club" class="club-image">
       <strong>Jazz-Klubben – Upplev svingen i jazzbaren</strong>
     <p class="club-desc">Avslappnad stämning, levande toner och ren musikglädje.</p>
    </a>
 
    <a href="#metal-klubben" class="club metal">
     <img src="images/metal.jpeg" alt="Metal Club" class="club-image">
   <strong>Metal-Klubben – Där metal lever</strong>
    <p class="club-desc">Mörker, energi och gemenskap – metal på riktigt.</p>
    </a>
 
     <a href="#standup-comedy" class="club comedy">
    <img src="images/Lo.jpg" alt="Stand-Up Comedy" class="club-image">
   <strong>Stand-Up Comedy – Skratt utan gränser</strong>
    <p class="club-desc">Upplev det bästa av stand-up med både stjärnor och nya talanger.</p>
     </a>
 
    <a href="#house-techno-klubben" class="club house-techno">
   <img src="images/technoHouse.jpg" alt="House Techno Nights" class="club-image">
   <strong>House Techno – Vibrerande nätter</strong>
   <p class="club-desc">Där basen möter ljuset och dansgolvet aldrig sover.</p>
    </a>
 
 
      </div>
      <div id="all-events-container">
        <h2>Vilket är ditt nästa evenemang?</h2>
        <p>Här är alla kommande evenemang på Gala Emporium:</p>
 
        <!-- Search functionality -->
        <div class="search-container">
          <input type="text" id="event-search" placeholder="Sök efter evenemang..." />
          <button id="clear-search">Rensa</button>
        </div>
       
        <div class="wrapper" id="events-wrapper">
          ${eventHtml}
        </div>
      </div>
    </section>
  `;
}
 
function setupSearchFunctionality() {
  const searchInput = document.getElementById('event-search');
  const clearButton = document.getElementById('clear-search');
  const eventsWrapper = document.getElementById('events-wrapper');
 
  if (!searchInput || !clearButton || !eventsWrapper) return;
 
  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    filterEvents(searchTerm, eventsWrapper);
  });
 
  // Enter key search
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const searchTerm = e.target.value.toLowerCase().trim();
      filterEvents(searchTerm, eventsWrapper);
    }
  });
 
  // Clear search
  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    filterEvents('', eventsWrapper);
    searchInput.focus();
  });
 
  // Focus search input when clicking on search container
  const searchContainer = document.querySelector('.search-container');
  if (searchContainer) {
    searchContainer.addEventListener('click', (e) => {
      if (e.target === searchContainer) {
        searchInput.focus();
      }
    });
  }
}
 
function filterEvents(searchTerm, eventsWrapper) {
  if (!searchTerm) {
    // Show all events
    displayFilteredEvents(allEvents, eventsWrapper);
    return;
  }
 
  const filteredEvents = allEvents.filter(event => {
    const name = event.name.toLowerCase();
    const description = event.description.toLowerCase();
    const date = event.date.toLowerCase();
    const clubName = (event.clubName || '').toLowerCase();
 
    return name.includes(searchTerm) ||
      description.includes(searchTerm) ||
      date.includes(searchTerm) ||
      clubName.includes(searchTerm);
  });
 
  displayFilteredEvents(filteredEvents, eventsWrapper);
} function displayFilteredEvents(events, eventsWrapper) {
  const searchInput = document.getElementById('event-search');
  const searchTerm = searchInput ? searchInput.value.trim() : '';
 
  if (events.length === 0) {
    eventsWrapper.innerHTML = searchTerm
      ? '<p>Inga evenemang hittades som matchar din sökning.</p>'
      : '<p>Inga evenemang tillgängliga.</p>';
    return;
  }
 
  const eventHtml = events
    .toSorted((a, b) => a.date > b.date ? 1 : -1)
    .map(({ date, name, description }) => `
      <article class="event">
        <h3>${name} ${date}</h3>
        <p>${description}</p>
      </article>
    `)
    .join('');
 
  const resultsText = searchTerm
    ? `<p class="search-results">Visar ${events.length} evenemang som matchar "${searchTerm}"</p>`
    : '<p></p>';
 
  eventsWrapper.innerHTML = `
    <h1></h1>
    ${resultsText}
    <h2>Events</h2>
    ${eventHtml}
  `;
}
 