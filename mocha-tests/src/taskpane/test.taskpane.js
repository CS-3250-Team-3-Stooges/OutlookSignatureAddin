var chai = require('chai');
var assert = chai.assert; // using Assert Style
var expect = chai.expect; //Using Expect Style
var should = chai.should; // Using Should Style

//Generic test that empty array should have length of 0
describe('ArrayLength', function() {
  it('should contain 3 members', function() {
    var accountList = ["Philip", "Sean", "Weston"];

    assert.equal(accountList.length, 3);
  });
});
