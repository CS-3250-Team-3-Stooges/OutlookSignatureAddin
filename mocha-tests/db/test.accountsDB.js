/**
 * Mocha test suite for Accounts database functionality.
 * 
 * @author Jacob Torres <jacob@jacobtorres.net>
 */
const AccountsDB = require('../../db/accountsDB');
const expect = require('chai').expect;
const sqlite3 = require('sqlite3').verbose();
let db = new AccountsDB();

describe('#AccountsDB', function() {

  describe('#openDB', function() {
    it('should create an Accounts.sqlite3 file in the current directory.');
  });

  describe('#createTable', function() {
    it('should return an array of length 1 with the name of the Accounts table.', function() {
      let result = db.createTable();
      expect(result).to.be.a('array').with.length(1);
    });
  });

});
