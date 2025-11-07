export default function hiphopClub() {
  const events = [
    {
      title: "Rap Battle Royale",
      date: "2025-11-15",
      image: "images/hiphop.jpg",
      description: "En natt med tunga bars, beats och energi på scenen.",
    },
    {
      title: "Breakdance Jam",
      date: "2025-11-28",
      image: "images/hiphop.jpg",
      description: "Dansare från hela landet möts i en episk battle.",
    },
    {
      title: "DJ Night – Old School Edition",
      date: "2025-12-10",
      image: "images/hiphop.jpg",
      description: "Back to the roots – vinyl, scratch och groove hela kvällen.",
    }
  ];

  // Skapa HTML-sträng
  let html = `
    <section id="intro">
        <h2>Välkommen till Hip-Hop Klubben</h2>
        <p>Välkommen till Sveriges största nattklubb med ljud och ljus i världsklass.</p>
    </section>

    <section id="kalender">
        <h2>🎤 Kommande Evenemang</h2>
        <div id="event-list" class="event-grid">
  `;

  // Lägg till evenemang
  events.forEach(ev => {
    html += `
      <div class="event-card">
        <img src="${ev.image}" alt="${ev.title}" style="width:100%; border-radius:6px;">
        <h3>${ev.title}</h3>
        <p><strong>${ev.date}</strong></p>
        <p>${ev.description}</p>
      </div>
    `;
  });

  html += `
        </div>
    </section>

    <section id="om">
        <h2>Om Oss</h2>
        <p>När natten faller över staden finns det bara ett ställe där musiken, energin och atmosfären möts på den högsta nivån – Gala Emporium.</p>
        <p>På Gala Emporium handlar allt om känslan. Från det ögonblick du kliver in möts du av en värld där lyx möter lekfullhet – gnistrande ljus, förstklassigt ljud och en publik som vet hur man festar.</p>
        <p>Gala Emporium är inte bara en nattklubb – det är en upplevelse, en livsstil och en destination.</p>
    </section>
  `;

  return html; 
