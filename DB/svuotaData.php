<?php
$dataFile = "../JSON/data.json"; // Nome del file JSON

// Svuota il contenuto del file JSON
file_put_contents($dataFile, "");

// Invia una risposta di successo
echo json_encode(array("message" => "Contenuto del file svuotato con successo."));
?>
