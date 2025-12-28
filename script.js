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
        msg.style.color = "green";
        msg.textContent = "Login effettuato!";
        document.getElementById("loginDiv").style.display = "none";
        document.getElementById("calendarDiv").style.display = "block";
        initCalendar();
    } else {
        msg.style.color = "red";
        msg.textContent = "Nome utente o password errati";
    }
}

function initCalendar() {
    const calendarEl = document.getElementById('calendar');

    // Link CSV pubblico del tuo Google Sheet
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTyoiqz94Cvk9EQHjdds2HjWsm287fPOwmnk8SgxStOtuii2MPyIcU8DF2Zc6YminBxVws8jEJEyaQz/pub?output=csv";

    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function(results) {
            const data = results.data;

            const events = data.map(item => {
                const posti = Number(item.Posti);
                let color = "green";
                let title = posti + " posti";

                if (posti === 0) {
                    color = "red";
                    title = "Non disponibile";
                } else if (posti === 1) {
                    color = "orange";
                    title = "1 posto";
                }

                return {
                    title: title,
                    start: item.Data,
                    color: color,
                    posti: posti
                };
            });

            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: "dayGridMonth",
                selectable: true,
                events: events,
                select: function(info) {
                    const eventClicked = events.find(e => e.start === info.startStr);
                    if (eventClicked && eventClicked.posti > 0) {
                        const startDate = info.startStr;
                        const link = `https://wa.me/1234567890?text=Ciao,+vorrei+prenotare+il+${startDate}`;

                        if (confirm(`Vuoi prenotare il ${startDate}? Verrai reindirizzato a WhatsApp.`)) {
                            window.open(link, "_blank");
                        }
                    } else {
                        alert("Data non disponibile");
                    }
                }
            });

            calendar.render();
        },
        error: function(err) {
            console.error("Errore nel caricamento del CSV:", err);
            alert("Errore nel caricamento del foglio. Controlla che il foglio sia pubblicato correttamente.");
        }
    });
}
