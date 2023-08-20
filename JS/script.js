const markerSource = new ol.source.Vector();
var  modal, testoModal,Header;
const originalStyles = {};
let b;
let acquistata = false;
const svuotaBtn = document.getElementById("svuotaBtn");


// Funzione per creare e mostrare i marker sulla mappa
async function creaEMostraMarker() {
    try {
        modal = document.getElementById("sfondoModal");
        testoModal = document.querySelector("#myModal main");
        Header=document.getElementById("NomeAuto");

        // Recupera le coordinate da OpenStreetMap Nominatim
        let busta = await fetch("https://nominatim.openstreetmap.org/search?format=json&city=Borgata_Valdiberti");
        let vet = await busta.json();
        let coord = [parseFloat("7.96084"), parseFloat("44.55289")];

        // Definisci una mappa
        const map = new ol.Map({
            target: "map", /* id dell'oggetto html */
            layers: [
                new ol.layer.Tile({ source: new ol.source.OSM() })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat(coord),
                zoom: 17
            })
        });


        // Recupera i dati delle automobili dal database utilizzando una richiesta AJAX
        const response = await fetch('../DB/db.php');
        const datiAuto = await response.json();
        console.log("Dati automobili:", datiAuto); // Console.log aggiunto

        const autoAcquistate = await caricaAutoAcquistate();
        
        // Utilizza i dati delle automobili per creare e mostrare i marker sulla mappa
        var MarkerAuto=[] ;
        var i=0;
        datiAuto.forEach(automobile => {
            i++;
            if(i>6){
                path = "../IMG/img.png";
            }else{
                path = "../IMG/img" + i + ".png";
            }
            
            const acquistata = autoAcquistate.includes(automobile.ID);
            if (!acquistata) {
            MarkerAuto[i] = aggiungiLayer(map, path);
            aggiungiMarker(MarkerAuto[i], automobile.Modello_Nome, automobile.Longitudine, automobile.Latitudine, automobile.Prezzo, automobile.Venditore_Nome, automobile.Km, automobile.Tipo_Cambio, automobile.Carburante, automobile.ID);
            
            // Imposta le proprietà del marker
            MarkerAuto[i].setProperties({
                modello: automobile.Modello_Nome,
                prezzo: automobile.Prezzo,
                nomeVenditore: automobile.Venditore_Nome,
                // altre proprietà dell'automobile
            });
            

        }

        });

        // Crea il layer dei marcatori
        const markerLayer = new ol.layer.Vector({
            source: markerSource,
        });
        
        // Aggiungi il layer dei marcatori alla mappa
        map.addLayer(markerLayer);

        
        let lastHoveredMarker = null;
        let a;
     
        map.on("pointermove", function (evento) {
            
            let marker = map.forEachFeatureAtPixel(evento.pixel, function (feature) {
                return feature;
            });
            b=marker.ID
            // Rimuovi la classe dall'ultimo marker
            if (markerSource.lastHoveredMarker) {
                markerSource.lastHoveredMarker.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 1],
                        src:a
                    })
                }));
                markerSource.lastHoveredMarker = null;
            }
        
            // Aggiungi la classe al marker corrente
            if (marker) {
                markerSource.lastHoveredMarker = marker;
                if(marker.ID>6){
                        a="../IMG/img.png";
                }else{
                    a="../IMG/img"+marker.ID+".png";
                }
                marker.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        
                        src: "../IMG/img"+marker.ID+".png",
                        scale: 3
                    })
                }));
                map.getTargetElement().style.cursor = "pointer";
            } else {
                map.getTargetElement().style.cursor = "";
            }
        });
       
        
        
        
        map.on("click", function (evento){
            let marker = map.forEachFeatureAtPixel(evento.pixel, function(feature){return feature});
            
            console.log(marker.Prezzo);
            Header.innerHTML=marker.dati;
            
            //Inserimento Immagini
            const imgElement = document.createElement("img");
            imgElement.src = "../IMG/img"+marker.ID+".png";
            imgElement.width = 120; 
            imgElement.height = 65;    
            Header.appendChild(imgElement);

            testoModal.innerHTML ="<b>Venditore:"+marker.VNome+"</b>" +"<br> <b>Prezzo:"+marker.Prezzo+"</b>"+"<br> <b>KM:"+marker.Km+"</b>"+"<br> <b>Carburante:"+marker.Carburante+"</b>"+"<br> <b>Cambio:"+marker.Cambio+"</b>";
            modal.style.display = "flex";
            const acquistaBtn = document.getElementById("acquistaBtn");
            if (marker && marker.get("acquistata")) {
                acquistaBtn.classList.add("hidden");
            } else {
                 acquistaBtn.classList.remove("hidden");
             }
        });

    } catch (error) {
        console.error('Errore durante l\'esecuzione della funzione:', error);
    }

    
}

function chiudiModal(){
    modal.style.display = "none";
}

function acquistaBtn(){
    // Recupera i dati dell'auto selezionata
    const modello = Header.innerText;
    
    // Utilizza querySelectorAll per trovare gli elementi <b> con il testo specifico
    const infoBElements = testoModal.querySelectorAll("b");
    let prezzo = "";
    let venditore = "";
    
    // Cicla attraverso gli elementi <b> per ottenere il prezzo e il venditore
    infoBElements.forEach(element => {
        if (element.textContent.includes("Prezzo")) {
            prezzo = element.textContent;
        } else if (element.textContent.includes("Venditore")) {
            venditore = element.textContent;
        }
    });
    
    // Crea un oggetto con i dati dell'acquisto
    const acquisto = {
        id:b,
        modello: modello,
        prezzo: prezzo,
        venditore: venditore
    };

    // Invia i dati dell'acquisto al server
    fetch("../DB/transazioni.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(acquisto)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        alert("Acquisto completato!");
    })
    .catch(error => {
        console.error("Errore durante il salvataggio dell'acquisto:", error);
        alert("Si è verificato un errore durante il salvataggio dell'acquisto.");
    });
}
// Esegui la funzione quando l'intera pagina è stata caricata
window.onload = creaEMostraMarker;

/**
 * Aggiunge un nuovo marker in un layer
 * @param {*} layer 
 * @param {*} Prezzo 
 * @param {*} VNome 
 * @param {*} Km 
 * @param {*} ID 
 * @param {*} Carburante 
 * @param {*} Cambio 
 * @param {*} dati Dati legati al marker
 * @param {*} lon:float Longitudine 
 * @param {*} lat:float Latitudine
 */

// Funzione per aggiungere un nuovo layer
function aggiungiLayer(mappa, pathImg) {
    let layer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: pathImg
            })
        })
    });
    mappa.addLayer(layer);
    return layer;
}

// Funzione per aggiungere un nuovo marker in un layer
function aggiungiMarker(layer, nome, lon, lat, Prezzo,Venditore_Nome,Km,Cambio,Carburante,ID) {
    if(layer.acquistata==ID){}else{
    let punto = new ol.geom.Point(ol.proj.fromLonLat([lon, lat]));
    let marker = new ol.Feature(punto);

    nome.lon = lon;
    nome.lat = lat;
    marker.dati=nome;
    marker.Prezzo=Prezzo;
    marker.VNome=Venditore_Nome;
    marker.Km=Km;
    marker.Cambio=Cambio;
    marker.Carburante=Carburante;
    marker.ID=ID;

    //Inserisce il marker nel layer passato per parametro 
    layer.getSource().addFeature(marker);
}
}

async function caricaAutoAcquistate() {
    try {
        const response = await fetch('../JSON/data.json');
        if(response!="")
        {
        const datiAcquisti = await response.json();
        const autoAcquistate = datiAcquisti.map(acquisto => acquisto.id);
        return autoAcquistate;
    }
    } catch (error) {
        console.error('Errore durante il caricamento delle auto acquistate:', error);
        return [];
    }
}


function svuotaContenuto() {
    fetch("../DB/svuotaData.php", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        alert("Contenuto svuotato con successo!");
    })
    .catch(error => {
        console.error("Errore durante lo svuotamento del contenuto:", error);
        alert("Si è verificato un errore durante lo svuotamento del contenuto.");
    });
}