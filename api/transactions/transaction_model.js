import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({

    transactionHash: {
        type: String,
        required: true
    },

    from: {
        type: String,
        required: true
    },

    to: {
        type: String,
        required: true
    },

    gasUsed: {
        type: Number,
        required: true
    },

    status: {
        type: Boolean,
        required: true
    },

    description: {
        type: String,
        required: true
    }

})


const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports.Transaction = Transaction