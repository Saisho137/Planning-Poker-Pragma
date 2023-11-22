'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const PORT = 8080;

mongoose.connect('mongodb://127.0.0.1:27017/planning-poker-DB')
    .then(
        () => {
            console.log("Succesful connection with DB.")
            app.listen(PORT, () => {
                console.log(`Server is running in http://localhost:${PORT}`);
            });
        })
    .catch((err) => {
        console.log("Failed to connect to DB.")
        console.log(err)
    })

