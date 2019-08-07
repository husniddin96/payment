const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema({
    sender: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
    receiver: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
    amount: { type: Number, required: true },
    created: { type: Date, default: new Date() },
    status: { type: Number, required: true }
})


const Transaction = mongoose.model('transaction', TransactionSchema)

module.exports.Transaction = Transaction