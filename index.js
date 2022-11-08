const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// user: poviUserData
// password: AzFH3f2CKoXEdnIY

// MongoDb connected
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xzekhbt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1
});

async function run() {
	try {
		const servicesCollection = client.db('services').collection('products');
		const products = { name: 'wedding', price: 200 };
		const result = await servicesCollection.insertOne(products);
		console.log(result);
	} finally {
	}
}
run().catch((error) => console.error(error));

app.get('/', (req, res) => {
	res.send('Povi server is Running');
});

app.listen(port, () => {
	console.log(`Povi Server is Running on ${port} port.`);
});
