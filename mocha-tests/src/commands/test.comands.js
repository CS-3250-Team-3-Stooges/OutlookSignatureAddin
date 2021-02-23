
const expect = require('chai').expect;
const multiplyNumbers = require('C:/Users/final/Documents/group3stooges/OutlookSignatureAddin/src/commands/commands.js').multiplyNumbers;

describe('Commands', function () {
    describe('#multiplyNumbers()', function () {
        it('should return the result of multiplication', function () {
            let result = multiplyNumbers(4, 6);
            expect(result).to.equal(24);
        });
    });
});