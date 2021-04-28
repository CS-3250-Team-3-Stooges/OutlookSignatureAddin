global.$ = global.jQuery = require('jquery');
var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
describe('Random signature', function () {
  it('should return a string', function () {
    var arr = Accountlistsize();

    assert.equal(arr, 3);
  });
