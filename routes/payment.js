const router = require('express').Router()
const { User } = require('../models/User')
const { auth } = require('../routes/Auth')
const { Transaction } = require('../models/Transaction')

router
    .post("/api/verify", auth, (req, res) => {

        let { body } = req

        User.findOne({ phone: body.phone }, (err, receiver) => {
            if (err) {
                return res.status(400).json({ err, msg: null, result: false })
            }

            if (!receiver) {
                return res.status(404).json({ err: null, msg: 'Receiver user with this phone number is not found!', result: false })
            }

            return res.json({ err: null, msg: "Receiver user with this phone number is exists", result: true })
        })

        console.log({ user: req.user });

    })
    .post("/api/pay", auth, (req, res) => {

        let { user, body } = req

        if (body.amount <= 0) {
            return res.status(400).json({ err: null, msg: "Amount must be > 0!", result: null })
        }

        if (user.phone === body.phone) {
            return res.status(400).json({ err: null, msg: "You can't accept payment from yourself!", result: null })
        }

        let senderBalance = req.user.balance
        let diff = senderBalance - body.amount

        if (diff < 0) {
            return res.status(406).json({ msg: "You don't have enough balance" })
        }

        User.findOne({ phone: body.phone }, (err, receiver) => {

            if (err) {
                res.status(400).json({ err })
            }

            if (!receiver) {
                res.status(404).json({ msg: 'Receiver user with this phone number is not found!' })
            }

            User.findByIdAndUpdate(user.id, { balance: diff }, (err, user) => {

                if (err) {
                    res.status(400).json({ err, msg: null, result: null })
                }

                if (!user) {
                    res.status(400).json({ err: null, msg: "User is not found!", result: null })
                }

                console.log({ user });

            })

            receiver.balance += body.amount

            receiver.save((err) => {
                if (err) {
                    return res.status(400).json({ err, msg: 'Error during payment' })
                }
            })

            Transaction.insertMany({
                sender: req.user.id,
                receiver: receiver.id,
                amount: body.amount,
                created: new Date(),
                status: 1
            },
                (err, transaction) => {
                    if (err) {
                        return res.status(400).json({ err, msg: 'Error during transaction' })
                    }
                    console.log(`Transacation: ${transaction}`)
                }
            )
        })

        res.json({ err: null, msg: "Successfully transferred!", result: true })

    })
    .post('/api/cancel', auth, (req, res) => {

        let { transactionId } = req.body
        let sender = req.user

        Transaction.findOne({ _id: transactionId }, (err, transaction) => {
            if (err) {
                return res.status(400).json({ err, msg: null, result: null })
            }

            if (!transaction) {
                return res.status(400).json({ err: null, msg: "Transaction is not found!", result: null })
            }

            if (transaction.sender != sender.id) {
                return res.status(403).json({ err: null, msg: "You don't have access to cancel this transaction", result: null })
            }

            if (transaction.status == 0) {
                return res.status(400).json({ err: null, msg: "Transaction is already canceled!", result: null })
            }

            User.findByIdAndUpdate(sender.id, { balance: sender.balance + transaction.amount }, (err, user) => {
                if (err) {
                    return res.status(400).json({ err, msg: null, result: null })
                }

                if (!user) {
                    return res.status(400).json({ err: null, msg: "Sender is not found!", result: null })
                }

                console.log({ sender: user })
            })

            User.findById(transaction.receiver, (err, user) => {
                if (err) {
                    return res.status(400).json({ err, msg: null, result: null })
                }

                if (!user) {
                    return res.status(400).json({ err: null, msg: "Sender is not found!", result: null })
                }

                user.balance -= transaction.amount

                user.save((err) => {
                    if (err) {
                        return res.status(400).json({ err, msg: null, result: null })
                    }
                })

                console.log({ receiver: user })

            })

            transaction.status = 0

            transaction.save(err => {
                return res.status(400).json({ err, msg: null, result: null })
            })

            return res.status(400).json({ err, msg: "Transaction successfully canceled", result: true })

        })

    })
    .get('/api/check/:transactionId', auth, (req, res) => {
        console.log('hell');

        let { transactionId } = req.params

        console.log({ transactionId })

        Transaction.findById(transactionId, (err, transaction) => {
            if (err) {
                return res.status(400).json({ err, msg: null, result: null })
            }

            if (!transaction) {
                return res.status(400).json({ err, msg: "Transaction is not found", result: null })
            }

            res.json({ err, msg: "Transaction is found", result: transaction })
        })
    })

    .get('/api/:id', (req, res) => {
        console.log(req.params);

        res.send({ msg: "ok" })
    })

module.exports = router

/**
 *
    { "_id" : ObjectId("5d4b35178c6327ab4d7cc0b7"), "phone" : "+998991234567", "balance" : 50000, "status" : 1, "password" : "secret1" }
    { "_id" : ObjectId("5d4b35178c6327ab4d7cc0b8"), "phone" : "+998991234568", "balance" : 10000, "status" : 1, "password" : "secret2" }
    { "_id" : ObjectId("5d4b35178c6327ab4d7cc0b9"), "phone" : "+998991234569", "balance" : 20000, "status" : 1, "password" : "secret3" }

*/