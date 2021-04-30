function() {

  // Open new DB connection
  const sqlite3 = require('sqlite3').verbose();
  const DB_FILE = 'AccountsDB.sqlite3';

  // Remove query
  const REMOVE_ACCOUNT = 'delete from Accounts where Remove == 1;'
  
  // Remove the account with the remove value True
  db.run(REMOVE_ACCOUNT, (err) => {
    if (err) {
      throw err;
    }
    console.log('Account removed successfully.')
  });
  
}());
