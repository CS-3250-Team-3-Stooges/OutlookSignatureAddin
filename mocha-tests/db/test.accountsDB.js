/**
 * Mocha test suite for Accounts database functionality.
 * 
 * @author Jacob Torres <jacob@jacobtorres.net>
 */
const chai = require('chai');
const AccountsDB = require('../../db/accountsDB');
const assert = chai.assert;

describe('#AccountsDB', function() {

  describe('#openDB', function() {
    it('should return a string that confirms the successful connection.');
  });

  describe('#createTable', function() {
    it('should return an array of length 1 with the name of the Accounts table.');
  });

});
