const { User } = require('../models/User')

module.exports.auth = (req, res, next) => {

    let token = req.headers.authorization.split(' ')[1]
    token = Buffer.from(token, 'base64').toString('binary')
    let [phone, password] = token.split(':')

    User.findOne({ phone: phone }, (err, user) => {

        if (err) {
            return res.status(400).json({ err })
        }

        if (!user) {
            return res.status(404).json({ msg: 'User with this phone number is not found!' })
        }

        let success = user.comparePassword(password)

        if (!success) {
            return res.status(401).json({ msg: 'Invalid password!' })
        }

        req.user = user

        next()
    })
}