const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../database/schemas/userschema');
const jwttoken = require('../jwttokens/jwttoken');
const bodyParser = require('body-parser');
const { protect } = require('../middleware/authmw');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.post(

    '/register',

    asyncHandler( async(req,res) => {

        const { mailid , password , username } = req.body;
        
        const mailidExists = await User.findOne( { mailid } );
        const usernameExists = await User.findOne( { 'username': username } ); 

        if(mailidExists) {
            res.status(400);
            throw new Error("User with this mail id already exists");
        }
        
        if(usernameExists) {
            res.status(400);
            throw new Error("Username already exists");
        }
        
        const user = new User({
            "mailid": mailid,
            "password": password,
            "username": username
        });
        await user.save();

        if(user) {
            res.status(201).json({
                id: user._id,
                username: user.username,
                profilepic: user.profilepic,
                token: jwttoken(user._id)
            })
        }

        else {
            res.status(400);
            throw new Error("Invalid user");
        }

    } )
)

router.post(

    '/login',

    asyncHandler( async ( req , res ) => {

        const { mailid , password } = req.body;
        const user = await User.findOne({ mailid });

        if( user && ( user.matchPassword( password ) ) ) {
            res.json({
                id: user._id,
                username: user.username,
                profilepic: user.profilepic,
                token: jwttoken(user._id)
            })
        }

        else {
            res.status(401);
            throw new Error("Invalid User");
        }

    } )

)

module.exports = router;