
const assert = require('chai').assert;
const randomSignature = require('../../../src/taskpane/taskpane.js').randomSignature;

describe('Taskpane', function () {
    describe('#randomSignature()', function () {
        it('should return a string that is a signature', function () {
            let result = randomSignature();
            assert.typeOf('chai', 'string');
        });
    });
});