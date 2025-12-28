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

// Inizializza il calendario
function initCalendar() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        events: [
            { title: '0 posti', start: '2026-01-05', color: 'red' },
            { title: '1 posto', start: '2026-01-06', color: 'orange' },
            { title: '2 posti', start: '2026-01-07', color: 'green' }
        ],
        select: function(info) {
            // Quando l'utente seleziona una data
            const startDate = info.startStr;
            const link = `https://wa.me/1234567890?text=Ciao,+vorrei+prenotare+il+${startDate}`;
            if(confirm(`Vuoi prenotare il ${startDate}? Verrai reindirizzato a WhatsApp.`)) {
                window.open(link, '_blank');
            }
        }
    });
    calendar.render();
}
