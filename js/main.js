import start from './pages/start.js';
import jazzClub from './pages/jazz-club.js';
import metalClub from './pages/metal-club.js';
import standupComedy from './pages/comedy.js';

// Our menu: label to display in menu and 
// function to run on menu choice
const menu = {
  "start": { label: 'Start', function: start },
  "jazz-klubben": { label: 'Jazz-klubben', function: jazzClub },
  "metal-klubben": { label: 'Metal-klubben', function: metalClub },
  "standup-comedy": { label: 'Standup Comedy', function: standupComedy }
};

// Menu for header - only shows Start
const headerMenu = {
  "start": { label: 'Start', function: start }
};

function createMenu() {
  // Object.entries -> convert object to array
  // then map to create a-tags (links)
  // then join everything into one big string
  return Object.entries(headerMenu)
    .map(([urlHash, { label }]) => `
      <a href="#${urlHash}">${label}</a>
    `)
    .join('');
}

function createHeader() {
  const currentPage = location.hash.slice(1);

  if (currentPage === 'standup-comedy') {
    return `
      <h1>🎭 Standup Comedy Club</h1>
      <p>Skratta tills du får ont i magen! Våra komiker levererar de bästa skämten och mest underhållande berättelserna varje vecka.</p>
      <nav>${createMenu()}</nav>
    `;
  }

  return `
    <h1>🎭 Gala Emporium</h1>
    <p>Upplev levande framträdanden i världsklass</p>
    <nav>${createMenu()}</nav>
  `;
}

async function loadPageContent() {
  // if no hash redirect to #start
  if (location.hash === '') { location.replace('#start'); }
  // add a class on body so that we can style differnt pages differently
  document.body.setAttribute('class', location.hash.slice(1));
  // update header for the current page
  document.querySelector('header').innerHTML = createHeader();
  // get the correct function to run depending on location.hash
  const functionToRun = menu[location.hash.slice(1)].function;
  // run the function and expect it return a html string
  const html = await functionToRun();
  // replace the contents of the main element
  document.querySelector('main').innerHTML = html;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // create the header first
  document.querySelector('header').innerHTML = createHeader();

  // then load page content
  loadPageContent();

  // and then on every hash change of the url/location
  window.onhashchange = loadPageContent;
});