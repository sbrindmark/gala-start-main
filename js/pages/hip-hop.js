import clubInfoAndEvents from "../utils/club-info-and-events.js";

export default async function hiphop {
  const eventsHtml = await clubInfoAndEvents('a37c');

  // HTML för Hiphop klubben
  return `
  <body class="hiphop-klubben">
    <header>
        <h1>🎧 Hip-Hop Klubben</h1>
        <nav>
            <a href="index.html">Hem</a>
            <a href="#kalender">Evenemang</a>
            <a href="#om">Om Oss</a>
        </nav>
    </header>

    <main>
        <section id="intro">
            <h2>Välkommen till Hip-Hop Klubben</h2>
            <p>Välkommen till Sveriges största nattklubb med ljud och ljus i världsklass.</p>
        </section>

        <section id="kalender">
            <h2>🎤 Kommande Evenemang</h2>
            <div id="event-list" class="event-grid"></div>
        </section>

        <section id="om">
            <h2>Om Oss</h2>
            <p>När natten faller över staden finns det bara ett ställe där musiken, energin och atmosfären möts på den högsta nivån – Gala Emporium. Detta ikoniska nöjestempel har snabbt blivit en symbol för exklusivitet, puls och oförglömliga upplevelser.</p>
            <p>På Gala Emporium handlar allt om känslan. Från det ögonblick du kliver in möts du av en värld där lyx möter lekfullhet – gnistrande ljus, förstklassigt ljud och en publik som vet hur man festar. Här dansar du till världens hetaste DJs, sippar på unika cocktails skapade av mästerliga bartendrar och känner hur varje beat går rakt in i själen.</p>
            <p>Gala Emporium är inte bara en nattklubb – det är en upplevelse, en livsstil och en destination. Oavsett om du kommer för att fira stort, dansa till gryningen eller bara njuta av den elektriska stämningen, är det här platsen där magin händer.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Hip-Hop Klubben | Gala Emporium</p>
    </footer>
</body>
document.addEventListener("DOMContentLoaded", () => {
    const events = [
        {
            title: "Rap Battle Royale",
            date: "2025-11-15",
            image: "",
            description: "En natt med tunga bars, beats och energi på scenen.",
        },
        {
            title: "Breakdance Jam",
            date: "2025-11-28",
            image: "images/hiphop.jpg",
            description: "Dansare från hela landet möts i en episk battle.",
        },
        {
            title: "DJ Night Old School Edition",
            date: "2025-12-10",
            image: "images/hiphop.jpg",
            description: "Back to the roots – vinyl, scratch och groove hela kvällen.",
        }
    ];

    const eventList = document.getElementById("event-list");

    if (eventList) {
        events.forEach(ev => {
            const card = document.createElement("div");
            card.className = "event-card";
            const imgSrc = ev.image || "images/default.jpg";
            card.innerHTML = `
            
            
            `;
            eventList.appendChild(card);
        });
    }

    console.log("Hip-Hop Klubben-sidan är laddad!");
});
 
  `;
}

// === Skapar hela HTML-strukturen dynamiskt ===

