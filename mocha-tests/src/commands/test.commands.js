
const expect = require('chai').expect;
const assert = require('chai').assert;
const multiplyNumbers = require('../../../src/commands/commands.js').multiplyNumbers;
const randomSignature = require('../../../src/commands/commands.js').randomSignature;

describe('Commands', function () {
    describe('#multiplyNumbers()', function () {
        it('should return the result of multiplication', function () {
            let result = multiplyNumbers(4, 6);
            expect(result).to.equal(24);
        });
    });
});
