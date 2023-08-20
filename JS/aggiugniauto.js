const form = document.getElementById("inserisciVeicoloForm");
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita il comportamento di default dell'invio del form
    
    // Recupera i dati dal form
    let id = 7;
    const modello = form.modello.value;
    const km = form.km.value;
    const carburante = form.carburante.value;
    const cambio = form.cambio.value; // Corretto il nome del campo
    const prezzo = form.prezzo.value;
    const venditore = form.venditore.value;
    const longitudine = form.longitudine.value;
    const latitudine = form.latitudine.value;
    
    // Verifica che i campi siano definiti prima di proseguire
    if (modello && km && carburante && cambio && prezzo && venditore && longitudine && latitudine) {
        // Crea un oggetto con i dati del veicolo
        const veicoloData = {
            id: id++,
            modello: modello,
            km: km,
            carburante: carburante,
            prezzo: prezzo,
            venditore: venditore,
            cambio: cambio,
            longitudine: longitudine,
            latitudine: latitudine
        };
        
        // Invia i dati al file PHP utilizzando una richiesta fetch
        fetch("../DB/inserisciVeicolo.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(veicoloData)
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Mostra la risposta del server nella console
            alert(data); // Mostra la risposta del server in un alert
        })
        .catch(error => {
            console.error("Errore durante l'invio dei dati:", error);
        });
    } else {
        console.error("Assicurati di compilare tutti i campi.");
    }
});