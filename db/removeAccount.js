(function() {

  // Remove query
  const REMOVE_ACCOUNT = 'delete from Accounts where Remove == 1;'

  // Open new connection
  const sqlite3 = require('sqlite3').verbose();
  const DB_FILE = 'AccountsDB.sqlite3';
  const db = new sqlite3.Database((err) => {
    if (err) {
      throw err;
    }
    console.log('Successfully connected to the Accounts database.')
  });
  
  // Remove the account with the remove value True
  db.run(REMOVE_ACCOUNT, (err) => {
    if (err) {
      throw err;
    }
    console.log('Account removed successfully.')
  });

  // Close the connection
  db.close((err) => {
    if (err) {
      throw err;
    }
    console.log('Successfully closed the connection and saved all changes.');
  });
  
}());
