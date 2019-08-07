const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const payment = require('./routes/payment')
const config = require('./config')
const mongoose = require('mongoose')


mongoose.connect(config.db.URI, { newUrlParser: true })
mongoose.connection.once('open', () => {

    // setting app port
    app.set('port', process.env.PORT || config.PORT)

    //configuring body-parser middleware
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app
        .use('/payment', payment)
        // .use(express.basicAuth('username', 'password'))
        .listen(app.get('port'), () => {
            console.log(`Server is listening on port: ${app.get('port')}`)
        })
})