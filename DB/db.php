<?php
// Connessione al database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "auto_usate";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Esegue la query per recuperare i dati delle automobili
$query = "SELECT * FROM automobili";
$result = $conn->query($query);

if (!$result) {
    die("Errore nella query: " . $conn->error);
}

// Creazione di un array per i dati delle automobili
$automobili = array();
while ($row = $result->fetch_assoc()) {
    $automobili[] = $row;
}

// Chiude la connessione al database
$conn->close();

// Imposta l'header per restituire i dati in formato JSON
header('Content-Type: application/json');

// Restituisce i dati delle automobili come JSON
echo json_encode($automobili);
?>
