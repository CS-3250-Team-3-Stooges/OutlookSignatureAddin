/**
 * Mocha test suite for Accounts database functionality.
 * 
 * @author Jacob Torres <jacob@jacobtorres.net>
 */

// Imports and constants
const AccountsDB = require('../../db/accountsDB');
const expect = require('chai').expect;
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const db_file = './Accounts.sqlite3';

describe('#AccountsDB', function() {

  describe('#openDB', function() {
    it('should create an Accounts.sqlite3 file in the current directory.', function() {
      let db = new AccountsDB();
      let result = 0;

      // Check the existence of the Accounts.sqlite3 file in the current directory
      fs.access(db_file, fs.constants.F_OK, (err) => {
        db.openDB();
        if (err) {
          throw err;
        } else {
          result = 1;
        }
        expect(result).to.equal(1);
      });
    });
  });

  describe('#createTable', function() {
    it('should return an array of length 1 with the name of the Accounts table.', function() {
      let db = new AccountsDB();
      let result = db.createTable();
      expect(result).to.be.a('array').with.length(1);
    });
  });

});
