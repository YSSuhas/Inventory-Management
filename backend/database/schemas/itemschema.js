const mongoose = require('mongoose');
const Store = require('./storeschema');

const itemSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store',
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        reserve: {
            type: Number,
            required: true,
            default: 0
        },
        priceperunit: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Item = mongoose.model('Item', itemSchema);

module.exports = Item