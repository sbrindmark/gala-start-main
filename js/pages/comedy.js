import clubInfoAndEvents from "../utils/club-info-and-events.js";

async function makeBooking(formData) {
    const bookingNumber = 'COMEDY-' + Date.now().toString().slice(-6);

    const booking = {
        id: bookingNumber,
        name: formData.get('name'),
        email: formData.get('email'),
        eventDate: formData.get('eventDate'),
        guests: parseInt(formData.get('guests')),
        bookingDate: new Date().toISOString(),
        clubId: 'c8m3'
    };

    try {
        const response = await fetch('http://localhost:3000/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        });

        if (response.ok) {
            return { success: true, bookingNumber, booking };
        } else {
            return { success: false, error: 'Kunde inte spara bokningen' };
        }
    } catch (error) {
        return { success: false, error: 'Nätverksfel' };
    }
}

function attachBookingFormHandler() {
    const form = document.getElementById('booking-form');
    const confirmationDiv = document.getElementById('booking-confirmation');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const result = await makeBooking(formData);

            if (result.success) {
                confirmationDiv.innerHTML = `
                    <div class="booking-success">
                        <h3>🎉 Bokning bekräftad! 🎭</h3>
                        <div class="booking-details">
                            <p><strong>Bokningsnummer:</strong> ${result.bookingNumber}</p>
                            <p><strong>Namn:</strong> ${result.booking.name}</p>
                            <p><strong>Event datum:</strong> ${result.booking.eventDate}</p>
                            <p><strong>Antal gäster:</strong> ${result.booking.guests}</p>
                        </div>
                        <p class="booking-note">Spara ditt bokningsnummer och visa det vid entrén! 🎪</p>
                    </div>
                `;
                form.reset();
            } else {
                confirmationDiv.innerHTML = `
                    <div class="booking-error">
                        <h3>❌ Bokningfel</h3>
                        <p>${result.error}</p>
                    </div>
                `;
            }
        });
    }
}

export default async function standupComedy() {
    const clubContent = await clubInfoAndEvents('c8m3');

    const bookingForm = `
        <div class="booking-section">
            <h2>🎫 Förboka din plats!</h2>
            <form id="booking-form" class="booking-form">
                <div class="form-group">
                    <label for="name">Namn:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">E-post:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="eventDate">Välj event datum:</label>
                    <select id="eventDate" name="eventDate" required>
                        <option value="">Välj datum...</option>
                        <option value="2025-11-07 20:00">Laughter Night - 7 Nov 20:00</option>
                        <option value="2025-11-08 19:30">Open Mic Comedy - 8 Nov 19:30</option>
                        <option value="2025-11-10 21:00">Internationell Comedy - 10 Nov 21:00</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="guests">Antal gäster:</label>
                    <select id="guests" name="guests" required>
                        <option value="1">1 person</option>
                        <option value="2">2 personer</option>
                        <option value="3">3 personer</option>
                        <option value="4">4 personer</option>
                        <option value="5">5 personer</option>
                        <option value="6">6 personer</option>
                    </select>
                </div>
                
                <button type="submit" class="comedy-button">🎭 Boka nu!</button>
            </form>
            
            <div id="booking-confirmation"></div>
        </div>
    `;

    // Attach event handler after DOM is updated
    setTimeout(attachBookingFormHandler, 100);

    return clubContent + bookingForm;
}