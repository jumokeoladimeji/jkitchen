var mocha = require('mocha'),
chai = require('chai'),
expect = chai.expect,
assert = chai.assert,
bcrypt = require('bcryptjs'),
userController = require('../../server/controllers/userController')

var sinon = require('sinon');
var expect = chai.expect;

//Importing our User model for our unit testing.
var User = require('../../server/models').User;
console.log('in specs');
describe('User Controller',  () => {
  it('should hash the new user\'s password', () => {
    hashedPassword = userController.hashPassword('jdiew2')
    assert.equal(true, bcrypt.compareSync('jdiew2', hashedPassword));
  });
  it("should return all users", (done) => {
    var UserMock = sinon.mock(User);
    var expectedResult = {status: true, user: []};
    UserMock.expects('find').yields(null, expectedResult);
    User.find(function (err, result) {
        UserMock.verify();
        UserMock.restore();
        expect(result.status).to.be.true;
        done();
    });
  });
  it("should return error", (done) => {
    var UserMock = sinon.mock(User);
    var expectedResult = {status: false, error: "Something went wrong"};
    UserMock.expects('find').yields(expectedResult, null);
    User.find(function (err, result) {
        UserMock.verify();
        UserMock.restore();
        expect(err.status).to.not.be.true;
        done();
    });
  });
});