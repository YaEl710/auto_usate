const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auto_usate',
});

db.connect((err) => {
  if (err) {
    console.error('Errore nella connessione al database:', err);
    return;
  }
  console.log('Connessione al database avvenuta con successo!');
});

module.exports = db;
