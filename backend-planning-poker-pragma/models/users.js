'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = Schema({
    username: String,
    email: String,
    password: String
})

module.exports = mongoose.model('users', UserSchema)