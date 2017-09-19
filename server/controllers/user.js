const User = require('../models').User
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  hashPassword (password) {
    return bcrypt.hashSync(password, 12)
  },
  signup (req, res) {
    const userDetails = req.body

    if (!userDetails.email) {
      return res.status(422).send({ message: 'You must enter an email address.' })
    }
    if (!userDetails.name) {
      return res.status(422).send({ message: 'You must enter your full name.' })
    }
    if (!userDetails.username) {
      return res.status(422).send({ message: 'You must enter a username.' })
    }
    if (!userDetails.password) {
      return res.status(422).send({ message: 'You must enter a password.' })
    }
    User
      .find({
        where: {
          email: userDetails.email
        }
      })
      .then(existingUser => {
        if (existingUser) {
          return res.status(422).send({ message: 'That email address is already in use.' })
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
          .then(newUser => res.status(200).send(newUser))
      })
      .catch(error => {
        res.status(500).send({message: error})
      })
  },
  signin (req, res) {
    const userDetails = req.body
    if (!userDetails.email) {
      return res.status(422).send({ message: 'You must enter an email address.' })
    }
    if (!userDetails.password) {
      return res.status(422).send({ message: 'You must enter a password.' })
    }
    User
      .find({
        where: {
          email: userDetails.email
        }
      })
      .then(user => {
        if (!user) {
          return res.json({
            message: 'User does not exist'
          })
        }
        if (user) {
          const isPasswordValid = bcrypt.compareSync(userDetails.password, user.hashedPassword)
          if (isPasswordValid) {
            // create a token
            const token = jwt.sign(user.dataValues, 'secret', {
              expiresIn: 1440
            })
            return res.status(200).send({
              message: 'welcome back',
              data: user.dataValues,
              signintoken: token,
              expiresIn: 1440
            })
          } else {
            return res.status(401).send({
              message: 'incorrect password'
            })
          }
        }
      })
      .catch((error) => {
        res.status(401).send({
          message: 'Error logging in user', error
        })
      })
  },
  signout (req, res) {
    res.redirect('/')
  },
  updateUser (req, res) {
    User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.json({
            message: 'User does not exist'
          })
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
            res.status(200).send(updatedUser)
          })
      })
      .catch((error) => {
        res.json({
          message: error
        })
      })
  },
  /**
 * User authorizations routing middleware
 */
  hasAuthorization (req, res, next) {
    if (req.user.role === 'admin') {
      return next()
    } else {
      return res.send(403, {
        message: 'User is not authorized'
      })
    }
  }
}
