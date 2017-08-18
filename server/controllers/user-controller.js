const User = require('../models').user,
  bcrypt = require('bcryptjs');

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, 12);
  },
  create: (req, res) => {
    // check if the user exists before-that would mean something has to be unique
    userDetails = req.body
    userDetails.hashedPassword = hashPassword(userDetails.password)
    return User.create({
      name: userDetails.name,
      email: userDetails.email,
      phone_number: userDetails.phone_number,
      imageURL: userDetails.imageURL,
      social_media_links: userDetails.social_media_links,
      hashedPassword: userDetails.hashedPassword
    }).then((newUser) => {
      res.status(200).send(newUser)
    }).catch((err) =>{
      if (err.code === 11000) {
        res.json({
          message: 'A user with this name exists'
        })
      } else {
        res.json({
          message: err
        });
      } 
    })
  },
  signin: (req, res) => {
    if (bcrypt.compareSync(userPassword, user.password)) {
      userObject = {
        username: user.username,
        userId: user._id
      };
    }
  }
}


