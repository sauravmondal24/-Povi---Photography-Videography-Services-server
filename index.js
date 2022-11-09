const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
		const servicesCollection = client
			.db('poviPhotoServices')
			.collection('services');

		app.post('/addservices', async (req, res) => {
			const services = req.body;
			const result = await servicesCollection.insertOne(services);
			res.send(result);
		});

		app.get('/services', async (req, res) => {
			const query = {};
			const cursor = servicesCollection.find(query);
			const services = await cursor.toArray();
			res.send(services);
		});
		app.get('/sampleServices', async (req, res) => {
			const query = {};
			const cursor = servicesCollection.find(query);
			const services = await cursor.limit(4).toArray();
			res.send(services);
		});

		app.get('/services/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const services = await servicesCollection.findOne(query);
			res.send(services);
		});
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
