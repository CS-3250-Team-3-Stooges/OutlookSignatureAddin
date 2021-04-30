/**
 * Creates a new database in Accounts.sqlite3 if it doesn't already exist,
 * and opens a new connection to the database.
 * The AccountsDB object comes with basic functionality,
 * including creating an Accounts table,
 * adding and removing accounts,
 * and switching accounts.
 * 
 * @author Jacob Torres <jacob@jacobtorres.net>
 */

// Constants: file names and queries
const sqlite3 = require('sqlite3').verbose();
const DB_FILE = 'Accounts.sqlite3';

// Table query
const CREATE_TABLE = `create table Accounts
  (ID integer primary key autoincrement,
    Name text,
    Email text,
    Signatures text,
    Selected integer,
    Remove integer);`

// Add account query
const ADD_ACCOUNT = `insert into Accounts
values (?, ?, ?,
  ?, ?, ?);`

// Remove account query
const REMOVE_ACCOUNT = 'delete from Accounts where Remove == 1;'


class AccountsDB {

  /**
   * openDB creates a new database in Accounts.sqlite3
   * (if it doesn't already exist)
   * and opens a new connection to the database.
   */
  openDB = () => {

    // Open new connection
    let db = new sqlite3.Database(DB_FILE, (err) => {
      if (err) {
        throw err;
      }
      console.log('Successfully connected to the Accounts database.');
      return db;
    });
    
  } // End openDB


  /**
   * createTable creates the Accounts tables, if it doesn't already exist.
   */
  createTable = () => {

    // Open the database
    let db = this.openDB();

    /* Create the account table with 6 columns:
     * ID, Name, Email, Signatures, Selected, and Remove.
     */
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
    console.log('Successfully close the connection and saved all changes.');
  });

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
