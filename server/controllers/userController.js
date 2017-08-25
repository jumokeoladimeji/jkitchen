const User = require('../models').User,
  Order = require('../models').Order;
  bcrypt = require('bcryptjs');

module.exports = {
  // hashPassword: (password) => {
  //   console.log('thisis working')
  //   return bcrypt.hashSync(password, 12);
  // },
  signup: (req, res) => {
    userDetails = req.body
    if (!userDetails.email) {
      return res.status(422).send({ error: 'You must enter an email address.'});
    }
    if (!userDetails.name) {
      return res.status(422).send({ error: 'You must enter your full name.'});
    }
    if (!userDetails.password) {
      return res.status(422).send({ error: 'You must enter a password.' });
    }

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
          email: userDetails.email,
          phone_number: userDetails.phone_number,
          imageURL: userDetails.imageURL,
          social_media_links: userDetails.social_media_links,
          hashedPassword: bcrypt.hashSync(userDetails.password, 12)
        }).then(newUser => {
          res.status(200).send(newUser)
        })
      }
    })
    .catch((err) =>{
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
          as: 'order',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Order, as: 'order' }, 'createdAt', 'ASC'],
        ],
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
          res.json({
              message: 'welcome back'
          });
        } else {
          res.json({
              message: 'incorrect password'
          })
        }
      }
    }).catch((err) =>{
        console.log(err, 'erroodopp')
          res.json({
              message: 'Error logging in'
          });
      });
    }
}


