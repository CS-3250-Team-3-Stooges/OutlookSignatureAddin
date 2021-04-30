(function() {

  // Open new connection
  const sqlite3 = require('sqlite3').verbose();
  const DB_FILE = 'AccountsDB.sqlite3';
  const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
      throw err;
    }
    console.log('Successfully connected to the Accounts database.');
  });

  // SQL queries
  const INSERT_ACCOUNT = `insert into Accounts
    values (?, ?, ?,
      ?, ?, ?);`
  
    // Prepare SQL statement to insert new account(s)
    insertStmt = db.prepare(
      INSERT_ACCOUNT, 
    );
  
  }
  
}());
