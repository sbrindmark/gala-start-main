export default function eventbokare() {
  return `
    <section class="page eventbokare">
      <h1>Boka Event</h1>
      <p>Välkommen till bokningssidan. Fyll i formuläret nedan för att skicka en förfrågan.</p>

      <form id="booking-form">
        <label>
          Namn
          <input type="text" name="name" required />
        </label>

        <label>
          E-post
          <input type="email" name="email" required />
        </label>

        <label>
          Datum
          <input type="date" name="date" required />
        </label>

        <label>
          Kort beskrivning av eventet
          <textarea name="description" rows="4"></textarea>
        </label>

        <button type="submit">Skicka förfrågan</button>
      </form>
    </section>
  `;
}
