// Login semplice
const utenti = {
    "cliente1": "password1",
    "cliente2": "password2"
};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("loginMsg");

    if (utenti[username] && utenti[username] === password) {
        msg.textContent = "Login effettuato!";
        document.getElementById("loginDiv").style.display = "none";
        document.getElementById("calendarDiv").style.display = "block";
        initCalendar();
    } else {
        msg.textContent = "Nome utente o password errati";
    }
}

// Inizializza il calendario con dati dinamici
function initCalendar() {
    const calendarEl = document.getElementById('calendar');

    // Recupera dati disponibilità dal JSON
    fetch('availability.json')
        .then(response => response.json())
        .then(data => {
            const events = data.map(item => {
                let color = 'green';
                let title = item.posti + " posti";
                if(item.posti === 0) { color = 'red'; title = "Non disponibile"; }
                else if(item.posti === 1) { color = 'orange'; title = "1 posto"; }
                return { title: title, start: item.date, color: color, posti: item.posti };
            });

            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                selectable: true,
                events: events,
                select: function(info) {
                    const selectedEvent = events.find(e => e.start === info.startStr);
                    if(selectedEvent && selectedEvent.posti > 0) {
                        const startDate = info.startStr;
                        const link = `https://wa.me/1234567890?text=Ciao,+vorrei+prenotare+il+${startDate}`;
                        if(confirm(`Vuoi prenotare il ${startDate}? Verrai reindirizzato a WhatsApp.`)) {
                            window.open(link, '_blank');
                        }
                    } else {
                        alert("Data non disponibile");
                    }
                }
            });

            calendar.render();
        })
        .catch(err => {
            console.error("Errore caricamento disponibilità:", err);
            alert("Impossibile caricare la disponibilità. Controlla il file availability.json.");
        });
}
