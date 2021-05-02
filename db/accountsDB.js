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

  // Query to get all Accounts in the table
  const GET_ACCOUNTS = 'select * from Accounts;'

  // Table query
const CREATE_TABLE = `create table if not exists Accounts
  (id integer primary key autoincrement,
    name text,
    email text,
    signatures text,
    selected integer,
    remove integer);`

// Query to check the existence of the Accounts table
const TABLE_EXISTS = `select name from sqlite_master
  where type == 'table' and name == 'Accounts';`

// Add account query
const ADD_ACCOUNT = `insert into Accounts
values (?, ?, ?, ?, ?, ?);`

// Query to get the account last added
const GET_LAST_ACCOUNT = `select * from Accounts
  order by id desc limit 1;`

// Remove account query
const REMOVE_ACCOUNT = 'delete from Accounts where Remove == 1;'


class AccountsDB {

  /**
   * openDB opens a new connection to the Accounts database.
   * It will create a new Accounts database if one doesn't exist.
   * @returns {sqlite3.Database} - An instance of the database with an open connection
   */
  openDB = () => {

    // Open new connection
    let db = new sqlite3.Database(DB_FILE, (err) => {
      if (err) { throw err; }
    });
    return db;
    
  } // End openDB


  /**
   * createTable creates the Accounts table, if it doesn't already exist.
   * @returns {Array} - An array of total tables created for testing the Accounts table creation
   */
  createTable = () => {
    let db = this.openDB();
    let tables = [];

    /* Create the account table with 6 columns:
     * ID, Name, Email, Signatures, Selected, and Remove.
     */
    db.run(CREATE_TABLE, (err) => {
      if (err) { throw err; }
    });

    // Check that the Accounts table has been created, and push it to the tables array
    tables.push(db.run(TABLE_EXISTS));
    
    // Close the database connection
    db.close((err) => {
      if (err) { throw err; }
    });
    return tables;

  } // End createTable


  /**
   * addAccount inserts a new account record into the table.
   * @param {Array} acctAttrs - Account attributes input from user
   */
  addAccount = (acctAttrs) => {
    let db = this.openDB();
    let output = '';  // For printing the new account attributes

    // Retrieve account information and insert it into the table.
    db.run(
      ADD_ACCOUNT,
      acctAttrs,  // FIXME: retrieve account attributes from user
      (err) => {
        if (err) { throw err; }
        else { output = output + db.run(
          GET_LAST_ACCOUNT, (err) => {
            if (err) { throw err; }
            else { output = output.split('|'); }  // Split the output string into an array
          });
        }
      });  

    // Close the database connection
    db.close((err) => {
      if (err) { throw err; }
    });
    return output;

  } // End addAccount


  /**
   * removeAccount deletes an account from the table.
   */
  removeAccount = () => {

    // Open the database
    let db = this.openDB();

    // Remove the account whose Remove value is 1 (True)
    db.run(REMOVE_ACCOUNT, (err) => {
      if (err) { throw err; }
    });

  // Close the database connection
  db.close((err) => {
    if (err) { throw err; }
  });

  } // End removeAccount
  
} // End AccountsDB class

module.exports = AccountsDB;
