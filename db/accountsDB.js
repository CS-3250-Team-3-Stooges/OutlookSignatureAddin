/**
 * Creates a new database in Accounts.sqlite3 if it doesn't already exist.
 * The AccountsDB object comes with basic functionality,
 * including opening a connection to the database, creating an Accounts table, and adding/removing accounts.
 * 
 * @author Jacob Torres <jacob@jacobtorres.net>
 */

// Constants: file names and queries
const sqlite3 = require('sqlite3').verbose();
const DB_FILE = 'Accounts.sqlite3';

// Table query
const CREATE_TABLE = `create table if not exists Accounts
  (ID integer primary key autoincrement,
    Name text,
    Email text,
    Signatures text,
    Selected integer,
    Remove integer);`

// Query to check the existence of the Accounts table
const TABLE_EXISTS = `select name from sqlite_master
  where type == 'table' and name == 'Accounts';`

// Add account query
const ADD_ACCOUNT = `insert into Accounts
values (?, ?, ?,
  ?, ?, ?);`

// Remove account query
const REMOVE_ACCOUNT = 'delete from Accounts where Remove == 1;'


class AccountsDB {

  /**
   * openDB opens a new connection to the Accounts database.
   * It will create a new Accounts database if one doesn't exist.
   */
  openDB = () => {
    let output = 'Successfully connected to the Accounts database.';

    // Open new connection
    let db = new sqlite3.Database(DB_FILE, (err) => {
      if (err) {
        throw err;
      }
      console.log(output);
    });
    return db;
    
  } // End openDB


  /**
   * createTable creates the Accounts table, if it doesn't already exist.
   */
  createTable = () => {
    let tablesCreated = [];
    let accountsCreated = [];
    let db = this.openDB();
    let output = 'The Accounts table has been created.';

    /* Create the account table with 6 columns:
     * ID, Name, Email, Signatures, Selected, and Remove.
     */
  db.run(CREATE_TABLE, (err) => {
    if (err) {
      throw err;
    }
    console.log(output);
  });

  // Check that the Accounts table has been created
  tablesCreated.push(db.run(TABLE_EXISTS));
    
  // Close the database connection
  db.close((err) => {
    if (err) {
      throw err;
    }
  });
  return tablesCreated;

  } // End createTable


  /**
   * addAccount inserts a new account record into the table.
   */
  addAccount = () => {

    // Open database
    let db = this.openDB();

    // Retrieve account information and insert it into the table.
    db.run(
      ADD_ACCOUNT, [], (err) => {
        if (err) {
          throw err;
        }
        console.log('Successfully added an account.');
      }
    );

  // Close the database connection
  db.close((err) => {
    if (err) {
      throw err;
    }
    console.log('Successfully close the connection and saved all changes.');
  });

} // End addAccount


  /**
   * removeAccount deletes an account from the table.
   */
  removeAccount = () => {

    // Open the database
    let db = this.openDB();

    // Remove the account whose Remove value is 1 (True)
    db.run(REMOVE_ACCOUNT, (err) => {
      if (err) {
        throw err;
      }
      console.log('Successfully removed an account.');
    });

  // Close the database connection
  db.close((err) => {
    if (err) {
      throw err;
    }
    console.log('Successfully close the connection and saved all changes.');
  });

  } // End removeAccount
  
} // End AccountsDB class

module.exports = AccountsDB;
