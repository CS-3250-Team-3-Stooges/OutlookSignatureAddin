var chai = require('chai');
var assert = chai.assert; // using Assert Style
var expect = chai.expect; //Using Expect Style
var should = chai.should; // Using Should Style
//Generic test that empty array should have length of 0
describe('ArrayEmpty', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });
});

//Generic Test that compares arrays have same members - Taken from https://stackoverflow.com/questions/44335770/node-mocha-chai-unit-tests-compare-array-of-objects-regardless-of-order
describe('ArrayComparison', function() {
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
});
