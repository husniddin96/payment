const router = require('express').Router()
const User = require('../models/User')
const { auth } = require('../routes/Auth')

router
    .post("/api", auth, (req, res, next) => {

        let { user, body } = req

            

        // let token = req.headers.authorization.split(' ')[1]
        // token = Buffer.from(token, 'base64').toString('binary')
        // let [phone, password] = token.split(':')

        // User.findOne({ phone: phone }, (err, user) => {

        //     if (err) {
        //         res.status(400).json({ err })
        //     }

        //     if (!user) {
        //         res.status(404).json({ msg: 'User with this phone number is not found!' })
        //     }

        //     let success = user.comparePassword(password)

        //     if (!success) {
        //         res.send()
        //     }

        // })


        // console.log({ username, password })

        // let data = {
        //     method: "",
        //     params: {
        //         id: "53327b3fc92af52c0b72b695",
        //         time: 1399114284039,
        //         amount: 500000,
        //         account: {
        //             phone: "903595731"
        //         }
        //     },
        //     id: 12
        // }

        // res.send(data)

    })
    .get('/api/', (req, res) => {
        res.send({ msg: "ok" })
    })

module.exports = router