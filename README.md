# Gala Emporium

Ett webbbaserat event- och klubbhanteringssystem där användare kan utforska olika klubbar och boka evenemang.

## 📋 Beskrivning

Gala Emporium är en interaktiv webbapplikation som visar olika typer av klubbar och events. Projektet inkluderar funktionalitet för både besökare och administratörer att hantera evenemang.

### Klubbtyper
- Jazz Club
- Comedy Club
- House/Techno Club
- Hip Hop Club
- Metal Club

## 🚀 Kom igång

### Förutsättningar
- Node.js installerat på din dator
- npm (kommer med Node.js)

### Installation

1. Klona repot:
```bash
git clone https://github.com/sbrindmark/gala-start-main.git
cd gala-start-main
```

2. Installera beroenden:
```bash
npm install
```

3. Starta JSON Server:
```bash
npm start
```

4. Öppna `index.html` i din webbläsare eller använd en lokal server.

JSON servern körs på `http://localhost:3000`

##  Projektstruktur

```
gala-start-main/
├── index.html              # Huvudsida
├── package.json           # Projektberoenden
├── css/
│   ├── pages/            # CSS för specifika sidor
│   └── utils/            # Allmän CSS och setup
├── js/
│   ├── main.js           # Huvudskript
│   ├── pages/            # JavaScript för specifika sidor
│   └── utils/            # Hjälpfunktioner och utilities
├── json/
│   └── db.json           # JSON Server databas
├── images/               # Bilder
├── sounds/               # Ljudfiler
└── videos/               # Videofiler
```

##  Funktioner

- **Event-hantering**: Se och utforska olika evenemang
- **Eventbokare**: Boka evenemang på olika klubbar
- **Admin-panel**: Hantera (lägg till, redigera, ta bort) evenemang
- **Responsiv design**: Fungerar på olika skärmstorlekar
- **JSON Server**: Backend för datalagring och API

##  Tekniker

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- JSON Server för backend
- Fetch API för HTTP-anrop

##  Admin-funktioner

Administratörer har tillgång till extra funktionalitet:
- Skapa nya evenemang
- Redigera befintliga evenemang
- Ta bort evenemang
- Hantera klubbinformation

Åtkomst till admin-panelen via länken i footer.

##  Licens

ISC

##  Författare

Grupparbete 3 - Gala Emporium Team

---

© 2025 Gala Emporium
