/** 
 * Creates the Accounts database using the NPM SQLite3 package.
 * {@https://www.npmjs.com/package/sqlite3}
 * 
 * @author Jacob Torres [jacob@jacobtorres.net]
 */


// Instantiate new sqlite3 db
const sqlite3 = require('sqlite3').verbose();
const db_file = 'accountsDB.sqlite3';

// SQL queries
const CREATE_TABLE = `create table accounts
  (name text, email text, signatures text);`
const INSERT_ACCOUNT = ``

export function createDB() {

  // Open new connection
  let db = new sqlite3.Database(db_file, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Successfully connected to the accounts database.');
  });
}


export function createTable() {

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
  
}
