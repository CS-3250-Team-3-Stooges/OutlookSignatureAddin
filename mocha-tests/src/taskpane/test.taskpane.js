var chai = require('chai');
var assert = chai.assert; // using Assert Style
var expect = chai.expect; //Using Expect Style
var should = chai.should; // Using Should Style

//Code by Sean and Weston - Generic test that created array has the correct number of members
describe('ArrayLength', function() {
  it('should contain 3 members', function() {
    var accountList = ["Philip", "Sean", "Weston"];

    assert.equal(accountList.length, 3);
  });
});
