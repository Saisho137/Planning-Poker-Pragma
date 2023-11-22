'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const secret = "my_secret_password"

const getUserToken = (user) => {
    const payload = {
        sub: user._id,
        username: user.username,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(24, 'hours').unix()
    }
    return jwt.encode(payload, secret)
}

const validateUserToken = (req, res, nextStep) => {
    try {
        const tokenFromUser = req.headers.authorization;
        const cleanToken = tokenFromUser.replace("Bearer ", "")
        const payload = jwt.decode(cleanToken, secret)
        req.header.userId = payload.sub
        nextStep()
    }
    catch (ex) {
        res.status(403).send({ message: "Invalid Token" })
    }
}

module.exports = {
    getUserToken,
    validateUserToken
}