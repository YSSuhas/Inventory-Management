const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../database/schemas/userschema');
const Store = require('../database/schemas/storeschema');

dotenv.config();

module.exports.protect = asyncHandler( async(req,res,next) => {

    let token;

    if(req.headers.authorization) {

        try {

            token = req.headers.authorization.split(' ')[1];
            var decode = jwt.verify( token , process.env.JWT_Private_Key );
            req.user = decode.id;
            next();

        } catch (error) {

            throw new Error("User not Authenticated");

        }

    }

} )

module.exports.isStoreOwner = asyncHandler( async(req,res,next) => {

    const storeID = req.params.id;

    if(req.user) {
        
        const store = await Store.findById(storeID);

        if(store.owner.toString() === req.user.toString()) {
            req.store = store._id;
            next();
        }

        else {
            throw new Error("You are not authorized to perform this action");
        }

    }

} )