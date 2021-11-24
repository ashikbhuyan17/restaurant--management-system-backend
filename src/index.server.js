const express = require('express')
const app = express()
app.use(express.json());
let cors = require("cors");
app.use(cors());

//database connection
require('../config/dbConnect')();

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://sliding-auth:21xzMZWKjSryR9ov@cluster0.tmerz.mongodb.net/sliding-auth?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("sliding-auth").collection("userCollection");
//     // perform actions on the collection object
//     console.log("Connected successfully to server");


//     client.close();
// });

// const env = require('dotenv');
// env.config()
// console.log(env.config());
require('dotenv').config();

// port
const port = process.env.PORT







app.get('/', (req, res) => res.send('Hello World!'))

const userRoutes = require('../src/routes/authentication/user/user.routes')
app.use('/api', userRoutes)


// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}
app.listen(port, () => console.log(`Example app listening on port ${port}!`))