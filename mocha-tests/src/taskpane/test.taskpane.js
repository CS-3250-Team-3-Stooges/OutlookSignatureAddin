global.$ = global.jQuery = require('jquery');
var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
var accountList = ["Philip", "Sean", "Weston"];
describe('Random signature', function () {
  it('should return a string', function () {
    var arr = accountList;

    assert.equal(arr.length, 3);
  });
