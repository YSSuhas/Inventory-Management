const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Store = require('./storeschema');

const userSchema = mongoose.Schema(
    {
        mailid: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        profilepic: {
            type: String,
            default: "https://ik.imagekit.io/yssuhas/Singularity/Empty_profile_Am3uV5q6A.jfif"
        },
        stores: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store'
        }]
    },
    {
        timestamps: true
    }
)

userSchema.pre('save' , async function(next) {
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User