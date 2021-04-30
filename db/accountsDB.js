/** 
 * Creates the Accounts database using the NPM SQLite3 package.
 * {@https://www.npmjs.com/package/sqlite3}
 * 
 * @author Jacob Torres [jacob@jacobtorres.net]
 */


// Instantiate new sqlite3 database
const sqlite3 = require('sqlite3').verbose();
const db_file = 'AccountsDB.sqlite3';

// SQL queries
const CREATE_TABLE = `create table Accounts
  (AcctID integer primary key autoincrement,
    Name text,
    Email text,
    Signatures text,
    Selected integer,
    Remove integer);`
const INSERT_ACCOUNT = `insert into Accounts
  values (?, ?, ?, ?, ?, ?);`
const REMOVE_ACCOUNT = `
  delete from Accounts where Remove == 1;`

export function createAcctTable() {

  // Open new connection
  let db = new sqlite3.Database(db_file, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Successfully connected to the Accounts database.');
  });

  // Create the account table with 3 columns: name, email, and signatures
  db.run(CREATE_TABLE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Accounts table successfully created.');
  });

  // Close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Successfully saved all changes and closed the connection.');
  });
}


export function insertAccount() {

  // Prepare SQL statement to insert new account(s)
  insertStmt = db.prepare(

  );

}
