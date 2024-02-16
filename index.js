const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());

app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.onvejqf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection

        const travelsCollection = client.db("optionalDb").collection("travels");
        const auditsCollection = client.db("optionalDb").collection("audits");
        app.get('/travelInfo', async (req, res) => {
            let query = {};
            const items = await travelsCollection.find(query).toArray();
            res.send(items);
        });
        app.post('/travelInfo', async (req, res) => {
            const item = req.body;
            const result = await travelsCollection.insertOne(item);
            res.send(result);
        });
        app.post('/auditInfo', async (req, res) => {
            const item = req.body;
            const result = await auditsCollection.insertOne(item);
            res.send(result);
        });
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('server making server is running')
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})