const express = require('express');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const { protect , isStoreOwner } = require('../middleware/authmw');
const Item = require('../database/schemas/itemschema');
const Store = require('../database/schemas/storeschema');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.post(

    '/additem/:id',
    protect,
    isStoreOwner,

    asyncHandler( async(req,res) => {

        const { name , stock , reserve , priceperunit } = req.body;
        console.log(req.store);
        const nameExists = await Item.findOne({ 'name': name , 'store': req.store._id }); 

        if(nameExists) {
            res.status(400);
            throw new Error("Item already exists");
        }
        
        const item = new Item({
            "name": name,
            "store": req.store,
            "stock": stock,
            "reserve": reserve,
            "priceperunit": priceperunit
        });
        await item.save();

        const storeItem = await Store.findById(req.store);
	    
        storeItem.items.push(item._id);
        await storeItem.save();

        if(item) {
            res.status(201).json({
                name: item.name,
                message: "Item added successfully"
            })
        }

        else {
            res.status(400);
            throw new Error("Invalid Item");
        }

    } )
)

router.get(

    '/getitems/:id',
    protect,
    isStoreOwner,

    asyncHandler( async(req,res) => {

        var sort = {};
        sort['name'] = 1;

        const store = await Store.findById(req.store , 'name owner')
            .populate({ 
                path:'items' ,
                select: 'name stock reserve priceperunit' ,
                options: { sort: sort }, 
            });

        if(store) {

            for(let i = 0 ; i < store.items.length ; i++) {
                store.items[i].stock = Math.max(store.items[i].stock-store.items[i].reserve,0);
            }

        }

        res.json(store);

    } )

)

router.put(

    '/updateitem/:id',
    protect,
    isStoreOwner,

    asyncHandler( async(req,res) => {

        const { itemID , stock , reserve } = req.body;

        const item = await Item.findById(itemID);

        if(item) {
        
            item.stock = Number(stock) + Number(item.stock);
            item.reserve = Number(reserve) + Number(item.reserve);

            const updateItem = await item.save();

            res.json({
                name: updateItem.name,
                message: "Item updated successfully"
            })
        
        }

        else {

            res.status(401);
            throw new Error("Item not found");
        
        }

    } )

)

router.get(

    '/searchitem/:id',
    protect,
    isStoreOwner,

    asyncHandler( async(req,res) => {
console.log(req.body);
        const { min , max , text } = req.body;

        const item = await Item.find({ "name" : {$regex:`.*${text}.*`} , "store": req.store , priceperunit: { $gte: min, $lte: max } });

        res.json(item);

    } )

)

router.get(

    '/search_by_priceitem/:id',
    protect,
    isStoreOwner,

    asyncHandler( async(req,res) => {

        const { min , max } = req.body;

        const item = await Item.find({ "store": req.store , priceperunit: { $gte: min, $lte: max } });

        res.json(item);

    } )

)

router.get(

    '/search_by_nameitem/:id',
    protect,
    isStoreOwner,

    asyncHandler( async(req,res) => {

        const { text } = req.body;

        const item = await Item.find({ "name" : {$regex:`.*${text}.*`} , "store": req.store });

        res.json(item);

    } )

)

module.exports = router;