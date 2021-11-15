const express = require('express');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const { protect } = require('../middleware/authmw');
const Store = require('../database/schemas/storeschema');
const User = require('../database/schemas/userschema');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.post(

    '/addstore',
    protect,

    asyncHandler( async(req,res) => {

        const { name } = req.body;
        
        const nameExists = await Store.findOne({ 'owner': req.user , 'name': name }); 

        if(nameExists) {
            res.status(400);
            throw new Error("Store with this name already exists");
        }
        
        const store = new Store({
            "owner": req.user,
            "name": name
        });
        await store.save();

        const userStore = await User.findById(req.user);
	    
        userStore.stores.push(store._id);
        await userStore.save();

        if(store) {
            res.status(201).json({
                name: store.name,
                message: "Store created successfully"
            })
        }

        else {
            res.status(400);
            throw new Error("Invalid user");
        }

    } )
)

router.get(

    '/getstores',
    protect,

    asyncHandler( async(req,res) => {
        
        const stores = await Store.find({ 'owner': req.user })
            .sort({ createdAt: 1 })
            .populate({ 
                path:'owner' ,
                select: 'username'
            }); 

        res.json(stores);

    } )

)

module.exports = router