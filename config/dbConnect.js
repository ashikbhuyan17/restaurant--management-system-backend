

const mongoose = require('mongoose');

const dbConnect = async () => {

    mongoose.connect('mongodb://localhost:27017/sliding-auth', {    //contacts-db => documents     and table = collection
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // userCreateIndex: true,
    });
    const db = mongoose.connection
    // console.log(db);
    db.on('error', (err) => {
        console.log(err);
        console.log('this is error');
    })
    db.once('open', () => {
        console.log("Connected successfully to server........");
    })

};

module.exports = dbConnect;


















// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://sliding-auth:21xzMZWKjSryR9ov@cluster0.tmerz.mongodb.net/sliding-auth?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // client.connect(err => {
// //     const collection = client.db("sliding-auth").collection("userCollection");
// //     // perform actions on the collection object

// //     client.close();
// // });
// const dbConnect = async () => {
//     // try {
//     //     // Connect the client to the server
//     //     await client.connect();
//     //     // Establish and verify connection
//     //     await client.db("admin").collection("userCollection");
//     //     console.log("Connected successfully to server");
//     // } finally {
//     //     // Ensures that the client will close when you finish/error
//     //     await client.close();
//     // }
//     client.connect(err => {
//         const collection = client.db("sliding-auth").collection("userCollection");
//         // perform actions on the collection object
//         console.log("Connected successfully to server");


//         client.close();
//     });
// }
// // dbConnect().catch(console.dir);

// module.exports = dbConnect