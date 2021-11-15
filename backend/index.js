const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const connectdb = require('./database/connectdb');

const userRoute = require('./routes/userroute');
const storeRoute = require('./routes/storeroute');
const itemRoute = require('./routes/itemroute');

dotenv.config();

connectdb();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req,res) => {
    res.send("API is running...");
})

app.use('/api/users' , userRoute);

app.use('/api/stores' , storeRoute);

app.use('/api/items' , itemRoute);

const port = process.env.PORT || 9000;
const host = process.env.HOST;

app.listen(port , console.log(`Server running in ${host} on port ${port}`));