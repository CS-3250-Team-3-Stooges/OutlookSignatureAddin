var chai = require('chai');
var assert = chai.assert;
import Accountlistsize from '../../../src/taskpane/taskpane.js';

describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });
  describe('Random signature', function () {
    it('should return a string', function () {
      var arr = Accountlistsize();

      assert.equal(arr, 03);
    });
});
