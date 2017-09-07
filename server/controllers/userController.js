const User = require('../models').User,
  Order = require('../models').Order;
  bcrypt = require('bcryptjs')
  jwt = require('jsonwebtoken');


module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, 12);
  },
  signup: (req, resp) => {
    userDetails = req.body

    if (!userDetails.email) {
      return resp.status(422).send({ error: 'You must enter an email address.'});
    }
    if (!userDetails.name) {
      return resp.status(422).send({ error: 'You must enter your full name.'});
    }
    if (!userDetails.username){
      return resp.status(422).send({ error: 'You must enter a username.' });
    }
    if (!userDetails.password) {
      return resp.status(422).send({ error: 'You must enter a password.' });
    }
    User
      .find({ 
        where: {
          email: userDetails.email
        }
      })
      .then(existingUser =>{
        if (existingUser) {
          return resp.status(422).send({ error: 'That email address is already in use.' });
        }
        // userDetails.hashedPassword = hashPassword(userDetails.password)
        User
          .create({
            name: userDetails.name,
            username: userDetails.username,
            email: userDetails.email,
            phoneNumber: userDetails.phoneNumber,
            imageURL: userDetails.imageURL,
            socialMediaLinks: userDetails.socialMediaLinks,
            hashedPassword: bcrypt.hashSync(userDetails.password, 12)
          })
          .then(newUser => resp.status(200).send(newUser))
      })
      .catch(err => { 
        resp.status(500).send({message: err})})
  },
  signin: (req, resp) => {
    userDetails = req.body
    if (!userDetails.email) {
      return resp.status(422).send({ error: 'You must enter an email address.'});
    }
    if (!userDetails.password) {
      return resp.status(422).send({ error: 'You must enter a password.' });
    }
    User
      .find({ 
        where: {
          email: userDetails.email
        }
      })
      .then(user => {
        if (!user) {
          return resp.json({
            message: 'User does not exist'
          });
        }
        if (user) {
          const isPasswordValid = bcrypt.compareSync(userDetails.password, user.hashedPassword)
          if (isPasswordValid) {
            // create a token
            const token = jwt.sign(user.dataValues, 'secret', {
              expiresIn: 1440 
            });
            return resp.status(200).send({
              message: 'welcome back',
              data: user.dataValues,
              signintoken: token,
              expiresIn: 1440
            });
          } else {
            return resp.status(401).send({
              message: 'incorrect password'
            })
          }
        }
      })
      .catch((err) =>{
        resp.status(401).send({
          message: 'Error logging in user', err
        });
      });
  },
  signout : (req, resp) => {
    resp.redirect('/');
  },
  updateUser: (req, resp) => {
    User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return resp.json({
            message: 'User does not exist'
          });
        }
        const userDetails = req.body
        const hashedPasswordToSave = userDetails.password ? bcrypt.hashSync(userDetails.password, 12) : user.hashedPassword
        user
          .update({
            role: userDetails.role || user.role, 
            name: userDetails.name || user.name, 
            username: userDetails.username || user.username,
            email: userDetails.email || user.email, 
            phoneNumber: userDetails.phoneNumber || user.phoneNumber, 
            imageURL: userDetails.imageURL || user.imageURL, 
            socialMediaLinks: userDetails.socialMediaLinks || user.socialMediaLinks, 
            hashedPassword: hashedPasswordToSave
          })
          .then((updatedUser) => {
            resp.status(200).send(updatedUser)
          })
      })
      .catch((err) => {
        resp.json({
            message: 'Error updating user'
        });
      });
  }
}


