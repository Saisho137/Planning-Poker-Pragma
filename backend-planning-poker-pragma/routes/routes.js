'use strict'

const usersController = require('../controllers/usersController')
const token = require('../helpers/token')

const express = require('express')
const app = express.Router()

//Users Controller
app.post('/register_user', usersController.registerUser)
app.post('/sign_in_user', usersController.signInUser)
app.get('/test', token.validateUserToken, usersController.test)

module.exports = app