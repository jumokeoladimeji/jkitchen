var mocha = require('mocha'),
chai = require('chai'),
expect = chai.expect,
assert = chai.assert,
bcrypt = require('bcryptjs'),
userController = require('../../server/controllers/userController')


console.log('in specs');
describe('User Controller',  () => {
  it('should hash the new user\'s password', () => {
    hashedPassword = userController.hashPassword('jdiew2')
    assert.equal(true, bcrypt.compareSync('jdiew2', hashedPassword));
  });
 
});