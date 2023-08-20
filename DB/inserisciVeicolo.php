<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recupera i dati dal payload JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // Connessione al database
    $conn = new mysqli("localhost", "root", "", "auto_usate");

    if ($conn->connect_error) {
        die("Connessione al database fallita: " . $conn->connect_error);
    }

    // Estrai i dati dal payload
    $id = $data['id'];
    $modello = $data['modello'];
    $km = $data['km'];
    $carburante = $data['carburante'];
    $prezzo = $data['prezzo'];
    $venditore = $data['venditore'];
    $cambio = $data['cambio'];
    $longitudine = $data['longitudine'];
    $latitudine = $data['latitudine'];

    // Query SQL per inserire i dati nel database
    $sql = "INSERT INTO `automobili` (`ID`, `Modello_Nome`, `Km`, `Carburante`, `Prezzo`, `Venditore_Nome`, `Tipo_Cambio`, `Longitudine`, `Latitudine`)
            VALUES ('$id', '$modello', '$km', '$carburante', '$prezzo', '$venditore', '$cambio', '$longitudine', '$latitudine')";

    if ($conn->query($sql) === TRUE) {
        echo "Nuovo veicolo inserito con successo";
    } else {
        echo "Errore durante l'inserimento del veicolo: " . $conn->error;
    }

    $conn->close();
} else {
    echo "Richiesta non valida";
}
?>
