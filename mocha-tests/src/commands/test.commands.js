const expect = require('chai').expect;
const assert = require('chai').assert;
const multiplyNumbers = require('../../../src/commands/commands.js').multiplyNumbers;
const randomSignature = require('../../../src/commands/commands.js').randomSignature;

//Code by Phiilip - Expected multiplication test
describe('Commands', function () {
    describe('#multiplyNumbers()', function () {
        it('should return the result of multiplication', function () {
            let result = multiplyNumbers(4, 6);
            expect(result).to.equal(24);
        });
    });
});

//Added by Sean - Code taken from https://www.sitepoint.com/unit-test-javascript-mocha-chai/
describe('addClass', function() {
  it('should add class to element', function() {
    var element = { className: '' };

    addClass(element, 'test-class');

    assert.equal(element.className, 'test-class');
  });

  it('should not add a class which already exists');
});

it('should not add a class which already exists', function() {
  var element = { className: 'exists' };

  addClass(element, 'exists');

  var numClasses = element.className.split(' ').length;
  assert.equal(numClasses, 1);
});

function addClass(el, newClass) {
  if(el.className.indexOf(newClass) !== -1) {
    return;
  }

  if(el.className !== '') {
    //ensure class names are separated by a space
    newClass = ' ' + newClass;
  }

  el.className += newClass;
}
