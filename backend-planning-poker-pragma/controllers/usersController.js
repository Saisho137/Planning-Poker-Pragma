'use strict'

const Users = require('../models/users');
const token = require('../helpers/token');
const bcrypt = require('bcryptjs')

const test = (req, res) => {
    res.status(200).send({ message: "User is Logged in" });
}

function registerUser(req, res) {
    const newUser = new Users()
    const body = req.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(body.password, salt)

    newUser.username = body.username
    newUser.email = body.email
    newUser.password = hash

    newUser.save().then(
        (savedUser) => {
            res.status(200).send({ userCreated: savedUser })
        },
        err => {
            res.status(500).send({ message: "Could not create the User", err })
        }
    )
}

function signInUser(req, res) {
    const body = req.body

    const sentEmail = body.email
    const sentPassword = body.password

    Users.findOne({ email: sentEmail }).then(
        (foundUser) => {
            if (foundUser == null) {
                res.status(403).send({ message: "User doesnt exist." })
            }
            else {
                if (bcrypt.compareSync(sentPassword, foundUser.password)) {
                    res.status(200).send({ message: "User Authenticated.", token: token.getUserToken(foundUser) })
                }
                else {
                    res.status(403).send({ message: "Invalid Password." })
                }
            }
        },
        err => {
            res.status(500).send({ message: "Could not found User.", err })
        }
    )
}

module.exports = {
    test, registerUser, signInUser
}