const mongoose = require('mongoose');
const User = require('./userschema');
const Item = require('./itemschema');

const storeSchema = mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }]
    },
    {
        timestamps: true
    }
)

const Store = mongoose.model('Store', storeSchema);

module.exports = Store