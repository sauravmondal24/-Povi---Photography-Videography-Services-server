const express = require('express');
const cors = require('cors');
const { json } = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Povi server is Running');
});

app.listen(port, () => {
	console.log(`Povi Server is Running on ${port} port.`);
});
