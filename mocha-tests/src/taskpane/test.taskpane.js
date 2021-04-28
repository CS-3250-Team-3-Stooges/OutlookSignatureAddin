var chai = require('chai');
var assert = chai.assert; // using Assert Style
var expect = chai.expect; //Using Expect Style
var should = chai.should; // Using Should Style


//Code by Sean - Generic test that empty array should have length of 0
describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });

  //Code adapted by Sean - Generic Test that compares arrays have same members - Taken from https://stackoverflow.com/questions/44335770/node-mocha-chai-unit-tests-compare-array-of-objects-regardless-of-order
  it('should have the same members', function() {
   var a = [
   {name: 'Sean', age: 35},
   {name: 'Weston', age: 30},
   ]

   //assume we got the result in this order
   var b = [
   {name: 'Sean', age: 35},
   {name: 'Weston', age: 30},
   ]

   expect(a).to.have.deep.members(b)
  });

  //Code by Sean and Weston - Generic test that created array has the correct number of members
  it('should contain 3 members', function() {
    var accountList = ["Philip", "Sean", "Weston"];

    assert.equal(accountList.length, 3);
  });
});
