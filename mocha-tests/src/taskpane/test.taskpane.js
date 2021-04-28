var chai = require('chai');
var assert = chai.assert; // using Assert Style
var expect = chai.expect; //Using Expect Style
var should = chai.should; // Using Should Style
var fs = require('fs');



//Code by Sean - Generic test that empty array should have length of 0
describe('Array test', function () {
  it('should start empty', function () {
    var arr = [];

    assert.equal(arr.length, 0);
  });

  //Code adapted by Sean - Generic Test that compares arrays have same members - Taken from https://stackoverflow.com/questions/44335770/node-mocha-chai-unit-tests-compare-array-of-objects-regardless-of-order
  it('should have the same members', function () {
    var a = [
      { name: 'Sean', age: 35 },
      { name: 'Weston', age: 30 },
    ]

    //assume we got the result in this order
    var b = [
      { name: 'Sean', age: 35 },
      { name: 'Weston', age: 30 },
    ]

    expect(a).to.have.deep.members(b)
  });

  //Code by Sean and Weston - Generic test that created array has the correct number of members
  it('should contain 3 members', function () {
    var accountList = ["Philip", "Sean", "Weston"];

    assert.equal(accountList.length, 3);
  });
  //code by weston to test if array equals signature.txt file
  it('should match the lenght of the signature list', function () {
    var sigListArry = fs.readFileSync('signatures.txt').toString().split("\n");
    var signature = ["\"Dude, suckin' at something is the first step at being sorta good at something.\"<br>-  Jake <small><em>(Adventure Time)</em></small>",
      "\"We can only see a short distance ahead, but we can see plenty that needs to be done.\"<br> -Alan Turing",
      "\"No computer is ever going to ask a new, reasonable question. It takes trained people to do that.\"<br> -Grace Hopper",
      "\"Computer Science is the operating system for all innovation.\"<br> -Steve Ballmer",
      "\"A goal is a dream with a deadline.\"<br> – Napoleon Hill",
      "\"Logic will get you from A to B. Imagination will take you everywhere.\"<br> –Albert Einstein",
      "\"Paying attention to simple little things that most men neglect makes a few men rich.\"<br> –Henry Ford",
      "\"Action is the foundational key to all success.\"<br> -Pablo Picasso",
      "\"No act of kindness, no matter how small, is ever wasted.\"<br> –Aesop",
      "\"Computers are like Old Testament gods; lots of rules and no mercy.\"<br> -Joseph Campbell",
      "\"The most important thing about a technology is how it changes people.\"<br> -Jaron Lanier",
      "\"R2-D2, you know better than to trust a strange computer.\"<br> -C3P0",
      "\"Technology is making the world more unequal. Only technology can fix this.\"<br> -Cory Doctorow",
      "\"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.\"<br>- Thomas A. Edison",
      "\"Never give up, for that is just the place and time that the tide will turn.\"<br>- Harriet Beecher Stowe",
      "\"If you always put limit on everything you do, physical or anything else. It will spread into your work and into your life. There are no limits. There are only plateaus, and you must not stay there, you must go beyond them.\"<br>- Bruce Lee",
    ]
    expect(signature).to.have.deep.members(sigListArry);
  });
});
