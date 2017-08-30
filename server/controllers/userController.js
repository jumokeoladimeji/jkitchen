const User = require('../models').User,
  Order = require('../models').Order;
  bcrypt = require('bcryptjs');


module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, 12);
  },
  signup: (req, res) => {
    userDetails = req.body
    if (!userDetails.email) {
      return res.status(422).send({ error: 'You must enter an email address.'});
    }
    if (!userDetails.name) {
      return res.status(422).send({ error: 'You must enter your full name.'});
    }
    if (!userDetails.username){
      return res.status(422).send({ error: 'You must enter a username.' });
    }
    if (!userDetails.password) {
      return res.status(422).send({ error: 'You must enter a password.' });
    }
    console.log(userDetails)

    return User
      .find({ 
        where: {
          email: userDetails.email
        },
      })
    .then(existingUser =>{
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }else{
        // userDetails.hashedPassword = hashPassword(userDetails.password)
        return User.create({
          name: userDetails.name,
          username: userDetails.username,
          email: userDetails.email,
          phoneNumber: userDetails.phoneNumber,
          imageURL: userDetails.imageURL,
          socialMediaLinks: userDetails.socialMediaLinks,
          hashedPassword: bcrypt.hashSync(userDetails.password, 12)
        }).then(newUser => {
          res.status(200).send(newUser)
        })
      }
    })
    .catch((err) =>{
      console.log(err)
      res.status(500).send({
        message: err
      });
    });
  },
  signin: (req, res) => {
    userDetails = req.body
    if (!userDetails.email) {
      return res.status(422).send({ error: 'You must enter an email address.'});
    }
    if (!userDetails.password) {
      return res.status(422).send({ error: 'You must enter a password.' });
    }
      return User
      .find({ 
        where: {
          email: userDetails.email
        },
        include: [{
          model: Order,
          as: 'orders',
        },{
          model: Article,
          as: 'articles',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Order, as: 'orders' }, 'createdAt', 'ASC'],]
      })
    .then(user => {
      if (!user) {
          res.json({
              message: 'User does not exist'
          });
      }
      if (user) {
        const isPasswordValid = bcrypt.compareSync(userDetails.password, user.hashedPassword)
        if (isPasswordValid) {

          // create a token
          const token = jwt.sign(user, 'secret', {
            expiresInMinutes: 1440 // expires in 24 hours
          });
          res.status(200).send({
            message: 'welcome back',
            data: user,
            signintoken: token,
            expiresInMinutes: 1440
          });
        } else {
          res.status(401).send({
            message: 'incorrect password'
          })
        }
      }
    })
    .catch((err) =>{
      res.status(401).send({
        message: 'Error logging in user', err
      });
    });
  },
  signout : (req, res) => {
    return res.redirect('/');
  },
  updateUser: (req, res) => {
    return User
      .findById(req.params.userId,{
        include: [{
          model: Order,
          as: 'orders',
        },{
          model: Article,
          as: 'articles',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Order, as: 'orders' }, 'createdAt', 'ASC'],
        ]})
    .then(user => {
      if (!user) {
        res.json({
          message: 'User does not exist'
        });
      }
      return User
        .update({
          role: req.body.role || User.role, 
          name: userDetails.name || User.name, 
          username: userDetails.username || User.username,
          email: userDetails.email || User.email, 
          phoneNumber: userDetails.phoneNumber || User.phoneNumber, 
          imageURL: userDetails.imageURL || User.imageURL, 
          socialMediaLinks: userDetails.socialMediaLinks || User.socialMediaLinks, 
          hashedPassword: bcrypt.hashSync(userDetails.password, 12) || User.password,
        })
        .then((updatedUser) => res.status(200).send(updatedUser))
      }).catch((err) =>{
        res.json({
            message: 'Error logging in user'
        });
      });
  }
}


