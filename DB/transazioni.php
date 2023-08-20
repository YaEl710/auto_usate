<?php
// Verifica se sono presenti dati inviati tramite POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $dataFile = "../JSON/data.json"; // Nome del file JSON
    
    // Recupera i dati inviati tramite POST
    $acquisto = json_decode(file_get_contents("php://input"), true);
    
    // Carica il contenuto esistente del file JSON
    $jsonData = file_get_contents($dataFile);
    
    // Decodifica il contenuto JSON esistente in un array associativo
    $data = json_decode($jsonData, true);
    
    // Aggiunge il nuovo acquisto all'array dei dati
    $data[] = $acquisto;
    
    // Codifica l'array aggiornato in JSON
    $newJsonData = json_encode($data, JSON_PRETTY_PRINT);
    
    // Scrive il nuovo contenuto nel file JSON
    file_put_contents($dataFile, $newJsonData);
    
    // Invia una risposta di successo
    echo json_encode(array("message" => "Acquisto salvato con successo."));
} else {
    // Invia una risposta di errore se la richiesta non è una POST
    http_response_code(400);
    echo json_encode(array("message" => "Richiesta non valida."));
}
?>
