process.env.NODE_ENV = 'test';
const mocha = require('mocha'),
chai = require('chai'),
expect = chai.expect,
assert = chai.assert,
should = chai.should(),
bcrypt = require('bcryptjs'),
index = require('../../index'),
userController = require('../../server/controllers/userController'),

User = require('../../server/models').User,
userData = { username: 'Jim', password:'$32#hdsjsd', name: 'JIm Caerey', email:'jim@yahoo.com', phoneNumber:'2902390033' }
chai.use(require('chai-http'));

describe('User Controller',  () => {
  
  describe('Hash Password',  () => {
    it('should hash the new user\'s password', () => {
      hashedPassword = userController.hashPassword('jdiew2')
      assert.equal(true, bcrypt.compareSync('jdiew2', hashedPassword));
    });
  });

  describe('Sign Up Function', function() {
    before(() => { 
      return User
        .destroy({ 
          where: {
            email: userData.email
          }
        })
        .then(function() {
          return
      });
    }); 
    it("should create users", function(done) {
      chai.request(index)
        .post('/api/user/signup')
        .send(userData)
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object')
          done()
      })
    })
  });

  describe('Sign In Function', function(done) {
    it("should sign in users", (done) => {
      chai.request(index)
        .post('/api/user/signin')
        .send({password:userData.password, email: userData.email})
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object')
          done();
      })
    });
  });
  describe('Update User Function', function(done) {
    it("should update user data", (done) => {
      User
        .find({ 
          where: {
            email: userData.email
          }
        })
      .then(function(user){
        const userId = user.dataValues.id
        chai.request(index)
          .put(`/api/user/me/${userId}/edit`)
          .send({username:'Jim Jim'})
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.an('object')
            expect(res.body.username).to.have.string('Jim Jim')
            done();
        })   
      })
    });
  });
});