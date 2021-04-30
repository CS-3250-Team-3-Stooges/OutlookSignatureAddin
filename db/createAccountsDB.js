/** 
 * Creates a new connection to the Accounts database
 *  and creates the Accounts table with the NPM SQLite3 package.
 * {@https://www.npmjs.com/package/sqlite3}
 * 
 * @author Jacob Torres [jacob@jacobtorres.net]
 */
 (function() {

  // Table query
  const CREATE_TABLE = `create table Accounts
    (AcctID integer primary key autoincrement,
      Name text,
      Email text,
      Signatures text,
      Selected integer,
      Remove integer);`

  // Open new connection
  const sqlite3 = require('sqlite3').verbose();
  const DB_FILE = 'AccountsDB.sqlite3';
  const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
      throw err;
    }
    console.log('Successfully connected to the Accounts database.');
  });

  // Create the account table with 3 columns: name, email, and signatures
  db.run(CREATE_TABLE, (err) => {
    if (err) {
      throw err;
    }
    console.log('Accounts table successfully created.');
  });
    
  // Close the database connection
  db.close((err) => {
    if (err) {
      throw err;
    }
    console.log('Successfully saved all changes and closed the connection.');
  });

}());
